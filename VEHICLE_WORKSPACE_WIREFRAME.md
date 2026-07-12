# Vehicle Workspace Wireframe - v0.3

ASCII wireframes showing layout, spacing, and information hierarchy for Vehicle Workspace screens.

---

## Mobile Layout - Portrait (Primary)

### Vehicle Workspace - Overview Tab (Default)

```
╔═════════════════════════════════════╗
║  2015 Chevelle        [⋯ Menu]      ║  ← Header (56px)
║  ████████░░ 72%                     ║
╠═════════════════════════════════════╣
║  📊 Overview  📸 Photos  ℹ About    ║  ← Tab Navigation (56px)
╠═════════════════════════════════════╣
║                                     ║
║  RECENT ACTIVITIES                  ║  ← Section Title (16px margin)
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  [Photo]    Oil Change          │║  ← Activity Item 1 (112px)
║  │  Thumbnail  By: John Smith      │║
║  │             2 hours ago         │║
║  │  🔧 Maintenance                 │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║  ← Spacing (8px)
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  [Photo]    New Exhaust System  │║  ← Activity Item 2 (112px)
║  │  Thumbnail  By: John Smith      │║
║  │             5 hours ago         │║
║  │  ⚙ Modification                 │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  [Photo]    Suspension Upgrade  │║  ← Activity Item 3 (112px)
║  │  Thumbnail  By: John Smith      │║
║  │             1 day ago           │║
║  │  🔧 Maintenance                 │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  [Photo]    Paint Job           │║  ← Activity Item 4 (112px)
║  │  Thumbnail  By: John Smith      │║
║  │             2 days ago          │║
║  │  🎨 Cosmetic                    │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  [Photo]    New Wheels          │║  ← Activity Item 5 (112px)
║  │  Thumbnail  By: John Smith      │║
║  │             1 week ago          │║
║  │  ⚙ Modification                 │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║  ← Spacing (16px)
║  QUICK STATS                        ║  ← Section Title (16px margin)
║                                     ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  📊 12       │  📸 28           │║  ← Stat Cards (64px height)
║  │  Activities  │  Photos          │║
║  │              │                  │║
║  ├──────────────┼──────────────────┤║
║  │              │                  │║
║  │  🕐 2h ago   │  📈 72%          │║  ← Stat Cards (64px height)
║  │  Last Update │  Documentation   │║
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │   [📅 View Full Timeline]       │║  ← CTA Button (48px)
║  └─────────────────────────────────┘║
║                                     ║
║  (Pull down to refresh)             ║  ← Hint text (optional)
║                                     ║
╠═════════════════════════════════════╣
║  [+ New Activity]  [📅 Timeline]   ║  ← Footer (56px)
╚═════════════════════════════════════╝

LAYOUT NOTES:
─────────────
Total height: ~600-700px (scrollable content)
Safe area margins: 16px left/right
Header height: 56px
Tab nav height: 56px
Footer height: 56px
Activity item height: 112px (flexible)
Card spacing: 8px
Section spacing: 16px top/bottom
Button height: 48px (touch target)

COLOR CODING:
─────────────
Header:       Primary blue background
Tab active:   Bold, underline indicator
Activity bg:  Light gray (Card)
Activity sep: 8px white space
Stats grid:   2x2 card layout
CTA button:   Primary blue, full width - 16px margin
Footer:       Secondary gray background
```

### Vehicle Workspace - Photos Tab

```
╔═════════════════════════════════════╗
║  2015 Chevelle        [⋯ Menu]      ║  ← Header (56px)
║  ████████░░ 72%                     ║
╠═════════════════════════════════════╣
║  📊 Overview  📸 Photos  ℹ About    ║  ← Tab Navigation (56px)
╠═════════════════════════════════════╣
║                                     ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  [Photo]     │  [Photo]        │║  ← Photo Tiles (2 columns)
║  │   Oil        │   Exhaust       │║     ~150px x 150px each
║  │   Jul 12     │   Jul 10        │║
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  [Photo]     │  [Photo]        │║
║  │  Suspension  │  Paint          │║
║  │   Jul 8      │   Jul 6         │║
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  [Photo]     │  [Photo]        │║
║  │   Wheels     │   Engine        │║
║  │  Jun 30      │  Jun 28         │║
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  [Photo]     │  [Photo]        │║
║  │  Interior    │  Trim           │║
║  │  Jun 15      │  Jun 10         │║
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  [Photo]     │                  │║
║  │  Before      │  (Load more...)   │║
║  │  Jun 1       │                  │║
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
║  [Load More Photos]                 ║
║                                     ║
╠═════════════════════════════════════╣
║  [+ New Activity]  [📅 Timeline]   ║
╚═════════════════════════════════════╝

LAYOUT NOTES:
─────────────
Grid layout: 2 columns on mobile
Photo tiles: Square (1:1 aspect ratio)
Tile size: ~150px x 150px
Spacing: 8px between tiles
Date label: Bottom right of tile
Lazy load: Images load as scrolling
Infinite scroll or "Load More" button
Header/nav/footer: Same as Overview
```

