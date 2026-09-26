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

## Open related practice: “Try these next”

1. Copy `examples/past-papers/practice.html` into this folder and name it
   `your-question-slug-practice.html`.
2. Replace the example questions and worked answers with your own related
   questions. Keep the `<details>` / `<summary>` structure so students can
   reveal each answer. Use LaTeX and diagram images just as in a solution.
3. Add `"practiceFile": "content/past-papers/your-question-slug-practice.html"`
   to that question's entry in `data/past-papers.json`.
4. Commit both files. GitHub Pages rebuilds the page automatically.

The site adds the “Try these next” heading and a jump link, and puts the
questions after the video/written solution. All questions and answers are
available immediately: no email, registration or form is required. Leave out
`practiceFile` when there is no related practice; no empty section is shown.
It works with video-only, written-only and combined solution pages.

The example contains original cosine-rule practice, not exam-board questions.
Label your original practice clearly and identify the source of any genuine
past-paper question. Do not publish the example as an actual exam question.
