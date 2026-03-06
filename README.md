# Doc-Portal

A centralized documentation portfolio hub by **Sulagna Sasmal** — Technical Writer & Documentation Engineer.

**Live:** `sulagnasasmal.github.io/doc-portal/`

---

## What it is

Doc-Portal is a polished, GitHub Pages–hosted hub that presents all documentation portfolio projects in one place. It matches the visual language of [sulagnasasmal.com](https://sulagnasasmal.com) and integrates DocCraft AI as a featured tool.

## Projects included

| Project | Type | Industry |
|---|---|---|
| PayPlus Payments API | API Reference | FinTech |
| PayPlus Admin Guide | Admin Guide | FinTech |
| US Payments Hub | Knowledge Base | FinTech |
| US ACH Processing Docs | Knowledge Base | FinTech |
| NICE Actimize Platform Docs | Enterprise Docs | Compliance |
| SunBridge Asset Atrium Manager | Enterprise Docs | Enterprise |
| DocCraft AI | AI Tool | AI/ML |
| PPT2Video API | API Reference | AI/ML |

## Features

- **Filterable project grid** — filter by doc type and industry
- **Live client-side search** — fuzzy search across title, description, and tags
- **Dark / light mode** — persisted in `localStorage`
- **DocCraft AI integration** — featured section + deep link
- **Responsive** — 3-column → 2-column → 1-column at breakpoints
- **Zero build step** — pure HTML/CSS/JS, GitHub Pages ready

## Design

Matches portfolio at [sulagnasasmal.com](https://sulagnasasmal.com):
- **Fonts:** Outfit (headings) · Inter (body) · JetBrains Mono (labels/code)
- **Accent:** Amber `#d97706`
- **Signature detail:** `portal.json` terminal panel in hero (mirrors `profile.json` on portfolio)

## Stack

- HTML5 + CSS Custom Properties (design tokens)
- Vanilla JavaScript (no framework, no build step)
- GitHub Pages

## Structure

```
doc-portal/
├── index.html          Home page
├── projects.html       Full filterable project grid
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── layout.css
│   │   └── components.css
│   └── js/
│       ├── theme.js
│       ├── search.js
│       └── filter.js
└── data/
    └── projects.json   Project manifest
```

## Deployment

This site deploys automatically to GitHub Pages from the `main` branch.

To deploy manually: push to `main` → GitHub Pages picks it up from `/` root.

Optional custom domain: add a `CNAME` file containing `docs.sulagnasasmal.com`.

---

*Part of the technical writing portfolio at [sulagnasasmal.com](https://sulagnasasmal.com)*
