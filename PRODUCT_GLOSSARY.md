# Garage OS™ Product Glossary

Official terminology guide for Garage OS product language, features, and concepts.

Use this glossary to ensure consistent terminology across documentation, UI, marketing, and communications.

---

## Core Concepts

### Mission Control

**Definition:** The primary dashboard and command center of Garage OS. Central hub showing all vehicles, recent activities, and key metrics.

**Purpose:** Provide quick access to all vehicles and current status without needing to navigate into individual workspaces.

**When to Use:**
- Referring to the main dashboard/home screen
- Describing the entry point to Garage OS
- Discussing vehicle overview and status monitoring

**When NOT to Use:**
- Don't use for individual vehicle workspaces (use "Vehicle Workspace")
- Don't use for specific features within a vehicle (use feature name)

---

### Garage

**Definition:** A collection of vehicles owned or managed by a single user or team. Your personal garage of vehicles.

**Purpose:** Organizational container grouping related vehicles together.

**When to Use:**
- Referring to a user's collection of vehicles
- Discussing vehicle organization and grouping
- Referring to user-owned vehicles

**When NOT to Use:**
- Don't use for physical location (use "location" or "address")
- Don't use as verb (use "Vehicle Workspace" for the app area)

---

### Vehicle

**Definition:** A specific car, truck, motorcycle, boat, or other vehicle being tracked in Garage OS.

**Purpose:** The primary entity managed within Garage OS. Each vehicle is independent and has its own workspace, history, and documentation.

**When to Use:**
- Referring to any specific car or transport being tracked
- Describing ownership and project scope
- Discussing vehicle-specific features

**When NOT to Use:**
- Don't use "car" if also tracking motorcycles or other vehicles
- Don't use if referring to the workspace or app area

---

### Vehicle Workspace

**Definition:** The main application interface for a single vehicle. The center of Garage OS where all work on a vehicle is performed, documented, and tracked.

**Purpose:** Dedicated environment for managing every aspect of a vehicle's life and modification journey.

**When to Use:**
- Referring to the primary application interface
- Describing the main working area
- Discussing vehicle-specific work and activities

**When NOT to Use:**
- Don't use for Mission Control (use "Mission Control")
- Don't use as casual shorthand (use "workspace" in that case)

---

### Activity

**Definition:** An immutable record of any action performed on a vehicle. The single source of truth for vehicle history. Activities include photos, descriptions, who performed the work, and when.

**Purpose:** Create permanent documentation of all vehicle changes and work. Activities cannot be edited or deleted—only archived.

**When to Use:**
- Recording any work performed on a vehicle
- Documenting changes with photos and notes
- Referring to individual records in the activity history
- Describing the audit trail of vehicle modifications

**When NOT to Use:**
- Don't use "event" or "action" (use "Activity")
- Don't use "log entry" (Activities are more than logs)
- Don't use casually for incomplete work

---

### Documentation Score

**Definition:** A quality metric measuring how well a vehicle's modifications and history are documented through Activities, photos, and details.

**Purpose:** Encourage thorough documentation of vehicle work. Higher scores indicate better historical records and project visibility.

**When to Use:**
- Discussing documentation completeness
- Explaining the value of comprehensive Activity records
- Motivating builders to document work thoroughly

**When NOT to Use:**
- Don't use if referring to code or technical documentation

---

## Feature Areas

### Timeline

**Definition:** Chronological view of all Activities and milestones related to a vehicle, displayed in reverse chronological order (newest first).

**Purpose:** Quick visual overview of vehicle's project progress and recent work without searching individual Areas.

**When to Use:**
- Referring to the timeline view feature
- Describing chronological history display
- Discussing quick historical lookups

**When NOT to Use:**
- Don't use for non-chronological views
- Don't use for Activities within specific areas

---

### Inventory

**Definition:** System for tracking all parts and components associated with a vehicle, including both purchased and installed items.

**Purpose:** Maintain organized parts list with quantities, costs, installation status, and history.

**When to Use:**
- Recording parts purchases and inventory
- Tracking installed vs. uninstalled components
- Managing parts organization and storage

**When NOT to Use:**
- Don't use for tool tracking (that's not currently in scope)
- Don't use for consumables like fuel or oil

---

### Budget

**Definition:** Financial planning and tracking system for vehicle projects and modifications, including costs, projections, and spend analysis.

**Purpose:** Plan project budgets, track actual spending, and analyze financial data related to vehicles.

**When to Use:**
- Setting project budgets
- Recording actual costs
- Tracking spending vs. plan
- Analyzing financial impact of modifications

**When NOT to Use:**
- Don't use for personal financial management outside vehicle context

---

### Records

**Definition:** Document storage and management system for service history, maintenance records, receipts, warranties, and official documentation related to a vehicle.

**Purpose:** Centralized archive of all official documents and records related to vehicle history and maintenance.

**When to Use:**
- Storing service records and maintenance history
- Managing receipts and invoices
- Archiving warranty documents
- Tracking official registration and title documents

