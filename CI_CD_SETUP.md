# GitHub Actions CI/CD Setup for Garage OS

## Complete Workflow Overview

This document describes the complete GitHub Actions workflow for Garage OS iOS app builds and TestFlight deployment.

### Workflow File: `.github/workflows/build-ios.yml`

## Workflow Stages

### 1. Lint and Test Stage (`lint-and-test`)

**Runs on:** Every push to `main` or manual workflow dispatch

**Steps:**
1. **Checkout code** - Get latest code from repository
2. **Setup Node.js** - v18 with npm cache
3. **Install dependencies** - `npm ci` (clean install)
4. **Run ESLint** - `npm run lint` - Check code quality
5. **TypeScript checking** - `npm run type-check` - Verify type safety
6. **Run tests** - `npm test -- --coverage` - Execute unit tests
7. **Upload coverage** - Send to Codecov for tracking

**Fails if:**
- ESLint errors detected
- TypeScript compilation errors
- Unit tests fail
- Coverage below threshold

### 2. Build iOS Stage (`build-ios`)

**Depends on:** Successful `lint-and-test`

**Steps:**
1. **Checkout code**
2. **Setup Node.js**
3. **Install dependencies**
4. **Setup EAS CLI** - Install Expo Application Services CLI
5. **Build iOS** - `eas build --platform ios --profile preview`
   - Non-interactive mode (CI/CD friendly)
   - Physical device builds
   - Uses EAS servers
6. **Get build ID** - Retrieve build identifier from EAS
7. **Generate build report** - Create markdown report with build details
8. **Upload artifacts** - Store build report

### 3. Submit to TestFlight Stage (`submit-testflight`)

**Depends on:** Successful `build-ios`

**Steps:**
1. **Checkout code**
2. **Setup Node.js**
3. **Install dependencies**
4. **Setup EAS CLI**
5. **Submit to TestFlight** - `eas submit --platform ios --latest`
   - Submits latest build to TestFlight
   - Uses Apple credentials from secrets
   - Non-interactive mode
6. **Post to Slack** (on success) - Notify team with success message
7. **Post to Slack** (on failure) - Notify team with failure message

## Required GitHub Secrets

Add these at: `https://github.com/GarageOSOfficial/GarageOS/settings/secrets/actions`

### EAS Secrets

| Secret Name | Description | How to Get |
|---|---|---|
| `EAS_PROJECT_ID` | EAS project identifier | `c7cfc85b-904f-4d2a-8fbb-1aec8f51aecb` (already in app.json) |
| `EAS_TOKEN` | Authentication token for EAS | `eas token create --scope build` |

### Apple Developer Secrets

| Secret Name | Description | How to Get |
|---|---|---|
| `APPLE_ID` | Apple ID email | Your Apple ID email address |
| `APPLE_ID_PASSWORD` | App-specific password | Generated at https://appleid.apple.com/account/manage/security |
| `APPLE_TEAM_ID` | Apple Developer Team ID | https://developer.apple.com/account/ → Membership |
| `ASC_APP_ID` | App Store Connect App ID | https://appstoreconnect.apple.com/ → Apps → Garage OS → App Information |

### Slack Secrets (Optional)

| Secret Name | Description | How to Get |
|---|---|---|
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications | https://api.slack.com/messaging/webhooks |

## Step-by-Step Setup

### Step 1: Get EAS Token

```bash
eas login
eas token create --scope build
```

Copy the token and add to GitHub Secrets as `EAS_TOKEN`.

### Step 2: Get Apple Credentials

**APPLE_ID:**
```
Your Apple ID email (e.g., developer@example.com)
```

**APPLE_ID_PASSWORD:**
1. Go to https://appleid.apple.com/account/manage
2. Sign in with your Apple ID
3. Navigate to Security → App-specific passwords
4. Generate new password for "GitHub Actions"
5. Copy password to GitHub Secrets as `APPLE_ID_PASSWORD`

**APPLE_TEAM_ID:**
1. Go to https://developer.apple.com/account/
2. Click "Membership" in the sidebar
3. Copy the Team ID (looks like: `ABCD1234EF`)
4. Add to GitHub Secrets as `APPLE_TEAM_ID`

**ASC_APP_ID:**
1. Go to https://appstoreconnect.apple.com/
2. Click "Apps" → "Garage OS"
3. Click "App Information" in the sidebar
4. Copy the "Apple ID" (not Bundle ID)
5. Add to GitHub Secrets as `ASC_APP_ID`

