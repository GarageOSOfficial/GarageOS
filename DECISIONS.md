# Architecture Decisions

Permanent log of architectural decisions, patterns, and principles established for Garage OS™.

Each decision documents rationale, alternatives considered, and current status.

---

## Decision Format

```
### Decision #N: [Title]

**Status:** Active | Deprecated | Under Review

**Decision:**
Clear statement of what was decided.

**Reason:**
Why this decision was made. What problem does it solve?

**Rationale:**
Detailed explanation of the reasoning and trade-offs considered.

**Alternatives Considered:**
What other approaches were evaluated and why they were rejected.

**Implications:**
How does this affect the system, team, and future development?

**Related Decisions:**
Other decisions this connects to or builds upon.
```

---

## Locked Decisions

These foundational decisions establish core principles and cannot be changed without explicit approval.

---

### Decision #1: Activities Are the Single Source of Truth

**Status:** Active | LOCKED

**Decision:**
Every action, change, and event related to a vehicle is recorded as an immutable Activity. Activities are the authoritative source for vehicle history and state.

**Reason:**
To create an unambiguous, auditable record of all vehicle modifications and work. Users need complete confidence that the history is accurate, complete, and unchangeable.

**Rationale:**
In automotive projects, historical record is critical. By making Activities the single source of truth, we:
- Eliminate ambiguity about what work was done and when
- Create accountability for all changes
- Enable timeline and historical analysis
- Prevent deletion or loss of important context
- Establish audit trail for compliance and reference

**Alternatives Considered:**
- Separate transaction log (rejected: creates complexity and potential for inconsistency)
- Editable activity log (rejected: compromises historical accuracy and accountability)
- Multiple data sources (rejected: creates data synchronization problems)

**Implications:**
- All data modifications must result in Activity records
- Activities are immutable (archived, never deleted)
- UI always references Activity as source of truth
- Reports and views derive from Activities, not separate tables

**Related Decisions:**
- Decision #2: Archive. Never Delete.
- Decision #3: Vehicle Workspace is center of application
- Decision #5: Activity Presentation Rules

---

### Decision #2: Archive. Never Delete.

**Status:** Active | LOCKED

**Decision:**
No user data is ever physically deleted. Deleted items are archived and hidden, but remain in the database for historical reference and recovery.

**Reason:**
To preserve complete historical context and prevent accidental or malicious data loss. Users need confidence that actions can be reversed and history preserved.

**Rationale:**
Deletion without archive creates problems:
- Lost context makes historical understanding incomplete
- Accidental deletions cannot be recovered
- Makes auditing and compliance difficult
- Removes evidence of decisions made and discarded
- Violates principle of immutability in Activity-based system

By archiving instead:
- Historical context is preserved
- Mistakes are reversible
- Complete timeline remains intact
- Regulatory/compliance needs are met
- Activities remain accurate

**Alternatives Considered:**
- Permanent deletion (rejected: loses valuable context)
- Soft delete with hidden flag (effectively same as archiving; we use this approach)
- Archive with separate retention policies (rejected: complexity without benefit)

**Implications:**
- Database design includes `archived_at` or `is_archived` flags on entities
- UI filters to hide archived items by default
- Archive/restore operations create Activities
- Reports can optionally include archived items
- Database storage includes archived data

**Related Decisions:**
- Decision #1: Activities are single source of truth

---

### Decision #3: Vehicle Workspace is Center of Application

**Status:** Active | LOCKED

**Decision:**
The Vehicle Workspace is the primary working environment in Garage OS. All work, documentation, and features center around the Vehicle Workspace. Mission Control is the entry point and overview.

**Reason:**
To simplify navigation and keep user focus on the vehicle being worked on. Eliminates context switching and makes the app feel purposeful and focused.

**Rationale:**
Automotive projects require focus and context. By making Vehicle Workspace the center:
- Users don't context-switch between multiple screens
- All vehicle-related information is co-located
- Features and tools feel integrated, not scattered
- Mobile interface remains uncluttered
- Primary UX pattern is clear: Garage → Vehicle → Workspace

**Alternatives Considered:**
- Distributed features across separate sections (rejected: requires excessive navigation)
- Flat hierarchy with equal emphasis (rejected: users get lost, no clear workflow)
- Separate dashboards for different features (rejected: reduces cohesion)

