# Changelog — Garage OS™

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Architecture references follow **Architecture Baseline v0.3.4**.

---

## [Unreleased]

### Added
- ARCHITECTURE_BASELINE_v0.3.4.md — Formal architecture freeze document
- .github/CODEOWNERS — Code review ownership configuration
- .github/ISSUE_TEMPLATE/bug_report.yml — Bug report template
- .github/ISSUE_TEMPLATE/feature_request.yml — Feature request template
- .github/ISSUE_TEMPLATE/config.yml — Issue template configuration
- CHANGELOG.md — This file
- ALPHA_RELEASE_BOARD.md — Alpha release tracking board

### Changed
- .github/workflows/build-ios.yml — Added APPLE_TEAM_ID, ASC_APP_ID to submit-testflight; added Slack success and failure notifications

---

## [0.1.0-alpha] — TBD (Founder Testing)

### Added
- Initial Founder Testing Alpha release
- Vehicle Workspace — Core workspace screen (Decision #3)
- Activity Engine — Immutable activity recording (Decision #1)
- Mission Control — Dashboard hub (Decision #4)
- Photo Pipeline — Hero photo management (Decisions #9, #10)
- Inline Edit Mode — Vehicle detail editing (Decision #8)
- Archive System — Soft-delete via archive (Decision #2)
- Documentation Score — Versioned completeness tracking (Decision #7)
- Passive Sync — Background synchronization (Decision #6)
- State Restoration — Workspace state persistence (Decision #11)
- EAS Build + TestFlight CI/CD pipeline
- ESLint, TypeScript, Jest test infrastructure

---

<!-- Links for diff comparison -->
[Unreleased]: https://github.com/GarageOSOfficial/GarageOS/compare/v0.1.0-alpha...HEAD
[0.1.0-alpha]: https://github.com/GarageOSOfficial/GarageOS/releases/tag/v0.1.0-alpha
