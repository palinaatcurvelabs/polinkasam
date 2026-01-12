#!/bin/bash

# Simple script to add a new article to your portfolio

echo "=== Add New Article ==="
echo ""

# Get article title
read -p "Article title: " title

# Get date (or use today)
read -p "Date (leave empty for today): " date
if [ -z "$date" ]; then
    date=$(date +%Y-%m-%d)
fi

# Create filename from title (lowercase, replace spaces with hyphens)
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
filename="${filename}.md"

# Create the markdown file
echo "Creating writings/$filename..."
cat > "writings/$filename" << EOF
$title

Your article content goes here.

Write as much as you want. Use **bold** and *italic* for formatting.
EOF

# Update index.json
echo "Updating writings/index.json..."
python3 << PYTHON
import json
import os

index_file = 'writings/index.json'

# Read existing entries
try:
    with open(index_file, 'r') as f:
        entries = json.load(f)
except:
    entries = []

# Add new entry at the beginning (newest first)
new_entry = {
    "title": "$title",
    "date": "$date",
    "file": "$filename"
}
entries.insert(0, new_entry)

# Write back
with open(index_file, 'w') as f:
    json.dump(entries, f, indent=2)

print(f"Added '{new_entry['title']}' to index")
PYTHON

echo ""
echo "✓ Article created: writings/$filename"
echo "✓ Now edit the file and add your content!"
echo ""
echo "To publish: git add . && git commit -m 'Add article: $title' && git push"
