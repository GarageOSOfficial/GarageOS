# WRNC Rebrand Audit

**Generated:** 2026-07-18  
**Purpose:** Inventory of all remaining references to `GarageOS`, `Garage OS`, `garageos`, and `garage-os` across the repository.  
**Scope:** All tracked files (excluding `.git/`).  
**Action Required:** Do not modify files based on this report. This is a reference document for Phase 2 rebrand execution.

---

## Legend

| Category | Description |
|---|---|
| Documentation | Markdown and HTML content files |
| UI Text | User-visible strings in app config or Slack notifications |
| Comments | Inline code comments |
| Code Identifier | Variable names, slugs, scheme names, bundle IDs |
| Package Configuration | `package.json`, `app.json`, `package-lock.json` fields |

---

## `.github/PULL_REQUEST_TEMPLATE.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 34 | `Code follows Garage OS engineering principles` | `Code follows WRNC engineering principles` | Documentation |

---

## `.github/workflows/build-ios.yml`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 122 | `"text": "🚀 Garage OS iOS Build & TestFlight Deployment Successful"` | `"text": "🚀 WRNC iOS Build & TestFlight Deployment Successful"` | UI Text |
| 128 | `*App:* Garage OS` | `*App:* WRNC` | UI Text |
| 164 | `"text": "❌ Garage OS iOS Build Failed"` | `"text": "❌ WRNC iOS Build Failed"` | UI Text |
| 170 | `*App:* Garage OS` | `*App:* WRNC` | UI Text |

---

## `CI_CD_SETUP.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 1 | `# GitHub Actions CI/CD Setup for Garage OS` | `# GitHub Actions CI/CD Setup for WRNC` | Documentation |
| 5 | `complete GitHub Actions workflow for Garage OS iOS app builds` | `complete GitHub Actions workflow for WRNC iOS app builds` | Documentation |
| 65 | `https://github.com/GarageOSOfficial/GarageOS/settings/secrets/actions` | `https://github.com/GarageOSOfficial/WRNC/settings/secrets/actions` | Documentation |
| 81 | `Apps → Garage OS → App Information` | `Apps → WRNC → App Information` | Documentation |
| 122 | `Click "Apps" → "Garage OS"` | `Click "Apps" → "WRNC"` | Documentation |
| 154 | `https://github.com/GarageOSOfficial/GarageOS/actions` | `https://github.com/GarageOSOfficial/WRNC/actions` | Documentation |
| 168 | `https://github.com/GarageOSOfficial/GarageOS/actions` | `https://github.com/GarageOSOfficial/WRNC/actions` | Documentation |
| 296 | `**Maintained by:** GarageOS Team` | `**Maintained by:** WRNC Team` | Documentation |

---

## `CONTRIBUTING.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 1 | `# Contributing to Garage OS™` | `# Contributing to WRNC™` | Documentation |
| 3 | `engineering workflow, standards, and practices for the Garage OS development team` | `engineering workflow, standards, and practices for the WRNC development team` | Documentation |
| 20 | `These principles guide all decisions and work on Garage OS` | `These principles guide all decisions and work on WRNC` | Documentation |
| 71 | `Garage OS should feel like a native app, not a web wrapper` | `WRNC should feel like a native app, not a web wrapper` | Documentation |
| 276 | `Garage OS uses [Semantic Versioning]` | `WRNC uses [Semantic Versioning]` | Documentation |

---

## `DECISIONS.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 3 | `Permanent log of architectural decisions, patterns, and principles established for Garage OS™.` | `…established for WRNC™.` | Documentation |
| 126 | `The Vehicle Workspace is the primary working environment in Garage OS.` | `…in WRNC.` | Documentation |
| 161 | `Mission Control is the primary entry point and dashboard for Garage OS.` | `…for WRNC.` | Documentation |
| 241 | `Garage OS favors passive synchronization.` | `WRNC favors passive synchronization.` | Documentation |
| 329 | `Garage OS supports complete photo pipeline…` | `WRNC supports complete photo pipeline…` | Documentation |
| 357 | `canonical visual identity throughout Garage OS.` | `…throughout WRNC.` | Documentation |
| 386 | `Garage OS remembers the last active Vehicle Workspace tab…` | `WRNC remembers the last active Vehicle Workspace tab…` | Documentation |

