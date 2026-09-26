import fs from 'node:fs';
import path from 'node:path';
import {validateClassification,tierValues,tierLabel,gradeLabel,youtubeId} from './catalog.mjs';

export function renderPastPapers({page,esc,url,a,eyebrow,filterSelect}) {
  const all=JSON.parse(fs.readFileSync('data/past-papers.json','utf8'));
  if(!Array.isArray(all)) throw Error('past-papers.json must contain an array');
  const slugs=new Set();
  for(const q of all) {
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(q.slug)||slugs.has(q.slug)) throw Error('Invalid or duplicate past-paper slug: '+q.slug);
    slugs.add(q.slug);
    if(typeof q.published!=='boolean') throw Error(q.slug+': published must be true or false');
  }
  const questions=all.filter(q=>q.published);
  for(const q of questions) {
    validateClassification(q);
    for(const field of ['title','description','board','qualification','session','paper','questionNumber','topic'])
      if(typeof q[field]!=='string'||!q[field].trim()) throw Error(q.slug+': missing '+field);
    if(!Number.isInteger(q.year)||q.year<1980||q.year>new Date().getFullYear()) throw Error(q.slug+': invalid exam year');
    if(q.sourceUrl && !/^https:\/\//.test(q.sourceUrl)) throw Error(q.slug+': sourceUrl must use HTTPS');
    q.videoId=youtubeId(q.youtubeUrl);
    if(!q.contentFile&&!q.videoId) throw Error(q.slug+': provide a written solution or a video');
    for(const [field,target] of [['contentFile','content'],['practiceFile','practice']]) {
      if(!q[field]) continue;
      if(!/^content\/past-papers\/[a-z0-9-]+\.html$/.test(q[field])) throw Error(q.slug+': '+field+' must use content/past-papers/your-slug.html');
      const fragment=fs.readFileSync(q[field],'utf8');
      if(!fragment.trim()||/<\/?(?:html|head|body|h1|script|iframe|form|input|button)\b/i.test(fragment)||/\bon\w+\s*=/i.test(fragment))
        throw Error(q.slug+': use an HTML fragment without scripts, forms, page tags or h1 headings');
      q[target]=fragment.replace(/\b(src|href)=(['"])(\/[^'"\s]*)\2/g,(_,attr,quote,value)=>`${attr}=${quote}${esc(url(value))}${quote}`);
    }
  }
  const route=q=>`/past-papers/${q.slug}/`;
  const reference=q=>`${q.board} · ${q.qualification} · ${q.session} ${q.year} · ${q.paper} · Q${q.questionNumber}`;
  const formats=q=>[q.contentFile?'Written solution':'',q.videoId?'Video solution':''].filter(Boolean);
  const options=field=>[...new Set(questions.map(q=>String(q[field])))].sort((a,b)=>field==='year'?Number(b)-Number(a):a.localeCompare(b));
  const cards=questions.map(q=>`<article class="paper-card" data-search="${esc([q.title,q.description,reference(q),q.topic,tierLabel(q.tier)].join(' ').toLowerCase())}" data-category="${esc(q.topic)}" data-tier="${tierValues(q.tier)}" data-grade="${q.grades.join('|')}" data-board="${esc(q.board)}" data-year="${q.year}" data-format="${q.videoId?'video':''}${q.videoId&&q.contentFile?'|':''}${q.contentFile?'written':''}"><p class="eyebrow">${esc(q.topic)}</p><h2>${a(route(q),esc(q.title))}</h2><p class="paper-reference">${esc(reference(q))}</p><p>${esc(q.description)}</p><div class="classification"><span>${tierLabel(q.tier)}</span><span>${gradeLabel(q.grades)}</span></div><div class="card-bottom"><span>${formats(q).join(' + ')}</span>${a(route(q),'View solution ↗')}</div></article>`).join('');
  page('/past-papers/','Past Paper Solutions','Find GCSE and IGCSE Maths past-paper solutions by topic, tier, approximate grade, exam board and year.',`<section class="shell page-intro catalogue-intro">${eyebrow('EXAM QUESTIONS, EXPLAINED')}<h1>Past paper<br><em>solutions.</em></h1><p>Work through the reasoning with written solutions, diagrams and video explanations.</p></section><section class="shell library section" data-library="past-papers" data-count-noun="solution"><div class="library-tools"><label class="search-label"><span class="sr-only">Search past-paper questions</span><span aria-hidden="true">⌕</span><input id="paper-search" data-catalog-search type="search" placeholder="Search a topic, paper or question number" autocomplete="off"></label><span data-catalog-count role="status" aria-live="polite">${questions.length} solutions</span></div><div class="catalog-filters">${filterSelect('category','Topic',options('topic'),'All topics')}${filterSelect('tier','Tier',['Foundation','Higher'],'All tiers')}${filterSelect('grade','Approximate grade',[1,2,3,4,5,6,7,8,9],'All grades')}${filterSelect('board','Exam board',options('board'),'All boards')}${filterSelect('year','Year',options('year'),'All years')}${filterSelect('format','Solution type',[['written','Written solution'],['video','Video solution']],'All solutions')}<button class="text-reset" data-clear-filters type="button">Clear filters</button></div><p class="small filter-help">Grades describe approximate question difficulty, not an official exam-board grading of individual questions.</p><noscript><p class="notice">Enable JavaScript to search and filter. All published solutions are listed below.</p></noscript><div class="paper-grid" data-catalog-list>${cards}</div><div class="empty" data-catalog-empty hidden><h2>No matching solutions.</h2><p>Try fewer filters or a different search.</p><button class="button secondary" data-clear-filters>Clear filters</button></div>${!questions.length?`<div class="catalogue-empty"><span class="eyebrow">THE NEXT CHAPTER</span><h2>Worked solutions are on their way.</h2><p>Past-paper questions and their explanations will appear here as they are published. In the meantime, explore the worked examples and practice questions in the resource library.</p>${a('/resources/','Explore free resources ↗','button secondary')}</div>`:''}</section>`, '/past-papers/');
  for(const q of questions) {
    const video=q.videoId?`<section class="content-section" id="video"><h2>Watch the explanation.</h2><iframe class="video" src="https://www.youtube-nocookie.com/embed/${q.videoId}" title="${esc(q.title)} — video solution" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></section>`:'';
    const practice=q.practice?`<section class="related-practice" id="try-these-next" aria-labelledby="practice-heading" data-math><p class="eyebrow">YOUR TURN</p><h2 id="practice-heading">Try these next.</h2><p class="practice-intro">Use the same ideas in a new question. Try each one before opening the worked answer.</p><p class="notice" data-math-notice role="status" hidden></p><div class="practice-questions">${q.practice}</div></section>`:'';
    page(route(q),q.title,q.description,`<section class="shell detail-intro"><div class="breadcrumbs">${a('/past-papers/','Past paper solutions')} <span>/</span> ${esc(q.topic)}</div>${eyebrow(esc(reference(q)))}<h1>${esc(q.title)}</h1><p>${esc(q.description)}</p><div class="detail-tags"><span>${tierLabel(q.tier)}</span><span>${gradeLabel(q.grades)}</span>${formats(q).map(f=>`<span>${f}</span>`).join('')}</div></section><div class="shell solution-layout"><article class="solution-content">${video}${q.content?`<div class="written-solution" data-math><p class="notice" data-math-notice role="status" hidden></p>${q.content}</div>`:''}${practice}</article><aside class="solution-aside">${q.practice?`<a class="practice-jump" href="#try-these-next">Try related questions <span aria-hidden="true">↓</span></a>`:''}<h2>Question reference</h2><dl><dt>Exam board</dt><dd>${esc(q.board)}</dd><dt>Qualification</dt><dd>${esc(q.qualification)}</dd><dt>Exam</dt><dd>${esc(q.session)} ${q.year}</dd><dt>Paper</dt><dd>${esc(q.paper)}</dd><dt>Question</dt><dd>${esc(q.questionNumber)}</dd><dt>Topic</dt><dd>${esc(q.topic)}</dd></dl><p class="small">Difficulty is an estimate. This is an independent explanation, not an official mark scheme.</p>${q.sourceUrl?a(q.sourceUrl,'Original paper ↗','text-link'):''}<p class="spaced">${a('/past-papers/','Browse all solutions ↗','text-link')}</p></aside></div>`, '/past-papers/');
  }
}
