# FormsPH — General Instructions

## 1. Project Overview

**FormsPH** is an offline-first, privacy-first Progressive Web App (PWA) form builder/filler. All data is stored **locally on the user's device only** — no backend, no cloud sync, no analytics that transmit personal data. It targets Philippine government employees first, starting with the **PDS (Personal Data Sheet, CS Form No. 212)**, with future forms planned (DTR, SALN, Leave Application, Service Record, etc.).

This project will be **open source**. Code, structure, and docs should be clean enough for external contributors to read and extend.

**Core promise to users:** "Your data never leaves your device unless you choose to export it."

---

## 2. Tech Stack

- **Framework:** React + Vite
- **Offline:** Service Worker via Workbox (precache app shell, versioned cache)
- **Local storage:** IndexedDB via Dexie.js (do NOT use localStorage — 5MB cap, sync-only, not fit for structured form data)
- **Styling:** Tailwind CSS (html-tailwind stack)
- **Icons:** Lucide or Heroicons (SVG only — never emoji as UI icons)
- **PWA:** Web App Manifest + `beforeinstallprompt` handling
- **License:** MIT (default recommendation — confirm with project owner before finalizing)

---

## 3. UI/UX Direction

Use the `ui-ux-pro-max` skill to generate the design system before writing UI code:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "government form builder privacy productivity" --design-system -p "FormsPH"
```

Then supplement with:
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux
python3 skills/ui-ux-pro-max/scripts/search.py "layout responsive form" --stack html-tailwind
```

### Theme rules
- **Light mode is default.** Dark mode is a toggle (persist choice in IndexedDB/localStorage setting, not just CSS media query).
- Palette: **mainly white and black** — but never pure `#000000` on pure `#FFFFFF`. Use near-black (e.g. `#0F172A` / slate-900) for text/dark surfaces, and off-white (e.g. `#FAFAFA` / `#F8FAFC`) for light surfaces. Accent color: pick one restrained accent (e.g. a muted blue or green) for primary actions only — keep the rest strictly grayscale.
- No emoji as icons — SVG only.
- All clickable elements: `cursor-pointer`, visible hover/focus states, no layout-shifting hover transforms.
- Responsive at 375px, 768px, 1024px, 1440px. No horizontal scroll on mobile.
- Respect `prefers-reduced-motion`.
- Floating navbar/elements should have edge spacing (not flush to viewport edges).

---

## 4. App Structure / Pages

1. **Home / Dashboard** — list of saved forms/drafts, "New Form" entry point.
2. **Form Builder/Filler (PDS)** — the actual PDS form, multi-section, autosave to IndexedDB as user types and with progress bar.
3. **Quick Tour**
   - Auto-triggers on first app open (check a `hasSeenTour` flag in local storage/IndexedDB).
   - Step-by-step overlay/spotlight highlighting: where forms are saved, how export/import works, install button, privacy page.
   - Must be skippable.
   - Add a persistent **"Replay Quick Tour"** button/menu item (e.g. in Settings or About page) so users can re-trigger it anytime.
