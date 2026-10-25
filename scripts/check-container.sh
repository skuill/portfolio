#!/usr/bin/env bash
# Checks what the site container's nginx (nginx/default.conf) sends: compression, cache headers, redirects, 404.
# Usage: scripts/check-container.sh http://localhost:8080   (CI runs it against the image it built)
set -euo pipefail

base="${1:?base URL, e.g. http://localhost:8080}"
failures=0

# header <path> <name>: the value of a response header (lower-case name), with gzip accepted.
header() {
  curl -s -o /dev/null -D - -H "Accept-Encoding: gzip" "$base$1" | tr -d '\r' | awk -v name="$2" 'BEGIN { IGNORECASE = 1 } tolower($0) ~ "^" name ": " { sub(/^[^:]*: /, ""); print }'
}
status() {
  curl -s -o /dev/null -w "%{http_code}" "$base$1"
}
expect() { # expect <what> <actual> <expected>
  if [ "$2" = "$3" ]; then
    echo "ok   $1: $2"
  else
    echo "FAIL $1: expected '$3', got '$2'"
    failures=$((failures + 1))
  fi
}

page="/portfolio/"
script=$(curl -s "$base$page" | grep -o '/portfolio/assets/index-[^"]*\.js' | head -1)
style=$(curl -s "$base$page" | grep -o '/portfolio/assets/index-[^"]*\.css' | head -1)

expect "page status" "$(status "$page")" "200"
expect "page compression" "$(header "$page" content-encoding)" "gzip"
expect "page caching" "$(header "$page" cache-control)" "no-cache"
expect "page compression over HTTP/1.0 (how a proxy asks)" \
  "$(curl -s -o /dev/null -D - --http1.0 -H "Accept-Encoding: gzip" "$base$page" | tr -d '\r' | awk 'tolower($0) ~ /^content-encoding: / { print $2 }')" "gzip"
expect "script status" "$(status "$script")" "200"
expect "script compression" "$(header "$script" content-encoding)" "gzip"
expect "script caching" "$(header "$script" cache-control)" "public, max-age=31536000, immutable"
expect "style compression" "$(header "$style" content-encoding)" "gzip"
expect "style caching" "$(header "$style" cache-control)" "public, max-age=31536000, immutable"
expect "public file caching" "$(header /portfolio/favicon.ico cache-control)" "no-cache"
expect "redirect without the slash" "$(status /portfolio)" "301"
expect "redirect target" "$(header /portfolio location)" "/portfolio/"
expect "missing file" "$(status /portfolio/missing.html)" "404"

exit "$failures"
