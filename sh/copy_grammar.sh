#!/bin/bash

set -e

LOG_PREFIX="[postinstall]"
GRAMMAR_SCRIPT="./copy_grammars.js"

check_tmp_directory() {
  echo "$LOG_PREFIX Checking contents of /tmp/ directory..."
  if ! ls -la /tmp/; then
    echo "$LOG_PREFIX Error: Failed to list /tmp/ directory" >&2
    exit 1
  fi
  echo "$LOG_PREFIX /tmp/ directory listing completed"
}

main() {
  if [ "$NODE_ENV" != "production" ]; then
    echo "$LOG_PREFIX Skipping grammar copy (NODE_ENV=$NODE_ENV)"
    exit 0
  fi

  if [ ! -f "$GRAMMAR_SCRIPT" ]; then
    echo "$LOG_PREFIX Error: $GRAMMAR_SCRIPT not found!" >&2
    exit 1
  fi

  echo "$LOG_PREFIX Copying grammar files..."
  if ! node "$GRAMMAR_SCRIPT"; then
    echo "$LOG_PREFIX Error: Failed to execute $GRAMMAR_SCRIPT" >&2
    exit 1
  fi

  echo "$LOG_PREFIX Grammar files copied successfully"

  check_tmp_directory
}

main "$@"
