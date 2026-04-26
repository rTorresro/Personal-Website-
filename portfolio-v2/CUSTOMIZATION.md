# Customization Guide

A friendly, beginner-oriented map of this portfolio site. For each thing you might want to change, this guide tells you **which file to open**, **where to look inside it**, and **what to change**.

---

## Table of contents

1. [The big picture](#1-the-big-picture)
2. [Running the site](#2-running-the-site)
3. [The most important file: `src/data.js`](#3-the-most-important-file-srcdatajs)
4. [The Home page (hero, song card, metrics)](#4-the-home-page)
5. [The About page (bio, profile photo, stat cards)](#5-the-about-page)
6. [The Resume page (skills, experience, education)](#6-the-resume-page)
7. [The Projects page](#7-the-projects-page)
8. [The Contact page (form)](#8-the-contact-page)
9. [The Navbar](#9-the-navbar)
10. [The Command Palette (Cmd-K menu)](#10-the-command-palette)
11. [Global styles, colors, and fonts](#11-global-styles-colors-and-fonts)
12. [Scroll-fade animations (`<Reveal>`)](#12-scroll-fade-animations)
13. [Images, PDFs, and other assets](#13-images-pdfs-and-other-assets)
14. [Site title, favicon, and social preview](#14-site-title-favicon-and-social-preview)
15. [Adding a brand-new page](#15-adding-a-brand-new-page)
16. [The ocean background](#16-the-ocean-background)
17. [Deployment (GitHub Pages)](#17-deployment-github-pages)

---

## 1. The big picture

The site is built with **React** (a JavaScript UI library) and **Vite** (the build tool that turns your code into something a browser can run).

Top-level layout of the project:

```
portfolio-v2/
├── index.html              ← page title, favicon, social preview tags
├── package.json            ← list of dependencies + scripts
├── vite.config.js          ← build config (incl. GitHub Pages base path)
├── public/                 ← static files served as-is (resume PDF, images)
└── src/
    ├── main.jsx            ← React entry point (rarely edited)
    ├── App.jsx             ← which page shows for which tab
    ├── App.css             ← navbar styles + page transition
    ├── index.css           ← global styles, colors, fonts
    ├── data.js             ← ★ all the text content of the site
    ├── assets/             ← images imported into components (profile, song)
    ├── components/         ← reusable UI pieces (Navbar, OceanHero, etc.)
    ├── hooks/              ← custom React hooks (currently just useReveal)
    └── pages/              ← one file per page (Home, About, Resume, …)
```

**Rule of thumb:**

- Want to **change words**? Open `src/data.js` first.
- Want to **change layout or styling**? Open the matching `.css` file in `src/pages/`.
- Want to **change behavior**? Open the matching `.jsx` file in `src/pages/` or `src/components/`.

---

## 2. Running the site

Open Terminal, `cd` into the project, and run:

```bash
npm install        # one time only — installs dependencies
npm run dev        # start the dev server (usually http://localhost:5173)
npm run build      # build the production version into dist/
npm run preview    # preview the built version locally
```

While `npm run dev` is running, every save you make hot-reloads the browser instantly.

---

## 3. The most important file: `src/data.js`

This file is the **source of truth for almost all the words on the site**. Almost every page imports from it. Editing data here is the easiest way to update the site without touching component code.

Here is what each export controls:

| Export | Where it shows up | What it controls |
| --- | --- | --- |
| `METRICS` | Home page bottom strip | The "Projects / Core Stacks / Years Building" boxes |
| `ABOUT_PARTS` | About page | The three labeled paragraphs (building / outside of code / goal) |
| `ABOUT_STATS` | About page | The grid of small fact cards (Location, University, Age, …) |
| `SKILL_GROUPS` | Resume page | Skill chips, grouped by Languages / Frameworks / Databases / Tools |
| `EXPERIENCE` | Resume page | Job entries in the timeline |
| `EDUCATION` | Resume page | School entries in the timeline |
| `PROJECTS` | Projects page | Each project card |

> Some exports (`PARTICLES`, `CODE_SNIPPETS`, `TERMINAL_LINES`, `NAME_LETTERS`, `PORTFOLIO_NARRATIVE`, `RESUME_SKILL_HIGHLIGHTS`, `CURRENTLY_BUILDING`, `RADAR_SKILLS`) exist but **aren't currently used** on any page. Safe to leave alone or delete.

### Examples

**To change a metric on the home page**, edit `METRICS`:

```js
export const METRICS = [
  { label: "Projects",       value: "8" },     // bumped from 7 → 8
  { label: "Core Stacks",    value: "3" },
  { label: "Years Building", value: "3+" }
];
```

**To add a new job to the resume**, push a new object into `EXPERIENCE`:

```js
{
  title: "Software Engineering Intern",
  org: "Some Company",
  location: "Remote",
  dates: "May 2027 – August 2027",
  bullets: [
    "Shipped feature X used by 10k users.",
    "Reduced API latency by 30%."
  ]
}
```

**To add a new project**, push a new object into `PROJECTS`:

```js
{
  title: "MyNewApp",
  description: "One-sentence pitch of what it is.",
  link: "https://github.com/yourname/MyNewApp", // optional
  status: "WIP",                                // optional badge
  stack: ["React", "TypeScript", "Node.js"],
  outcomes: [                                    // optional bullet list
    "Did one impressive thing.",
    "Did another impressive thing."
  ]
}
```

> **Tip:** Anything marked "optional" can be omitted entirely — the card will simply hide that piece.

---

## 4. The Home page

**File:** `src/pages/Home.jsx` · **Styles:** `src/pages/Home.css`

The home page has four parts:

1. The **animated ocean background** (`<OceanHero />`)
2. A **dark gradient overlay** (so text stays readable)
3. The **left column**: cycling label, name, bio, buttons, social icons
4. The **right column**: the "current favorite" song card
5. The **bottom strip**: metrics from `data.js`

### Change your name or bio

In `Home.jsx`, look for the `<h1 className="home-name">` block (around line 86) and the `<p className="home-bio">` block (around line 90). Edit the text directly.

### Change the cycling words ("full-stack developer", "cs student", …)

In `Home.jsx`, edit the `PHRASES` array near the top:

```js
const PHRASES = [
  "full-stack developer",
  "cs student",
  "problem solver",
  "builder",
];
```

To slow down or speed up the cycle, change the `3000` (milliseconds) inside `setInterval` in `CyclingLabel`.

### Change the buttons (resume download, view projects)

In `Home.jsx`, find `<div className="home-buttons">`. The first button downloads `/roger-torres-resume.pdf` from the `public/` folder. The second button switches to the projects tab via `window.setActiveSection("projects")`.

### Change the social links

In `Home.jsx`, find `<div className="home-socials">`. Each `<a>` is one icon. Update the `href` (URL) and the icon class inside `<i>` (e.g. `fab fa-github`, `fab fa-linkedin-in`, `fas fa-envelope`).

### Change the "current favorite" song

In `Home.jsx`, edit the `SONG` object near the top:

```js
const SONG = {
  title: "Hotel in Minsk",
  artist: "jonatan leandoer96",
  url: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"
};
```

To change the album art, replace `src/assets/hotel-in-minsk.png` with a new image, then update the import line at the top of `Home.jsx`:

```js
import albumArt from "../assets/your-new-art.png";
```

The Spotify-green accent color and the bouncing equalizer bars come from `Home.css` — search for `.song-card` and `song-eq-bounce`.

### Change the bottom-strip metrics

These come from `METRICS` in `src/data.js` (see [section 3](#3-the-most-important-file-srcdatajs)).

---

## 5. The About page

**File:** `src/pages/About.jsx` · **Styles:** `src/pages/About.css`

The page has three sections: the heading, your **profile photo**, three labeled **paragraphs**, and a grid of small **stat cards**.

### Change the bio paragraphs

Edit `ABOUT_PARTS` in `src/data.js`. Each entry has a `label` (the small uppercase tag) and `text` (the paragraph).

### Change the stat cards

Edit `ABOUT_STATS` in `src/data.js`. Each entry has:

- `icon` — a Font Awesome class name (e.g. `"fas fa-map-marker-alt"`). Browse icons at [fontawesome.com/icons](https://fontawesome.com/icons).
- `value` — the big text (e.g. `"Pittsburgh, PA"`)
- `label` — the small uppercase tag underneath (e.g. `"Location"`)

### Change the profile photo

Replace `src/assets/profile.jpeg` with a new image (any common format works — `.jpg`, `.png`, `.webp`). If you change the filename or extension, update the import in `About.jsx`:

```js
import profilePhoto from "../assets/profile.jpeg";  // ← match this to your file
```

### Change the photo size or border color

In `About.css`, find `.about-photo` (line 27). Adjust:

- `width` and `height` — diameter of the circle (currently `180px`)
- `border` — accent ring around the photo
- `box-shadow` — outer glow

The mobile-screen size is set separately at the bottom of the file (`@media (max-width: 480px)`, currently `96px`).

---

## 6. The Resume page

**File:** `src/pages/Resume.jsx` · **Styles:** `src/pages/Resume.css`

The page renders three sections — Skills, Experience, Education — all from `src/data.js`.

### Add or remove a skill

Edit `SKILL_GROUPS` in `src/data.js`. Add a string to the `items` array of any group:

```js
{
  title: "Languages",
  icon: "fas fa-code",
  items: ["Java", "Python", "C++", "JavaScript", "TypeScript", "HTML", "CSS", "Rust"]
  //                                                                        ^^^^^^ added
}
```

### Add a colored tech-logo icon next to a skill

Skills get small colored logos via the **devicons** library. The mapping lives at the top of `Resume.jsx`:

```js
const DEVICONS = {
  "Java":      "devicon-java-plain",
  "Python":    "devicon-python-plain",
  // ...
};
```

If you add a new skill (e.g. "Rust") and want an icon, add a line:

```js
"Rust": "devicon-rust-plain",
```

Browse names at [devicon.dev](https://devicon.dev). Skills not in this map simply render with no icon — the chip still works.

### Add a new skill *group*

Add a whole new object to `SKILL_GROUPS` in `data.js`:

```js
{
  title: "Cloud",
  icon: "fas fa-cloud",
  items: ["AWS", "GCP", "Vercel"]
}
```

### Add an experience entry

Push a new object onto `EXPERIENCE` in `data.js`. See [section 3](#3-the-most-important-file-srcdatajs) for the shape.

### Add an education entry

Same idea, but push into `EDUCATION`. The fields are: `school`, `location`, `dates`, `detail`, `bullets` (an array — pass `[]` if none).

---

## 7. The Projects page

**File:** `src/pages/Projects.jsx` · **Styles:** `src/pages/Projects.css`

Cards are rendered from `PROJECTS` in `src/data.js`. Each card supports these fields:

| Field | Required | What it does |
| --- | --- | --- |
| `title` | yes | The card heading |
| `description` | yes | The paragraph under the title |
| `stack` | yes | Array of strings — shown as small chips |
| `link` | no | If present, shows a "View on GitHub" link at the bottom |
| `status` | no | If present, shows a small badge (e.g. `"WIP"`) next to the title |
| `outcomes` | no | Array of strings — shown as a bullet list |
| `image` | no | Filename in `public/` (e.g. `"queued-preview.jpg"`) — shown at top of card |
| `imageAlt` | no | Alt text for that image |

### Add a project preview image

1. Drop the image into `public/` (e.g. `public/myproject-preview.jpg`)
2. Add `image: "myproject-preview.jpg"` to that project's entry in `data.js`
3. Optionally `imageAlt: "Screenshot of MyProject"`

### Change card layout (1 column vs 2)

In `Projects.css`:

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* ← 2 columns on desktop */
}

@media (max-width: 700px) {
  .projects-grid {
    grid-template-columns: 1fr;            /* ← 1 column on small screens */
  }
}
```

### Tweak the hover tilt effect

In `Projects.jsx`, look at `onMove` (around line 31). The `* 8` numbers control how much the card tilts in degrees:

```js
card.style.transform =
  `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
```

Lower the `8` for a subtler tilt; raise it for more drama. Set both to `0` to disable.

---

## 8. The Contact page

**File:** `src/pages/Contact.jsx` · **Styles:** `src/pages/Contact.css`

The form is wired up to **Formspree** (a free service that emails you whatever the user submits — no backend needed).

### Change where messages go

At the top of `Contact.jsx`:

```js
const FORMSPREE = "https://formspree.io/f/xvzppbqj";
```

Sign up at [formspree.io](https://formspree.io), create a new form, and replace the URL.

### Add or remove form fields

Each field is wrapped in a `<Reveal className="contact-row">` block. Copy one of the existing rows and change three things: the `id`, the `name`, and the label text. Example — adding a "Company" field:

```jsx
<Reveal className="contact-row" delay={150}>
  <label className="contact-label" htmlFor="c-company">Company</label>
  <input
    id="c-company"
    name="company"
    type="text"
    className="contact-input"
    placeholder="Where do you work?"
  />
</Reveal>
```

### Change the success/error messages

Edit the text inside the `<div className="contact-feedback contact-success">` and `contact-error` blocks.

---

## 9. The Navbar

**File:** `src/components/Navbar.jsx` · **Styles:** `src/App.css` (the `.navbar*` rules)

### Rename the brand text

In `Navbar.jsx`, line 21:

```jsx
<span className="navbar-brand">roger torres</span>
```

### Rename the navigation links

The labels live in the `LINKS` array at the top of `Navbar.jsx`:

```js
const LINKS = [
  { id: "home",     label: "~/home" },
  { id: "about",    label: "~/about" },
  // ...
];
```

The `id` must match a section in `App.jsx` (see [adding a page](#15-adding-a-brand-new-page) below). The `label` is just visual.

### Change desktop vs mobile behavior

The mobile hamburger menu kicks in at 768px. To change that breakpoint, edit the `@media (max-width: 768px)` block near the bottom of `App.css`.

---

## 10. The Command Palette

**File:** `src/components/CommandPalette.jsx` · **Styles:** `src/components/CommandPalette.css`

A searchable popup that opens with **Cmd-K** (or **Ctrl-K**).

### Add a new command

Edit the `COMMANDS` array at the top of `CommandPalette.jsx`. Each entry is one line:

```js
{
  id: "blog",
  icon: "fas fa-pen-nib",
  label: "Open Blog",
  group: "Links",
  action: () => window.open("https://yourblog.com", "_blank")
}
```

The `action` is just a function — it runs when the user picks the command.

### Change the keyboard shortcut

Search for `e.key === "k"` in `CommandPalette.jsx` (line 36) and change `"k"` to your preferred letter.

---

## 11. Global styles, colors, and fonts

**File:** `src/index.css`

Colors and fonts are defined as **CSS variables** at the top of this file:

```css
:root {
  --bg: #0a0a0a;                    /* page background */
  --text: #e5e5e5;                   /* primary text */
  --text-muted: #888;                /* secondary text */
  --text-subtle: #555;               /* tertiary text */
  --accent: #7aa2f7;                 /* the blue accent everywhere */
  --accent-rgb: 122, 162, 247;       /* same color in RGB (used for transparency) */
  --font-sans: "Inter", system-ui, …;
  --font-mono: "Share Tech Mono", …;
}
```

### Change the accent color

Update both `--accent` (the hex code) AND `--accent-rgb` (the same color in `r, g, b` form). Both must match — the RGB version is used for translucent backgrounds (like `rgba(var(--accent-rgb), 0.1)`).

Example, switching to a green accent:

```css
--accent: #4ade80;
--accent-rgb: 74, 222, 128;
```

### Change a font

`--font-sans` and `--font-mono` are loaded from Google Fonts via the `@import` line at the very top of `index.css`. To use a different font:

1. Pick a font on [fonts.google.com](https://fonts.google.com)
2. Replace the `@import url(…)` line with the one Google gives you
3. Update `--font-sans` (or `--font-mono`) to use the new font name

### Change page padding (whitespace around content)

Each page sets its own padding. Look for the `.page-home`, `.page-about`, `.page-resume`, `.page-projects`, `.page-contact` rules in their respective CSS files.

---

## 12. Scroll-fade animations

**Files:** `src/components/Reveal.jsx` and `src/hooks/useReveal.js`

Most elements fade in and slide up as you scroll. They're wrapped in `<Reveal>`:

```jsx
<Reveal delay={100}>...</Reveal>
```

- `delay` (milliseconds) staggers the animation when you have a list.
- `as="div"` (default) controls what HTML tag is rendered — change to `as="img"`, `as="button"`, etc.
- All other props (like `className`, `src`, `href`) pass through to the underlying element.

The animation itself is defined in `src/index.css`:

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}
.reveal-in {
  opacity: 1;
  transform: none;
}
```

To make the slide bigger, change `translateY(20px)` to `translateY(40px)`. To make it slower, change `400ms` to `600ms`.

The system automatically respects users who prefer reduced motion (the `@media (prefers-reduced-motion: reduce)` block) — no action needed.

---

## 13. Images, PDFs, and other assets

There are **two places** to put files, and they behave differently:

### `public/` — for files referenced by URL

Files here are served as-is at the site root. Use this for:

- The resume PDF (`public/roger-torres-resume.pdf`)
- The favicon (`public/favicon.svg`)
- Project preview images referenced by name in `data.js` (`public/queued-preview.jpg`)
- The water normal-map texture used by the ocean (`public/waternormals.jpg`)

To reference one in code, write `/filename.ext` (e.g. `/roger-torres-resume.pdf`). For files loaded inside a Three.js scene, the code uses `${import.meta.env.BASE_URL}filename` — that part handles the GitHub Pages base path automatically.

### `src/assets/` — for files imported into React components

Files here are processed by Vite (hashed for caching, optimized). Use this for things imported at the top of a component:

```js
import profilePhoto from "../assets/profile.jpeg";
import albumArt    from "../assets/hotel-in-minsk.png";
```

Then use the variable as the `src`:

```jsx
<img src={profilePhoto} alt="..." />
```

### Replacing the resume PDF

The resume is imported from `src/assets/rogerresumeFIXED17.pdf`. To swap it:

1. Drop your new PDF into `src/assets/` (e.g. `src/assets/my-new-resume.pdf`)
2. Update the import line at the top of **both** `src/pages/Home.jsx` and `src/components/CommandPalette.jsx`:

   ```js
   import resumePdf from "../assets/my-new-resume.pdf?url";
   ```

The `?url` suffix tells Vite to give you a regular URL string for the file. The download button uses `download="Roger-Torres-Resume.pdf"` to control the filename the browser saves it as — change that string if you want a different downloaded filename.

### Unused assets you can delete

- `src/assets/rayquaza.glb` — leftover from an earlier hero (no longer used)
- `src/components/GlobeHero.jsx` — old hero component, replaced by `OceanHero`
- `src/assets/hotel-in-minsk.jpg` — superseded by the `.png` version

---

## 14. Site title, favicon, and social preview

**File:** `index.html` (at the project root, NOT inside `src/`)

This is the HTML wrapper that loads your React app. Edit:

- `<title>` — the text in the browser tab
- `<meta name="description">` — the snippet that appears in Google search results
- `<meta property="og:title">` and `og:description` — what shows when someone shares your site on Twitter, LinkedIn, iMessage, Slack, etc.
- `<link rel="icon" href="/favicon.svg" />` — the tab icon (replace `public/favicon.svg`)
- `<meta name="theme-color">` — the address-bar tint on mobile

---

## 15. Adding a brand-new page

Say you want to add a page called **Blog**. You need to touch four files:

### Step 1 — Create the page component

Create `src/pages/Blog.jsx`:

```jsx
import "./Blog.css";

export default function Blog() {
  return (
    <section className="page-section page-blog">
      <h2 className="blog-heading">blog</h2>
      <p>Coming soon.</p>
    </section>
  );
}
```

And `src/pages/Blog.css` (copy structure from another page's CSS):

```css
.page-blog {
  display: flex;
  flex-direction: column;
  padding: 48px 3rem 3rem;
  max-width: 820px;
  margin: 0 auto;
}

.blog-heading {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(32px, 5vw, 48px);
  color: var(--text);
  padding-top: 2rem;
}
```

### Step 2 — Register the page in `App.jsx`

```jsx
import Blog from "./pages/Blog.jsx";

const SECTIONS = ["home", "about", "resume", "projects", "blog", "contact"];
//                                                       ^^^^^^^

const PAGES = {
  home: Home,
  about: About,
  resume: Resume,
  projects: Projects,
  blog: Blog,        // ← added
  contact: Contact,
};
```

### Step 3 — Add the link to the navbar

In `src/components/Navbar.jsx`, add a row to `LINKS`:

```js
const LINKS = [
  { id: "home",     label: "~/home" },
  { id: "about",    label: "~/about" },
  { id: "resume",   label: "~/resume" },
  { id: "projects", label: "~/projects" },
  { id: "blog",     label: "~/blog" },     // ← added
  { id: "contact",  label: "~/contact" },
];
```

### Step 4 (optional) — Add it to the Cmd-K palette

In `src/components/CommandPalette.jsx`, add an entry to `COMMANDS`:

```js
{
  id: "blog",
  icon: "fas fa-pen-nib",
  label: "Go to Blog",
  group: "Navigate",
  action: () => window.setActiveSection?.("blog")
}
```

That's it — the page is now reachable via the navbar, the URL hash (`#blog`), and the command palette.

---

## 16. The ocean background

**File:** `src/components/OceanHero.jsx` · Used by `src/pages/Home.jsx`

This is the animated ocean behind the home hero. It uses **Three.js** (a 3D library) with the `Water` and `Sky` examples.

A few knobs you can turn near the top of the file:

- `toneMappingExposure = 0.5` — overall brightness. Higher = brighter.
- `Sky` `turbidity`, `rayleigh`, `mieCoefficient`, `mieDirectionalG` — sky atmosphere. The current values give a moody dusk look.
- `phi = degToRad(90 - 2)` — sun height (the `2` is the elevation angle in degrees). Bigger numbers raise the sun (brighter sky).
- `Water` options: `sunColor` (hex), `waterColor` (hex), `distortionScale` (wave roughness).
- `scene.fog = new THREE.Fog(0x1a2030, 120, 1500)` — the haze over distant waves.

If WebGL isn't available, the component falls back to a plain dark background (`.ocean-fallback`), styled in `Home.css`.

The water-normal texture (`public/waternormals.jpg`) is what makes the wave surface look textured — don't delete it.

---

## 17. Deployment (GitHub Pages)

The site is configured to deploy at a subpath, set in `vite.config.js`:

```js
export default defineConfig({
  base: '/Personal-Website-/',
  plugins: [react()],
})
```

This means the built site expects to live at `https://yourname.github.io/Personal-Website-/`. If you rename the GitHub repo, change the `base` value to match the new repo name (keep the leading and trailing slashes).

If you ever move the site to a custom domain or to the root of GitHub Pages, change `base` to `'/'`.

To build for production:

```bash
npm run build
```

This produces a `dist/` folder. GitHub Actions (already set up in this repo) handles the deployment when you push to `main`.

---

## Quick "where do I edit X" cheat sheet

| I want to change… | Open this file |
| --- | --- |
| Any text on Home, About, Resume, or Projects | `src/data.js` |
| The cycling phrases on the home page | `src/pages/Home.jsx` (top, `PHRASES`) |
| The current favorite song | `src/pages/Home.jsx` (top, `SONG`) |
| Profile photo | Replace `src/assets/profile.jpeg` |
| Resume PDF | Replace `public/roger-torres-resume.pdf` |
| The accent color | `src/index.css` (`--accent` and `--accent-rgb`) |
| The fonts | `src/index.css` (top `@import` + `--font-sans` / `--font-mono`) |
| Navigation labels | `src/components/Navbar.jsx` (`LINKS`) |
| Cmd-K commands | `src/components/CommandPalette.jsx` (`COMMANDS`) |
| Where contact form sends | `src/pages/Contact.jsx` (`FORMSPREE`) |
| The browser tab title | `index.html` (`<title>`) |
| The ocean look | `src/components/OceanHero.jsx` |
| GitHub Pages URL path | `vite.config.js` (`base`) |
