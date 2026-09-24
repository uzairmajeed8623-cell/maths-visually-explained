# Written solutions

Save each written question/solution as `your-question-slug.html` here. Copy the
starter in `examples/past-papers/solution.html`, then replace its original sample
with your own question and working. Add its entry to `data/past-papers.json`.

These are HTML fragments: use headings starting at `<h2>`, paragraphs, lists,
figures and LaTeX. Do not include a full HTML page, scripts, iframes or `<h1>`.
The website supplies the heading, layout, video and navigation.

Use `\(x^2\)` for inline maths and `\[...\]` or `$$...$$` for display maths.
KaTeX supports mathematical LaTeX, not a complete `.tex` document or TikZ.
Export TikZ diagrams to SVG/PNG/WebP and put them in `public/diagrams/`.
Write `<img src="/diagrams/name.svg" alt="A helpful description">`; the build
adds the GitHub Pages repository prefix automatically.

An entry with `published: false` has no generated page and does not appear in
search or the sitemap. Its source is still visible in this public repository.
