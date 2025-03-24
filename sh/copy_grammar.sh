#!/bin/bash

set -e # Прерывать выполнение при ошибках

LOG_PREFIX="[postinstall]"
GRAMMAR_SCRIPT="./scripts/copy_grammar.js"

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
}

main "$@"
