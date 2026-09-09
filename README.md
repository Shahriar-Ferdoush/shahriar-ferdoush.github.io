# shahriar-ferdoush.github.io

My personal site. Static, hand-written, no build step and no dependencies —
open `index.html` and it works.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole page. All content lives here. |
| `css/style.css` | All styling, including light/dark and print. |
| `js/main.js` | The theme toggle. That is all the JavaScript on the site. |
| `images/profile/` | Headshot. |
| `images/projects/` | Optional entry thumbnails (see below). |
| `images/creative/` | Gallery images for "Beyond Research" — see its README. |
| `cv/` | The CV PDF — see its README. |

## Running it locally

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Editing

**Content.** Everything is in `index.html`, in the order it appears on the page.
Sections are marked with banner comments. Search for `TODO` before publishing —
those mark links and files that still need to be supplied.

**Adding a research entry or project.** Copy an existing `<article class="entry
entry--plain">` block and edit it. The pieces are:

```html
<article class="entry entry--plain">
  <div class="entry-body">
    <h3>Title</h3>
    <p class="entry-meta">Authors or stack &middot; venue or year</p>
    <p>One paragraph of description.</p>
    <p class="entry-links">
      <a href="...">code</a>
      <a href="...">paper</a>
    </p>
  </div>
</article>
```

**Adding a thumbnail to an entry.** Drop the image in `images/projects/`, remove
the `entry--plain` class, and add a thumb div as the first child:

```html
<article class="entry">
  <div class="entry-thumb"><img src="images/projects/name.png" alt="" /></div>
  <div class="entry-body">…</div>
</article>
```

**Changing the accent colour.** One line — `--accent` (and `--accent-hover`) near
the top of `css/style.css`. The dark palette has its own pair further down.

**Cache busting.** Both `css/style.css` and `js/main.js` are linked with a `?v=`
query string in `index.html`. Bump it when you change either file, or GitHub
Pages visitors may keep the old copy.

## Contact

Shahriar Ferdoush Sifat — [shahriar.ss1212@gmail.com](mailto:shahriar.ss1212@gmail.com)
· [GitHub](https://github.com/Shahriar-Ferdoush)
· [LinkedIn](https://www.linkedin.com/in/shahriar-ferdoush-sifat/)

## Pages

- `index.html` — home: research, education, experience, four selected projects, teaching, skills, awards, contact.
- `projects.html` — the full project list, grouped by kind.

See `TODO.md` for what still needs to be supplied before this goes live.
