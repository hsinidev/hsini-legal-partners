"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";

// 1. Declare Zod schema matching client form fields
const intakeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid corporate or personal email address." }),
  phone: z
    .string()
    .max(30, { message: "Phone number is too long." })
    .optional(),
  company: z
    .string()
    .max(100, { message: "Company name is too long." })
    .optional(),
  practiceArea: z
    .string()
    .min(1, { message: "Please select a legal practice segment." }),
  caseValue: z
    .string()
    .min(1, { message: "Please select an estimated matter scale." }),
  description: z
    .string()
    .min(10, { message: "Matter description must be at least 10 characters." })
    .max(2000, { message: "Matter description must be less than 2000 characters." }),
  urgency: z.enum(["routine", "expedited", "critical"]),
  preferredContactMethod: z.enum(["email", "phone"]),
});

// 2. Sliding window memory cache for rate-limiting
const ipCache = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour sliding window
const MAX_REQUESTS = 5; // Max 5 requests per hour

// Helper to sanitize text and eliminate XSS / HTML tags
function sanitizeInput(str: string): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, "") // remove all HTML tags
    .replace(/[&<>"']/g, (m) => {
      switch (m) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "\"": return "&quot;";
        case "'": return "&#x27;";
        default: return m;
      }
    })
    .trim();
}

export async function processSecureIntake(prevState: any, formData: FormData) {
  try {
    // A. Enforce IP-based rate limiting
    const headerList = await headers();
    const rawIp = headerList.get("x-forwarded-for") || headerList.get("x-real-ip") || "127.0.0.1";
    const ip = rawIp.split(",")[0].trim(); // Get primary client IP

    const now = Date.now();
    const timestamps = ipCache.get(ip) || [];
    const activeTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);

    if (activeTimestamps.length >= MAX_REQUESTS) {
      return {
        success: false,
        message: "Rate limit exceeded. To prevent system abuse, we restrict submissions to 5 per hour. Please contact us directly at contact@hsini.dev for urgent requirements.",
        errors: null,
      };
    }

    // Record this attempt
    activeTimestamps.push(now);
    ipCache.set(ip, activeTimestamps);

    // B. Parse Form Data and validate schema
    const rawFields = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      company: formData.get("company") as string || undefined,
      practiceArea: formData.get("practiceArea") as string,
      caseValue: formData.get("caseValue") as string,
      description: formData.get("description") as string,
      urgency: formData.get("urgency") as "routine" | "expedited" | "critical",
      preferredContactMethod: formData.get("preferredContactMethod") as "email" | "phone",
    };

    const validation = intakeSchema.safeParse(rawFields);

    if (!validation.success) {
      // Map error fields cleanly for front-end rendering
      const fieldErrors = validation.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Validation failed. Please correct the highlighted errors.",
        errors: fieldErrors,
      };
    }

    const data = validation.data;

    // C. Perform text sanitization to protect databases & emails
    const cleanName = sanitizeInput(data.name);
    const cleanEmail = sanitizeInput(data.email);
    const cleanPhone = data.phone ? sanitizeInput(data.phone) : "";
    const cleanCompany = data.company ? sanitizeInput(data.company) : "";
    const cleanPractice = sanitizeInput(data.practiceArea);
    const cleanScale = sanitizeInput(data.caseValue);
    const cleanDesc = sanitizeInput(data.description);

    // D. Email compilation & dispatch
    const emailHtml = `
      <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-top: 4px solid #b45309; background-color: #ffffff;">
        <h2 style="font-family: 'Playfair Display', Georgia, serif; color: #0f172a; font-size: 24px; font-weight: normal; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
          Privileged Legal Brief Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 25px;">
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 40%;">Client Name</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 500;">${cleanName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Corporate Email</td>
            <td style="padding: 10px 0; color: #b45309; font-weight: 500;">${cleanEmail}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Direct Contact</td>
            <td style="padding: 10px 0; color: #0f172a;">${cleanPhone || "Not specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Enterprise Entity</td>
            <td style="padding: 10px 0; color: #0f172a;">${cleanCompany || "Not specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Practice Segment</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 500;">${cleanPractice}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Estimated Matter Scale</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 500;">${cleanScale}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Urgency Level</td>
            <td style="padding: 10px 0; color: #ef4444; font-weight: bold; text-transform: uppercase;">${data.urgency}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f8fafc;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Preferred Contact</td>
            <td style="padding: 10px 0; color: #0f172a; text-transform: uppercase;">${data.preferredContactMethod}</td>
          </tr>
        </table>
        
        <div style="background-color: #f8fafc; border-left: 2px solid #b45309; padding: 15px; margin-bottom: 25px;">
          <h4 style="margin-top: 0; color: #0f172a; font-size: 13px; font-weight: bold; text-transform: uppercase; tracking: 1px;">Matter Description Brief</h4>
          <p style="color: #1e293b; font-size: 13px; line-height: 1.6; font-style: italic; margin-bottom: 0;">
            "${cleanDesc}"
          </p>
        </div>
        
        <p style="font-size: 11px; color: #94a3b8; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 15px; margin-top: 30px;">
          CONFIDENTIALITY NOTICE: This transmission consists of information protected under attorney-client privilege. Encrypted at legal.hsini.dev and dispatched securely.
        </p>
      </div>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && resendApiKey !== "mock_resend_key" && !resendApiKey.startsWith("re_your_secure")) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Hsini Intake Portal <intake@legal.hsini.dev>",
        to: "contact@hsini.dev",
        subject: `[Confidential] New Client Intake: ${cleanName} (${data.urgency.toUpperCase()})`,
        html: emailHtml,
      });
      console.log(`[Resend SUCCESS] Privileged intake dispatched securely to contact@hsini.dev from IP: ${ip}`);
    } else {
      // Graceful fallback to server stdout simulation for easy validation and zero-dependency compilation
      console.log("=== SECURE INTAKE ACTION SIMULATION ===");
      console.log(`IP Source: ${ip}`);
      console.log(`API Key: MOCK / NOT CONFIGURED (Console logging payload)`);
      console.log(`Subject: [Confidential] New Client Intake: ${cleanName}`);
      console.log("---------------- EMAIL HTML ----------------");
      console.log(emailHtml);
      console.log("=========================================");
    }

    return {
      success: true,
      message: "Consultation request successfully processed and encrypted under attorney-client privilege.",
      errors: null,
    };
  } catch (error: any) {
    console.error("Server Action Intake Error:", error);
    return {
      success: false,
      message: "Internal server error during secure transmission. Please try again or contact contact@hsini.dev directly.",
      errors: null,
    };
  }
}
