#!/usr/bin/env bash
set -e

counter=1
group=1

for file in $(ls -v *.json); do
  dir="grupo_${group}"
  mkdir -p "$dir"
  mv "$file" "$dir/"
  if [ $((counter % 100)) -eq 0 ]; then
    ((group++))
  fi
  ((counter++))
done

echo "Organizados $((counter - 1)) archivos en $group grupos."
