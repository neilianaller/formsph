# Contributing to GovFormsPH

Thank you for your interest in contributing to **GovFormsPH**! GovFormsPH is an open-source, offline-first, privacy-first Progressive Web App (PWA) form builder created for Philippine civil servants and government workers.

---

## 🛡️ Core Rules & Philosophy

1. **Client-Side Only (Non-Negotiable):**
   - No backend servers, no cloud sync, and no third-party telemetry/analytics transmitting personal information.
   - All forms must persist in IndexedDB via `Dexie.js`.
2. **Accessible & Responsive:**
   - Light mode is default with dark mode toggle.
   - High contrast ratios (WCAG AAA/AA).
   - Responsive across mobile (375px), tablet (768px), and desktop (1024px+).
   - Zero emojis as UI icons — SVG icons only (via `lucide-react`).
3. **Official Form Verification:**
   - Form schemas must be verified against official Philippine Civil Service Commission (CSC) or government agency templates (e.g. CS Form No. 212 Revised 2026).

---

## 🏗️ Project Architecture

```
src/
├── components/
│   ├── common/         # Button, Card, Modal, DateInput, PhotoUploader, SignaturePad, etc.
│   └── layout/         # Navbar, Footer, UpdateBanner, ExportReminderBanner
├── forms/
│   └── pds/            # CS Form 212 module (Sections 1–11, Print Preview)
├── db/
│   ├── db.ts           # Dexie IndexedDB schemas & migrations
│   └── defaultPdsData.ts # Default templates & empty row factories
├── hooks/              # useTheme, usePwaInstall, useStoragePersistence
├── pages/              # Dashboard, Export/Import, Install, Privacy, About
├── types/              # TypeScript definitions for forms & app state
└── utils/              # Client-side AES-GCM crypto, date formatting, export/import
```

---

## ➕ Adding a New Form Module (e.g. SALN, DTR, Leave Application)

1. **Define Schema & Types:**
   Create a new type file in `src/types/<formType>.ts`.
2. **Update Dexie Schema:**
   Add a new table in `src/db/db.ts` under a new `db.version(N)`.
3. **Create Modular Form Directory:**
   Create `src/forms/<formType>/` containing section editors and a print-preview layout.
4. **Register in Form Catalog:**
   Add the new template to `src/pages/DashboardPage.tsx`.

---

## 🧪 Development Workflow

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run TypeScript check and production build
npm run build
```

---

## 📄 License

By contributing to GovFormsPH, you agree that your contributions will be licensed under the [MIT License](LICENSE).
