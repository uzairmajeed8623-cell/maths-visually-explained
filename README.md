# Maths, Visually Explained

A static GCSE/IGCSE Maths website. It runs on GitHub Pages independently of ChatGPT, with no database, runtime server, API keys or package installation. A small Node script generates real HTML pages so every topic has an indexable URL and works on direct visits.

## Start here

- **Add or edit resources:** `data/resources.json`.
- **Your details and integrations:** `config/site-config.js`.
- **Public PDFs:** `public/resources/`.
- **Public images:** `public/images/` (create this folder when adding your photo).
- **Page templates:** `scripts/build.mjs`; normal resource maintenance does not require editing it.
- **Visual design:** `src/style.css`.
- **Search, menu and form attribution:** `src/app.js`.
- **Automatic deployment:** `.github/workflows/pages.yml`.
- **Generated website:** `dist/`; do not edit generated pages directly.

## What is ready, and what needs your information

Ready: responsive navigation, 8 topic pages, search/category filters, worked examples, answer reveals, a two-page Pythagoras PDF, home, diagnostic, parents, about, lessons, booking, contact and draft policy pages.

Before accepting enquiries: add your real name, photo, verified qualifications and experience, contact email, YouTube URLs, Calendly event URL and MailerLite embeds. Review the starter teaching content against your intended exam board/tier. Finish the policies for your actual business. Add your own final diagnostic pack and gated worksheets to MailerLite; these files have not been invented or included in this repository.

Until configured, email forms are visibly disabled and booking shows an honest unavailable state. They do not collect data or simulate successful submissions. Testimonials and credentials are not fabricated. Browser/device visual QA and live MailerLite/Calendly end-to-end testing remain to be performed; no account details were provided.

## Filter resources by tier and grade

Edit each entry in `data/resources.json`:

```json
"tier": "Both",
"grades": [4, 5]
```

- `tier`: `Foundation`, `Higher` or `Both`. Both-tier entries appear under either filter.
- `grades`: approximate difficulty of this resource's current practice, not an official question grade or a label for the whole topic. Use `[6, 7]` for grades 6 and 7, or `[]` for unrated. Existing starter estimates can be revised when your final worksheets are added.
- Topic, tier, grade and text search combine: a result must match all active filters. Clear filters resets everything.
- `latexFormula` is optional mathematical LaTeX for the formula on a resource page; JSON requires doubled backslashes, e.g. `"latexFormula": "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}"`. Keep `formula` as a plain-text alternative.

## Publish a past-paper solution

The **Past papers** navigation tab opens `/past-papers/`. It supports text search plus topic, tier, approximate grade, exam board, year and written/video filters. Each published question has its own shareable URL.

1. Open `examples/past-papers/question.json` and copy its object into the array in `data/past-papers.json`. Separate multiple question objects with commas. Do not overwrite existing entries.
2. Give the question a unique lowercase hyphenated `slug`. Fill the real board, qualification, exam year/session, paper code and question number. Add its title, description, topic, tier and approximate grade(s). Use `[]` if you have not rated difficulty.
3. For a **video solution**, set `youtubeUrl` to the HTTPS YouTube watch, share or Shorts link. Use `""` when there is no video; no empty player is shown.
4. For a **written solution**, copy `examples/past-papers/solution.html` to `content/past-papers/your-slug.html`. Replace the sample with your question and working. Set `contentFile` to this exact path. Use `""` for a video-only entry. Both formats can be supplied together.
5. Put diagram images in `public/diagrams/`. Within the written solution use `<img src="/diagrams/your-diagram.svg" alt="Describe the mathematical information">`. The build automatically adds the GitHub repository prefix. The optional sample diagram is in `examples/past-papers/triangle.svg`; it is not published unless copied into `public/diagrams/`.
6. Add an optional HTTPS `sourceUrl` linking to the original paper. Use only material you have permission to reproduce; you can write your own explanation and link to the original question instead of copying it.
7. Keep `published` false while preparing the entry. Set it to true and commit all its files to `main` when ready. Check GitHub Actions for a successful build/deployment, then open `/past-papers/your-slug/` and test the diagram/video.

