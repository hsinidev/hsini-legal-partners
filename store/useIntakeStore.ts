import { create } from "zustand";

export interface IntakeState {
  // Form Steps
  currentStep: number;
  
  // Step 1: Client Information
  name: string;
  company: string;
  email: string;
  phone: string;
  
  // Step 2: Legal Segment Details
  practiceArea: string;
  caseValue: string;
  
  // Step 3: Detailed Objectives & Urgency
  description: string;
  urgency: "routine" | "expedited" | "critical";
  preferredContactMethod: "email" | "phone";
  
  // UX State Indicators
  isSubmitting: boolean;
  isSuccess: boolean;
  submitError: string | null;
  
  // Store Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: (field: keyof Omit<IntakeState, "setStep" | "nextStep" | "prevStep" | "updateField" | "resetForm" | "submitForm">, value: any) => void;
  resetForm: () => void;
  submitForm: () => Promise<boolean>;
}

export const useIntakeStore = create<IntakeState>((set, get) => ({
  currentStep: 1,
  
  name: "",
  company: "",
  email: "",
  phone: "",
  
  practiceArea: "",
  caseValue: "",
  
  description: "",
  urgency: "routine",
  preferredContactMethod: "email",
  
  isSubmitting: false,
  isSuccess: false,
  submitError: null,

  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 4) {
      set({ currentStep: currentStep + 1 });
    }
  },
  
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },
  
  updateField: (field, value) => set({ [field]: value }),
  
  resetForm: () => set({
    currentStep: 1,
    name: "",
    company: "",
    email: "",
    phone: "",
    practiceArea: "",
    caseValue: "",
    description: "",
    urgency: "routine",
    preferredContactMethod: "email",
    isSubmitting: false,
    isSuccess: false,
    submitError: null
  }),

  submitForm: async () => {
    set({ isSubmitting: true, submitError: null });
    const { name, company, email, phone, practiceArea, caseValue, description, urgency, preferredContactMethod } = get();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          practiceArea,
          caseValue,
          description,
          urgency,
          preferredContactMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      set({ isSubmitting: false, isSuccess: true });
      return true;
    } catch (error: any) {
      set({ isSubmitting: false, submitError: error.message || "Failed to submit consultation details." });
      return false;
    }
  }
}));