**When NOT to Use:**
- Don't use for casual activity photos (use Activities)
- Don't use for informal notes (use Activities)

---

### Build Summary™

**Definition:** Comprehensive overview and documentation of a vehicle's complete build configuration, history, and current state. Official product name for the build documentation feature.

**Purpose:** Single authoritative source for vehicle's complete build story, configuration, and modification history.

**When to Use:**
- Referring to the complete build documentation system
- Discussing comprehensive vehicle history and specs
- Sharing complete build overview with others

**When NOT to Use:**
- Don't use shortened version "Build Summary" (always include ™)
- Don't use for individual Activities or partial documentation

---

## Builders and Parts

### Plank Owner

**Definition:** Early adopter and beta tester who received Garage OS during the beta phase and provided critical feedback shaping the product.

**Purpose:** Recognition of users who helped develop and refine Garage OS before public release.

**When to Use:**
- Referring to beta program participants
- Discussing user feedback and testing
- Acknowledging early product advocates

**When NOT to Use:**
- Don't use for general users after public release
- Don't use casually for any early user

---

### Purchased Part

**Definition:** A component or item that has been bought or acquired for a vehicle but not yet installed.

**Purpose:** Track parts in inventory before installation, including cost, source, and specifications.

**When to Use:**
- Recording new parts added to inventory
- Tracking parts waiting for installation
- Managing shopping lists and orders

**When NOT to Use:**
- Don't use for installed components (use "Installed Part")
- Don't use for parts that don't exist yet (use budget line item)

---

### Installed Part

**Definition:** A component or item that has been physically installed and is part of the vehicle's current configuration.

**Purpose:** Track components that are currently part of the vehicle, enabling comprehensive parts inventory and build documentation.

**When to Use:**
- Recording parts that have been installed on the vehicle
- Documenting current vehicle configuration
- Tracking modification history

**When NOT to Use:**
- Don't use for parts not yet installed (use "Purchased Part")
- Don't use for removed or replaced components

---

### Maintenance

**Definition:** Routine or scheduled work performed to keep a vehicle in operating condition, including service intervals, fluid changes, and inspections.

**Purpose:** Track ongoing maintenance separate from modifications, enabling service history and maintenance scheduling.

**When to Use:**
- Recording oil changes, fluid services, and routine maintenance
- Tracking maintenance intervals and scheduling
- Documenting preventative maintenance work

**When NOT to Use:**
- Don't use for modifications or upgrades
- Don't use for emergency repairs (use "Activity")

---

## Activity Types

### Progress Update

**Definition:** An Activity documenting current project progress, next steps, or status update without necessarily indicating work completed.

**Purpose:** Keep vehicle workspace current with project momentum and plans, enabling others to understand current status.

**When to Use:**
- Updating team on project progress
- Documenting planned next steps
- Sharing current project phase or milestone
- Communicating blockers or issues

**When NOT to Use:**
- Don't use if no actual work has occurred (use "Journal Entry")
- Don't use for non-project updates (use "Journal Entry")

---

### Journal Entry

**Definition:** Personal note, thought, or reflection related to a vehicle project. More informal and personal than Activities, typically not including photos.

**Purpose:** Document the builder's thoughts, reflections, and personal project journey separate from formal work Activities.

**When to Use:**
- Recording thoughts and reflections on project
- Documenting personal motivations or goals
- Capturing learning and insights
- Writing informal project notes

**When NOT to Use:**
- Don't use for actual work performed (use "Activity" or "Progress Update")
- Don't use for official project documentation (use Activities)

---

### Record Upload

**Definition:** Uploading official documents, receipts, service records, or other files to the Records section of a vehicle workspace.

**Purpose:** Create permanent archive of official paperwork and documentation related to vehicle.

**When to Use:**
- Uploading receipts for parts purchased
- Storing service records and maintenance history
- Archiving warranty documents
- Recording official registration or title documents

**When NOT to Use:**
- Don't use for casual photos (use Activity with photos)
- Don't use for informal notes (use Journal Entry)

---

## Consistency Guidelines

### Capitalization
- **Capitalize** proper product names: Garage OS™, Vehicle Workspace, Mission Control, Build Summary™, Plank Owner
- **Do not capitalize** generic terms: activity, vehicle, part, inventory, timeline, records, budget

### Pluralization
- Activities (plural of Activity)
- Vehicles (plural of Vehicle)
- Parts (plural of Part)
- Records (plural of Record)

### Possessive
- User's Garage
- Vehicle's Timeline
- Part's Installation Date

### Avoid
- Casual abbreviations (spell out terms)
- Alternative terminology (stick to glossary)
- Made-up compound words (use defined terms)

---

## When Adding New Terms

1. Add to PRODUCT_GLOSSARY.md with complete definition
2. Update this document
3. Reference in DECISIONS.md if establishing new concept
4. Update PR template if affects issue tracking
5. Distribute to team for alignment

---

Last updated: 2024
Version: 1.0.0