The supplied example is original practice, **not a real past-paper question**. No exam references or videos have been invented. The live collection starts empty until you publish your first entry. Drafts do not get public website routes or sitemap entries, but their source remains visible in this public GitHub repository.

### Writing equations and diagrams

Written solution files are small HTML fragments, not full webpages. Start sections with `<h2>`, then use `<p>`, `<ol>`, `<li>`, `<figure>` and `<figcaption>`. Do not include `<h1>`, page wrappers, scripts or video iframes; the site generates those.

```html
<h2>The method</h2>
<p>Let the unknown side be \(a\). Use the cosine rule:</p>
\[a^2=b^2+c^2-2bc\cos A\]
<figure>
  <img src="/diagrams/triangle.svg" alt="Triangle with sides 7 and 9 enclosing 60 degrees; opposite side a">
  <figcaption>Diagram not drawn to scale.</figcaption>
</figure>
```

Use a **single backslash** in HTML files. `\(...\)` is inline maths; `\[...\]` or `$$...$$` is display maths. Single dollar signs are left alone so prices are not interpreted as equations. Standard aligned working and fractions are supported by [KaTeX](https://katex.org/docs/supported). Full LaTeX documents and TikZ are not compiled by the website: export diagrams from LaTeX/TikZ to SVG, PNG or WebP before uploading.

KaTeX 0.18.9 is loaded from jsDelivr, with integrity checks, only on pages containing maths. If that external service cannot load, original equation notation remains readable and a message is shown. No package installation or server is needed. Review rendered equations before sharing a new solution.

## Add a new resource in GitHub

1. Open `data/resources.json`, then click the pencil to edit.
2. Copy one complete object between `{` and `}`. Separate objects with a comma; no comma after the last object.
3. Change `title`.
4. Change `slug` to a unique lowercase hyphenated name, such as `quadratic-formula`.
5. Choose a `category`. Any new category automatically gets a filter; no navigation edit is needed.
6. Add a short `description`.
7. Add the real `youtubeUrl`, or leave it empty until published.
8. Set `tier` and `grades` as described above, then set worksheet `delivery` to `web`, `direct` or `email`.
9. Add `pdf` for direct delivery or `mailerLiteId` for email delivery.
10. Commit to `main`. The Pages workflow generates the card, route, categories, filters and related links, then publishes them.

You may also add `explanation`, `formula`, `workedExample` and `questions`. Omit optional content sections if you do not have them yet. Rich page text is treated as text, not executable HTML.

Example:

```json
{
  "title": "Quadratic Formula",
  "slug": "quadratic-formula",
  "category": "Algebra",
  "description": "Solve a quadratic when factorising is not straightforward.",
  "youtubeUrl": "",
  "featured": false,
  "level": "Higher",
  "tier": "Higher",
  "grades": [7, 8],
  "diagram": "lines",
  "explanation": "First rearrange into ax² + bx + c = 0.",
  "questions": [
    { "question": "Solve x² − 5x + 6 = 0.", "answer": "x = 2 or x = 3." }
  ],
  "worksheet": { "available": true, "delivery": "web" }
}
```

`diagram` can be `triangle`, `square`, `tree` or `lines`; these are topic preview graphics, not diagrams for every question. `featured: true` includes a resource in featured selections. The home library shows the first three featured resources in file order. The example probability resource already exists; do not add a second entry with the same slug.

## Add a public PDF

1. Upload your PDF into `public/resources/`, for example `fractions-practice.pdf`.
2. Set the resource worksheet to:

```json
"worksheet": {
  "available": true,
  "delivery": "direct",
  "pdf": "/resources/fractions-practice.pdf"
}
```

3. Commit both changes. The website handles the repository base path.

The provided Pythagoras sheet is an original sample, not an official exam-board paper. Its optional generation script needs Python `reportlab`; it is already generated and does not need Python during deployment.

## Add an email-gated worksheet

1. Keep the PDF **out of this repository**, including history. Upload it to MailerLite's file delivery facilities or an appropriate external service.
2. In MailerLite create a worksheet delivery email and an automation tied to its form/group or supported field conditions.
3. Give the resource a stable identifier, such as `quadratic_formula`.
4. Set:

```json
"worksheet": {
  "available": true,
  "delivery": "email",
  "mailerLiteId": "quadratic_formula"
}
```

5. Configure the form and automation below. Commit the resource.

Email delivery is a marketing gate, not DRM: a recipient can forward a file link. No gated PDF URL is shipped in the page source. Identifier fields are public and not secret.

## Connect MailerLite

Use **Forms → Embedded forms** in your own MailerLite account. Create the form and copy its complete HTML embed into a JavaScript template string in `config/site-config.js`:

```js
mailerLite: {
  formHtml: `PASTE COMPLETE MAILERLITE HTML HERE`,
  diagnosticFormHtml: `PASTE COMPLETE DIAGNOSTIC FORM HTML HERE`,
  resourceForms: {},
  resourceField: 'fields[resource_requested]',
  sourceField: 'fields[source]',
  videoField: 'fields[youtube_video]'
}
```

The `PASTE...` text is explanatory, not a working form. Paste the actual provider code; preserve its action, form ID, hidden anti-bot inputs, CAPTCHA, scripts and consent handling. Escape any literal backticks inside a JavaScript template string. No API key belongs here. See [MailerLite's embedded form instructions](https://www.mailerlite.com/help/how-to-create-an-embedded-form).

Create custom fields in MailerLite named `resource_requested`, `source` and `youtube_video`. Verify the exact input names in the exported HTML, and update the three field settings if needed. Each resource page automatically supplies its `mailerLiteId`; the diagnostic supplies `maths_diagnostic`. Incoming `?source=youtube&video=cosine-rule` values are preserved through internal links and, where available, session storage. Personal form data is never stored by the website.

Normal worksheet fields: first name and email, with your consent wording. Diagnostic form fields: parent/guardian first name, email, student year group, exam board, current/expected grade and target grade. Exam board choices: AQA, Edexcel, OCR, Cambridge IGCSE, Pearson Edexcel IGCSE, Other. Encourage parent/guardian signup for underage students. Match the desired short form design inside MailerLite; the disabled preview is replaced by your real embed.

For per-resource forms use a `cosine_rule` key inside `resourceForms` with the complete HTML embed as its string value in the same configuration area. This can be more reliable for repeated downloads: tie each form to a dedicated group and delivery automation, and use the identifier for reporting. MailerLite automation triggers and re-entry settings must be tested; a changed custom field alone is not a guarantee that an existing subscriber will receive a second requested resource. If you reuse a single form, configure and verify routing for each identifier in MailerLite.

Set the diagnostic form's custom success URL to `https://YOUR-SITE/diagnostic/thank-you/` (include your repository name for GitHub project sites). Enable and configure double opt-in in MailerLite if appropriate. The site's thank-you page prompts users to check for confirmation; it does not claim a browser-side submission proves delivery.

**Before enabling:** submit using your own test email, verify the resource field in MailerLite, confirm opt-in, check the correct worksheet arrives, then request a second resource with that same email. Also test invalid email, connection failure, consent and the diagnostic redirect. The site itself never bypasses MailerLite validation or invents a successful response.

Official references: [custom fields](https://www.mailerlite.com/help/how-to-create-and-use-custom-fields), [lead magnet delivery](https://www.mailerlite.com/help/how-to-send-a-freebie-lead-magnet-to-new-subscribers), [double opt-in](https://www.mailerlite.com/help/how-to-use-double-opt-in-when-collecting-subscribers).

## Change Calendly

Set `calendlyUrl` in `config/site-config.js` to the HTTPS event URL from your account. Every booking CTA leads to `/book/`, which embeds that one configured URL and offers a direct fallback link. Set your event to 30 minutes and ensure its title, timezone, availability and parent/guardian questions match the site. Test a real booking, timezone display, confirmation and cancellation. The site does not create an event in your account.

## Change contact details, tutor profile and videos

Edit the `contactEmail`, `youtubeChannel`, and `tutor` values in `config/site-config.js`. Upload a photograph to `public/images/`, then use `photo: '/images/tutor.jpg'` and a descriptive `photoAlt`. Fill qualifications only with accurate verified details. Add each published video URL to its resource in `data/resources.json`; standard YouTube watch and youtu.be URLs embed responsively. Do not leave an invented channel/video URL.

## Categories, featured resources and removal

- New category: give a resource the new category name; filters are derived automatically.
- Feature: set `featured` to `true`; move it earlier in the JSON array to prioritise it.
- Remove: delete the whole resource object and fix surrounding commas. Its page and category disappear at the next build. Existing bookmarks then show the custom 404 page.
- Hide worksheet delivery while keeping the teaching page: set `worksheet.available` to `false`.

## Host on GitHub Pages

1. Create a **public** GitHub repository for the free hosting route.
2. Upload this project's files to its root. Include `.github/workflows/pages.yml` (hidden folders can be missed by file pickers). GitHub Desktop or Git is the easiest way to include everything. `.openai/` is only Sites metadata and may be omitted from your GitHub copy.
3. Use the branch name `main`, or adjust the workflow's branch filter.
4. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Under Actions, run **Publish to GitHub Pages**, or commit a change.
6. Wait for the build and deploy jobs to finish. The deployment shows your actual GitHub Pages URL.
7. Put that URL into `siteUrl` in `config/site-config.js`, without a trailing slash, and commit again. This enables canonical URLs and sitemap generation.

The workflow derives the base path from GitHub Pages, supporting both `username.github.io/repository/` and a root/custom domain. Every route is a real directory with an `index.html`, so refreshing a resource link works without a backend or SPA fallback. The generated 404 page is included. No `npm install` is needed.

The included Sites review version does not make GitHub hosting dependent on a ChatGPT subscription. This repository is configured to publish automatically through GitHub Pages when changes are committed to `main`.

Official references: [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Custom domain later

Add the domain in repository **Settings → Pages → Custom domain**, then configure your registrar's DNS using GitHub's current instructions. Update `siteUrl` to your new HTTPS origin and commit. The Pages workflow adjusts the base path on the next build. Update MailerLite success URLs and any external YouTube links. Enable HTTPS in Pages when available. With this Actions workflow, a CNAME file is not required; the Pages setting is what matters.

See [GitHub's current custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Build locally and update

Install Node.js 20 or later, then run in the project folder:

```sh
node scripts/build.mjs
node scripts/check.mjs
```

For a repository subpath on macOS/Linux:

```sh
BASE_PATH=/my-repo node scripts/build.mjs
BASE_PATH=/my-repo node scripts/check.mjs
```

On PowerShell set `$env:BASE_PATH='/my-repo'` before both commands. Clear it with `Remove-Item Env:BASE_PATH` to build at the root again.

Use any static preview server for `dist/`; double-clicking HTML files is not representative of hosting because URLs are site-relative. Normal future updates only need edits and commits in GitHub. The generated `dist/` directory is excluded from source control; the workflow rebuilds it from source on every deployment.

## Maintenance boundaries

There are no accounts, admin pages, databases or secret keys. GitHub is the content editor. MailerLite handles subscriptions and delivery; Calendly handles bookings. Search runs locally. Fonts are system fonts and the diagrams are SVG, keeping pages lightweight. YouTube embeds load only on configured lesson pages; booking loads Calendly only when configured. Policies must describe the providers actually enabled.
