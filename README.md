# WRNC

> **WRNC is the evolution and official rebrand of GarageOS.** All development, history, and features of GarageOS continue forward under the WRNC name. GarageOS is now WRNC.

Expo-based mobile application for WRNC — Vehicle Build Documentation & Collaboration Platform.

## Project Structure

```
app/
├── (auth)/                 # Authentication flow
│   ├── login.tsx
│   ├── register.tsx
│   └── _layout.tsx
├── (app)/                  # Main app (protected routes)
│   ├── _layout.tsx
│   ├── index.tsx           # Mission Control (Dashboard)
│   └── vehicle/
│       ├── [id]/
│       │   ├── _layout.tsx # Vehicle Workspace Layout
│       │   ├── index.tsx   # Overview Tab (default)
│       │   ├── photos.tsx  # Photos Tab
│       │   ├── about.tsx   # About Tab
│       │   ├── timeline.tsx # Timeline Screen
│       │   └── activity-new.tsx # Create Activity
│       └── _layout.tsx
├── _layout.tsx             # Root layout
└── +not-found.tsx

components/
├── workspace/
│   ├── VehicleWorkspaceHeader.tsx
│   ├── TabNavigation.tsx
│   ├── RecentActivityList.tsx
│   ├── PhotoGrid.tsx
│   ├── PhotoLightbox.tsx
│   ├── VehicleDetailsForm.tsx
│   └── QuickStats.tsx
├── common/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── LoadingSkeleton.tsx
│   └── EmptyState.tsx
└── ui/
    ├── TabBar.tsx
    ├── Header.tsx
    └── Footer.tsx

services/
├── api/
│   ├── client.ts          # Axios client with auth
│   ├── vehicles.ts        # Vehicle API calls
│   ├── activities.ts      # Activity API calls
│   └── photos.ts          # Photo API calls
├── storage/
│   ├── asyncStorage.ts    # AsyncStorage helpers
│   └── imageStorage.ts    # Local image caching
├── sync/
│   ├── realtimeSync.ts    # Real-time subscription handling
│   └── conflictResolver.ts # Conflict resolution logic
└── auth/
    └── tokenManager.ts    # Auth token management

hooks/
├── useVehicle.ts
├── useActivities.ts
├── usePhotos.ts
├── useDocumentationScore.ts
├── useImageUpload.ts
└── useWorkspaceState.ts

store/
├── authStore.ts           # Auth state (Zustand)
├── workspaceStore.ts      # Workspace state (active tab, etc)
└── syncStore.ts           # Sync state (conflicts, status)

utils/
├── imageProcessing.ts     # Compression, thumbnails
├── formatters.ts          # Date, number formatting
├── validators.ts          # Form validation
└── constants.ts           # App constants

styles/
├── tailwind.config.js
├── theme.ts               # Color palette, typography
└── globals.css

__tests__/
├── hooks/
├── components/
├── services/
└── utils/
```

## Architecture Overview

### Key Principles (from DECISIONS.md)

1. **Activity Presentation Rules**: Build Activities vs System Activities
2. **Passive Synchronization**: Silent React Query updates
3. **Inline Edit Mode**: Vehicle details edited without modal
4. **Photo Pipeline**: Client-side compression, progressive loading, lazy loading
5. **State Restoration**: Remember last active tab
6. **Hero Photo**: Canonical visual identity per vehicle

### Technology Stack

- **Framework**: React Native / Expo
- **Routing**: Expo Router (file-based)
- **State Management**: Zustand (lightweight, simple)
- **Data Fetching**: React Query (@tanstack/react-query)
- **Styling**: NativeWind (Tailwind for React Native)
- **Image Handling**: Expo Image, Image Picker
- **Storage**: AsyncStorage, FileSystem
- **API**: Axios with auth interceptors
- **Forms**: React Hook Form + validation

### Navigation Structure

