# TetraNex GitHub Workflow — Beginner's Guide

This guide takes four developers from "no GitHub organisation" to a company-style
workflow: protected branches, Pull Requests, code review, automatic checks, and
safe deployment. Follow the parts in order. Parts marked **(Owner)** are done once
by whoever owns the organisation; everything else is for every developer.

**Team used in the examples**

| Developer         | GitHub username (example) | Example task                 |
| ----------------- | ------------------------- | ---------------------------- |
| Kazi Musharaff    | `kazi-dev`                | Build the contact form       |
| Shaikh Sufiyan    | `sufiyan-dev`             | Add the CI notifications     |
| MD Asadullah      | `asad-dev`                | Fix a security header bug    |
| MD Owais          | `Dark-Knight07`           | Update team page content     |

Replace the usernames with your real ones. `<repo>` means your repository name.

---

## Contents

1. [Organisation setup](#1-organisation-setup)
2. [Repository setup](#2-repository-setup)
3. [Branching strategy](#3-branching-strategy)
4. [Developer workflow, step by step](#4-developer-workflow-step-by-step)
5. [Pull requests and code review](#5-pull-requests-and-code-review)
6. [Four developers at once, and merge conflicts](#6-four-developers-at-once-and-merge-conflicts)
7. [GitHub Actions: CI/CD and deployment](#7-github-actions-cicd-and-deployment)
8. [Project management](#8-project-management)
9. [Security](#9-security)
10. [Hotfixes and releases](#10-hotfixes-and-releases)
11. [Cheat sheet and troubleshooting](#11-cheat-sheet-and-troubleshooting)

---

## 0. Before anything: every developer's one-time computer setup

1. **Install Git:** https://git-scm.com/downloads (on Windows this also installs *Git Bash*).
2. **Install Node.js 22 LTS** (or newer): https://nodejs.org
3. **Install the GitHub CLI** (optional but handy): https://cli.github.com
4. **Tell Git who you are** (use the same email as your GitHub account):

   ```bash
   git config --global user.name  "Your Full Name"
   git config --global user.email "you@example.com"
   git config --global init.defaultBranch main
   git config --global pull.rebase false      # merge (not rebase) when pulling: simplest for beginners
   ```

5. **Sign in to GitHub from your computer:**

   ```bash
   gh auth login        # choose GitHub.com -> HTTPS -> "Login with a web browser"
   ```

   Git will then be able to push without asking for a password each time.

---

## 1. Organisation setup

### 1.1 Everyone: create a personal GitHub account **(each member)**

1. Go to https://github.com/signup and create an account with your own email.
2. **Turn on two-factor authentication now** (see [Part 9.1](#91-two-factor-authentication-2fa)). The
   organisation will require it.

### 1.2 Create the organisation **(Owner)**

Organisations can only be created in the web interface.

1. Sign in to GitHub. Click your **profile picture** (top right) → **Your organizations**.
2. Click **New organization**.
3. Choose a plan:
   - **Free** works for starting out, but **branch protection and required reviewers on
     private repositories need GitHub Team** (about US$4 per user per month). See
     [the plan note](#plan-note-private-repos-and-protection) below.
4. **Organization account name:** `TetraNex`.
   If the name is taken, use `TetraNex-Tech` or `TetraNexTechnologies`. Display name can still be
   "TetraNex Technologies" under *Settings → Profile*.
5. **Contact email:** a shared company address (not a personal one).
6. **This organization belongs to:** "My personal account".
7. Complete the CAPTCHA, accept the terms, and click **Next → Complete setup**.
8. Optional but recommended: *Settings → Profile* → add logo, description
   "Four Minds. One Secure Future.", and website.

### 1.3 Add the four developers **(Owner)**

1. Open https://github.com/orgs/TetraNex/people.
2. Click **Invite member**, type the developer's GitHub username (or email), click **Invite**.
3. Choose the role **Member** (not Owner) for now, then **Send invitation**.
4. Each developer opens the invitation email (or https://github.com/TetraNex) and clicks **Join**.

> **Two owners.** Make one extra person an **Owner** as well, so the organisation is never locked
> if one person is unavailable. Everyone else stays a **Member**.

### 1.4 Organisation roles explained

| Organisation role   | What they can do                                                                 |
| ------------------- | -------------------------------------------------------------------------------- |
| **Owner**           | Everything: billing, members, security settings, delete the organisation.        |
| **Member**          | Default. Access depends on teams and the *base permission* (below).              |
| **Billing manager** | Billing only, no code access.                                                    |

### 1.5 Repository permission levels explained

| Repository role | Who it is for        | Can do                                                                                          |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| **Read**        | Viewers, clients     | View and clone code, open issues                                                                 |
| **Triage**      | Project coordinators | Read + manage issues and PRs (labels, assign), no code push                                      |
| **Write**       | **Developers**       | Read + push branches, open and review PRs, merge when rules allow                                |
| **Maintain**    | Tech leads           | Write + manage some repo settings, no destructive/security settings                              |
| **Admin**       | Owners only          | Everything incl. branch protection, secrets, delete repo                                         |

### 1.6 Configure access with Teams **(Owner)**

Use **teams**, not individual invitations per repository. When someone joins or leaves, you change one place.

1. **Set base permission to Read** (or None):
   Org → **Settings → Member privileges → Base permissions → Read**.
   (Everyone can see repos; nobody can change them unless a team grants it.)
2. **Create the teams:** Org → **Teams → New team**.
   - Team **`developers`**: add all four members. Visibility: *Visible*.
   - Team **`maintainers`**: add the two most experienced people (they are also in `developers`).
3. After the repository exists (Part 2), give the teams access:
   Repo → **Settings → Collaborators and teams → Add teams**:
   - `developers` → **Write**
   - `maintainers` → **Maintain**
   - Owners keep **Admin** automatically.

Result: all four developers can contribute code. Nobody can bypass the branch rules without being an admin, and
(with the script below) we turn on **"Do not allow bypassing"** so even admins use Pull Requests.

### Plan note: private repos and protection

| Plan                      | Private repo branch protection | Environment approvals (private) |
| ------------------------- | ------------------------------ | -------------------------------- |
| Free                      | ❌ Not available               | ❌ Not available                 |
| **Team** (recommended)    | ✅                             | ✅                               |
| Free + **public** repo    | ✅                             | ✅                               |

Our code is proprietary, so **upgrade the organisation to Team** (Org → Settings → Billing and plans) before
running the setup script, or the protection steps will fail with *"Upgrade to GitHub Pro or make this repository public"*.

---

## 2. Repository setup

### 2.1 What is already prepared in this project

This repository already contains the professional baseline:

```
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              Lint, typecheck, build on every PR
│   │   ├── deploy-dev.yml      Deploy develop -> development environment
│   │   ├── deploy-prod.yml     Deploy main -> production (with approval)
│   │   └── codeql.yml          Security code scanning
│   ├── ISSUE_TEMPLATE/         Bug report + feature request forms
│   ├── CODEOWNERS              Who reviews which files
│   ├── dependabot.yml          Automatic dependency update PRs
│   └── pull_request_template.md
├── app/  components/  lib/  public/     The website
├── docs/GITHUB_WORKFLOW.md     This guide
├── scripts/setup-github.sh     One-time repo configuration
├── .env.example                Safe template of environment variables
├── .gitignore                  Keeps secrets and build output out of Git
├── CONTRIBUTING.md  LICENSE  README.md
└── vercel.json                 Stops Vercel double-deploying (Actions deploy instead)
```

- **README.md**: what the project is, how to run it, folder map.
- **.gitignore**: ignores `node_modules`, `.next`, and every `.env*` file except `.env.example`.
- **LICENSE**: proprietary "all rights reserved" (company code). Use MIT only if you intend to open-source.

### 2.2 Create the repository and configure it **(Owner)**

**Option A, recommended: run the script (one command does steps 1–7 below).**

```bash
# 1. In the project folder, commit everything first
git add -A
git commit -m "chore: initial TetraNex website"

# 2. Log in as an organisation Owner
gh auth login

# 3. Preview what will happen (no changes made)
DRY_RUN=1 ./scripts/setup-github.sh TetraNex <repo>

# 4. Do it for real
./scripts/setup-github.sh TetraNex <repo>
```

The script creates the private repo, pushes `main`, creates `develop` (set as the default branch),
allows squash merges only, deletes merged branches automatically, protects `main` and `develop`,
creates the `development` and `production` environments, turns on Dependabot and secret scanning,
and creates labels.

**Option B: the same thing in the browser.**

1. Org page → **Repositories → New repository**. Owner `TetraNex`, name `<repo>`, **Private**, *do not* tick
   "Add README/.gitignore/license" (we already have them) → **Create repository**.
2. Push the code from your computer (GitHub shows these exact commands):

   ```bash
   git branch -M main
   git remote add origin https://github.com/TetraNex/<repo>.git
   git push -u origin main
   git push origin main:develop        # create the develop branch from main
   ```

3. Repo → **Settings → General → Default branch** → pencil icon → choose `develop` → **Update**.
4. Same page, scroll to **Pull Requests**: tick **Allow squash merging** only, tick **Automatically delete head branches**.
5. Branch protection: see [2.3](#23-branch-protection-rules-in-the-ui).
6. **Settings → Collaborators and teams**: add `developers` (Write) and `maintainers` (Maintain).

### 2.3 Branch protection rules in the UI

Repo → **Settings → Branches → Add branch ruleset** (or *Add classic branch protection rule*).
Create **two** rules, one for `main` and one for `develop`, with these settings:

| Setting                                              | Value |
| ---------------------------------------------------- | ----- |
| Require a pull request before merging                | ✅    |
| ↳ Required approvals                                 | **1** |
| ↳ Dismiss stale approvals when new commits are pushed| ✅    |
| ↳ Require approval of the most recent push           | ✅ (so you cannot approve your own last-minute change) |
| Require status checks to pass                        | ✅ add **`Lint & Typecheck`** and **`Build`** |
| ↳ Require branches to be up to date                  | ✅    |
| Require conversation resolution before merging       | ✅    |
| Require linear history                               | ✅    |
| Do not allow bypassing the above settings (include administrators) | ✅ |
| Allow force pushes                                   | ❌    |
| Allow deletions                                      | ❌    |

> Status checks only appear in the search box **after they have run once**. Open a first PR, let CI run,
> then come back and add `Lint & Typecheck` and `Build`.

Effect: **nobody can push directly to `main` or `develop`**. The only way in is a Pull Request that
passed CI and got one approval from someone else.

---

## 3. Branching strategy

```
main      ●───────────────●───────────────●──────────●  (production, only via PR from develop or hotfix)
           \             /               /          /
develop     ●──●──●──●──●──●──●──●──●──●──●──●──●──●    (integration, only via PR from feature/bugfix)
               \    /   \   /        \   /
feature/*       ●──●     ●─●          ●─●
bugfix/*                       ●──●
hotfix/*        (branches from main, merges to main AND develop)
```

| Branch        | Purpose                             | Created from | Merges into                  | Lifetime       | Who pushes                  |
| ------------- | ----------------------------------- | ------------ | ---------------------------- | -------------- | --------------------------- |
| **`main`**    | **Production-ready** code. What customers see. Every commit is releasable. | n/a          | n/a                          | Permanent      | Nobody directly. PR only.   |
| **`develop`** | **Integration**. The latest finished work from everyone. Deployed to the *development* environment. | `main`       | `main` (release PR)          | Permanent      | Nobody directly. PR only.   |
| **`feature/*`** | One new feature or content change. | `develop`    | `develop`                    | Days → delete after merge | The author |
| **`bugfix/*`**  | Fix for a bug found in `develop` (not yet in production). | `develop` | `develop`                  | Hours/days → delete | The author |
| **`hotfix/*`**  | **Urgent fix to production** that cannot wait for the next release. | **`main`** | **`main` and then `develop`** | Hours → delete | The author |

**Naming:** lowercase, hyphens, short, with the issue number if there is one.
`feature/12-contact-form`, `bugfix/27-mobile-menu-overlap`, `hotfix/31-broken-cta-link`.

**Golden rules**

1. One task = one branch = one Pull Request. Keep PRs small (under ~400 changed lines is easy to review).
2. Never work directly on `develop` or `main`.
3. Update your branch from `develop` often, so conflicts stay small.
4. Delete the branch after it is merged (GitHub does this automatically with our settings).

---

## 4. Developer workflow, step by step

Example: **Kazi** builds the contact form. Every command below is run in Git Bash / a terminal.

### Step 1. Clone the repository (once per computer)

```bash
cd ~/projects                                   # any folder you like
git clone https://github.com/TetraNex/<repo>.git
cd <repo>
npm install                                     # install dependencies
cp .env.example .env.local                      # create your private env file (never committed)
```

### Step 2. Pull the latest `develop`

Do this **every time** before you start a new task.

```bash
git checkout develop         # switch to develop (it is the default, so you may already be on it)
git pull origin develop      # download everyone's latest merged work
```

### Step 3. Create your own feature branch

```bash
git checkout -b feature/12-contact-form
git branch                   # the * shows the branch you are on
```

### Step 4. Write or modify code

```bash
npm run dev -- -p 3100       # open http://localhost:3100 and work
```

Before committing, run the same checks that CI will run:

```bash
npm run check                # lint + typecheck + build — fix everything it reports
```

### Step 5. Commit with meaningful messages

```bash
git status                   # see what changed
git add components/Contact.tsx app/page.tsx      # stage specific files (safer than "git add .")
git diff --staged            # review exactly what you are about to commit
git commit -m "feat(contact): add contact form with validation"
```

Commit small and often. Use the format `type(scope): summary` (see `CONTRIBUTING.md`).
Good: `fix(nav): close mobile menu after link click`. Bad: `update`, `changes`, `asdf`.

### Step 6. Push your feature branch to GitHub

```bash
git push -u origin feature/12-contact-form        # first push (-u links the branch)
# later pushes on the same branch are just:
git push
```

### Step 7. Create a Pull Request into `develop`

**In the browser:** open the repo. GitHub shows a yellow banner *"feature/12-contact-form had recent pushes"*
→ click **Compare & pull request**.

1. **Base:** `develop` ← **compare:** `feature/12-contact-form` (check this carefully, it is the #1 beginner mistake).
2. Title: `feat(contact): add contact form with validation`.
3. Fill in the template (what/why, how tested, screenshots).
4. On the right: **Reviewers** → pick a teammate. **Assignees** → yourself. **Projects** → *TetraNex Board*. **Labels** → `enhancement`.
5. Click **Create pull request**. (Use *Create draft pull request* if it is not ready for review.)

**Or from the terminal:**

```bash
gh pr create --base develop --title "feat(contact): add contact form with validation" \
             --body "Closes #12" --reviewer sufiyan-dev
```

CI starts automatically. Wait for the green ✅ checks at the bottom of the PR.

### Step 8. Another team member reviews the code

Sufiyan opens the PR → **Files changed** tab and reviews (details in [Part 5](#5-pull-requests-and-code-review)).
You cannot approve your own PR.

### Step 9. Required approval is obtained

When Sufiyan clicks **Review changes → Approve → Submit review**, the PR shows
*"1 approving review"*. If he asks for changes, fix them locally and push again:

```bash
# edit files, then
git add -A
git commit -m "fix(contact): validate email format as requested"
git push                      # the PR updates automatically; CI re-runs
```

### Step 10. Merge into `develop`

When checks are green **and** it is approved, the **Squash and merge** button is enabled.

1. Click **Squash and merge** → keep the title (it becomes the commit message) → **Confirm squash and merge**.
2. Click **Delete branch** (automatic with our settings).
3. The merge triggers **Deploy — Development** automatically ([Part 7](#7-github-actions-cicd-and-deployment)).

### Step 11. Everyone else pulls the latest changes

Every other developer, on their computer:

```bash
git checkout develop
git pull origin develop
```

If you are in the middle of your own feature branch, bring those changes into it:

```bash
git checkout feature/15-my-other-task
git merge develop             # resolves differences now, while the PR is still small
```

Clean up your finished local branch:

```bash
git branch -d feature/12-contact-form
git fetch --prune             # forget remote branches that were deleted
```

---

## 5. Pull requests and code review

### 5.1 How to review a PR (reviewer)

1. Open the PR → **Files changed**.
2. Read the changes. Hover a line and click the blue **+** to leave a comment on that line.
   - For a multi-line suggestion: click the ± icon → *Add a suggestion* (the author can apply it in one click).
3. Tick **Viewed** on each file as you go.
4. Optionally run it locally:

   ```bash
   gh pr checkout 14          # or: git fetch origin pull/14/head:pr-14 && git checkout pr-14
   npm install && npm run dev -- -p 3100
   ```

5. Click **Review changes** (top right of Files changed), choose one:
   - **Comment**: feedback only, no decision.
   - **Approve**: *"This is ready to merge."*
   - **Request changes**: *"This must change first."* Blocks merging until you approve again.
6. Click **Submit review**.

**What to look for:** does it do what the issue asked? Is anything missing on mobile? Any secrets or
`console.log` left? Are names clear? Is anything risky (auth, data, links)?

**Be kind and specific.** Say what and why: *"Could we trim this value? An empty name currently passes validation."*

### 5.2 Responding to review (author)

- Fix the code, commit, `git push`. The PR updates itself.
- Reply to each comment, then click **Resolve conversation** (required before merging).
- Ask for another look: click the ⟳ icon next to the reviewer's name (**Re-request review**).

### 5.3 Rules enforced for you

| Rule                                    | Where it is set                        |
| --------------------------------------- | -------------------------------------- |
| At least **1 approval**                 | Branch protection                      |
| Cannot approve your own PR              | GitHub                                 |
| Approval resets if you push new commits | "Dismiss stale approvals"              |
| CI must pass                            | Required checks `Lint & Typecheck`, `Build` |
| Conversations must be resolved          | Branch protection                      |
| **No direct pushes to `main`/`develop`**| Branch protection (applies to admins too) |

Try it: `git push origin main` from a clean checkout is rejected with
*"protected branch hook declined"*. That is the system working.

---

## 6. Four developers at once, and merge conflicts

### 6.1 A normal day with four people

| Time  | Kazi (`feature/12-contact-form`) | Sufiyan (`feature/14-ci-alerts`) | Asadullah (`bugfix/18-header-bug`) | Owais (`feature/15-team-copy`) |
| ----- | ---- | ---- | ---- | ---- |
| 09:00 | pull `develop`, new branch | same | same | same |
| 11:00 | PR opened, Sufiyan reviews | works | PR opened, Owais reviews | works |
| 12:00 | **PR merged into `develop`** ✅ | | | |
| 12:30 | | `git merge develop` brings Kazi's work in | | |
| 14:00 | | PR opened | **PR merged** ✅ | `git merge develop` (gets Kazi + Asadullah) |
| 16:00 | | PR merged ✅ | | PR merged ✅ |

Because they all work on **separate branches**, nobody overwrites anyone. Git combines the
changes when each PR merges.

### 6.2 What happens when two people edit the same file

- **Different files or different parts of the same file** → Git merges them automatically. No problem.
- **The same lines of the same file** → **merge conflict**. Git cannot know whose version to keep,
  so a human decides.

### 6.3 Conflict example: Kazi and Owais both change the hero heading

`components/Hero.tsx` on `develop`:

```tsx
<h1>We build secure cloud and AI.</h1>
```

- Kazi changes it to `We build secure cloud, AI and automation.` and his PR merges first.
- Owais changes the same line to `We engineer secure cloud and AI.` and opens his PR afterwards.

GitHub shows on Owais's PR: **"This branch has conflicts that must be resolved."**

**Resolve it on your own computer (recommended):**

```bash
git checkout feature/15-team-copy
git fetch origin
git merge origin/develop
# Auto-merging components/Hero.tsx
# CONFLICT (content): Merge conflict in components/Hero.tsx
# Automatic merge failed; fix conflicts and then commit the result.

git status                     # lists files marked "both modified"
```

Open `components/Hero.tsx`. Git inserted markers:

```tsx
<<<<<<< HEAD
<h1>We engineer secure cloud and AI.</h1>
=======
<h1>We build secure cloud, AI and automation.</h1>
>>>>>>> origin/develop
```

- Between `<<<<<<< HEAD` and `=======` is **your** version.
- Between `=======` and `>>>>>>> origin/develop` is **develop's** version (Kazi's).

1. **Talk to the other person** if you are unsure which is right. A message avoids a wrong choice.
2. Edit the file so it contains the final text you want, and **delete all three marker lines**:

   ```tsx
   <h1>We engineer secure cloud, AI and automation.</h1>
   ```

3. Test: `npm run check`.
4. Finish the merge:

   ```bash
   git add components/Hero.tsx
   git commit -m "merge: resolve hero heading conflict with develop"
   git push
   ```

5. The PR's conflict warning disappears. CI re-runs; ask for re-approval if needed.

> **VS Code** shows buttons above each conflict: *Accept Current / Accept Incoming / Accept Both / Compare*.
> Use them, then check the result reads correctly.

**To abandon a merge attempt:** `git merge --abort` returns you to before you started.

**Prevent conflicts:** merge `develop` into your branch daily (`git merge origin/develop`), keep PRs small and short-lived,
and tell the team in chat before you restructure a shared file.

### 6.4 Never do these

- ❌ `git push --force` on a shared branch. It erases teammates' work (it is blocked on `main`/`develop`).
- ❌ Committing straight to `develop`/`main`.
- ❌ Keeping a branch open for weeks.
- ❌ Resolving a conflict by deleting the other person's lines without checking.

---

## 7. GitHub Actions: CI/CD and deployment

### 7.1 What each workflow does

| File              | Runs when                          | What it does                                                    |
| ----------------- | ---------------------------------- | --------------------------------------------------------------- |
| `ci.yml`          | PR → `develop`/`main`, and on push | **Lint & Typecheck** job, then **Build** job. Must pass to merge. |
| `codeql.yml`      | PR, push, weekly                   | Scans code for security vulnerabilities.                        |
| `deploy-dev.yml`  | Push to **`develop`**              | Builds and deploys to the **development** (preview) site.       |
| `deploy-prod.yml` | Push to **`main`**                 | Verifies again, **waits for approval**, deploys to **production**. |

Watch them: repo → **Actions** tab. A red ❌ opens the log; the failing step is expanded.
Re-run: **Re-run failed jobs**.

> **Tests:** this project has no test suite yet. CI runs `npm test --if-present`, so it starts
> running tests automatically as soon as someone adds a `"test"` script (for example Vitest or Jest).

### 7.2 One-time deployment setup (Vercel) **(Owner)**

1. Create an account at https://vercel.com and **Add New → Project → Import** the GitHub repo (you can sign up with the
   organisation or a company account). Accept defaults (Next.js) and let the first deploy finish or cancel it.
   `vercel.json` disables Vercel's own Git auto-deploys so **only GitHub Actions deploys**.
2. Get three values:
   - **VERCEL_TOKEN**: Vercel → *Account Settings → Tokens → Create*. Copy it immediately.
   - **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**: from your computer, run in the repo folder:

     ```bash
     npm install --global vercel
     vercel login
     vercel link            # choose the team and the project
     cat .vercel/project.json      # shows "orgId" and "projectId"  (the .vercel folder is git-ignored)
     ```

3. Store them as **GitHub secrets** (see [Part 9.2](#92-repository-secrets)).
4. **Production approval:** Repo → **Settings → Environments → production → Required reviewers** → add two people → **Save**.
   Every production deploy now pauses until one of them clicks **Review deployments → Approve**.
5. Environment variables the website needs at build/run time go in **Vercel → Project → Settings → Environment Variables**
   (separate values for *Production* and *Preview*). Never in the repository.

### 7.3 How an approved change reaches users

```
feature/x ──PR──▶ develop ──(merge)──▶ Deploy — Development  ✅ team tests it on the dev URL
                       │
                       └──release PR──▶ main ──(merge)──▶ Deploy — Production  (needs approval) 🚀
```

**Release procedure (every time you ship to production):**

```bash
# 1. Make sure develop is healthy
git checkout develop && git pull origin develop

# 2. Open a release PR develop -> main
gh pr create --base main --head develop --title "release: 2026-12-01" \
   --body "Contact form, team copy updates, header fix"
```

3. A teammate reviews and approves. CI must be green. **Merge** with **Create a merge commit**
   or **Squash and merge** as your protection allows (squash gives a clean history).
4. `Deploy — Production` starts and **waits**. A required reviewer opens
   Actions → the run → **Review deployments → production → Approve and deploy**.
5. Check the live site. Then tag the release:

   ```bash
   git checkout main && git pull origin main
   git tag -a v1.0.0 -m "Release 1.0.0"
   git push origin v1.0.0
   ```

If something is wrong: fix with a **hotfix** (Part 10) or, to go back quickly, in Vercel **Deployments → ⋯ → Promote** the previous deployment.

---

## 8. Project management

### 8.1 Create the GitHub Project board **(Owner or maintainer)**

1. Org page → **Projects → New project**.
2. Choose the **Board** template, name it **TetraNex Board**, **Create**.
3. Columns come from the **Status** field. Open the project **⋯ → Settings → Status** and set the options to exactly:
   **Todo**, **In Progress**, **In Review**, **Done** (rename the defaults, add *In Review*).
4. Turn on automation: **⋯ → Workflows**, enable:
   - *Item added to project* → Status **Todo**
   - *Pull request opened / Code review requested* → Status **In Review** (add a custom workflow if needed)
   - *Item closed / Pull request merged* → Status **Done**
5. Link the repository: project **⋯ → Settings → Manage access / Linked repositories** → select `<repo>`.
6. Add extra fields if useful: **Assignees**, **Priority** (single select), **Iteration** (sprints).

### 8.2 Use Issues for all work

- **Bug:** Repo → **Issues → New issue → Bug report** (fills the form).
- **Feature:** **Issues → New issue → Feature request**.
- Each Issue gets: **Assignee** (one developer), **Labels**, **Project: TetraNex Board**.
- The Issue number links to code: `Closes #12` in the PR description **closes the issue automatically on merge**.

### 8.3 Create and assign tasks to developers

1. Project board → **+ Add item** in the *Todo* column → type `#` and pick an issue, or **Create new issue**.
2. Open the card → **Assignees** → choose the developer.
3. Suggested split for four people:

   | Task                          | Assignee      |
   | ----------------------------- | ------------- |
   | Contact form (#12)            | Kazi          |
   | CI failure notifications (#14)| Sufiyan       |
   | Header security bug (#18)     | Asadullah     |
   | Team page content (#15)       | Owais         |

### 8.4 How a card moves

| Column          | Meaning                                | Moves when                                  |
| --------------- | -------------------------------------- | ------------------------------------------- |
| **Todo**        | Planned, not started                   | Created                                     |
| **In Progress** | A developer has a branch               | Developer drags it when they start (`git checkout -b`) |
| **In Review**   | PR is open, waiting for review         | PR opened (automation) / review requested   |
| **Done**        | Merged to `develop`                    | PR merged (automation)                      |

Hold a short **daily standup** (10 minutes): each person says what moved, what is next, what is blocked
(add the `blocked` label and a comment saying why).

---

## 9. Security

### 9.1 Two-factor authentication (2FA)

**Every member (personal account):** https://github.com/settings/security →
**Enable two-factor authentication**. Prefer an **authenticator app** or a **passkey/security key**
over SMS. **Save the recovery codes** somewhere safe (a password manager), not in the repo.

**Owner (require it for the organisation):** Org → **Settings → Authentication security →
Require two-factor authentication for everyone → Save**. Members without 2FA are removed until they enable it,
so have everyone turn it on first.

### 9.2 Repository secrets

Secrets are encrypted values (tokens, keys) that Actions can use but nobody can read back.

**Via the UI:** Repo → **Settings → Secrets and variables → Actions → New repository secret**
→ Name `VERCEL_TOKEN` → paste the value → **Add secret**. Repeat for:

| Secret              | Used by                          |
| ------------------- | -------------------------------- |
| `VERCEL_TOKEN`      | deploy-dev, deploy-prod          |
| `VERCEL_ORG_ID`     | deploy-dev, deploy-prod          |
| `VERCEL_PROJECT_ID` | deploy-dev, deploy-prod          |

**Via the CLI (value is typed, never stored in shell history):**

```bash
gh secret set VERCEL_TOKEN --repo TetraNex/<repo>        # paste when prompted
gh secret set VERCEL_ORG_ID --repo TetraNex/<repo>
gh secret set VERCEL_PROJECT_ID --repo TetraNex/<repo>
```

**Environment-scoped secrets:** for values that differ per environment (e.g. a production database
URL), use Settings → **Environments → production → Environment secrets**. Only jobs
that target `production` (and passed approval) can read them.

### 9.3 Protect environment variables

| Where                                    | What goes there                                   |
| ---------------------------------------- | ------------------------------------------------- |
| `.env.local` (your computer, git-ignored)| Your personal development values                  |
| `.env.example` (committed)               | **Names only, empty or fake values**              |
| Vercel *Environment Variables*           | Real runtime values for Preview / Production      |
| GitHub *Secrets*                         | CI/CD credentials                                 |

- Anything starting with `NEXT_PUBLIC_` is **sent to every visitor's browser**. Never put a secret there.
- Reading secrets in code: `process.env.MY_SECRET` (server only). Never log them.
- Give tokens the **minimum permission** and an **expiry date**.

### 9.4 Never commit secrets

Never commit API keys, passwords, tokens, private keys (`*.pem`), or `.env` files. `.gitignore` already blocks
`.env*` and `*.pem`. Before each commit check:

```bash
git status                    # nothing named .env* should be listed
git diff --staged             # read it; look for keys/tokens
```

**GitHub Push Protection** (enabled by the setup script) blocks pushes that contain known secret formats.

**If a secret is ever committed (even for a minute), treat it as stolen:**

1. **Revoke/rotate it immediately** at the provider (new key, delete the old one). This is the only real fix.
2. Tell the team.
3. Remove it from code and push a fix PR. (Rewriting history is optional and does *not* make the old key safe.)

### 9.5 Dependabot and security scanning

| Feature                      | What it does                                                                 | Where                                            |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| **Dependabot alerts**        | Warns when a dependency has a known vulnerability                            | Repo → **Security → Dependabot**                 |
| **Dependabot security updates** | Opens a PR that bumps the vulnerable package                              | Auto (enabled by script)                         |
| **Dependabot version updates** | Weekly PRs to keep packages current (`.github/dependabot.yml`)             | PRs targeting `develop`, prefix `chore(deps)`    |
| **Code scanning (CodeQL)**   | Finds security bugs in our code (injection, XSS …)                           | `codeql.yml` → Security → **Code scanning**      |
| **Secret scanning + push protection** | Detects and blocks committed secrets                                | Settings → **Code security**                     |

To enable manually: Repo → **Settings → Advanced Security** (or *Code security and analysis*) → enable
*Dependabot alerts*, *Dependabot security updates*, *Secret scanning*, *Push protection*, *Code scanning*.

**Reviewing Dependabot PRs:** they are normal PRs. CI runs, one teammate approves, squash-merge. Group small
updates, and read the release notes for major version bumps.

### 9.6 Other good habits

- Review **Org → Settings → Audit log** monthly. Remove people who left.
- Use SSH keys or `gh auth login`, never share one account.
- Lock your computer; use a password manager.

---

## 10. Hotfixes and releases

A **hotfix** fixes a production bug that cannot wait for the next release.

```bash
# 1. Branch from main (NOT develop)
git checkout main
git pull origin main
git checkout -b hotfix/31-broken-cta-link

# 2. Fix, check, commit, push
npm run check
git add -A
git commit -m "fix(cta): correct broken Start a project link"
git push -u origin hotfix/31-broken-cta-link

# 3. PR into main (fast review, still needs 1 approval + CI)
gh pr create --base main --title "hotfix: correct broken CTA link" --label hotfix --body "Fixes #31"
```

4. After approval and merge, **approve the production deployment** ([7.3](#73-how-an-approved-change-reaches-users)).
5. **Important: bring the fix back to `develop`** or it will be lost in the next release:

   ```bash
   git checkout develop && git pull origin develop
   git checkout -b bugfix/31-sync-hotfix
   git merge origin/main
   git push -u origin bugfix/31-sync-hotfix
   gh pr create --base develop --title "chore: sync hotfix #31 into develop"
   ```

---

## 11. Cheat sheet and troubleshooting

### Daily commands

```bash
git checkout develop && git pull origin develop       # start of day / new task
git checkout -b feature/<n>-<name>                    # new branch
git status                                            # what changed?
git add <files> && git commit -m "feat(x): ..."       # save work
git push -u origin <branch>                           # first push (later: git push)
git merge origin/develop                              # bring in teammates' work
gh pr create --base develop                           # open PR
gh pr checkout <number>                               # review someone's PR locally
git branch -d <branch> && git fetch --prune           # clean up after merge
```

### Common problems

| Problem                                                       | Fix |
| ------------------------------------------------------------- | --- |
| `remote: Permission denied` / push rejected                   | You are pushing to `main`/`develop`. Create a branch and a PR. |
| *"protected branch hook declined"*                            | Same as above, working as intended. |
| PR shows "branch has conflicts"                               | `git merge origin/develop`, fix markers, commit, push ([6.3](#63-conflict-example-kazi-and-owais-both-change-the-hero-heading)). |
| PR targets the wrong base branch                              | On the PR page: **Edit** (top right) → change base to `develop`. |
| CI "Lint & Typecheck" fails                                   | Run `npm run lint` and `npm run typecheck` locally, fix, push. |
| CI "Build" fails, works on my machine                         | Run `npm ci && npm run build` (clean install); check missing env vars. |
| Required check never appears in branch rules                  | The workflow must run once first. Open a PR, then add the check. |
| I committed to `develop` by mistake (not pushed)              | `git branch feature/my-work` (saves it), `git reset --hard origin/develop`, `git checkout feature/my-work`. |
| I committed a secret                                          | Rotate the secret now ([9.4](#94-never-commit-secrets)). |
| "Please tell me who you are" on commit                        | Set `git config --global user.name/user.email` (Part 0). |
| Deployment stuck "Waiting"                                    | A required reviewer must approve it: Actions → run → *Review deployments*. |
| "Upgrade to GitHub Pro or make this repo public"              | Branch protection needs the Team plan for private repos ([plan note](#plan-note-private-repos-and-protection)). |

### First-day checklist for the team

- [ ] All four have personal GitHub accounts **with 2FA**
- [ ] Owner created the **TetraNex** organisation and a second Owner exists
- [ ] All four joined; teams `developers` and `maintainers` created; base permission = Read
- [ ] Repo created; `setup-github.sh` ran (or UI steps done); `develop` is the default branch
- [ ] Branch protection on `main` and `develop`, checks `Lint & Typecheck` + `Build` required
- [ ] Secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` added
- [ ] `production` environment has required reviewers
- [ ] GitHub Project board created with Todo / In Progress / In Review / Done
- [ ] Each developer cloned the repo and opened one tiny practice PR (for example fix a typo in `README.md`)
- [ ] First practice PR reviewed, approved, merged, and seen on the development deployment