### Step 3: Get Slack Webhook (Optional)

1. Create a Slack app at https://api.slack.com/apps
2. Enable "Incoming Webhooks"
3. Create new webhook for your channel
4. Copy webhook URL to GitHub Secrets as `SLACK_WEBHOOK_URL`

### Step 4: Commit Workflow Files

```bash
git add .github/workflows/build-ios.yml eas.json CI_CD_SETUP.md
git commit -m "ci: add complete iOS build and TestFlight deployment workflow"
git push origin main
```

## Workflow Triggers

### Automatic Trigger

**On every push to `main` branch:**
```
commit → workflow starts automatically
```

### Manual Trigger

**Via GitHub Actions tab:**
1. Go to https://github.com/GarageOSOfficial/GarageOS/actions
2. Select "Build, Test, and Deploy iOS" workflow
3. Click "Run workflow" → "main" branch
4. Click "Run workflow" button

**Via GitHub CLI:**
```bash
gh workflow run build-ios.yml --ref main
```

## Monitoring Builds

### Real-Time Monitoring

1. Go to: https://github.com/GarageOSOfficial/GarageOS/actions
2. Click latest "Build, Test, and Deploy iOS" run
3. Watch progress in real-time
4. Click each job to see detailed logs

### Build Artifacts

- **Build Report** - Markdown file with build metadata
- **Coverage Report** - Test coverage data (if enabled)

### Slack Notifications

If Slack webhook is configured:
- ✅ Success notification with build details
- ❌ Failure notification with link to logs
- Includes links to GitHub Actions and TestFlight

## TestFlight Distribution

### How Team Members Install

1. **First time:**
   - Receive TestFlight invitation email from App Store Connect
   - Click link to join testing group
   - Install TestFlight app from App Store

2. **After successful deployment:**
   - New build appears in TestFlight within 5-10 minutes
   - Team members see "New Build Available" notification
   - Tap "Install" to test latest version

### TestFlight Dashboard

https://testflight.apple.com
- View all builds
- See build history
- Manage test groups
- View crash reports

## Troubleshooting

### Build Fails: "Invalid credentials"

**Solution:**
- Verify `APPLE_ID_PASSWORD` is app-specific (not your regular password)
- Ensure password is still valid (expires)
- Re-generate at https://appleid.apple.com/account/manage/security

### Build Fails: "ASC_APP_ID not found"

**Solution:**
- Verify App Store Connect app exists
- Double-check `ASC_APP_ID` matches actual Apple ID (not Bundle ID)
- Ensure account has permission to submit builds

### Build Fails: "EAS_TOKEN expired"

**Solution:**
- Generate new token: `eas token create --scope build`
- Update `EAS_TOKEN` secret in GitHub

### Slack notifications not working

**Solution:**
- Verify `SLACK_WEBHOOK_URL` is valid
- Test webhook at https://api.slack.com/tools/slack-cli
- Ensure webhook channel still exists

### Build takes too long

- First build: 10-15 minutes (includes setup)
- Subsequent builds: 5-10 minutes (cached dependencies)
- Normal for initial deployment

## Complete Workflow Flow Diagram

```
Push to main
     ↓
[Lint & Test]
├─ ESLint
├─ TypeScript
├─ Unit Tests
└─ Coverage
     ↓
   (pass?)
  /        \
 YES       NO → Stop (Notify)
  ↓
[Build iOS]
├─ Install deps
├─ EAS build
├─ Get build ID
└─ Generate report
     ↓
   (success?)
  /        \
 YES       NO → Stop (Notify Slack)
  ↓
[Submit TestFlight]
├─ Submit build
├─ Wait for approval
└─ Send Slack notification
     ↓
Team gets TestFlight notification
```

## Next Steps

1. ✅ Create all required GitHub Secrets
2. ✅ Push workflow files to repository
3. ✅ Watch first build in Actions tab
4. ✅ Verify build appears in TestFlight
5. ✅ Distribute TestFlight link to team
6. ✅ Team installs from TestFlight

## References

- **Expo EAS Documentation:** https://docs.expo.dev/build/
- **GitHub Actions Documentation:** https://docs.github.com/en/actions
- **TestFlight Documentation:** https://help.apple.com/app-store-connect/#/dev3d648ecf
- **Architecture:** See `VEHICLE_WORKSPACE_ARCHITECTURE.md`
- **Decisions:** See `DECISIONS.md`

---

**Status:** Complete workflow ready for deployment
**Last Updated:** 2024
**Maintained by:** GarageOS Team
