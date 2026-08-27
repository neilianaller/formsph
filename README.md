# FormsPH 🇵🇭

> **Offline-first, privacy-first Philippine government form builder & filler.**  
> *"Your data never leaves your device unless you choose to export it."*

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack: React + Vite + Tailwind](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind-blue.svg)]()
[![PWA: 100% Offline](https://img.shields.io/badge/PWA-100%25%20Offline-success.svg)]()
[![IndexedDB: Dexie.js](https://img.shields.io/badge/Storage-IndexedDB%20(Dexie)-indigo.svg)]()

---

## 🌟 Overview

**FormsPH** is an open-source Progressive Web App (PWA) tailored specifically for Philippine civil servants and government workers. It provides an intuitive, step-by-step builder and filler for official government documents, starting with the **Personal Data Sheet (CS Form No. 212, Revised 2026)**.

All form data, draft iterations, attachments, and settings are stored **locally in your browser's IndexedDB via Dexie.js**. There are zero cloud databases, zero telemetry trackers, and zero accounts needed.

---

## 🚀 Key Features

- **CS Form No. 212 (Revised 2026) Verified Schema:**
  - **I. Personal Information:** Items 1–21 (including UMID, Pag-IBIG, PhilHealth, PhilSys PCN, TIN, Dual Citizenship).
  - **II. Family Background:** Items 22–25 (Spouse info, dynamic children list, Parents).
  - **III. Educational Background:** Item 26 with year-only period of attendance (`YYYY`).
  - **IV. Civil Service Eligibility:** Item 27 (Career Service, RA 1080, Board exams).
  - **V. Work Experience:** Item 28 with Work Experience Sheet duties description.
  - **VI. Learning & Development:** Item 29 (L&D programs & seminars).
  - **VII. Voluntary Work:** Item 30 (Civic/NGO engagements).
  - **VIII. Other Information:** Items 31–33 (Skills, non-academic distinctions, memberships).
  - **IX. Background Questions:** Items 34–40 with tri-state logic (`YES` / `NO` / `unanswered`).
  - **X. References:** Item 41 (Minimum 3 non-relative references).
  - **XI. Declaration:** Item 42 (Passport photo upload, HTML5 signature canvas, right thumbmark, ID details).
- **100% Offline Progressive Web App (PWA):**
  - Service worker precaches app shell via Workbox.
  - In-app update notifications when new releases arrive.
  - Native `beforeinstallprompt` handling and iOS Safari "Add to Home Screen" instructions.
- **Official 4-Page Printable Layout:**
  - Standard government table formatting matching Civil Service Commission layout.
  - Direct print or Save as PDF.
- **Client-Side Export & Import:**
  - Export all forms to single JSON backup.
  - Optional **AES-GCM 256-bit password-protected encrypted vault** using native Web Crypto API.
  - Round-trip import to restore or transfer forms between devices.
  - 30-day export reminder banner to encourage backups.
- **Interactive Quick Tour:**
  - Onboarding spotlight for first-time visitors (`hasSeenTour`).
  - Persistent "Replay Quick Tour" button in header and about page.
- **Accessible & Ethical UI:**
  - Light mode default with Dark mode toggle persisted in IndexedDB.
  - High-contrast slate and teal palette.
  - Pure SVG icons (no emoji icons).
  - Fully responsive across mobile (375px), tablet (768px), and desktop (1024px+).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS v3 |
| **Local Database** | IndexedDB via Dexie.js (`dexie`, `dexie-react-hooks`) |
| **Offline / PWA** | Service Worker via `vite-plugin-pwa` + Workbox |
| **Icons** | Lucide React (SVG only) |
| **Cryptography** | Web Crypto API (AES-GCM 256-bit + PBKDF2) |

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v26)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/formsph.git
cd formsph

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Type check and build optimized bundle + Service Worker
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Privacy & Security Architecture

1. **No External Network Transmissions:** Form inputs and photo attachments never leave the client device.
2. **Persistent Storage API:** FormsPH calls `navigator.storage.persist()` to safeguard your IndexedDB database against automatic browser eviction.
3. **Encrypted Backups:** Password-protected backups are encrypted with 100,000 PBKDF2 iterations and AES-GCM 256-bit cipher entirely in the browser before download.

---

## 🤝 Contributing

Contributions are warmly welcomed! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, modular form architecture, and process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
