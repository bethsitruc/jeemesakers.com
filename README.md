# Jeemes Akers Website Rebuild

This is the source code for the rebuilt personal website of Jeemes Akers. The site replicates and extends the original design previously hosted on Wix, using a modern, performant stack built with React.

> **Note:** This is a private project. It is not intended for public use, distribution, or installation. Access is limited to the site maintainer and authorized collaborators.

---

## 🌐 Project Overview

The goal of this project is to rebuild [jeemesakers.com](https://www.jeemesakers.com) as a static site that:

- Preserves the look and feel of the original Wix design
- Improves performance and maintainability
- Allows easier content updates, especially for the **Missives** (writings)
- Offers better control over structure, style, and hosting

---

## 🧱 Tech Stack

- **React** – UI framework for building reusable components
- **Vite** – Lightning-fast dev server and bundler
- **Markdown** – For managing long-form content in the Missives section
- **React Router** – Client-side routing
- **CSS Modules / Custom Stylesheets** – For modular styling
- **GitHub Pages / Static Hosting** – Optional deployment strategy

---

## 📁 Project Structure

```
jeemesakers.com/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Route-level components (Home, About, Contact, etc.)
│   ├── missives/           # Markdown files for writings
│   ├── styles/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── home.css
│   │   ├── missives.css
│   │   ├── books.css
│   │   └── contact.css
│   ├── App.jsx             # Main app layout
│   └── main.jsx            # Entry point
├── vite.config.js          # Vite configuration
├── package.json
└── README.md               # This file
```

---

## ✍️ Content Management

### Missives

Each writing is stored as an individual `.mdx` file inside `src/posts/`. The site still uses `src/posts/index.jsx` as the curated source of truth for the title, date, image, and slug shown in the missive list and on the post page.

### Importing a New Missive

Use the local importer instead of creating the file and editing `src/posts/index.jsx` by hand:

```bash
npm run import:missive -- "/absolute/path/to/missive.docx" --date 2026-03-10
```

Helpful options:

- `--date YYYY-MM-DD` sets the filename date and the date used in `src/posts/index.jsx`
- `--title "Site Title"` overrides the title used for the site list and post page
- `--slug some-slug` overrides the filename slug if needed
- `--image /images/missives/custom-image.png` sets the list image path
- `--preview` writes both an MDX preview and a simple HTML preview to `/tmp`
- `--confirm` shows the same preview, then asks before writing files
- `--dry-run` previews the import without writing files

What the importer does:

1. Converts the DOCX to MDX with pandoc
2. Removes the internal document title from the post body
3. Creates a new file in `src/posts/`
4. Inserts the matching import and metadata entry into `src/posts/index.jsx`
5. Uses `/images/missives/default-missive.svg` unless you pass `--image`

---

## 🧪 Development

> This project is private. Do not attempt to install or run without authorization.

If you are the authorized maintainer:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## 🚫 License & Access

This repository is private and maintained solely for the personal site of Jeemes Akers. All code, content, and designs are protected. Do not copy, fork, or distribute without permission.

---

## 👩‍💻 Maintainer

**Bethany Curtis**  
[GitHub Profile](https://github.com/bethsitruc)  
[LinkedIn](https://www.linkedin.com/in/bethany-curtis-2988895a)
