# 🏛️ Hsini Legal Partners — Enterprise Legal Portfolio & Consultation Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-low.hsini.dev-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://low.hsini.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://www.sanity.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A state-of-the-art, luxury digital platform built for high-stakes corporate law, litigation, and international legal consultation. Engineered with cutting-edge web technologies, real-time consultation dispatch, interactive global office maps, and seamless Sanity CMS legal whitepaper integration.

🔗 **Live Demo:** [https://low.hsini.dev](https://low.hsini.dev)  
🌐 **Developer Website:** [https://hsini.dev](https://hsini.dev)  
👤 **Maintained by:** [Mohamed Hsini](https://hsini.dev) (`contact@hsini.dev`)

---

## 🌟 Key Features & Capabilities

- ⚖️ **High-Stakes Legal Architecture**: Custom-tailored section architecture highlighting Corporate Law, Cross-Border M&A, Intellectual Property, and Strategic Litigation.
- 🎨 **Luxury Aesthetics & Interactive Visuals**:
  - Sleek dark-mode theme featuring subtle glassmorphism and gold accents.
  - Interactive **Three.js** background canvas and **GSAP** timeline micro-animations.
  - Smooth fluid motion transitions powered by **Framer Motion**.
- 📝 **Multi-Step Client Intake Consultation Engine**:
  - Dynamic client onboarding form backed by `react-hook-form` and strict `Zod` runtime validation schemas.
  - Client-side persistent state using `Zustand`.
  - Secure **Next.js Server Action** backend handler with built-in rate-limiting and XSS input sanitization.
- 📧 **Automated Legal Consultation Email Alerts**:
  - Direct email dispatch to senior legal staff via **Resend API**.
  - Styled responsive HTML email templates for case reviews.
- 📰 **Editorial Legal Insights & Whitepapers**:
  - Fully integrated **Sanity CMS** headless content engine.
  - Smart dual-mode setup: seamlessly switches between live Sanity API data and high-fidelity legal fallback datasets.
  - Dedicated insights search engine, category filter, and rich article view with editorial drop-caps and reading time calculators.
- 🌐 **Interactive Global Office Map**:
  - Interactive map displaying physical locations across key financial centers (New York, London, Tokyo, Paris, Dubai).
  - Quick drawer view featuring local managing partner details, contact info, and emergency legal hotline dispatch.
- 🛡️ **Enterprise Privacy & Security Compliance**:
  - GDPR & CCPA compliant interactive cookie banner with local storage consent options.
  - Strict input sanitization, security headers, and WCAG 2.2 AA accessibility standards.

---

## 🛠️ Technology Stack

| Category | Technology / Library | Description |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 16.2.6 (App Router) | Server Components, Server Actions, Dynamic Routing |
| **UI & Styling** | React 19, Tailwind CSS v4, Lucide Icons | Modern utility-first layout with curated color tokens |
| **Animations** | Three.js, GSAP 3.15, Framer Motion | 3D visual canvas, scroll trigger scenes, fluid micro-interactions |
| **Form & Validation** | React Hook Form 7, Zod 4 | Type-safe form controls, custom error messaging |
| **State Management** | Zustand 5 | Light-weight client state management for multi-step workflows |
| **Content Management**| Sanity CMS (`@sanity/client`) | Headless CMS for legal whitepapers and press releases |
| **Email Delivery** | Resend API | Transactional notification email delivery service |
| **Image Optimization** | Sharp | High-performance image processing and optimization |

---

## 📁 Project Directory Structure

```
hsini-legal-partners/
├── 📁 app/                      # Next.js App Router (Pages, API & Actions)
│   ├── 📁 actions/             # Next.js Server Actions (Intake dispatch, sanitization)
│   ├── 📁 api/                 # API endpoint handlers (Sanity webhook, rate-limiting)
│   ├── 📁 insights/            # Insights grid (/insights) & dynamic article reader (/insights/[slug])
│   ├── 📄 globals.css          # Design system, CSS variables & keyframe animations
│   ├── 📄 layout.tsx           # Global root layout & metadata configuration
│   └── 📄 page.tsx             # Master homepage portfolio showcase
├── 📁 components/               # Production-ready React components
│   ├── 📄 AttorneyProfile.tsx  # Managing partner profiles & accolades
│   ├── 📄 CaseResults.tsx      # Historic settlements & track record counter
│   ├── 📄 CookieBanner.tsx     # GDPR/CCPA cookie consent dialog
│   ├── 📄 Footer.tsx           # Global footer, disclaimer & developer credit
│   ├── 📄 GlobalMap.tsx        # Interactive global offices map component
│   ├── 📄 Header.tsx           # Sticky navigation header with mobile drawer
│   ├── 📄 Hero.tsx             # Animated hero section with Three.js canvas
│   ├── 📄 InsightsListClient.tsx # Client-side search & category filtering
│   ├── 📄 IntakeForm.tsx       # Multi-step consultation intake wizard
│   ├── 📄 JusticePillars.tsx   # Core values & firm philosophy
│   └── 📄 PracticeAreas.tsx    # Detailed legal practice area cards
├── 📁 lib/                      # Core helpers & integrations
│   └── 📄 sanity.ts            # Sanity CMS client & fallback mock dataset
├── 📁 store/                    # Global state management
│   └── 📄 useIntakeStore.ts    # Zustand store for consultation state
├── 📁 public/                   # Static assets, branding graphics & icons
├── 📄 .env.example              # Environment variables template
├── 📄 next.config.ts            # Next.js build configuration
├── 📄 package.json              # Project dependencies & script definitions
└── 📄 tsconfig.json             # TypeScript compiler rules
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have the following tools installed on your local environment:
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`

### 2. Clone the Repository
```bash
git clone https://github.com/hsinidev/hsini-legal-partners.git
cd hsini-legal-partners
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the example environment file to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration details:
```env
# Base URL Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend API Key for Legal Consultation Email Alerts
RESEND_API_KEY=your_resend_api_key_here
LEGAL_TEAM_EMAIL=contact@hsini.dev

# Sanity CMS Credentials (Optional: Falls back to mock data if unconfigured)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_sanity_read_token
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 📦 Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Next.js local development server at port 3000 |
| `npm run build` | Compiles optimized production build bundle |
| `npm run start` | Boots the compiled production server |
| `npm run lint` | Runs ESLint analysis for code quality & style adherence |

---

## 🔒 Security & Privacy

- **Input Sanitization**: All incoming form payloads pass through server-side XSS filtering before processing.
- **Strict Validation**: Type-safe schema validation via Zod ensures zero invalid data entry.
- **Data Protection**: Zero storage of sensitive client details in public logs.

---

## ✒️ Author & Credits

Designed, developed, and maintained with legal precision by **Hsini Web Development**.

- 🌐 **Website**: [https://hsini.dev](https://hsini.dev)
- 📧 **Email**: [contact@hsini.dev](mailto:contact@hsini.dev)
- 🐙 **GitHub Account**: [@hsinidev](https://github.com/hsinidev)

---

## 📜 License

This project is open source and released under the terms of the [MIT License](LICENSE).
