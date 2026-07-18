# Architecture Review v1

**Repository:** GarageOSOfficial/WRNC  
**Reviewed:** 2026-07-18  
**Stack:** React Native · Expo Router · Zustand · TanStack React Query · NativeWind · Supabase (planned)  
**App Version:** 0.1.0 (pre-implementation — no source code exists yet)  
**Reviewer:** Copilot Architecture Agent

---

## Executive Summary

WRNC is currently in a documentation-only state. Every source directory (`app/`, `components/`, `lib/`, `supabase/`, `scripts/`) contains only a `.gitkeep` placeholder. The architecture exists entirely in design documents: ADRs, component trees, wireframes, and product specs. This is an ideal time to establish structural conventions because nothing needs to be refactored; all decisions can be made correctly from the start.

The planned design is directionally sound. The core model — immutable Activities as the single source of truth, passive React Query synchronisation, a per-vehicle workspace hierarchy — is well-matched to the chosen stack. However, several structural issues, naming questions, and dependency gaps exist that will create friction during implementation if not resolved now.

---

## 1. Folder Structure

### Current State

```
/
├── app/              ← empty (.gitkeep)
├── components/       ← empty (.gitkeep)
├── lib/              ← empty (.gitkeep)
├── supabase/         ← empty (.gitkeep)
├── scripts/          ← empty (.gitkeep)
├── assets/           ← icons and fonts only
├── design/           ← mockups, wireframes, user-flows (good)
├── docs/             ← api, architecture, database, product, roadmap, testing, ux (good)
├── branding/
├── marketing/
│
├── DECISIONS.md                        ← root-level
├── ROADMAP.md                          ← root-level
├── PRODUCT_GLOSSARY.md                 ← root-level
├── VEHICLE_WORKSPACE_*.md (×5)         ← root-level
├── IMPLEMENTATION_PLAN_V0.3.md         ← root-level
├── CI_CD_SETUP.md                      ← root-level
├── CONTRIBUTING.md                     ← root-level
├── ...
```

### Strengths

- `docs/` subdirectory structure (`api/`, `architecture/`, `database/`, `product/`, `roadmap/`, `testing/`, `ux/`) maps well to the eventual content needs.
- `design/` correctly separates visual artefacts from code.
- `@/*` path alias is configured in `tsconfig.json` for clean imports.

### Weaknesses

- **Fifteen architecture and product documents live at the repository root.** `DECISIONS.md`, `ROADMAP.md`, `PRODUCT_GLOSSARY.md`, and all five `VEHICLE_WORKSPACE_*.md` files belong inside `docs/`. Root clutter scales poorly as the project grows.
- **`lib/` has no defined charter.** It is unclear whether it will hold Supabase client config, shared utilities, type definitions, API abstractions, or all of the above.
- **No `hooks/`, `stores/`, `types/`, or `constants/` directories exist** or are referenced in the design documents.
- **`supabase/supabase-js` is not in `package.json` dependencies.** The entire data layer depends on Supabase, but the client library is not installed.
- **`axios` is in dependencies.** With Supabase's built-in client and React Query, axios is redundant and adds bundle weight.

### Recommendations

| Priority | Action |
|---|---|
| **High** | Install `@supabase/supabase-js`. This is a required dependency that is currently missing. |
| **High** | Define the `lib/` charter before implementation begins. Suggested structure: `lib/supabase/` (client + typed helpers), `lib/api/` (query/mutation factories). |
| **High** | Create `hooks/`, `stores/`, and `types/` directories with index files so import paths are established before components are written. |
| **Medium** | Move `DECISIONS.md`, `ROADMAP.md`, `PRODUCT_GLOSSARY.md`, and all `VEHICLE_WORKSPACE_*.md` files into `docs/`. Keep only `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, and `LICENSE` at root — the standard OSS root convention. |
| **Medium** | Remove `axios`. Supabase's client covers all data operations; React Query manages caching. |
| **Low** | Add a `constants/` directory for route names, query key factories, and config values. |

---

## 2. Route Organization

### Current Planned Structure (from `VEHICLE_WORKSPACE_ARCHITECTURE.md`)

```
/mission-control
/vehicle/:vehicleId
  ?tab=overview
  ?tab=photos
  ?tab=about
  /timeline
  /activity/new
