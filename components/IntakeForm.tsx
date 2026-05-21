"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Building, Briefcase, Landmark, 
  FileText, Shield, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, RefreshCw 
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { processSecureIntake } from "@/app/actions/intake-action";

// Zod client schema matching the server schema
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
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(100, { message: "Company name is too long." })
    .optional()
    .or(z.literal("")),
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

type FormValues = z.infer<typeof intakeSchema>;

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receiptReference, setReceiptReference] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, touchedFields },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      practiceArea: "",
      caseValue: "",
      description: "",
      urgency: "routine",
      preferredContactMethod: "email",
    },
    mode: "onTouched",
  });

  const urgencyValue = watch("urgency");
  const preferredContactMethodValue = watch("preferredContactMethod");

  // Step validation check to allow clean multi-step experience
  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    let fieldsToValidate: Array<keyof FormValues> = [];

    if (currentStep === 1) {
      fieldsToValidate = ["name", "email", "phone", "company"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["practiceArea", "caseValue"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["description", "urgency", "preferredContactMethod"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setSubmitError(null);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setSubmitError(null);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsSuccess(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setReceiptReference("");
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await processSecureIntake(null, formData);

      if (response.success) {
        setReceiptReference(`HLP-${Math.floor(100000 + Math.random() * 900000)}`);
        setIsSuccess(true);
        reset();
      } else {
        setSubmitError(response.message || "Failed to submit consultation details.");
      }
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred during secure dispatch.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="intake-form" 
      className="py-24 bg-[#f8fafc] scroll-mt-20 border-b border-primary/5"
      aria-label="Secure Consultation Booking Directory"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-secondary bg-secondary/5 px-4 py-1.5 border border-secondary/15">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Privileged & Confidential</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-primary">
            Schedule Private Consultation
          </h2>
          <p className="text-text-muted text-sm font-sans font-light max-w-lg mx-auto leading-relaxed">
            Begin the intake procedure. All submissions are processed securely under attorney-client privilege guidelines and routed to contact@hsini.dev.
          </p>
        </div>

        {/* Outer Form Container */}
        <div className="bg-white border border-primary/5 p-8 md:p-12 shadow-2xl relative">
          
          {/* Top Progress Tracker */}
          {!isSuccess && (
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100" role="navigation" aria-label="Intake progress steps">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center space-x-2">
                  <div 
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      currentStep === s
                        ? "bg-secondary text-white scale-110"
                        : currentStep > s
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider hidden sm:inline ${
                    currentStep === s ? "text-primary font-bold" : "text-slate-400"
                  }`}>
                    {s === 1 ? "Identity" : s === 2 ? "Segment" : s === 3 ? "Details" : "Review"}
                  </span>
                  {s < 4 && <div className="w-8 sm:w-16 h-[1px] bg-slate-200 hidden xs:block" />}
                </div>
              ))}
            </div>
          )}

          {/* Form Content Switcher with Animation */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-6"
                role="status"
              >
                <div className="inline-flex p-4 bg-green-50 text-green-600 rounded-full mb-4">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="font-serif text-3xl text-primary font-normal">
                  Intake Securely Dispatched
                </h3>
                <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
                  Your legal brief has been successfully encrypted and dispatched to **contact@hsini.dev**. An elite advocate will complete structural analysis and contact you within 4 business hours.
                </p>
                <div className="bg-[#f8fafc] p-4 max-w-sm mx-auto border border-slate-200/60 mt-6">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Receipt Reference</span>
                  <span className="font-mono text-sm font-bold text-primary">{receiptReference}</span>
                </div>
                <div className="pt-8">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-semibold transition-all hover:bg-slate-800 rounded-none cursor-pointer focus-visible:outline-none"
                  >
                    Begin New Intake
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                
                {/* Submit Error Banner */}
                {submitError && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 flex items-start space-x-3 text-sm" role="alert">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Step 1: Personal / Corporate Identity */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="client-name" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Full Legal Name <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <input
                            id="client-name"
                            type="text"
                            placeholder="Johnathan Doe"
                            {...register("name")}
                            className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none ${
                              errors.name ? "border-red-400 focus:border-red-400" : "border-slate-200"
                            }`}
                            aria-invalid={errors.name ? "true" : "false"}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[11px] text-red-500 font-medium flex items-center space-x-1">
                            <span>{errors.name.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="client-email" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Corporate Email Address <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <input
                            id="client-email"
                            type="email"
                            placeholder="j.doe@corporate.com"
                            {...register("email")}
                            className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none ${
                              errors.email ? "border-red-400 focus:border-red-400" : "border-slate-200"
                            }`}
                            aria-invalid={errors.email ? "true" : "false"}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[11px] text-red-500 font-medium">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="client-phone" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Direct Contact Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <input
                            id="client-phone"
                            type="tel"
                            placeholder="+1 (555) 012-3456"
                            {...register("phone")}
                            className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none ${
                              errors.phone ? "border-red-400 focus:border-red-400" : "border-slate-200"
                            }`}
                            aria-invalid={errors.phone ? "true" : "false"}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-[11px] text-red-500 font-medium">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <label htmlFor="client-company" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Enterprise Entity / Private Office
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <input
                            id="client-company"
                            type="text"
                            placeholder="Acme Global Inc."
                            {...register("company")}
                            className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none ${
                              errors.company ? "border-red-400 focus:border-red-400" : "border-slate-200"
                            }`}
                            aria-invalid={errors.company ? "true" : "false"}
                          />
                        </div>
                        {errors.company && (
                          <p className="text-[11px] text-red-500 font-medium">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Legal Segment & Case Scale */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Practice Area Dropdown */}
                      <div className="space-y-2">
                        <label htmlFor="practice-area" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Selected Practice Segment <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                          <select
                            id="practice-area"
                            {...register("practiceArea")}
                            className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none appearance-none cursor-pointer ${
                              errors.practiceArea ? "border-red-400 focus:border-red-400" : "border-slate-200"
                            }`}
                            aria-invalid={errors.practiceArea ? "true" : "false"}
                          >
                            <option value="">Choose segment...</option>
                            <option value="Venture Finance & Capital">Venture Finance & Capital</option>
                            <option value="High-Stakes IP Litigation">High-Stakes IP Litigation</option>
                            <option value="Corporate M&A Counsel">Corporate M&A Counsel</option>
                            <option value="Elite Wealth & Family Office">Elite Wealth & Family Office</option>
                          </select>
                        </div>
                        {errors.practiceArea && (
                          <p className="text-[11px] text-red-500 font-medium">
                            {errors.practiceArea.message}
                          </p>
                        )}
                      </div>

                      {/* Case Scale */}
                      <div className="space-y-2">
                        <label htmlFor="case-scale" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Estimated Financial Scale <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Landmark className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                          <select
                            id="case-scale"
                            {...register("caseValue")}
                            className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none appearance-none cursor-pointer ${
                              errors.caseValue ? "border-red-400 focus:border-red-400" : "border-slate-200"
                            }`}
                            aria-invalid={errors.caseValue ? "true" : "false"}
                          >
                            <option value="">Select matter scale...</option>
                            <option value="Under $1,000,000">Under $1,000,000</option>
                            <option value="$1,000,000 - $10,000,000">$1,000,000 - $10,000,000</option>
                            <option value="$10,000,000 - $50,000,000">$10,000,000 - $50,000,000</option>
                            <option value="Exceeding $50,000,000">Exceeding $50,000,000</option>
                          </select>
                        </div>
                        {errors.caseValue && (
                          <p className="text-[11px] text-red-500 font-medium">
                            {errors.caseValue.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Matter Description & Context */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Description Textarea */}
                    <div className="space-y-2">
                      <label htmlFor="matter-description" className="text-xs uppercase tracking-wider text-primary font-semibold block">
                        Confidential Matter Outline (Minimum 10 characters) <span className="text-secondary">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <textarea
                          id="matter-description"
                          rows={4}
                          placeholder="Briefly state key timelines, conflicting entities, and core litigation objectives..."
                          {...register("description")}
                          className={`w-full pl-10 pr-4 py-3 bg-[#f8fafc] border text-sm focus:border-secondary focus:bg-white focus:outline-none transition-all duration-300 rounded-none resize-none ${
                            errors.description ? "border-red-400 focus:border-red-400" : "border-slate-200"
                          }`}
                          aria-invalid={errors.description ? "true" : "false"}
                        />
                      </div>
                      {errors.description && (
                        <p className="text-[11px] text-red-500 font-medium">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Urgency and Contact Preferences */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Urgency Radio Grid */}
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Urgency Level
                        </span>
                        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Urgency level Selection">
                          {["routine", "expedited", "critical"].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => setValue("urgency", lvl as any, { shouldValidate: true })}
                              className={`py-2 text-[10px] uppercase font-bold border transition-colors tracking-wider rounded-none cursor-pointer ${
                                urgencyValue === lvl
                                  ? "bg-primary border-primary text-white"
                                  : "bg-[#f8fafc] border-slate-200 text-text-muted hover:border-slate-300"
                              }`}
                              role="radio"
                              aria-checked={urgencyValue === lvl}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contact Method Radio Grid */}
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-wider text-primary font-semibold block">
                          Contact Preference
                        </span>
                        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Contact method Preference">
                          {["email", "phone"].map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setValue("preferredContactMethod", method as any, { shouldValidate: true })}
                              className={`py-2 text-[10px] uppercase font-bold border transition-colors tracking-wider rounded-none cursor-pointer ${
                                preferredContactMethodValue === method
                                  ? "bg-primary border-primary text-white"
                                  : "bg-[#f8fafc] border-slate-200 text-text-muted hover:border-slate-300"
                              }`}
                              role="radio"
                              aria-checked={preferredContactMethodValue === method}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* Step 4: Summary Review & Privileged Submit */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="border border-slate-200 p-6 space-y-4 bg-[#f8fafc]">
                      <h3 className="font-serif text-lg font-semibold text-primary pb-2 border-b border-slate-200">
                        Intake Summary Review
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block font-medium">Full Name</span>
                          <span className="text-primary font-semibold">{watch("name")}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Corporate Email</span>
                          <span className="text-primary font-semibold">{watch("email")}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Legal Segment</span>
                          <span className="text-primary font-semibold">{watch("practiceArea")}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Matter Scale</span>
                          <span className="text-primary font-semibold">{watch("caseValue")}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-slate-400 block font-medium">Brief Description</span>
                          <p className="text-primary mt-1 font-light italic bg-white p-3 border border-slate-200 leading-relaxed">
                            "{watch("description")}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Privileged Disclaimer */}
                    <div className="flex items-start space-x-3 text-xs text-text-muted p-4 bg-slate-50 border border-slate-200 leading-relaxed">
                      <Shield className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <p>
                        By submitting this request, you agree that Hsini Legal Partners processes these details securely under standard attorney-client privacy covenants. Information is securely logged and routed to **contact@hsini.dev**.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Footer Controls Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 bg-transparent text-primary hover:text-secondary text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 transition-colors cursor-pointer focus-visible:outline-none"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 bg-primary text-white border border-primary hover:bg-transparent hover:text-primary text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all rounded-none cursor-pointer focus-visible:outline-none"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-secondary text-white border border-secondary hover:bg-white hover:text-primary hover:border-primary text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all rounded-none cursor-pointer focus-visible:outline-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Securing Dispatch...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Privileged Brief</span>
                          <Shield className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