4. **Export / Import**
   - Export: bundle all user's saved forms + settings into a single downloadable file (JSON, optionally encrypted/password-protected — decide based on sensitivity of PDS data).
   - Import: let user pick an exported file to restore data on a new device/browser.
   - Clearly label this as the way to move data between devices (since there's no cloud).
5. **Install App page**
   - Dedicated page (not just a banner) explaining **"Why Install"**:
     - Works fully offline once installed
     - Faster load (no browser chrome/address bar)
     - Home screen / app-drawer icon like a native app
     - Data persistence is more reliable when installed (ties into `navigator.storage.persist()` heuristics)
     - No app store, no install size bloat
   - Trigger native install prompt via captured `beforeinstallprompt` event; on iOS/Safari (no prompt support), show manual "Add to Home Screen" instructions instead.
6. **Privacy page**
   - Explain, plainly: no servers, no accounts, no analytics that leave the device, all data in browser's local storage (IndexedDB), user controls export/deletion, open source (link to repo so users/devs can verify claims themselves).
7. **About page**
   - App version number (pull from `package.json` at build time, don't hardcode).
   - Main features list (offline-first, local-only storage, export/import, PDS support, open source).
   - Link to GitHub repo, license, changelog.

---

## 5. Offline & Persistence Behavior

- Service worker precaches app shell on first load; subsequent loads work with zero network.
- On update: new SW installs in background → show in-app banner **"There's a new version of the app"** with a refresh/update action → `postMessage({type:'SKIP_WAITING'})` → reload. Bump cache name each release to purge stale assets.
- Call `navigator.storage.persist()` on app load; check `navigator.storage.persisted()` and reflect status in Privacy/About page (e.g. "Storage persistence: Granted/Not granted").
- Since manual "Clear browsing data" can still wipe IndexedDB, **actively encourage periodic export** (e.g. gentle reminder if last export was >30 days ago, dismissible).

---

## 6. Data Handling Rules (Non-negotiable)

- No network calls that transmit form field data, ever.
- No third-party analytics/trackers by default. If analytics are added later, they must be privacy-preserving, local-only, or opt-in and disclosed on the Privacy page.
- All persistence via IndexedDB (Dexie.js). Schema should be versioned (Dexie's built-in versioning) to allow safe migrations as new forms are added.
- Export files should be human-portable (JSON) and ideally support round-trip import without data loss.

---

## 7. Open Source Readiness

- Include `README.md` (project description, screenshots, setup instructions, tech stack, privacy stance), `LICENSE`, `CONTRIBUTING.md`, and `.env.example` if any env vars exist (should be minimal/none given no backend).
- Keep components modular per form (e.g. `forms/PDS/`) so future forms (DTR, SALN, etc.) can be added as self-contained modules without touching core app shell/storage logic.
- Write code comments assuming an external contributor with no prior context will read it.

---

## 8. PDS Data Schema (CS Form No. 212, Revised 2026 — verified against official xlsx)

This schema is verified against the actual **CS Form No. 212 (Revised 2026)** official file, item numbers 1–42 across pages 1–4. Note the 2026 revision uses **dd/mm/yyyy** for most dates (personal info, work experience, trainings, voluntary work), but **yyyy-only (year)** for the education "Period of Attendance" fields — don't apply dd/mm/yyyy uniformly.

Suggested Dexie.js table structure — one PDS "record" per saved form, with nested arrays for repeatable sections:

```js
// Dexie schema (db.js)
db.version(1).stores({
  pdsRecords: '++id, updatedAt', // top-level record index
});
```

Each `pdsRecords` row stores a JSON object shaped like:

```js
{
  id: 1,
  meta: { createdAt: '', updatedAt: '', formVersion: 'CS-Form-212-2026' },

  // I. PERSONAL INFORMATION (items 1-21)
  personalInfo: {
    surname: '', firstName: '', middleName: '', nameExtension: '',
    dateOfBirth: '', // dd/mm/yyyy
    placeOfBirth: '', sexAtBirth: '',
    civilStatus: '', // Single | Married | Widow/er | Separated | Solo Parent | Others
    civilStatusOthersSpecify: '',
    height: '', weight: '', bloodType: '',
    umidIdNo: '', pagIbigIdNo: '', philhealthNo: '',
    philSysCardNumber: '', // PCN, item 13
    tinNo: '', agencyEmployeeNo: '',
    citizenship: '', isDualCitizen: null, dualCitizenshipCountry: '',
    residentialAddress: { houseBlockLot: '', street: '', subdivisionVillage: '', barangay: '', cityMunicipality: '', province: '', zipCode: '' },
    permanentAddress: { houseBlockLot: '', street: '', subdivisionVillage: '', barangay: '', cityMunicipality: '', province: '', zipCode: '' },
    telephoneNo: '', mobileNo: '', emailAddress: '',
  },

  // II. FAMILY BACKGROUND (items 22-25)
  familyBackground: {
    spouse: { surname: '', firstName: '', middleName: '', nameExtension: '', occupation: '', employerBusinessName: '', businessAddress: '', telephoneNo: '' },
    children: [ { fullName: '', dateOfBirth: '' } ], // repeatable, item 23
    father: { surname: '', firstName: '', middleName: '', nameExtension: '' },
    mother: { maidenSurname: '', firstName: '', middleName: '' },
  },

  // III. EDUCATIONAL BACKGROUND (item 26) — Period of Attendance is YEAR ONLY (yyyy), not full date
  education: {
    elementary: { nameOfSchool: '', degreeCourse: '', periodFromYear: '', periodToYear: '', highestLevelUnitsEarned: '', yearGraduated: '', scholarshipAcademicHonors: '' },
    secondary: { /* same shape */ },
    vocationalTrade: [ /* array, same shape, repeatable */ ],
    college: [ /* array, same shape, repeatable */ ],
    graduateStudies: [ /* array, same shape, repeatable */ ],
  },

  // IV. CIVIL SERVICE ELIGIBILITY (item 27)
  eligibility: [
    { careerServiceRA1080OrSpecialLaw: '', rating: '', dateOfExamConferment: '', placeOfExamConferment: '', licenseNumber: '', licenseValidityDate: '' }
  ],

  // V. WORK EXPERIENCE (item 28) — dd/mm/yyyy dates; duties go in separate "Work Experience Sheet" attachment
  workExperience: [
    { inclusiveDatesFrom: '', inclusiveDatesTo: '', positionTitle: '', departmentAgencyOfficeCompany: '', monthlySalary: '', salaryJobPayGradeStepIncrement: '', statusOfAppointment: '', isGovernmentService: null }
  ],

  // VI. LEARNING AND DEVELOPMENT / TRAINING PROGRAMS (item 29) — dd/mm/yyyy dates
  trainings: [
    { title: '', inclusiveDatesFrom: '', inclusiveDatesTo: '', numberOfHours: '', typeOfLD: '', conductedSponsoredBy: '' }
  ],

  // VII. VOLUNTARY WORK (item 30) — dd/mm/yyyy dates
  voluntaryWork: [
    { organizationNameAddress: '', inclusiveDatesFrom: '', inclusiveDatesTo: '', numberOfHours: '', positionNatureOfWork: '' }
  ],

  // VIII. OTHER INFORMATION (items 31-33)
  otherInfo: {
    specialSkillsHobbies: [''],
    nonAcademicDistinctions: [''],
    membershipInAssociations: [''],
  },

  // BACKGROUND QUESTIONS (items 34-40) — tri-state answer: true | false | null (unanswered)
  backgroundQuestions: {
    relatedWithinThirdDegree: { answer: null, details: '' },              // 34a
    relatedWithinFourthDegreeLGU: { answer: null, details: '' },          // 34b
    foundGuiltyOfAdminOffense: { answer: null, details: '' },             // 35a
    criminallyChargedInCourt: { answer: null, details: '', dateFiled: '', statusOfCase: '' }, // 35b
    convictedOfCrimeOrViolation: { answer: null, details: '' },           // 36
    separatedFromService: { answer: null, details: '' },                 // 37
    candidateInNationalLocalElection: { answer: null, details: '' },     // 38a
    resignedToCampaignForCandidate: { answer: null, details: '' },       // 38b
    immigrantOrPermanentResidentAbroad: { answer: null, country: '' },   // 39
    indigenousGroupMember: { answer: null, specify: '' },                // 40a
    personWithDisability: { answer: null, pwdIdNo: '' },                 // 40b
    soloParent: { answer: null, soloParentIdNo: '' },                    // 40c
  },

  // REFERENCES (item 41) — persons not related by consanguinity/affinity
  references: [
    { name: '', officeResidentialAddress: '', contactNoOrEmail: '' }
  ],

  // DECLARATION & SIGNATORIES (item 42)
  declaration: {
    governmentIssuedId: '', idLicensePassportNo: '', dateOfIssuance: '', placeOfIssuance: '',
    idPhoto: null,       // 4.5cm x 3.5cm, Blob in IndexedDB only
    signature: null,     // Blob/base64, e-signature or digital certificate
    rightThumbmark: null,
    dateAccomplished: '',
  },
}
```

### Notes for the coding agent
- Tri-state `answer: null` (not just boolean) lets the UI flag unanswered required questions vs. explicit "No".
- Repeatable sections (children, education rows, eligibility, work experience, trainings, voluntary work, references) need dynamic add/remove row UI, backed by arrays.
- **Two date formats coexist** — dd/mm/yyyy almost everywhere, but plain year (yyyy) for education "Period of Attendance." Don't build one shared date component assuming one format; make the education period fields year-only inputs.
- Note items 10-13 in personal info: the 2026 revision uses **UMID ID No., Pag-IBIG ID No., PhilHealth No., and PhilSys Card Number (PCN)** — there's no separate GSIS/SSS number field (UMID and PhilSys effectively cover that now). Don't assume the older 2017-era GSIS/SSS fields still apply.
- Photo/signature/thumbmark: store as Blob in IndexedDB only (never uploaded); Blob is more storage-efficient than base64 for images.
- Use Dexie's schema versioning (`db.version(2).stores(...)`) if/when the PDS form is revised again, so existing users' data migrates instead of breaking.
- The official form also references a separate **"Work Experience Sheet"** attachment for describing duties per role — consider whether to model that as an additional field on each `workExperience` row (e.g. `dutiesDescription`) or keep it a distinct linked sub-form.

---

## 9. Build Order (Suggested)

1. Scaffold Vite + React + Tailwind + PWA plugin
2. Set up Dexie.js schema for PDS form data
3. Build PDS form UI (sections, validation, autosave)
4. Service worker + install prompt handling + update banner
5. Export/Import feature
6. Quick Tour overlay + replay entry point
7. Install App, Privacy, About pages
8. Light/dark theme toggle
9. Open source scaffolding (README, LICENSE, CONTRIBUTING)
