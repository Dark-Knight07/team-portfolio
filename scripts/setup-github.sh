#!/usr/bin/env bash
#
# One-time GitHub repository setup for TetraNex projects.
#
# What it does (idempotent where possible):
#   1. Creates the repo in the organisation (private) and pushes the code
#   2. Creates the `main` and `develop` branches, makes `develop` the default
#   3. Configures merge settings (squash only, auto-delete merged branches)
#   4. Protects `main` and `develop` (PR + 1 approval + passing CI, no force push)
#   5. Creates `development` and `production` deployment environments
#   6. Enables Dependabot alerts/updates, secret scanning and push protection
#   7. Creates standard issue labels
#
# Prerequisites (do these first, see docs/GITHUB_WORKFLOW.md):
#   - The GitHub organisation already exists (organisations are created in the web UI)
#   - You are an organisation OWNER and have run:  gh auth login
#   - Run from the repository root, inside Git Bash / macOS / Linux terminal
#
# Usage:
#   ./scripts/setup-github.sh <org> <repo>
#   DRY_RUN=1 ./scripts/setup-github.sh TetraNex website     # print commands only
#
# NOTE: Branch protection on PRIVATE repositories requires GitHub Team (paid) or
# a public repository. On the free plan, make the repo public or upgrade.

set -euo pipefail

ORG="${1:?Usage: $0 <org> <repo>}"
REPO="${2:?Usage: $0 <org> <repo>}"
FULL="$ORG/$REPO"
CHECKS='["Lint & Typecheck","Build"]'

run() {
  if [ "${DRY_RUN:-0}" = "1" ]; then echo "DRY-RUN: $*"; else "$@"; fi
}

command -v gh >/dev/null || { echo "GitHub CLI (gh) is not installed: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run 'gh auth login' first."; exit 1; }

echo "==> 1. Repository"
if gh repo view "$FULL" >/dev/null 2>&1; then
  echo "Repository $FULL already exists, skipping creation."
else
  # Rename the local branch to main, make sure everything is committed first.
  git branch -M main
  run gh repo create "$FULL" --private --source . --remote origin --push \
    --description "TetraNex Technologies — Four Minds. One Secure Future."
fi

echo "==> 2. Branches (main = production, develop = integration)"
if ! git ls-remote --exit-code --heads origin develop >/dev/null 2>&1; then
  run git push origin main:refs/heads/develop
fi
run gh api -X PATCH "repos/$FULL" -f default_branch=develop >/dev/null

echo "==> 3. Merge settings"
run gh api -X PATCH "repos/$FULL" \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true -F allow_auto_merge=false \
  -F has_wiki=false >/dev/null

protect() {
  local branch="$1"
  echo "    protecting $branch"
  run gh api -X PUT "repos/$FULL/branches/$branch/protection" --input - <<JSON
{
  "required_status_checks": { "strict": true, "contexts": $CHECKS },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true
}
JSON
}

echo "==> 4. Branch protection"
protect main
protect develop

echo "==> 5. Deployment environments"
run gh api -X PUT "repos/$FULL/environments/development" >/dev/null
run gh api -X PUT "repos/$FULL/environments/production" --input - >/dev/null <<'JSON'
{ "deployment_branch_policy": { "protected_branches": true, "custom_branch_policies": false } }
JSON
echo "    Add 'Required reviewers' to production in: Settings -> Environments -> production"

echo "==> 6. Security features"
run gh api -X PUT "repos/$FULL/vulnerability-alerts" >/dev/null || true
run gh api -X PUT "repos/$FULL/automated-security-fixes" >/dev/null || true
run gh api -X PATCH "repos/$FULL" --input - >/dev/null <<'JSON' || echo "    (secret scanning needs a public repo or GitHub Advanced Security — enable in UI if available)"
{ "security_and_analysis": {
    "secret_scanning": { "status": "enabled" },
    "secret_scanning_push_protection": { "status": "enabled" } } }
JSON

echo "==> 7. Labels"
label() { run gh label create "$1" --repo "$FULL" --color "$2" --description "$3" --force >/dev/null; }
label bug              d73a4a "Something is broken"
label enhancement      a2eeef "New feature or improvement"
label hotfix           b60205 "Critical production fix"
label "needs-review"   fbca04 "Waiting for a reviewer"
label blocked          000000 "Cannot proceed"
label documentation    0075ca "Docs only"
label dependencies     0366d6 "Dependency updates"

cat <<EOF

Done. Remaining manual steps (see docs/GITHUB_WORKFLOW.md):
  - Add repository secrets:  gh secret set VERCEL_TOKEN --repo $FULL   (also VERCEL_ORG_ID, VERCEL_PROJECT_ID)
  - Add required reviewers to the 'production' environment
  - Create the GitHub Project board (Projects tab)
  - Require 2FA for the organisation (Org Settings -> Authentication security)
EOF