**Implications:**
- Navigation always leads to Vehicle Workspace for work
- Timeline, Inventory, Budget, Records are tabs/sections within Workspace, not separate areas
- Mission Control is read-only overview, not working space
- All activities happen within the selected Vehicle context
- Mobile nav defaults to current Vehicle Workspace

**Related Decisions:**
- Decision #4: Mission Control is the dashboard

---

### Decision #4: Mission Control is the Dashboard

**Status:** Active | LOCKED

**Decision:**
Mission Control is the primary entry point and dashboard for Garage OS. It shows all vehicles, recent activities, and status overview. It is read-only and exploratory; work happens in Vehicle Workspace.

**Reason:**
To provide quick visibility into all projects without entering individual workspaces. Users can assess status and choose which vehicle to work on.

**Rationale:**
Builders manage multiple vehicles. Mission Control provides:
- Quick overview of all projects
- Recent activity visibility
- Status and progress visibility
- Easy navigation to vehicle of choice
- Consistent entry experience

By keeping Mission Control separate from working spaces:
- Clear separation between overview and working state
- Vehicle Workspace can stay focused
- No cluttering of primary working interface
- Consistent dashboard experience

**Alternatives Considered:**
- Integrated dashboard within first vehicle (rejected: not scalable, confusing navigation)
- Separate app section (current approach; effective)
- Dashboard tabs within Workspace (rejected: reduces focus)

**Implications:**
- Mission Control is first screen after login
- Mission Control is read-only (no editing)
- Mission Control shows summary data and recent Activities
- Navigation from Mission Control enters Vehicle Workspace
- Mission Control may include quick-search and filtering
- Mobile and desktop both have Mission Control as entry

**Related Decisions:**
- Decision #3: Vehicle Workspace is center of application

---

## Active Architectural Decisions

Decisions establishing permanent patterns for Vehicle Workspace implementation.

---

### Decision #5: Activity Presentation Rules

**Status:** Active

**Decision:**
Activities remain the single source of truth. Presentation classifications (Build Activities vs. System Activities) are organizational only and do not change the underlying Activity data model.

**Build Activities** (User-Created Records):
- Purchased Part, Installed Part, Maintenance, Progress Update, Journal Entry, Record Upload

**System Activities** (Auto-Generated Audit Trail):
- Vehicle metadata edits, Garage metadata edits, Administrative updates

**Reason:**
To keep the Recent Activity feed focused on builder work while maintaining complete audit trail.

**Display Rules:**
- Build Activities: Visible in Overview, Photos, Timeline by default
- System Activities: Hidden from Overview and Photos; visible through Timeline filtering
- Statistics and Documentation Score: Built from Build Activities only

**Implications:**
- Activity queries filter by type (BUILD vs. SYSTEM)
- UI components render based on activity classification
- Timeline enables filtering for compliance review
- Future activity types can be added as presentation classifications

**Related Decisions:**
- Decision #1: Activities are single source of truth

---

### Decision #6: Passive Synchronization Philosophy

**Status:** Active

**Decision:**
Garage OS favors passive synchronization. React Query caches update silently. Builders interrupted only when conflicts require action.

**Reason:**
To minimize disruption and preserve builder focus. Database sync should be invisible.

**Implementation:**
- Real-time subscriptions update React Query caches silently
- UI re-renders automatically as cache updates
- Conflict detection only when data diverges
- Builder intervention only when conflicts occur

**Implications:**
- React Query handles all synchronization
- Builders see stale data briefly (acceptable)
- Conflict UI appears only when necessary
- Network latency hidden from builder experience

**Related Decisions:**
- Decision #11: Vehicle Workspace State Restoration

---

### Decision #7: Documentation Score Versioning

**Status:** Active

**Decision:**
Documentation Score is intentionally versioned. Do not document a fixed scoring algorithm.

**Alpha Version (Current):**
- Measures profile completeness
- Factors: activities count, photos count, description length
- Based on Build Activities only

**Future Versions May Include:**
- Documentation Freshness, Activities Diversity, Photo Quality, Records/Receipts, Verification Badges

