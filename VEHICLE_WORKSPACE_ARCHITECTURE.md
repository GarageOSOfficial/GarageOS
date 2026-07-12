# Vehicle Workspace Architecture - v0.4

Complete system design for the Vehicle Workspace, establishing it as the center of the Garage OS application.

## Overview

The Vehicle Workspace is the primary working environment where builders manage a single vehicle. It is launched from Mission Control and serves as the hub for all vehicle-related activities, documentation, and collaboration.

### Key Principles

- **Builders Before Developers**: Focus on builder productivity
- **Photos Are the Hero**: Photo display is prominent
- **Activities Are the Single Source of Truth**: All workspace data derives from Activities
- **Mobile First**: Primary experience designed for touch

---

## Architectural Decisions

### 1. Activity Presentation Rules

Activities remain the single source of truth. Presentation classifications are organizational only.

**Build Activities** (User-Created Records):
- Purchased Part
- Installed Part
- Maintenance
- Progress Update
- Journal Entry
- Record Upload

**System Activities** (Auto-Generated Audit Trail):
- Vehicle metadata edits
- Garage metadata edits
- Administrative updates

**Display Rules:**
- Build Activities: Visible in Overview, Photos, Timeline by default
- System Activities: Hidden from Overview and Photos; visible in Timeline through optional filtering

### 2. Passive Synchronization

Garage OS favors passive synchronization:
- React Query caches update silently in the background
- Builders interrupted only when conflicts require action
- No constant polling or forced refreshes
- Real-time updates applied seamlessly
- Optimistic updates show progress immediately

### 3. Documentation Score Versioning

Documentation Score is intentionally versioned:
- **Alpha**: Measures profile completeness
- **Future**: May incorporate freshness, activities, photos, records, receipts, verification
- Calculation remains **intentionally flexible**
- Do not document fixed algorithm
- Support iteration and experimentation

### 4. Inline Edit Mode

Vehicle information edits occur directly inside the About tab:
- No modal dialogs or separate edit screens
- Edit button toggles edit mode inline
- Workspace actions replaced with: Cancel, Save Changes
- Changes create System Activity for audit trail

### 5. Photo Pipeline Requirements

Garage OS supports a complete photo pipeline:
- Client-side compression
- Thumbnail generation
- Progressive loading
- Blur placeholders
- Lazy loading
- Future virtualization

Implementation approach is flexible and not prescribed.

### 6. Vehicle Workspace State Restoration

Garage OS remembers the last active Vehicle Workspace tab when practical:
- Persisted on leaving and returning to workspace
- Improves continuity and user experience
- Session-based restoration (browser session)
- Falls back to Overview if no prior state

### 7. Hero Photo Canonical Rule

**Every Vehicle has one Hero Photo.**

The Hero Photo becomes the canonical visual identity of that build throughout Garage OS:
- Displayed prominently in workspace header
- Shown in Mission Control vehicle cards
- Used in shared vehicle references
- Single source of visual identity

---

## Component Hierarchy

### Root Level

```
VehicleWorkspaceContainer
├── VehicleWorkspaceLayout
│   ├── WorkspaceHeader
│   │   ├── VehicleIdentifier
│   │   ├── HeroPhoto
│   │   ├── DocumentationScore
│   │   └── ActionMenu
│   ├── TabNavigation
│   ├── TabContent
│   │   ├── OverviewTab
│   │   ├── PhotosTab
│   │   └── AboutTab
│   └── WorkspaceFooter
└── Providers
    ├── QueryClientProvider
    ├── AuthProvider
    └── ErrorBoundary
```

---

## Data Flow

### Real-Time Updates (Passive Synchronization)

```
Activity Created/Updated
         │
    ┌────┴─────────┐
    │              │
    ▼              ▼
Supabase       React Query
Realtime       Caches update
Event          silently
    │
    ▼
(No interruption
 unless conflict)
```

**Key Principle:** React Query caches update silently. Builders interrupted only when conflicts require action.

---

## React Query Integration

### Query Hooks

