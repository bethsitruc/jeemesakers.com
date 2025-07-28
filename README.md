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

Each writing is stored as an individual `.md` file inside the `src/missives` directory. Metadata (like title and date) is included in frontmatter. These are parsed and rendered on the site with pagination and routing.

### Adding a New Missive

1. Create a new Markdown file in `src/missives/`
2. Use the following frontmatter format:

```markdown
---
title: "The Title of the Missive"
date: "2025-05-01"
---
Content goes here...
```

3. The page will automatically render the new entry with correct styling and pagination.

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