### Vehicle Workspace - About Tab

```
╔═════════════════════════════════════╗
║  2015 Chevelle        [⋯ Menu]      ║  ← Header (56px)
║  ████████░░ 72%                     ║
╠═════════════════════════════════════╣
║  📊 Overview  📸 Photos  ℹ About    ║  ← Tab Navigation (56px)
╠═════════════════════════════════════╣
║                                     ║
║  VEHICLE DETAILS                    ║  ← Section Title (16px margin)
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  Name                           │║  ← Read-only field (56px)
║  │  2015 Chevelle                  │║
║  │                                 │║
║  │  Year / Make / Model            │║
║  │  2015 / Chevrolet / Chevelle    │║
║  │                                 │║
║  │  VIN                            │║
║  │   1G1AK52F147118765             │║
║  │                                 │║
║  │  Color                          │║
║  │  Red                            │║
║  │                                 │║
║  │  License Plate                  │║
║  │  ABC-1234                       │║
║  │                                 │║
║  │  Notes                          │║
║  │  Classic build in progress...   │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║  ← Spacing (16px)
║  OWNERSHIP                          ║  ← Section Title (16px margin)
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  Owner                          │║
║  │  John Smith (john@example.com)  │║
║  │                                 │║
║  │  Garage                         │║
║  │  My Garage                      │║
║  │                                 │║
║  │  Created                        │║
║  │  July 1, 2026                   │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │      [Edit Details]             │║  ← Action Button (48px)
║  └─────────────────────────────────┘║
║                                     ║
╠═════════════════════════════════════╣
║  [+ New Activity]  [📅 Timeline]   ║
╚═════════════════════════════════════╝

LAYOUT NOTES:
─────────────
Field layout: Label above, value below
Field spacing: 12px between fields
Field height: ~40-48px per field
Section spacing: 16px between sections
Edit button: Full width, 48px height
Read-only styling: No borders, light text color
Responsive: All fields stack vertically
```

---

## Desktop Layout - Landscape (1024px+)

### Vehicle Workspace - Desktop Overview

```
┌──────────────────────────────────────────────────────────┐
│ Garage OS  [Logo]                            [⚙] [👤]    │  ← Top nav (64px)
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│  < Back | 2015 Chevelle              [⋯ Menu]            │  ← Breadcrumb (48px)
│         ████████░░ 72%                                    │
├──────────────────────────────────────────────────────────┤
│  📊 Overview  |  📸 Photos  |  ℹ About                   │  ← Tabs (48px)
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌────────────────────────────┬──────────────────────────┐│
│  │                            │                          ││
│  │   RECENT ACTIVITIES        │    QUICK STATS           ││
│  │                            │                          ││
│  │  Oil Change                │  ┌────────────────────┐ ││
│  │  [Photo]  Jul 12, 2h ago   │  │ 📊 12  | 📸 28     │ ││
│  │  By John Smith             │  │ Act    | Photos    │ ││
│  │  🔧 Maintenance            │  │ ────────────────── │ ││
│  │                            │  │ 🕐 2h | 📈 72%    │ ││
│  │  New Exhaust System        │  │ Last  | Docs      │ ││
│  │  [Photo]  Jul 10, 5h ago   │  │ └────────────────┘ ││
│  │  By John Smith             │  │                    ││
│  │  ⚙ Modification            │  │ [📅 Timeline]      ││
│  │                            │  │                    ││
│  │  Suspension Upgrade        │  └────────────────────┘ ││
│  │  [Photo]  Jul 8, 1d ago    │                        ││
│  │  By John Smith             │                        ││
│  │  🔧 Maintenance            │                        ││
│  │                            │                        ││
│  │  Paint Job                 │                        ││
│  │  [Photo]  Jul 6, 2d ago    │                        ││
│  │  By John Smith             │                        ││
│  │  🎨 Cosmetic               │                        ││
│  │                            │                        ││
│  │  New Wheels                │                        ││
│  │  [Photo]  Jun 30, 1w ago   │                        ││
│  │  By John Smith             │                        ││
│  │  ⚙ Modification            │                        ││
│  │                            │                        ││
│  │  [📅 View Full Timeline]   │                        ││
│  │                            │                        ││
│  └────────────────────────────┴──────────────────────────┘│
│                                                            │
│  (Pull down to refresh)                                    │
│                                                            │
└──────────────────────────────────────────────────────────┘

LAYOUT NOTES (Desktop):
──────────────────────
Main container width: ~1200px max-width
Content area: 2-column layout
Left column (60%): Recent Activities
Right column (40%): Quick Stats + CTA
Activity items: 120px height
Photo thumbnails: 100px x 100px
Stats grid: 2x2 card layout
Spacing: 24px between columns
Header height: 64px (with top nav)
Tab height: 48px
Margins: 32px sides, 24px top/bottom
Horizontal scrolling: Disabled
Typography: Larger (desktop-optimized)
```

