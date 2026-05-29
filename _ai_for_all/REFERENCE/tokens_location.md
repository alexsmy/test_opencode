# Secrets & Tokens Location

## GitHub Tokens
- **Path**: `C:\Users\alexs\.secrets\github_tokens.json`
- **Contents**: 2 tokens for alexsmy account (PAT + GH CLI)
- **Scopes**: repo, delete_repo
- **Usage**: GitHub API calls (delete files, manage repos)
- **Saved**: 2026-05-29

## How to use
```python
import json
tokens = json.loads(open(r"C:\Users\alexs\.secrets\github_tokens.json").read())
pat = tokens["tokens"][0]["token"]  # PAT token
```

## Important
- NEVER commit this file to git
- NEVER log or print token values
- Store in .secrets directory (already in .gitignore)