---

## `FOUNDER_TESTING_BRIEFING.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 3 | `**Garage OS™ - Vehicle Build Documentation & Collaboration Platform**` | `**WRNC™ - Vehicle Build Documentation & Collaboration Platform**` | Documentation |
| 16 | `[What is Garage OS](#what-is-garage-os)` | `[What is WRNC](#what-is-wrnc)` | Documentation |
| 31 | `**Welcome to Garage OS Alpha Testing!**` | `**Welcome to WRNC Alpha Testing!**` | Documentation |
| 33 | `making Garage OS the essential tool for builders worldwide` | `making WRNC the essential tool for builders worldwide` | Documentation |
| 37 | `**Garage OS v0.1.0-alpha**` | `**WRNC v0.1.0-alpha**` | Documentation |
| 59 | `## 🏗️ WHAT IS GARAGE OS` | `## 🏗️ WHAT IS WRNC` | Documentation |
| 72 | `**Garage OS** - A single source of truth…` | `**WRNC** - A single source of truth…` | Documentation |
| 335 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 353 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 368 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 402 | `**Email:** feedback@garageos.co` | `**Email:** feedback@wrnc.app` | Documentation |
| 419 | `### For Garage OS` | `### For WRNC` | Documentation |
| 480 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/PRODUCT_GLOSSARY.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/PRODUCT_GLOSSARY.md` | Documentation |
| 481 | `Official terminology for Garage OS features` | `Official terminology for WRNC features` | Documentation |
| 483 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/DECISIONS.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/DECISIONS.md` | Documentation |
| 486 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/ROADMAP.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/ROADMAP.md` | Documentation |
| 492 | `support@garageos.co` | `support@wrnc.app` | Documentation |
| 496 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 500 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 505 | `https://raw.githubusercontent.com/GarageOSOfficial/GarageOS/main/SETUP_LINKS.html` | `https://raw.githubusercontent.com/GarageOSOfficial/WRNC/main/SETUP_LINKS.html` | Documentation |
| 506 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/CI_CD_SETUP.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/CI_CD_SETUP.md` | Documentation |
| 507 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/CONTRIBUTING.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/CONTRIBUTING.md` | Documentation |
| 541 | `support@garageos.co` | `support@wrnc.app` | Documentation |
| 542 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 543 | `feedback@garageos.co` | `feedback@wrnc.app` | Documentation |
| 547 | `https://github.com/GarageOSOfficial/GarageOS` | `https://github.com/GarageOSOfficial/WRNC` | Documentation |
| 548 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/RELEASE_READINESS_CERTIFICATION.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/RELEASE_READINESS_CERTIFICATION.md` | Documentation |
| 549 | `https://raw.githubusercontent.com/GarageOSOfficial/GarageOS/main/SETUP_LINKS.html` | `https://raw.githubusercontent.com/GarageOSOfficial/WRNC/main/SETUP_LINKS.html` | Documentation |
| 575 | `email feedback@garageos.co` | `email feedback@wrnc.app` | Documentation |
| 581 | `**Garage OS™ - Where builders build, and history is forever.**` | `**WRNC™ - Where builders build, and history is forever.**` | Documentation |

---

## `PRODUCT_GLOSSARY.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 1 | `# Garage OS™ Product Glossary` | `# WRNC™ Product Glossary` | Documentation |
| 3 | `Official terminology guide for Garage OS product language…` | `Official terminology guide for WRNC product language…` | Documentation |
| 13 | `The primary dashboard and command center of Garage OS.` | `…of WRNC.` | Documentation |
| 19 | `Describing the entry point to Garage OS` | `Describing the entry point to WRNC` | Documentation |
| 47 | `being tracked in Garage OS.` | `being tracked in WRNC.` | Documentation |
| 49 | `The primary entity managed within Garage OS.` | `…within WRNC.` | Documentation |
| 64 | `The center of Garage OS where all work on a vehicle is performed…` | `The center of WRNC where all work on a vehicle is performed…` | Documentation |
| 206 | `received Garage OS during the beta phase` | `received WRNC during the beta phase` | Documentation |
| 208 | `helped develop and refine Garage OS before public release` | `helped develop and refine WRNC before public release` | Documentation |
| 331 | `Capitalize proper product names: Garage OS™, Vehicle Workspace…` | `WRNC™, Vehicle Workspace…` | Documentation |