---

## Full-Screen Photo Lightbox

```
╔═════════════════════════════════════╗
║                                     ║
║          [X] Close (top-left)       ║
║                                     ║
║     ◄  [Full Resolution Photo]  ►   ║
║                                     ║
║         Oil Change - Jul 12         ║
║         Changed oil, replaced...    ║
║         2:30 PM  |  1 of 4 photos   ║
║                                     ║
║  Photo 1 of 4 (navigation info)     ║
║                                     ║
║  [X] Close  [←] Previous  [→] Next  ║
║                                     ║
╚═════════════════════════════════════╝

LIGHTBOX BEHAVIOR:
──────────────────
Full screen overlay
Background: Dark semi-transparent
Photo size: Fitted to screen (with padding)
Close button: Top-left corner (40px x 40px)
Navigation: Left/right arrows (touch-friendly)
Photo context: Below image
Counter: Bottom (Photo N of M)
Swipe support: Left/right to navigate
Double-tap: Zoom to 150%
Pinch: Zoom (mobile)
Escape key: Close (desktop)
Body scroll: Locked (no background scroll)
Animation: Smooth fade-in/out
```

---

## Loading State - Skeleton UI

```
╔═════════════════════════════════════╗
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ║  ← Header skeleton (56px)
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║  ← Score skeleton
╠═════════════════════════════════════╣
║  ░░░░░░░░░░░░ ░░░░░░░░░░ ░░░░░░░  ║  ← Tab skeleton (56px)
╠═════════════════════════════════════╣
║                                     ║
║  RECENT ACTIVITIES                  ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  ░░░░░░░░░  ░░░░░░░░░░░░░░   │║  ← Activity 1 skeleton
║  │  ░░░░░░░░░  ░░░░░░░░░░░░░░   │║  ← Shimmer effect
║  │             ░░░░░░░░░░░░░░   │║
║  │             ░░░░░░░░░░░░░░   │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │                                 │║
║  │  ░░░░░░░░░  ░░░░░░░░░░░░░░   │║  ← Activity 2 skeleton
║  │  ░░░░░░░░░  ░░░░░░░░░░░░░░   │║
║  │             ░░░░░░░░░░░░░░   │║
║  │             ░░░░░░░░░░░░░░   │║
║  │                                 │║
║  └─────────────────────────────────┘║
║                                     ║
║  QUICK STATS                        ║
║  ┌──────────────┬──────────────────┐║
║  │              │                  │║
║  │  ░░░░░░░░░  │  ░░░░░░░░░░░░░  │║  ← Stat card skeleton
║  │  ░░░░░░░░░  │  ░░░░░░░░░░░░░  │║  ← Shimmer animation
║  │              │                  │║
║  └──────────────┴──────────────────┘║
║                                     ║
╠═════════════════════════════════════╣
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║  ← Footer skeleton
╚═════════════════════════════════════╝

SKELETON NOTES:
───────────────
Uses light gray placeholders
Shimmer animation (0.5s loop)
Maintains layout/spacing
Prevents layout shift
Shows content shape
Height matches real content
Fades smoothly to real content
No interaction while loading
```

---

## Empty State - No Activities

