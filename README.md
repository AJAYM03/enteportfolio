# Ajay Mukund — Engineering Portfolio

*Repository Scope: This repository documents the portfolio itself. The projects presented here have their own repositories and documentation.*

This README is about **how this portfolio was built**, why it changed, what didn't work, and why the current implementation is the way it is.

---

## 1. The Story

This portfolio started as a personal, student-oriented website. It was built as a static site and heavily leaned into a "field notes" aesthetic. It reflected how I was thinking at the time: college, cybersecurity, experiments, and small ideas.

But as my work changed, the site stopped fitting. I graduated. I joined Litmus7 as an Associate Engineer – Trainee. My focus shifted increasingly toward **architecture, systems, AI-assisted development, and research**. 

I didn't want to just update the text. The redesign wasn't just "make it prettier" — it was about making the site represent how I actually build and think now. The portfolio itself became a small engineering and design experiment.

## 2. Identity and Balance

I consider myself a builder. I follow problems, and the domain (whether it's security, queue systems, or agentic frameworks) is just wherever the problem lives.

I didn't want a generic SaaS-looking portfolio, nor did I want an immersive art project where visitors have to guess how to navigate. The current balance is informally:

- **70% professional clarity** (scanning work and contact information)
- **20% experimental web** (subtle, authored interactions)
- **10% personal weirdness** (margin notes, hand-drawn elements)

## 3. Creative Restraint

The earlier version of this site took its aesthetic too far. Everything was a scribble or an annotation. It became visual noise. 

I looked at creative web portfolios (like [Alche Studio](https://alche.studio/) and [Samsy](https://samsy.ninja/)) not to copy their layouts, but to understand their sense of **authorship**. They felt like the website itself was built as a piece of work, full of subtle discoveries.

The solution wasn't to remove all personality, but to make it selective. The page is mostly calm, and the personality comes from small, deliberate moments.

## 4. The Core Idea

The portfolio should work in two modes:
- Someone can scan it normally and understand what I do.
- Someone curious can explore and discover how parts of it work.

Interaction is optional. The website should never make the visitor work to understand it.

## 5. Projects as Visual Systems

Traditional project cards tell visitors *what* was built. 
The artifacts here try to give a small visual indication of *how* the system works:
- **AnweshanaSahayi** → Agentic investigation architecture prototype
- **MediQ** → Real-time hospital OP queue system
- **SHybridQIGA** → Vehicular fog scheduling research
- **DNSCheck** → DNS spoofing detection prototype

## 6. Technical Decisions

### Why Astro?
This portfolio is primarily static content with selective interactive behavior. Astro gives me reusable components, content and presentation separation, static output, and lightweight client-side JavaScript. It was simply a better architectural fit for this particular website.

### Why No WebGL or GSAP?
I considered more immersive interaction because of the creative-web references. But I decided not to add WebGL or GSAP simply because they were available. The current interactions could be implemented with CSS, SVG, and lightweight JavaScript. If a future interaction genuinely requires a heavier tool, that decision can change.

### The Live Clock
The live clock in the hero is a small example of the site's philosophy: the site should be mostly calm and readable, but have small details that make it feel alive. 

### Inspect the System
The "inspect the system ↗" link in the hero is intentional. The portfolio is itself something I built, so visitors should be able to inspect how it was made.

## 7. What Didn't Work

Building this was an iterative process, and some ideas were discarded:
- **Too much styling became clutter:** The old field-notes aesthetic became unreadable when overused.
- **Forced writing felt fake:** Trying to write in a quirky "casual internet voice" just sounded artificial. Understated, direct honesty worked much better.
- **Interaction for its own sake:** I realized that if an animation didn't serve a purpose or feel authored, it wasn't useful. 

## 8. Current Architecture

The repository is structured to separate content from presentation:

```text
Astro
├── src/
│   ├── components/  # Reusable UI (ProjectCard, Artifact components)
│   ├── data/        # Content data (portfolio.js)
│   ├── layouts/     # Base HTML structure
│   ├── pages/       # Astro routes (index.astro)
│   ├── scripts/     # Vanilla JS for interactions
│   └── styles/      # Global CSS variables and styling
└── public/          # Static assets (images, fonts)
```

### Tech Stack
- Astro
- HTML
- CSS
- Vanilla JavaScript
- SVG

## 9. Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 10. Deployment

The portfolio is deployed through Cloudflare and connected to the GitHub repository for continuous deployment.

Every update pushed to the repository can be built and deployed automatically through the configured Cloudflare deployment pipeline.

---

This portfolio will probably keep changing as the things I build change. Some experiments will stay. Some will get removed. That's part of building the thing.