---

## `README.md`

> ⚠️ **Note:** The following two references are intentional — they preserve project history and are part of the Phase 1 rebrand narrative. They do **not** require replacement.

| Line | Current Text | Status |
|---|---|---|
| 3 | `WRNC is the evolution and official rebrand of GarageOS.` | ✅ Intentional — history note |
| 330 | `WRNC™ — All rights reserved. Formerly known as GarageOS.` | ✅ Intentional — history note |

---

## `RELEASE_READINESS_CERTIFICATION.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 3 | `**Garage OS™ - Repository Governance Sprint**` | `**WRNC™ - Repository Governance Sprint**` | Documentation |
| 14 | `GarageOS repository has successfully completed…` | `WRNC repository has successfully completed…` | Documentation |
| 99 | `APPLE_ID` = `admin@garageos.co` | `admin@wrnc.app` | Documentation |
| 158 | `Primary owner: @GarageOSOfficial` | `Primary owner: @GarageOSOfficial` (org name — no change needed) | Documentation |
| 310 | `**Repository:** GarageOSOfficial/GarageOS` | `**Repository:** GarageOSOfficial/WRNC` | Documentation |
| 339 | `**Maintained By:** GarageOS Governance Team` | `**Maintained By:** WRNC Governance Team` | Documentation |

---

## `ROADMAP.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 1 | `# Garage OS™ Roadmap` | `# WRNC™ Roadmap` | Documentation |
| 77 | `Full public release of Garage OS for general availability.` | `Full public release of WRNC for general availability.` | Documentation |
| 93 | `official Garage OS terminology` | `official WRNC terminology` | Documentation |

---

## `SETUP_LINKS.html`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 6 | `<title>Garage OS - Credentials Setup Links</title>` | `<title>WRNC - Credentials Setup Links</title>` | UI Text |
| 228 | `<h1>🚀 Garage OS CI/CD Setup</h1>` | `<h1>🚀 WRNC CI/CD Setup</h1>` | UI Text |
| 257 | `APPLE_ID` = `admin@garageos.co` | `admin@wrnc.app` | UI Text |
| 271 | `Sign in with: admin@garageos.co` | `Sign in with: admin@wrnc.app` | UI Text |
| 291 | `Sign in with: admin@garageos.co` | `Sign in with: admin@wrnc.app` | UI Text |
| 304 | `Sign in with: admin@garageos.co` | `Sign in with: admin@wrnc.app` | UI Text |
| 310 | `**Name:** Garage OS` | `**Name:** WRNC` | UI Text |
| 312 | `**Bundle ID:** com.garageos.mobile` | `com.wrnc.mobile` | UI Text |
| 313 | `**SKU:** garageos-mobile` | `wrnc-mobile` | UI Text |
| 339 | `https://github.com/GarageOSOfficial/GarageOS/settings/secrets/actions` | `https://github.com/GarageOSOfficial/WRNC/settings/secrets/actions` | UI Text |
| 357 | `APPLE_ID` value: `admin@garageos.co` | `admin@wrnc.app` | UI Text |
| 384 | `https://github.com/GarageOSOfficial/GarageOS/actions` | `https://github.com/GarageOSOfficial/WRNC/actions` | UI Text |
| 389 | `https://github.com/GarageOSOfficial/GarageOS/actions` | `https://github.com/GarageOSOfficial/WRNC/actions` | UI Text |
| 400 | `https://github.com/GarageOSOfficial/GarageOS/settings/secrets/actions` | `https://github.com/GarageOSOfficial/WRNC/settings/secrets/actions` | UI Text |
| 401 | `https://github.com/GarageOSOfficial/GarageOS/actions` | `https://github.com/GarageOSOfficial/WRNC/actions` | UI Text |
| 402 | `https://github.com/GarageOSOfficial/GarageOS` | `https://github.com/GarageOSOfficial/WRNC` | UI Text |
| 420 | `**Garage OS Continuous Delivery Setup**` | `**WRNC Continuous Delivery Setup**` | UI Text |
| 421 | `https://github.com/GarageOSOfficial/GarageOS/blob/main/SECRETS_SETUP_GUIDE.md` | `https://github.com/GarageOSOfficial/WRNC/blob/main/SECRETS_SETUP_GUIDE.md` | UI Text |