```
╔═════════════════════════════════════╗
║  2015 Chevelle        [⋯ Menu]      ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ║
╠═════════════════════════════════════╣
║  📊 Overview  📸 Photos  ℹ About    ║
╠═════════════════════════════════════╣
║                                     ║
║                                     ║
║             📷 Camera Icon          ║
║                                     ║
║        No Activities Yet             ║
║                                     ║
║    Start documenting your build     ║
║     with photos and descriptions.   ║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │   [+ Create First Activity]     │║
║  └─────────────────────────────────┘║
║                                     ║
║                                     ║
╠═════════════════════════════════════╣
║  [+ New Activity]  [📅 Timeline]   ║
╚═════════════════════════════════════╝

EMPTY STATE NOTES:
──────────────────
Center vertically in content area
Icon: Large (96px), light gray
Headline: Bold, dark gray, 20px
Description: Medium gray, 16px, 2-3 lines
CTA button: Primary blue, full width - 16px margin
Encourages user action
Links to activity creation
Friendly, non-alarming tone
Appropriate for new vehicles
```

---

## Error State - Load Failure

```
╔═════════════════════════════════════╗
║  2015 Chevelle        [⋯ Menu]      ║
║  ████████░░ 72%                     ║
╠═════════════════════════════════════╣
║  📊 Overview  📸 Photos  ℹ About    ║
╠═════════════════════════════════════╣
║                                     ║
║                                     ║
║             ⚠ Warning Icon          ║
║                                     ║
║    Failed to Load Activities         ║
║                                     ║
║    We encountered an error          ║
║    loading your activities.         ║
║    Check your connection.           ║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │       [Retry Loading]           │║
║  └─────────────────────────────────┘║
║                                     ║
║  ┌─────────────────────────────────┐║
║  │      [Try Photos Instead]       │║
║  └─────────────────────────────────┘║
║                                     ║
║                                     ║
╠═════════════════════════════════════╣
║  [+ New Activity]  [📅 Timeline]   ║
╚═════════════════════════════════════╝

ERROR STATE NOTES:
──────────────────
Center vertically in content area
Icon: ⚠ warning or ❌ error
Headline: "Failed to Load..."
Description: User-friendly explanation
Primary CTA: Retry action
Secondary CTA: Alternative action (skip to different tab)
Error code: (optional, subtle)
Contact support: (optional link)
Does not crash entire workspace
Other tabs remain functional
```

---

## Spacing & Typography Scale

### Mobile (360px - 767px)

```
Type Scale:
  H1 (Vehicle Name):     24px Bold
  H2 (Section Title):    18px Semibold
  Body text:             16px Regular
  Small text (Meta):     14px Regular
  Tiny text (Tips):      12px Light

Spacing Scale:
  XS: 4px (borders, fine detail)
  S:  8px (component spacing)
  M:  16px (section spacing)
  L:  24px (major sections)
  XL: 32px (page margins)

Layout:
  Margin: 16px left/right
  Activity height: 112px (fixed)
  Button height: 48px (touch target)
  Icon size: 24px-32px
  Photo: 100% width - 32px (margin)

Line Height:
  Headings: 1.2
  Body: 1.5
  Compact: 1.3
```

### Desktop (1024px+)

```
Type Scale:
  H1: 32px Bold
  H2: 24px Semibold
  Body: 16px Regular
  Small: 14px Regular
  Tiny: 12px Light

Spacing Scale:
  XS: 4px
  S:  12px
  M:  24px
  L:  32px
  XL: 48px

Layout:
  Max width: 1200px
  Margin: 32px sides
  Column gap: 24px
  Activity height: 128px
  Button height: 44px
  Icon size: 32px-48px

Line Height:
  Same as mobile
```

---

## Color & Visual Hierarchy

### Information Hierarchy (Mobile)

```
Level 1 (Highest Priority):
  - Vehicle name (largest)
  - Recent activity photos
  - Quick stats numbers
  - Primary CTAs

Level 2 (Medium Priority):
  - Activity descriptions
  - Timestamps
  - Tab labels
  - Secondary information

Level 3 (Low Priority):
  - Metadata tags
  - By-line (user info)
  - Placeholder text
  - Hint text

Visual Weight:
  Bold (700):   Titles, key numbers
  Semibold:     Subtitles, labels
  Regular (400):Main content
  Light (300):  Secondary, disabled
```

### Interactive Elements

```
Buttons:
  Primary: Blue background, white text, 48px height
  Secondary: Gray background, dark text
  Tertiary: Text-only, blue color
  Disabled: Gray background, light text, opacity 0.5

Cards:
  Background: White or light gray
  Border: None (shadow instead)
  Border radius: 8px
  Padding: 16px
  Shadow: Subtle (elevation 2)

Inputs (in edit mode):
  Border: Light gray, 1px
  Focus: Blue border, shadow
  Height: 44px minimum
  Padding: 12px
  Border radius: 4px
```

---

Last updated: 2024
Version: 1.0.0 - Wireframe Design