```

### Strengths

- The separation of Mission Control (overview) from Vehicle Workspace (work context) is architecturally correct and well-justified in DECISIONS.md (Decisions #3, #4).
- Having Timeline as a dedicated route rather than a tab is a sound decision for a feature that will grow in complexity.

### Weaknesses

- **Query-parameter tabs are a web pattern.** In Expo Router, query params for tab state is valid but loses the benefits of Expo Router's typed routing, deep linking, and back-navigation stack management. Native users expect the back gesture to navigate out of the workspace, not through internal tab history.
- **The route structure does not accommodate planned future features.** Garage, Parts/Inventory, Maintenance, Documents, and Build Passport are roadmap items (v0.5–v0.8) but have no reserved route slots. Adding them later will require restructuring routes mid-project.
- **No top-level tab navigator is defined.** Expo Router applications of this type typically use a `(tabs)` group for the top-level shell (Mission Control, profile, settings), which establishes the persistent bottom navigation bar.
- **No authentication route group is defined.** Sign-in and onboarding screens need a separate `(auth)` group to prevent authenticated layout from wrapping them.

### Recommended Route Structure

```
app/
├── (auth)/
│   ├── _layout.tsx         ← unauthenticated shell
│   ├── sign-in.tsx
│   └── onboarding.tsx
│
├── (app)/
│   ├── _layout.tsx         ← authenticated shell + auth guard
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx     ← bottom tab navigator
│   │   └── index.tsx       ← Mission Control (home tab)
│   │
│   └── vehicle/
│       └── [vehicleId]/
│           ├── _layout.tsx             ← VehicleWorkspaceContainer
│           ├── (tabs)/
│           │   ├── _layout.tsx         ← workspace tab navigator
│           │   ├── index.tsx           ← Overview tab
│           │   ├── photos.tsx          ← Photos tab
│           │   ├── about.tsx           ← About tab
│           │   ├── parts.tsx           ← Parts/Inventory (v0.5)
│           │   ├── maintenance.tsx     ← Maintenance (future)
│           │   ├── documents.tsx       ← Documents (v0.7)
│           │   └── budget.tsx          ← Budget (v0.6)
│           ├── timeline.tsx            ← Timeline (full-screen)
│           ├── activity/
│           │   └── new.tsx             ← New Activity
│           └── build-passport.tsx      ← Build Passport (v0.8)
│
└── _layout.tsx             ← root layout (fonts, providers)
```

This structure:
- Uses Expo Router file-based routing natively (no manual `Stack.Screen` registration)
- Makes all workspace tabs proper routes with deep-linking support
- Reserves slots for every roadmap feature without future restructuring
- Separates authenticated and unauthenticated shells cleanly

### Recommendations

| Priority | Action |
|---|---|
| **High** | Replace `?tab=` query-param pattern with nested Expo Router tab groups inside `vehicle/[vehicleId]/(tabs)/`. |
| **High** | Create `(auth)/` and `(app)/` route groups before writing any screens. |
| **High** | Reserve route files for all v0.5–v0.8 roadmap features now, even if they render a placeholder screen initially. |
| **Medium** | Use Expo Router's `<Tabs />` component with `href: null` to hide unbuilt tabs from the navigator while keeping their route files in place. |

---

## 3. Component Organization

### Current State

`components/` is empty. The component hierarchy is defined in `VEHICLE_WORKSPACE_COMPONENT_TREE.md` only.

### Strengths

- The planned component tree is well-decomposed. Container/Layout/UI separation is clear.
- Component responsibilities are documented with inputs, outputs, and state.
- The distinction between page-level containers and presentational components follows React best practices.

### Weaknesses

- **No co-location strategy is defined.** Components can either live in a flat `components/` directory, be co-located with their routes, or be split by feature. Without a stated strategy, contributors will make inconsistent choices.
- **The planned component tree does not address shared/primitive UI.** Buttons, inputs, modals, badges, and skeleton loaders are not in the tree but will be needed across every feature.
- **`ActionMenu` contains four sub-modals** (Edit, Share, Archive, Delete) that are better as standalone modal route screens or bottom sheets, not nested component children.
- **No story or isolation environment.** Without Storybook or similar, shared UI components are difficult to develop and review independently.

### Recommended Component Structure

```
components/
├── ui/                     ← primitive, brand-agnostic components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Skeleton.tsx
│   ├── Toast.tsx
│   └── index.ts
│
├── vehicle/                ← Vehicle Workspace feature components
│   ├── WorkspaceHeader.tsx
│   ├── DocumentationScore.tsx
│   ├── ActivityItem.tsx
│   ├── PhotoGrid.tsx
│   ├── PhotoLightbox.tsx
│   └── index.ts
│
├── layout/                 ← structural layout components
│   ├── SafeScreen.tsx
│   ├── TabBar.tsx
│   └── index.ts
│
└── providers/              ← app-level React context providers
    ├── AuthProvider.tsx
    ├── QueryProvider.tsx
    └── index.ts