---

## `VEHICLE_WORKSPACE_ARCHITECTURE.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 3 | `the center of the Garage OS application.` | `the center of the WRNC application.` | Documentation |
| 43 | `Garage OS favors passive synchronization:` | `WRNC favors passive synchronization:` | Documentation |
| 69 | `Garage OS supports a complete photo pipeline:` | `WRNC supports a complete photo pipeline:` | Documentation |
| 81 | `Garage OS remembers the last active Vehicle Workspace tab…` | `WRNC remembers the last active Vehicle Workspace tab…` | Documentation |
| 91 | `canonical visual identity of that build throughout Garage OS:` | `…throughout WRNC:` | Documentation |
| 262 | `**Garage OS supports:**` | `**WRNC supports:**` | Documentation |

---

## `VEHICLE_WORKSPACE_WIREFRAME.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 257 | `│ Garage OS  [Logo]` (wireframe label) | `│ WRNC  [Logo]` | Documentation |

---

## `WHY_THIS_SCREEN_EXISTS.md`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 2 | `## Vehicle Workspace: The Heart of Garage OS` | `## Vehicle Workspace: The Heart of WRNC` | Documentation |
| 34 | `## How It Supports Garage OS Mission` | `## How It Supports WRNC Mission` | Documentation |
| 91 | `### For the Garage OS Ecosystem` | `### For the WRNC Ecosystem` | Documentation |

---

## `app.json`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 3 | `"name": "Garage OS"` | `"name": "WRNC"` | Package Configuration |
| 4 | `"slug": "garage-os"` | `"slug": "wrnc"` | Package Configuration |
| 23 | `"bundleIdentifier": "com.garageos.mobile"` | `"bundleIdentifier": "com.wrnc.mobile"` | Code Identifier |
| 31 | `"package": "com.garageos.mobile"` | `"package": "com.wrnc.mobile"` | Code Identifier |
| 42 | `Allow Garage OS to access your photos…` | `Allow WRNC to access your photos…` | UI Text |
| 43 | `Allow Garage OS to access your camera…` | `Allow WRNC to access your camera…` | UI Text |
| 53 | `"scheme": "garageos"` | `"scheme": "wrnc"` | Code Identifier |

---

## `package.json`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 2 | `"name": "garage-os"` | `"name": "wrnc"` | Package Configuration |
| 4 | `"description": "Garage OS - Vehicle Build Documentation & Collaboration Platform"` | `"description": "WRNC - Vehicle Build Documentation & Collaboration Platform"` | Package Configuration |

---

## `package-lock.json`

| Line | Current Text | Recommended Replacement | Category |
|---|---|---|---|
| 2 | `"name": "garage-os"` | `"name": "wrnc"` | Package Configuration |
| 8 | `"name": "garage-os"` | `"name": "wrnc"` | Package Configuration |
| 10 | `"description": "Garage OS - Vehicle Build Documentation & Collaboration Platform"` | `"description": "WRNC - Vehicle Build Documentation & Collaboration Platform"` | Package Configuration |

> ⚠️ **Note:** `package-lock.json` is auto-generated. Changes to `package.json` will propagate here automatically when `npm install` is run. Do not edit `package-lock.json` manually.

---

## Summary

| Category | File Count | Reference Count |
|---|---|---|
| Documentation | 13 | ~80 |
| UI Text | 3 | ~22 |
| Code Identifier | 1 | 3 |
| Package Configuration | 2 (+ 1 auto-gen) | 5 |
| **Total** | **~17 files** | **~110 references** |

---

## Phase 2 Execution Order (Recommended)

1. **`package.json`** — rename package; run `npm install` to regenerate lock file
2. **`app.json`** — update name, slug, bundle ID, scheme, and permission strings
3. **`.github/workflows/build-ios.yml`** — update Slack notification strings
4. **All `.md` documentation files** — bulk find-and-replace `Garage OS` → `WRNC`, `GarageOS` → `WRNC`
5. **`SETUP_LINKS.html`** — update title, headings, URLs, and email addresses
6. **Email addresses** — confirm new domain (`wrnc.app`) before replacing `garageos.co`
7. **Bundle IDs / scheme** — coordinate with App Store Connect and Google Play before changing
