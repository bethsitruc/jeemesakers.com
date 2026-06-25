# Collaborating on jeemesakers.com

This repository is not open for public contribution. Please do not fork this repository, submit unsolicited pull requests, or use the source code, content, or design in another project.

Approved collaborators should work from the private project plan or issue assigned by the maintainer.

## Project Overview

The site rebuild preserves and extends the original Jeemes Akers website with a modern static React implementation.

Goals:

- Preserve the look and feel of the original Wix design.
- Improve performance and maintainability.
- Make content updates easier, especially for Missives.
- Keep better control over structure, style, and hosting.

## Tech Stack

- React
- Vite
- Markdown/MDX for long-form content
- React Router
- Custom CSS
- Static hosting

## Content Management

Each Missive is stored as an individual `.mdx` file inside `src/posts/`. The site uses `src/posts/index.jsx` as the curated source of truth for the title, date, image, and slug shown in the Missive list and post page.

### Importing a New Missive

Use the local importer instead of creating the file and editing `src/posts/index.jsx` by hand:

```bash
npm run import:missive -- "/absolute/path/to/missive.docx" --date 2026-03-10
```

Helpful options:

- `--date YYYY-MM-DD` sets the filename date and the date used in `src/posts/index.jsx`.
- `--title "Site Title"` overrides the title used for the site list and post page.
- `--slug some-slug` overrides the filename slug if needed.
- `--image /images/missives/custom-image.png` sets the list image path.
- `--preview` writes both an MDX preview and a simple HTML preview to `/tmp`.
- `--confirm` shows the same preview, then asks before writing files.
- `--dry-run` previews the import without writing files.

## Development

Authorized collaborators can use:

```bash
npm install
npm run dev
npm run build
npm run preview
```