```
Auth Flow (if not authenticated)
├── Login
└── Register

App Flow (if authenticated)
├── Mission Control (Dashboard)
│   └── Vehicle List
│       └── Vehicle Workspace
│           ├── Overview Tab (default, or restore last active)
│           ├── Photos Tab
│           ├── About Tab (inline edit mode)
│           ├── Timeline (separate screen)
│           └── Create Activity
└── Settings
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- iOS: Xcode (Mac only)
- Android: Android Studio

### Installation

```bash
# Install dependencies
npm install

# Initialize EAS (already configured with project ID)
eas init

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## Development

### Building

```bash
# Development build (local device/emulator)
eas build --platform ios --profile development
eas build --platform android --profile development

# Preview build (internal testing)
eas build --platform ios --profile preview
eas build --platform android --profile preview

# Production build
eas build --platform ios --profile production
eas build --platform android --profile production
```

### Submitting to App Stores

```bash
# Submit to App Store (iOS)
eas submit --platform ios --latest

# Submit to Google Play (Android)
eas submit --platform android --latest
```

## Data Layer

### React Query Setup

React Query handles:
- Vehicle metadata caching
- Recent activities (Build Activities only)
- Photos with lazy loading
- Statistics computation
- Real-time subscriptions via Supabase
- Passive synchronization

### State Management

**Zustand stores:**
- `authStore`: User authentication, tokens
- `workspaceStore`: Active tab, workspace state
- `syncStore`: Conflicts, sync status

**AsyncStorage:**
- Session tokens
- Last active tab per vehicle
- User preferences

### API Client

Axios client with:
- Auth token management
- Error handling and retry
- Request/response interceptors
- Timeout configuration

## Image Handling

### Client-Side Processing

1. **Compression**: Reduce file size before upload
2. **Thumbnail Generation**: For grid display
3. **Progressive Loading**: Low-res first, then high-res
4. **Blur Placeholders**: While loading
5. **Lazy Loading**: Load on scroll
6. **Caching**: Store locally for offline

## Authentication

- Token-based (JWT)
- Automatic refresh on expiry
- Logout clears sensitive data
- Secure token storage (Expo SecureStore)

## Offline Support

- AsyncStorage cache for recent data
- Queued mutations while offline
- Automatic sync when reconnected
- Conflict detection and resolution

## Performance

- Code splitting via Expo Router
- Image optimization (compression, thumbnails)
- Lazy loading of screens and images
- Memoization of expensive components
- Virtual lists for large activity lists
- Passive sync (no polling)

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Code Quality

```bash
# Lint
npm run lint

# Format
npx prettier --write .

# Type check
npm run type-check
```

## Environment Variables

Create `.env.local`:

```
EXPO_PUBLIC_API_URL=https://api.wrnc.app
EXPO_PUBLIC_WS_URL=wss://ws.wrnc.app
```

## Deployment

### Development
- Expo Go app for rapid iteration
- Development client for custom native code

### Staging
- Internal preview builds via EAS
- Shared with team for testing

### Production
- Submitted to App Store and Google Play
- Automatic updates via Expo Updates (optional)

## Documentation References

- **Architecture**: See `VEHICLE_WORKSPACE_ARCHITECTURE.md`
- **Design**: See `VEHICLE_WORKSPACE_PDS.md`
- **Decisions**: See `DECISIONS.md`
- **API Spec**: (To be created)

## Contributing

1. Create feature branch: `git checkout -b feature/description`
2. Make changes
3. Run tests and linting: `npm test && npm run lint`
4. Commit with clear message
5. Push and create PR

## License

WRNC™ — All rights reserved. Formerly known as GarageOS.

---

**Status**: Initial setup complete. Ready for implementation of screens and components.

**Next Steps**:
1. Set up API integration (Supabase client)
2. Implement auth screens
3. Build Mission Control dashboard
4. Implement Vehicle Workspace with tabs
5. Add photo processing pipeline
6. Implement real-time synchronization
