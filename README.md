<div align="center">
# 🚀 Hsini Legal Partners
### *Modern, High-Performance JavaScript Solution & Developer Suite*

<p align="center">
  [![Architect](https://img.shields.io/badge/Architect-Hsini%20Mohamed-0055ff?style=for-the-badge&logo=github&logoColor=white)](https://hsini.dev)
  [![Portfolio](https://img.shields.io/badge/Portfolio-hsini.dev-00c853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://hsini.dev)
  [![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge)](https://github.com/hsinidev)
  [![Framework](https://img.shields.io/badge/Framework-JavaScript-6366f1?style=for-the-badge)](https://github.com/hsinidev)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</p>

</div>

---
## 🌟 Executive Overview

**Hsini Legal Partners** is a production-grade **TypeScript** platform engineered for high reliability, clean architectural separation, and frictionless developer workflow.

## ⚡ Key Highlights & Capabilities

- **Scalable Architecture**: Modular, decoupled components adhering to clean code principles.
- **Optimized Runtime**: Ultra-fast execution with minimal memory and CPU overhead.
- **Developer Tooling**: Standardized linting, formatting, and rapid local iteration setup.
- **Production Ready**: Built-in error resilience, validation, and structured logging.

---
## 🏗️ Architecture & Technology Stack

- **Primary Language**: `TypeScript`
- **Framework / Runtime**: `JavaScript`
- **Design Pattern**: Modular Clean Architecture / Domain-Driven Design
- **License**: MIT Open Source Attribution

## 📖 Deep-Dive Technical Documentation

# 🏛️ Hsini Legal Partners — Enterprise Legal Portfolio & Consultation Platform


> A state-of-the-art, luxury digital platform built for high-stakes corporate law, litigation, and international legal consultation. Engineered with cutting-edge web technologies, real-time consultation dispatch, interactive global office maps, and seamless Sanity CMS legal whitepaper integration.

🔗 **Live Demo:** [https://low.hsini.dev](https://low.hsini.dev)  
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
- 🏢 **Firm Gallery & Heritage Archive**:
  - Visual showcase of partner council, court victories, and headquarters architecture.
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
│   ├── 📄 FirmGallery.tsx      # Interactive firm gallery
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


Designed, developed, and maintained with legal precision by **Hsini Web Development**.

- 🌐 **Website**: [https://hsini.dev](https://hsini.dev)
- 📧 **Email**: [contact@hsini.dev](mailto:contact@hsini.dev)
- 🐙 **GitHub Account**: [@hsinidev](https://github.com/hsinidev)

---

---
## 🚀 Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/hsinidev/hsini-legal-partners.git
cd hsini-legal-partners
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch the Application
```bash
npm run dev
```


---

## 👨‍💻 System Architect & Author

<table align="center" style="border: none; background: transparent; width: 100%;">
  <tr>
    <td align="center" width="160" style="border: none; padding: 12px;">
      <img src="https://avatars.githubusercontent.com/u/232697467?v=4" width="120" height="120" style="border-radius: 50%; box-shadow: 0 8px 24px rgba(99,102,241,0.3); border: 2.5px solid #6366f1;" alt="Hsini Mohamed" />
      <br /><br />
      <b>Hsini Mohamed</b><br />
      <sub>Morocco 🇲🇦</sub>
    </td>
    <td style="border: none; padding: 12px; vertical-align: middle;">
      <h3 style="margin-top: 0;">🚀 System Architect & Full-Stack Engineer</h3>
      <p style="font-size: 0.95rem; line-height: 1.6; color: #475569;">
        Specializing in high-performance autonomous AI systems, deterministic multi-agent swarms, enterprise cloud architecture, and modern full-stack engineering.
      </p>
      <p>
        <a href="https://hsini.dev"><img src="https://img.shields.io/badge/Portfolio-hsini.dev-2563eb?style=flat-square&logo=google-chrome&logoColor=white" alt="Portfolio" /></a>
        <a href="mailto:contact@hsini.dev"><img src="https://img.shields.io/badge/Email-contact@hsini.dev-ea4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
        <a href="https://github.com/hsinidev"><img src="https://img.shields.io/badge/GitHub-@hsinidev-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
        <a href="https://linkedin.com/in/hsinidev/"><img src="https://img.shields.io/badge/LinkedIn-hsinidev-0077b5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
      </p>
    </td>
  </tr>
</table>

---

## 📄 License & Attribution

This project is distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms.

<div align="center">
  <sub>⚡ Designed, architected, and maintained with engineering precision by <b><a href="https://hsini.dev">Hsini Mohamed</a></b>.</sub>
</div>