```typescript
useVehicle(vehicleId)
  Cache key: ['vehicles', vehicleId]
  Stale time: 5 minutes
  Passive sync

useRecentActivities(vehicleId, limit, type: 'BUILD')
  Excludes System Activities by default
  Stale time: 30 seconds
  Real-time subscription

useActivitiesWithPhotos(vehicleId, type: 'BUILD')
  Build Activities only
  Stale time: 1 minute

usePhotos(vehicleId)
  Support compression, thumbnails
  Stale time: 5 minutes
```

### Mutations

- `useUpdateVehicle()` → Creates System Activity
- `useCreateActivity()` → Handles photo upload
- `useArchiveVehicle()` → Archives (never deletes)
- `useArchiveActivity()` → Archives (never deletes)

---

## Activity Integration

### Activities as Single Source of Truth

```
Activity Record (Immutable)
├── Type: BUILD or SYSTEM
├── Description of work
├── Timestamp
├── Who: User who performed
├── Photos: Attached evidence
├── Metadata: Tagged data
└── Status: Active/Archived

Display Logic:
├─→ RecentActivityList (Overview, BUILD only)
├─→ PhotoGrid (Photos Tab, BUILD only)
├─→ Statistics (BUILD only)
├─→ Timeline (BUILD + SYSTEM optional)
└─→ Audit Trail (SYSTEM activities)
```

### Documentation Score Philosophy

**Intentionally Versioned:**
- Alpha: Profile completeness
- Future: Freshness, activities, photos, records, receipts, verification
- Calculation remains flexible
- Do not document fixed algorithm

---

## Navigation Architecture

### Route Structure

```
/mission-control
  /vehicle/:vehicleId
    (default → Overview or restore last active tab)
    ?tab=overview
    ?tab=photos
    ?tab=about
    /timeline
    /activity/new
```

### State Restoration

- Remember last active tab when practical
- Restore on returning to workspace
- Session-based (browser session)
- Fallback: Overview if no prior state

---

## Inline Edit Mode

**Vehicle information edits in About tab:**

**Entering Edit Mode:**
- Tap "Edit" button
- Form fields become editable inline
- Workspace actions → Cancel, Save Changes

**Saving Changes:**
- Mutation submits changed fields
- System Activity created (audit trail)
- Toast notification confirms
- Form returns to read-only

**Canceling:**
- No mutation occurs
- No Activity created
- Changes discarded
- Return to read-only

---

## Photo Pipeline

**Garage OS supports:**
- Client-side compression
- Thumbnail generation
- Progressive loading (low-res → high-res)
- Blur placeholders (while loading)
- Lazy loading (only when visible)
- Future virtualization (large lists)

**Implementation:** Flexible and not prescribed.

---

## State Management

### Component State

**VehicleWorkspaceLayout:**
- `activeTab`: 'overview' | 'photos' | 'about'
- `isLoading`: from query states
- `error`: from query errors
- `lastActiveTab`: persisted for restoration

**AboutTab:**
- `isEditMode`: boolean
- `editFormValues`: temporary form state
- `isSubmitting`: during mutation

### Global Context

**VehicleWorkspaceContext:**
- `vehicleId`: current vehicle
- `vehicle`: vehicle metadata
- `userPermissions`: edit/delete rights
- `isOwner`: ownership flag
- `lastActiveTab`: for restoration

---

## Performance Considerations

### Query Optimization
- Pagination: Load activities in batches
- Lazy Loading: Load photos on scroll
- Caching: Aggressive with smart invalidation
- Compression: Client-side before upload

### Component Optimization
- Memoization: Expensive components
- Code Splitting: Lazy load tabs
- Image Optimization: Thumbnails and full-res
- Virtual Lists: Large activity lists

### Mobile Performance
- Bundle Size: Tree-shake unused code
- Image Sizes: Responsive, blur placeholders
- Animations: GPU-accelerated transforms
- Network: Minimize HTTP requests

---

Last updated: 2024
Version: 0.4 - Architecture Design (Updated with Permanent Decisions)