```

### Recommendations

| Priority | Action |
|---|---|
| **High** | Establish the `components/ui/`, `components/vehicle/`, and `components/layout/` split before writing any components. Document it in `CONTRIBUTING.md`. |
| **Medium** | Move `ActionMenu` sub-modals to dedicated route-based modal screens (`/vehicle/[vehicleId]/modal/archive`, etc.) using Expo Router's modal presentation. |
| **Medium** | Co-locate highly feature-specific components (e.g., `PhotoLightbox`) with their parent route directory rather than the global `components/` folder. |
| **Low** | Consider adding Storybook for component isolation, especially for the `components/ui/` layer. |

---

## 4. Services Layer

### Current State

No services layer exists. `lib/` and `supabase/` are empty.

### Weaknesses

- **`@supabase/supabase-js` is not installed.** The entire backend integration is blocked.
- **No Supabase client initialisation file exists.** Every query hook will need to initialise or import the client independently without a shared singleton.
- **No typed Supabase schema.** Supabase can generate TypeScript types from the database schema via `supabase gen types typescript`. Without this, all database queries are untyped.
- **No API abstraction layer.** Without a services layer between React Query hooks and raw Supabase calls, query logic will be duplicated or embedded directly in hooks, making it harder to mock for testing.

### Recommended Services Structure

```
lib/
├── supabase/
│   ├── client.ts           ← singleton Supabase client
│   ├── types.ts            ← generated DB types (supabase gen types typescript)
│   └── index.ts
│
├── api/
│   ├── vehicles.ts         ← vehicle CRUD operations
│   ├── activities.ts       ← activity CRUD operations
│   ├── photos.ts           ← photo upload/fetch operations
│   └── index.ts
│
└── index.ts
```

Query hooks in `hooks/` then call `lib/api/` functions, keeping Supabase client usage centralised.

### Recommendations

| Priority | Action |
|---|---|
| **High** | Install `@supabase/supabase-js` immediately. |
| **High** | Create a singleton Supabase client in `lib/supabase/client.ts` using environment variables. |
| **High** | Configure `supabase gen types typescript` as part of the development workflow so all DB interactions are type-safe. |
| **Medium** | Create thin service functions in `lib/api/` that wrap Supabase calls. React Query hooks call these functions, not the Supabase client directly. |
| **Medium** | Define React Query key factories as constants (e.g., `vehicleKeys.detail(id)`) to prevent key duplication and enable precise cache invalidation. |

---

## 5. Hooks

### Current State

No hooks exist. The architecture documents describe the following planned hooks:
- `useVehicle(vehicleId)`
- `useRecentActivities(vehicleId, limit, type)`
- `useActivitiesWithPhotos(vehicleId, type)`
- `usePhotos(vehicleId)`
- `useUpdateVehicle()`
- `useCreateActivity()`
- `useArchiveVehicle()`
- `useArchiveActivity()`
- `useVehicleStats()`

### Strengths

- The planned hook API surface is well-sized and semantically clear.
- The separation of query hooks (read) from mutation hooks (write) is the correct React Query pattern.
- Stale time values are explicitly documented per hook (5 min for vehicle, 30 sec for activities).

### Weaknesses

- **Hooks have no designated directory.** Without a `hooks/` directory, they will either live inside `lib/`, co-located with components, or scattered throughout route files.
- **`VehicleWorkspaceContext` duplicates React Query responsibilities.** The architecture document defines a `VehicleWorkspaceContext` that holds `vehicleId`, `vehicle`, `userPermissions`, `isOwner`, and `lastActiveTab`. The vehicle and permissions data are server state best managed by React Query. Maintaining a parallel Context risks stale state divergence.
- **No auth hooks are planned.** `useCurrentUser()` and `useSession()` are needed before any vehicle hooks can function.
- **Real-time subscription management is not addressed** in the hook design. Each hook that subscribes to Supabase real-time will need subscription lifecycle management (subscribe on mount, unsubscribe on unmount).

### Recommendations

| Priority | Action |
|---|---|
| **High** | Create a `hooks/` directory at the project root. Group by domain: `hooks/vehicles/`, `hooks/activities/`, `hooks/auth/`. |
| **High** | Define auth hooks (`useCurrentUser`, `useSession`) before any feature hooks are written. |
| **Medium** | Eliminate `VehicleWorkspaceContext` for server state. Use React Query as the single source of truth. Retain context only for UI-local state (`lastActiveTab`, edit mode flag) that does not come from the database. |
| **Medium** | Create a `useSupabaseSubscription` utility hook that handles subscribe/unsubscribe lifecycle cleanly, so individual query hooks do not each implement raw subscription logic. |
| **Low** | Document stale time and real-time subscription strategy in a `hooks/README.md`. |

---

## 6. State Management

### Current State

Zustand (`^4.4.7`) and TanStack React Query (`^5.35.1`) are installed. No stores are defined.

### Strengths

- Using React Query for server state and Zustand for client/UI state is the correct separation of concerns for a Supabase-backed app.
- React Query v5 (installed) has improved performance and API consistency over v4.

### Weaknesses

- **No Zustand stores are defined or planned.** The architecture documents do not describe what global client state Zustand will own. Without this definition, developers will be unsure when to use Zustand vs. React Query vs. local `useState`.
- **`VehicleWorkspaceContext` as described in the architecture doc is a React Context, not a Zustand store.** This introduces a third state mechanism (Context, Zustand, React Query) where two should suffice.
- **Async Storage (`@react-native-async-storage/async-storage`) is in `devDependencies`.** If it is used for Zustand persistence (common for mobile apps), it must be in `dependencies`, not `devDependencies`.

### Recommended State Ownership Model

| State Type | Owner | Examples |
|---|---|---|
| Server / remote data | React Query | Vehicle record, activities, photos |
| Auth session | React Query + Supabase auth | Current user, session token |
| Global UI preferences | Zustand (persisted) | Theme, notification settings |
| Navigation/workspace UI | Zustand or URL state | Last active tab, active vehicle ID |
| Form / component-local | `useState` | Edit mode, input values |

### Recommendations

| Priority | Action |
|---|---|
| **High** | Define what Zustand owns in a `stores/` directory with clearly named stores (e.g., `stores/workspace.ts`, `stores/preferences.ts`). |
| **High** | Move `@react-native-async-storage/async-storage` from `devDependencies` to `dependencies` if it is used for Zustand persistence. |
| **Medium** | Remove `VehicleWorkspaceContext` and replace it with a Zustand workspace store for UI state and React Query for server state. |
| **Medium** | Document the state ownership model in `CONTRIBUTING.md` so new contributors know where to put state. |

---

## 7. Utilities

### Current State

No utility functions exist. No `utils/` or `constants/` directory is planned.

### Weaknesses

- **No type definitions directory.** Shared TypeScript types for `Vehicle`, `Activity`, `Garage`, `User`, and `Photo` are not defined anywhere. These will be needed by every hook, service, and component.
- **No constants file.** Route names, query key factories, and configuration values (e.g., Supabase URL, stale times) will be inlined across the codebase without a `constants/` layer.
- **No date/time utility.** The app is activity-log-centric and heavily timestamp-dependent, but no date formatting library is installed (`date-fns` or `dayjs` are common choices).
- **No error handling utilities.** No pattern for normalising Supabase errors, React Query errors, or network errors into user-facing messages is defined.

### Recommendations

| Priority | Action |
|---|---|
| **High** | Create a `types/` directory with domain type files (`types/vehicle.ts`, `types/activity.ts`, etc.) before any code is written. |
| **Medium** | Create a `constants/` directory for route name constants and React Query key factories. |
| **Medium** | Install `date-fns` (lightweight, tree-shakeable) for timestamp formatting given the activity-log nature of the app. |
| **Low** | Create a `utils/errors.ts` file that normalises Supabase and network errors into a consistent `AppError` shape. |

---

## 8. Styling

### Current State

NativeWind `^2.0.11` with Tailwind CSS `3.3.0`. The `tailwind.config.js` extends the theme with a basic primary colour ramp and a custom type scale.

### Strengths

- NativeWind + Tailwind is a well-supported styling approach for React Native that enables consistent design tokens.
- The colour ramp (`primary.50` through `primary.700`) and type scale are defined upfront, which is good practice.

### Weaknesses

- **NativeWind v2 is deprecated.** NativeWind v4 (released 2024) is a complete rewrite with full Tailwind CSS v3 utility support, improved performance, and significantly better React Native compatibility. v2 is a pre-release approach with known limitations. Starting a new project on v2 now means a mandatory breaking upgrade before the first public release.
- **The theme is incomplete.** There are only three neutral scale entries (`50`, `100`, `900`) and no semantic tokens (e.g., `background`, `surface`, `text-primary`, `danger`, `success`). UI components will need these.
- **No spacing scale extension.** The default Tailwind spacing scale (4px base) works for web but benefits from mobile-specific adjustments (touch target minimums, safe-area padding).
- **No dark mode strategy.** `userInterfaceStyle: "light"` is hardcoded in `app.json`. Dark mode support should be a deliberate architectural choice made before the design system is built.

### Recommendations

| Priority | Action |
|---|---|
| **High** | Upgrade to NativeWind v4 before writing any component styles. The migration from v2 is breaking; it is far easier to adopt v4 now than to migrate later. |
| **High** | Extend the Tailwind theme with semantic colour tokens (`colors.background`, `colors.surface`, `colors.text`, `colors.danger`, `colors.success`). |
| **Medium** | Decide on dark mode support now. If it is planned, configure `useColorScheme` and NativeWind's dark variant from the beginning rather than retrofitting. |
| **Low** | Add explicit touch target spacing tokens to the theme that enforce the 44pt minimum touch target size across the app. |

---

## 9. Scalability

### Assessment

The Activity-as-single-source-of-truth architecture scales conceptually: every new feature type becomes an Activity type or a view over Activities. The roadmap features (Garage, Parts, Maintenance, Documents, Build Passport) are all expressible in this model.

However, the current route and component structure will not scale to the roadmap without restructuring.

### Risks

- **Tab overflow.** Adding Parts, Maintenance, Documents, Budget, and Build Passport as Vehicle Workspace tabs creates a 7-tab interface. Mobile tab bars have a practical limit of 5 items. A grouped navigation approach (e.g., a "More" overflow or nested tab groups) will be needed by v0.6.
- **Activity feed performance.** The architecture notes virtual lists as a future concern. With an immutable, append-only Activity log, a vehicle with years of activity will accumulate thousands of records. Cursor-based pagination must be implemented from day one, not added later.
- **Photo storage costs.** No CDN or image transformation strategy (resize on upload vs. resize on fetch) is defined. This is a cost and performance risk as user counts grow.
- **Supabase Row Level Security (RLS).** No RLS policy design is referenced in any document. A multi-user app handling vehicles, garages, and sharing requires RLS to be designed before the schema is populated.

### Recommendations

| Priority | Action |
|---|---|
| **High** | Implement cursor-based pagination for all activity queries from the start, not as a later optimization. |
| **High** | Design Supabase RLS policies before any database tables are created. |
| **Medium** | Plan the tab overflow pattern (e.g., collapsible sections or a "More" menu) before adding features beyond the initial three tabs. |
| **Medium** | Define the photo storage and transformation strategy (e.g., Supabase Storage + `image` transform params) before implementing the photo pipeline. |

---

## 10. Maintainability

### Strengths

- **Outstanding documentation culture.** DECISIONS.md with locked ADRs, PRODUCT_GLOSSARY.md, detailed component trees, and product design specs are far above average for a project at this stage. The pattern of documenting decisions with rationale and alternatives is a genuine team strength.
- **TypeScript strict mode is enabled.** `"strict": true` in `tsconfig.json` catches type errors early.
- **ESLint and Prettier are configured** with sane defaults.
- **Clear product vocabulary.** The glossary enforces consistent naming, which reduces ambiguity in code reviews.
- **Archive-over-delete principle** (Decision #2) prevents data integrity issues and makes history reconstruction trivial.

### Weaknesses

- **Root-level document sprawl.** Fifteen markdown files at the repository root make it hard for new contributors to find what they need. The structured `docs/` directory exists but is underused.
- **Rebrand is in progress.** The `WRNC_Rebrand_Audit.md` identifies ~110 references to "Garage OS" that need updating across 17 files. `app.json` still says `"name": "Garage OS"`, the bundle ID is `com.garageos.mobile`, and the deep-link scheme is `garageos`. Running the app in its current state will present as "Garage OS" to users and App Store reviewers.
- **Expo 50 / React Native 0.73 are aging.** Expo 52 and React Native 0.76 are current. Starting on Expo 50 means inheriting known bugs and missing features (e.g., React Native New Architecture, which NativeWind v4 requires).
- **No test infrastructure exists.** Jest and `jest-expo` are installed, but no test files exist. The testing strategy document describes 80%+ unit coverage targets, but that goal is aspirational with zero tests currently.
- **No CI test step.** The GitHub Actions workflow (`build-ios.yml`) exists for builds and TestFlight deployment, but there is no step that runs `npm test` or `npm run lint`.

### Recommendations

| Priority | Action |
|---|---|
| **High** | Complete the Phase 2 rebrand execution described in `WRNC_Rebrand_Audit.md` before any further implementation. The rebrand touches `app.json` (bundle ID, scheme, name), which must be correct before any TestFlight builds. |
| **High** | Upgrade from Expo 50 to Expo 52 (current SDK) before the first implementation sprint. Upgrading mid-sprint is significantly more disruptive. |
| **High** | Add `npm run lint` and `npm test` steps to the GitHub Actions CI workflow so lint and test regressions are caught automatically. |
| **Medium** | Move all VEHICLE_WORKSPACE_*.md, DECISIONS.md, ROADMAP.md, PRODUCT_GLOSSARY.md, and IMPLEMENTATION_PLAN files into the `docs/` directory. |
| **Medium** | Write at least one integration test per route before each feature is marked complete. This establishes the testing habit early rather than accruing test debt. |

---

## Naming Decisions

### Should Mission Control become Workbench?

**Recommendation: No. Retain Mission Control.**

"Workbench" implies a place where active construction happens. In WRNC, that role is filled by the **Vehicle Workspace** — the place builders actually *do* work. Mission Control is explicitly read-only (Decision #4): it is for overview and navigation, not construction.

The Mission Control / Vehicle Workspace pairing is semantically coherent: Mission Control is where you survey all your projects and choose one; Vehicle Workspace is where you execute on it. Changing Mission Control to "Workbench" would create a naming collision with the Vehicle Workspace's function and weaken the product vocabulary distinction.

If the name "Mission Control" feels too aerospace-themed for a car app, acceptable alternatives might be **Home**, **Garage**, or **Dashboard** — but "Workbench" specifically should be reserved for any future feature that represents hands-on, in-progress build work.

### Is "Vehicle Workspace" an appropriate name?

**Yes. Retain Vehicle Workspace.**

"Vehicle Workspace" is accurate, descriptive, and unambiguous. It communicates precisely what the screen is: a dedicated working environment for a single vehicle. It is consistently defined in PRODUCT_GLOSSARY.md, established in DECISIONS.md as locked, and already used throughout all design documents.

"Workspace" is an industry-standard term for a scoped working context (VS Code workspaces, Notion workspaces, Linear workspaces). Applying it to a vehicle-centric context is natural and communicates the right mental model to builders.

---

## Route Hierarchy and Future Features

### Current Route and Future Feature Compatibility

The current planned route (`/vehicle/:vehicleId?tab=X`) can only accommodate features that fit within a single tab bar. The roadmap features require the following route strategy:

| Feature | Version | Recommended Route |
|---|---|---|
| Overview | v0.3 | `/vehicle/[id]/(tabs)/index` |
| Photos | v0.3 | `/vehicle/[id]/(tabs)/photos` |
| About | v0.3 | `/vehicle/[id]/(tabs)/about` |
| Timeline | v0.4 | `/vehicle/[id]/timeline` (full-screen, not a tab) |
| Parts/Inventory | v0.5 | `/vehicle/[id]/(tabs)/parts` |
| Budget | v0.6 | `/vehicle/[id]/(tabs)/budget` |
| Documents | v0.7 | `/vehicle/[id]/(tabs)/documents` |
| Build Passport | v0.8 | `/vehicle/[id]/build-passport` (full-screen share view) |
| Maintenance | future | `/vehicle/[id]/(tabs)/maintenance` |
| Garage | future | `/(tabs)/garage/[garageId]` |

**Build Passport** (named "Build Summary™" in current docs) is a shareable, public-facing view of a vehicle's complete build history. It should be a full-screen route rather than a tab because it serves a different audience (external viewers) and context (sharing) than the builder's workspace.

**Garage** is a container entity grouping vehicles by user or team. Its route should live at the top-level tab navigator, not nested under a specific vehicle.

---

## Folder Rename / Split / Merge Recommendations

| Current | Action | Proposed | Reason |
|---|---|---|---|
| `lib/` (empty) | **Split** | `lib/supabase/` + `lib/api/` | Charter clarity |
| `components/` (empty) | **Split** | `components/ui/` + `components/vehicle/` + `components/layout/` + `components/providers/` | Feature/primitive separation |
| Root `.md` files | **Move** | `docs/product/`, `docs/architecture/`, `docs/roadmap/` | Reduce root clutter |
| *(none)* | **Create** | `hooks/` | Central hook location |
| *(none)* | **Create** | `stores/` | Zustand store location |
| *(none)* | **Create** | `types/` | Shared TypeScript types |
| *(none)* | **Create** | `constants/` | Route names, query keys, config |
| `supabase/` | **Populate** | `supabase/migrations/`, `supabase/seed/` | Standard Supabase project layout |

---

## Summary: Prioritised Recommendations

### High Priority

1. **Install `@supabase/supabase-js`** — the backend client is missing from `package.json`.
2. **Upgrade to Expo SDK 52 and NativeWind v4** before writing any screens or styles.
3. **Execute the WRNC rebrand** (Phase 2, per `WRNC_Rebrand_Audit.md`) to align `app.json` bundle IDs, scheme, and all documentation references.
4. **Replace `?tab=` query params with nested Expo Router tab groups** (`vehicle/[vehicleId]/(tabs)/`) to support deep linking and future feature routes.
5. **Establish `(auth)/` and `(app)/` route groups** before any screen development.
6. **Define `lib/supabase/client.ts`** as the Supabase singleton and configure `supabase gen types typescript` for type-safe DB access.
7. **Create `types/`, `hooks/`, and `stores/` directories** with index files before the first implementation sprint.
8. **Design Supabase RLS policies** before creating any database tables.
9. **Implement cursor-based pagination** in all activity query hooks from day one.
10. **Add CI lint and test steps** to the GitHub Actions workflow.

### Medium Priority

11. Move root-level documentation files (`DECISIONS.md`, `ROADMAP.md`, `PRODUCT_GLOSSARY.md`, `VEHICLE_WORKSPACE_*.md`) into `docs/`.
12. Define the Zustand state ownership model and document it in `CONTRIBUTING.md`.
13. Extend the Tailwind theme with semantic colour tokens and decide on dark mode support.
14. Define a photo storage and CDN transformation strategy before implementing the photo pipeline.
15. Plan tab overflow navigation for the v0.5+ roadmap features.
16. Move `@react-native-async-storage/async-storage` from `devDependencies` to `dependencies`.
17. Remove `axios` (redundant with Supabase + React Query).

### Low Priority

18. Add `date-fns` for timestamp formatting.
19. Create `constants/` directory for route name constants and query key factories.
20. Create `utils/errors.ts` for normalised Supabase error handling.
21. Consider Storybook for the `components/ui/` layer.

---

*Architecture Review v1 — WRNC — 2026-07-18*
