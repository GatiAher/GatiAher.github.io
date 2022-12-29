#!/bin/sh

# If a command fails then the deploy stops
set -e

printf "Deploying updates to GitHub...\n"

# Create commit message
msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi

# Build the project.
echo ""
echo ""
echo "Building changes in $(pwd)"
hugo -D

# Add this repos changes to git and commit/push. First 'cd' out of public
echo ""
echo ""
echo "Committing changes to $(pwd)"
git add .
git commit -m "$msg"
git push origin main
