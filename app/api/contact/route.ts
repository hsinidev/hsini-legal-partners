import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, practiceArea, caseValue, description, urgency, preferredContactMethod } = body;

    // 1. Enforce strict server-side validation for ADA/security
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid corporate or personal email address." },
        { status: 400 }
      );
    }

    if (!practiceArea) {
      return NextResponse.json(
        { message: "Please select a legal practice area." },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { message: "Please provide a brief description of your legal matter (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // 2. Log intake in secure backend server (simulated database & SMTP dispatch)
    console.log("=== NEW INTAKE SUBMISSION (SECURE DISPATCH) ===");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Destination Dispatch: contact@hsini.dev`);
    console.log(`Client Name: ${name}`);
    console.log(`Company: ${company || "N/A"}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "N/A"}`);
    console.log(`Practice Segment: ${practiceArea}`);
    console.log(`Estimated Case Value: ${caseValue || "Unspecified"}`);
    console.log(`Urgency level: ${urgency.toUpperCase()}`);
    console.log(`Preferred Contact: ${preferredContactMethod.toUpperCase()}`);
    console.log(`Matter Description: ${description}`);
    console.log("===============================================");

    // Simulate database write delay / external API dispatch (e.g. Resend, SendGrid)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return official receipt confirmation
    return NextResponse.json(
      { 
        success: true, 
        message: "Your request has been securely recorded. An elite legal advocate from Hsini Legal Partners will review your case description and reach out within 4 business hours.",
        receiptId: `HLP-${Math.floor(100000 + Math.random() * 900000)}`
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Secure Intake Dispatch Error:", error);
    return NextResponse.json(
      { message: "Internal server error. Failed to process secure consultation request." },
      { status: 500 }
    );
  }
}
