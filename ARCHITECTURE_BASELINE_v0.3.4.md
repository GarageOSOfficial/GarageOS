# Architecture Baseline v0.3.4

**Status:** APPROVED - ARCHITECTURE FREEZE
**Date:** 2026-07-13
**Approved By:** GarageOSOfficial
**Phase:** Founder Testing Alpha

---

## Overview

This document formally freezes the Architecture Baseline for Garage OS™ at version **v0.3.4**. No architectural changes may be made without explicit CTO approval. This baseline defines the locked decisions, component inventory, and system constraints that govern all development during and beyond the Founder Testing Alpha phase.

All engineering work must reference this document and the associated locked decisions in `DECISIONS.md`.

---

## Baseline Freeze Rationale

The Architecture Baseline v0.3.4 is frozen because:

1. **Alpha Readiness** — The system has reached sufficient maturity to begin Founder Testing. Architectural volatility at this stage would introduce instability incompatible with user-facing validation.
2. **Decision Stability** — Eleven core architectural decisions have been logged, debated, and locked in `DECISIONS.md`. These represent the final, approved architecture for the v0.3 release line.
3. **Consistency Requirement** — All documentation, workflows, and engineering tasks must align to a fixed architectural reference. A moving baseline prevents reliable release assessment.
4. **Activity-First Model Validation** — The core Activity-as-source-of-truth model has been validated and must not be redesigned during alpha.

---

## Locked Decisions

The following decisions from `DECISIONS.md` are locked under this baseline. No changes without CTO approval.

| Decision | Title | Status |
|----------|-------|--------|
| Decision #1 | Activities Are the Single Source of Truth | **LOCKED** |
| Decision #2 | Archive. Never Delete. | **LOCKED** |
| Decision #3 | Vehicle Workspace is Center of Application | **LOCKED** |
| Decision #4 | Mission Control is the Dashboard | **LOCKED** |
| Decision #5 | Activity Presentation Rules | **LOCKED** |
| Decision #6 | Passive Synchronization Philosophy | **LOCKED** |
| Decision #7 | Documentation Score Versioning | **LOCKED** |
| Decision #8 | Inline Edit Mode for Vehicle Details | **LOCKED** |
| Decision #9 | Photo Pipeline Requirements | **LOCKED** |
| Decision #10 | Hero Photo Canonical Rule | **LOCKED** |
| Decision #11 | Vehicle Workspace State Restoration | **LOCKED** |

---

## Component Inventory and Status

| Component | Description | Status |
|-----------|-------------|--------|
| **Vehicle Workspace** | Core workspace screen; center of application per Decision #3 | ✅ FROZEN |
| **Activity Engine** | Immutable activity recording per Decision #1 | ✅ FROZEN |
| **Mission Control** | Dashboard hub per Decision #4 | ✅ FROZEN |
| **Photo Pipeline** | Hero photo and photo rules per Decisions #9 and #10 | ✅ FROZEN |
| **Inline Edit Mode** | Vehicle detail editing per Decision #8 | ✅ FROZEN |
| **Archive System** | Soft-delete via archive per Decision #2 | ✅ FROZEN |
| **Documentation Score** | Versioned completeness scoring per Decision #7 | ✅ FROZEN |
| **Passive Sync** | Background synchronization per Decision #6 | ✅ FROZEN |
| **State Restoration** | Workspace state persistence per Decision #11 | ✅ FROZEN |
| **CI/CD Pipeline** | EAS Build → TestFlight automated delivery | ✅ FROZEN |

---

## Technology Stack (Frozen)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React Native (Expo) | Managed workflow |
| Language | TypeScript | Strict mode |
| Styling | NativeWind (Tailwind CSS) | v4 |
| Navigation | Expo Router | File-based routing |
| State Management | React Query (TanStack) | Server state |
| Local Storage | AsyncStorage + SQLite | Via Expo |
| Build / Delivery | EAS Build + EAS Submit | TestFlight |
| CI/CD | GitHub Actions | `build-ios.yml` |
| Bundle ID | `com.garageos.mobile` | Fixed |
| App Version | 0.1.0 | Semver |
| EAS Project ID | `c7cfc85b-904f-4d2a-8fbb-1aec8f51aecb` | Fixed |

---

## Architectural Constraints (Frozen)

1. **No deletion of user data** — All data operations must use archive pattern.
2. **Activities are immutable** — No editing or deletion of activity records.
3. **Vehicle Workspace is the entry point** — Navigation must route through workspace.
4. **Photos require pipeline validation** — No direct photo writes bypassing pipeline.
5. **Documentation Score is additive** — Score must increase monotonically per version.
6. **Synchronization is passive** — No blocking sync operations in UI thread.
7. **State restoration is mandatory** — Workspace must restore to last known state.

---

## What Is NOT Frozen

The following areas remain open for iteration during alpha:

- UI styling and visual polish
- Performance optimizations within frozen component boundaries
- Bug fixes that do not change architectural contracts
- Documentation improvements
- Test coverage additions
- CI/CD reliability improvements (not structure changes)

---

## Change Control Process

Any proposed change to a locked decision or frozen component requires:

1. Written proposal referencing the affected decision number
2. CTO review and written approval
3. Updated entry in `DECISIONS.md` with new status
4. Version bump of this document (e.g., v0.3.5)

**DO NOT modify this document or `DECISIONS.md` without following this process.**

---

## References

- `DECISIONS.md` — Full decision log with rationale and implications
- `VEHICLE_WORKSPACE_ARCHITECTURE.md` — Component hierarchy and data flow
- `CONTRIBUTING.md` — Engineering principles and contribution standards
- `ROADMAP.md` — Release milestones and future phases
- `PRODUCT_GLOSSARY.md` — Canonical terminology

---

*Architecture Baseline v0.3.4 — APPROVED — ARCHITECTURE FREEZE*
