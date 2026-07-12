# Contributing to Garage OS™

This document defines the engineering workflow, standards, and practices for the Garage OS development team.

## Table of Contents

1. [Engineering Principles](#engineering-principles)
2. [Development Workflow](#development-workflow)
3. [Branch Strategy](#branch-strategy)
4. [Commit Standards](#commit-standards)
5. [Pull Request Process](#pull-request-process)
6. [Code Review Process](#code-review-process)
7. [Documentation Requirements](#documentation-requirements)
8. [Release Process](#release-process)

---

## Engineering Principles

These principles guide all decisions and work on Garage OS:

### Builders Before Developers
- Focus on the user's experience first
- Build for real users solving real problems
- Code serves the builder, not the other way around
- Prioritize functionality and usability over technical elegance

### Less Typing. More Building.
- Minimize friction in the interface
- Every keystroke should serve a purpose
- Prefer visual/tactile interaction over text entry
- Optimize for speed and efficiency

### Photos Are the Hero.
- Visual documentation is primary
- Photos of vehicles, parts, and progress are essential
- UI supports and showcases photos prominently
- Activities should include visual evidence

### Activities Are the Single Source of Truth.
- Every action by a builder is recorded as an Activity
- Activities are immutable and permanent
- Activities track what was done, when, by whom, and why
- The Activity log is the authoritative history of a vehicle

### Archive. Never Delete.
- No data is ever destroyed
- Deleted items are archived and hidden, not erased
- Archives preserve historical context
- Deletion is only logical (hiding), never physical

### Every Screen Has One Primary Purpose.
- Each screen solves one clear problem
- Secondary features don't clutter the primary purpose
- Navigation is clear and purposeful
- Focus user attention on the primary goal

### Every Feature Must Reduce Friction.
- Before adding a feature, identify the friction it removes
- Features that don't reduce friction create complexity instead
- Measure friction reduction in user effort or time
- Question features that don't pass the friction test

### Mobile First.
- Design and develop for mobile as the primary platform
- Mobile constraints drive better design decisions
- Desktop is an enhancement, not the primary target
- Touch interactions are primary, mouse is secondary

### Native Feeling.
- Garage OS should feel like a native app, not a web wrapper
- Use platform conventions and patterns
- Prioritize performance and responsiveness
- Animations and transitions should feel natural

### Production Quality Over Feature Quantity.
- A few polished features outweigh many rough ones
- Every shipped feature must be production-ready
- Better to delay a release than ship buggy features
- Quality is non-negotiable, velocity is flexible

---

## Development Workflow

Every sprint follows this workflow:

### 1. Create Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/TICKET-number-feature-name
```

### 2. Implement Sprint
- Write code following engineering principles
- Commit frequently with clear, conventional commit messages
- Keep commits logically organized and reviewable
- Test locally throughout development

### 3. Verify CODE_REVIEW_CHECKLIST.md
Before opening a PR, verify:
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] All tests pass locally
- [ ] Documentation updated
- [ ] Commit messages follow conventional format
- [ ] No console errors or warnings

### 4. Open Pull Request
- Use PR template to document changes
- Link related issues
- Describe testing performed
- Include screenshots for UI changes

### 5. Complete Reviews
**Architecture Review** - Does this align with system design?
**Database Review** - Are data changes sound?
**UX Review** - Does this reduce friction?
**Security Review** - Are there security implications?

### 6. Merge into develop
Once all reviews pass:
- Squash commits if needed for clarity
- Use conventional commit message format
- Delete the feature branch
- Update DECISIONS.md if new patterns established

### 7. Release into main
When ready for production:
- Create release PR: `release/v0.X.Y`
- Update CHANGELOG.md with all changes
- Create git tag: `v0.X.Y`
- Merge to main with merge commit

---

## Branch Strategy

### Main Branches

| Branch | Purpose | Protection |
|--------|---------|-----------|
| `main` | Production releases | Requires PR review, all checks pass |
| `develop` | Integration branch | Requires PR review, all checks pass |

### Feature Branches

```
feature/<ticket>-<description>
fix/<ticket>-<description>
docs/<description>
refactor/<ticket>-<description>
test/<description>
chore/<description>
```

**Guidelines:**
- Branch from `develop` unless specified otherwise
- Use lowercase with hyphens
- Keep names concise and descriptive
- Delete after merge
- Include ticket number when applicable

---

## Commit Standards

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | New feature | `feat(activity): add photo upload to activities` |
| `fix` | Bug fix | `fix(workspace): resolve vehicle card layout` |
| `docs` | Documentation | `docs: update engineering principles` |
| `refactor` | Code refactoring | `refactor(db): simplify activity query` |
| `test` | Tests | `test(activity): add validation tests` |
| `chore` | Build, deps | `chore: update dependencies` |
| `perf` | Performance | `perf(timeline): optimize query performance` |

### Subject Line

- Imperative mood ("add" not "added")
- No period at end
- 50 characters or less
- Clear and specific

### Body

- Explain *what* and *why*, not *how*
- Wrap at 72 characters
- Separate from subject with blank line
- Reference related issues

### Footer

```
Closes #123
Related to #456
Breaking-Change: describe impact
```

---

## Pull Request Process

### Before Creating PR

1. **Branch is current** - `git pull origin develop` on base branch
2. **All tests pass** - Run full test suite locally
3. **Code follows standards** - Review against style guidelines
4. **Documentation updated** - Update relevant .md files

### Creating PR

1. Push feature branch to repository
2. Create PR against `develop` (or `main` for release PRs)
3. Fill in PR template completely
4. Link related issues and decisions
5. Request reviews from appropriate team members

### Merge Requirements

All PRs must pass:
- ✅ Architecture Review
- ✅ Database Review (if applicable)
- ✅ UX Review (if UI changes)
- ✅ Security Review (if security implications)
- ✅ All automated checks

---

## Code Review Process

### For Reviewers

- Review within 24 hours when possible
- Approval requires code alignment with engineering principles
- Provide constructive, respectful feedback
- Ask questions to understand intent

### For Authors

- Keep PRs focused and reviewable
- Be open to feedback and suggestions
- Respond to all comments before merging
- Ask clarifying questions if feedback is unclear

---

## Documentation Requirements

- Functions have JSDoc comments explaining *why*, not *what*
- Complex logic is explained with comments
- Commit messages are clear and conventional
- PRs include clear summaries and screenshots for UI changes

---

## Release Process

### Version Numbering

Garage OS uses [Semantic Versioning](https://semver.org/):
- **Major** (v1.0.0): Breaking changes
- **Minor** (v0.4.0): New features (backward compatible)
- **Patch** (v0.3.1): Bug fixes (backward compatible)

### Release Steps

1. Create release branch: `git checkout -b release/v0.X.Y develop`
2. Update version numbers and CHANGELOG.md
3. Create PR against `main` with title: `chore: release v0.X.Y`
4. Merge with merge commit
5. Tag release: `git tag -a v0.X.Y -m "Release v0.X.Y"`
6. Create GitHub release with changelog notes

---

Last updated: 2024
Version: 1.0.0