**Reason:**
To preserve flexibility for iteration without requiring architecture changes.

**Implications:**
- Score display includes version indicator
- Tooltip explains current score components
- Score can be updated without migration
- Different builders may see different scores based on feature rollout

**Related Decisions:**
- Decision #5: Activity Presentation Rules

---

### Decision #8: Inline Edit Mode for Vehicle Details

**Status:** Active

**Decision:**
Vehicle information edits occur directly inside the About tab. No separate modal or edit screen.

**Entering Edit Mode:**
- Tap "Edit" button in About tab
- Form fields become editable inline
- Workspace actions → Cancel, Save Changes

**Saving Changes:**
- Mutation submits changed fields
- System Activity created for audit trail
- Toast notification confirms
- Form returns to read-only

**Reason:**
To streamline editing. Modal dialogs interrupt focus; inline editing maintains context.

**Implications:**
- AboutTab manages edit mode state locally
- Header adapts when edit mode active
- Mutations create System Activities
- Inline form validation provides feedback

**Related Decisions:**
- Decision #5: Activity Presentation Rules (System Activities)

---

### Decision #9: Photo Pipeline Requirements

**Status:** Active

**Decision:**
Garage OS supports complete photo pipeline with client-side optimization. Implementation approach is flexible and not prescribed.

**Supported Capabilities:**
- Client-side Compression, Thumbnail Generation, Progressive Loading, Blur Placeholders, Lazy Loading, Future Virtualization

**Reason:**
To provide smooth photo experience on mobile networks. Photos are the hero of Vehicle Workspace.

**Implementation Approach:**
Flexible. Suggested: Canvas API for compression, Service Worker for caching, Intersection Observer for lazy loading, Virtual scroller for large lists.

**Implications:**
- Photo components support multiple resolutions
- PhotoGrid uses lazy loading and blur placeholders
- PhotoLightbox displays full-resolution images
- Upload flow includes compression step
- Future: Virtual scroller for 100+ photos

**Related Decisions:**
- Decision #3: Vehicle Workspace is center of application

---

### Decision #10: Hero Photo Canonical Rule

**Status:** Active

**Decision:**
Every Vehicle has one Hero Photo. The Hero Photo becomes the canonical visual identity throughout Garage OS.

**Hero Photo:**
- Designated by builder in About tab
- Displayed in Vehicle Workspace header
- Shown in Mission Control vehicle cards
- Used in shared vehicle references
- Single source of visual identity

**Reason:**
To create consistent visual identity. Photos are how builders recognize their builds.

**Implications:**
- Vehicle entity includes hero_photo_id field
- About tab includes Hero Photo selector
- WorkspaceHeader displays Hero Photo
- Mission Control uses Hero Photo in cards
- Changing Hero Photo updates across all screens

**Related Decisions:**
- Decision #3: Vehicle Workspace is center of application

---

### Decision #11: Vehicle Workspace State Restoration

**Status:** Active

**Decision:**
Garage OS remembers the last active Vehicle Workspace tab when practical. State restored when returning to workspace.

**Implementation:**
- Store active tab in session storage or URL query param
- Restore on returning to workspace
- Session-based (browser session)
- Fallback to Overview if no prior state

**Reason:**
To improve continuity and reduce friction. Builders expect to return to their last tab.

**Implications:**
- VehicleWorkspaceLayout persists activeTab state
- Container restores activeTab on mount
- URL query param or session storage used
- Works across tab switches
- No server-side state required

**Related Decisions:**
- Decision #6: Passive Synchronization
- Decision #3: Vehicle Workspace is center of application

---

## Adding New Decisions

When establishing a new architectural pattern:

1. **Identify** the decision point and alternatives
2. **Discuss** with team to build consensus
3. **Document** using decision format above
4. **Add** to DECISIONS.md with unique number
5. **Reference** in relevant code and documentation
6. **Review** regularly to assess validity

---

## Decision Review Process

- Review locked decisions annually for validity
- Consider moving decisions to deprecated if no longer relevant
- Update related documentation when decisions change
- Notify team of any decision status changes
- Archive deprecated decisions with explanation

---

Last updated: 2024
Version: 2.0.0 - Architecture Decisions (Updated with Permanent Decisions for Vehicle Workspace)
