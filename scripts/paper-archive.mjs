import fs from 'node:fs';

export function loadPaperArchive(questions) {
  const config=JSON.parse(fs.readFileSync('data/exam-papers.json','utf8'));
  const tiers=['Higher','Foundation'], sessions=['Summer','November'];
  const id=(year,session,tier,number)=>`edexcel-${year}-${session.toLowerCase()}-${number}${tier==='Higher'?'h':'f'}`;
  if(!Array.isArray(config.years)||new Set(config.years).size!==config.years.length||config.years.some(y=>!Number.isInteger(y)||y<2017||y>new Date().getFullYear()))throw Error('Invalid archive years');
  const cancelled=(year,session)=>config.unavailableSessions.find(s=>s.year===year&&s.session===session);
  const papers=[];
  for(const year of [...config.years].sort((a,b)=>b-a)) for(const tier of tiers) for(const session of sessions) {
    if(cancelled(year,session))continue;
    for(const number of [1,2,3])papers.push({id:id(year,session,tier,number),year,tier,session,number,questionPaper:'',markScheme:'',questions:[]});
  }
  const seen=new Set();
  for(const override of config.papers){
    const paper=papers.find(p=>p.id===override.id);
    if(!paper||seen.has(override.id))throw Error('Unknown or duplicate paper: '+override.id);
    seen.add(override.id);
    for(const field of ['questionPaper','markScheme']){
      const value=override[field]||'';
      if(value&&!/^https:\/\//.test(value)&&!/^\/resources\/[A-Za-z0-9_./-]+\.pdf$/.test(value))throw Error('Invalid paper file URL: '+value);
      if(value.includes('..'))throw Error('Invalid paper path');
      paper[field]=value;
    }
  }
  for(const q of questions){
    if(!q.paperId)continue;
    const paper=papers.find(p=>p.id===q.paperId);
    if(!paper)throw Error(q.slug+': unknown paperId');
    if(q.tier!==paper.tier||q.year!==paper.year||!['edexcel','pearson edexcel'].includes(q.board.toLowerCase())||q.qualification!=='GCSE'||(q.session==='June'?'Summer':q.session)!==paper.session||!q.paper.match(new RegExp('Paper\\s+'+paper.number+'\\b','i')))throw Error(q.slug+': paper reference does not match paperId');
    paper.questions.push(q);
  }
  for(const p of papers)p.questions.sort((a,b)=>a.questionNumber.localeCompare(b.questionNumber,undefined,{numeric:true}));
  return {config,papers,tiers,sessions,cancelled};
}

export function renderPaperArchive({page,esc,a,url,eyebrow},questions){
  const {config,papers,tiers,sessions,cancelled}=loadPaperArchive(questions);
  const archive=tier=>tier==='Higher'?'/past-papers/':'/past-papers/foundation/';
  const route=p=>`/past-papers/edexcel/${p.year}/${p.session.toLowerCase()}/${p.tier.toLowerCase()}/paper-${p.number}/`;
  const calculator=n=>n===1?'Non-calculator':'Calculator';
  const count=p=>p.questions.length?`${p.questions.length} solution${p.questions.length===1?'':'s'}`:p.questionPaper?'Paper available':'Files not added';
  for(const tier of tiers){
    page(archive(tier),`Edexcel ${tier} Maths Past Papers`,`Browse Edexcel GCSE ${tier} Maths papers by year, Summer or November, with question papers, mark schemes and worked solutions.`,`
      <section class="shell page-intro archive-intro">${eyebrow('PEARSON EDEXCEL · GCSE MATHS · 1MA1')}<h1>Past <em>papers.</em></h1><p>Choose your tier, year and paper.</p></section>
      <section class="shell paper-archive" aria-label="${tier} past papers">
        <div class="archive-toolbar"><nav class="tier-switch" aria-label="Paper tier">${tiers.map(t=>`<a href="${esc(url(archive(t)))}"${t===tier?' aria-current="page"':''}>${t}</a>`).join('')}</nav>${a('/past-papers/solutions/','Search all worked solutions ↗','text-link')}</div>
        <p class="archive-hint">Paper 1: non-calculator · Papers 2 &amp; 3: calculator</p>
        ${[...config.years].sort((a,b)=>b-a).map(year=>`<section class="exam-year" aria-labelledby="year-${year}"><h2 id="year-${year}">${year}</h2><div class="exam-sessions">${sessions.map(session=>{
          const unavailable=cancelled(year,session);
          return `<section class="exam-session" aria-labelledby="${session.toLowerCase()}-${year}"><h3 id="${session.toLowerCase()}-${year}">${session}</h3>${unavailable?`<p class="session-unavailable">${esc(unavailable.reason)}</p>`:`<div class="paper-options">${papers.filter(p=>p.year===year&&p.session===session&&p.tier===tier).map(p=>`<a class="paper-option" href="${esc(url(route(p)))}" aria-label="${year} ${session} ${tier} Paper ${p.number}"><strong>Paper ${p.number}<span aria-hidden="true">↗</span></strong><span${p.questions.length?' class="has-solutions"':''}>${count(p)}</span></a>`).join('')}</div>`}</section>`;
        }).join('')}</div></section>`).join('')}
      </section>`, '/past-papers/');
  }
  for(const p of papers){
    const label=`${p.session} ${p.year} · ${p.tier} · Paper ${p.number}`;
    const file=(field,title)=>`<div class="exam-file"><div><h2>${title}</h2><p>${p[field]?'PDF document':'Not added yet'}</p></div>${p[field]?a(p[field],'Open PDF ↗','button secondary'):'<span class="file-pending">Coming soon</span>'}</div>`;
    page(route(p),`Edexcel ${label}`,`Edexcel GCSE Maths ${label}: question paper, mark scheme and available question solutions.`,`
      <section class="shell detail-intro exam-paper-intro"><div class="breadcrumbs">${a(archive(p.tier),'Past papers')} <span>/</span> ${p.year} <span>/</span> ${p.session}</div>${eyebrow('PEARSON EDEXCEL · GCSE MATHS · 1MA1')}<h1>${p.session} ${p.year}<br><em>Paper ${p.number} · ${p.tier}</em></h1><p>${calculator(p.number)}</p><nav class="paper-siblings" aria-label="Other papers in this session">${papers.filter(x=>x.year===p.year&&x.session===p.session&&x.tier===p.tier).map(x=>`<a href="${esc(url(route(x)))}"${x.number===p.number?' aria-current="page"':''}>Paper ${x.number}</a>`).join('')}</nav></section>
      <section class="shell exam-files" aria-label="Paper and mark scheme">${file('questionPaper','Question paper')}${file('markScheme','Mark scheme')}</section>
      <section class="shell exam-solutions" aria-labelledby="solutions-heading"><div class="section-heading"><h2 id="solutions-heading">Question solutions</h2><span class="small">${p.questions.length} available</span></div>${p.questions.length?`<ul class="exam-question-list">${p.questions.map(q=>`<li><span class="question-number">Q${esc(q.questionNumber)}</span><div><h3>${a('/past-papers/'+q.slug+'/',esc(q.title))}</h3><p>${esc(q.topic)}</p></div><div class="question-actions">${q.videoId?a('/past-papers/'+q.slug+'/#video','Watch video ↗','button secondary'):''}${q.contentFile?a('/past-papers/'+q.slug+'/#worked-solution','Worked solution ↗','button secondary'):''}</div></li>`).join('')}</ul>`:'<div class="paper-empty"><p>Video explanations and worked solutions will appear here as they are added.</p></div>'}</section>`, '/past-papers/');
  }
  return new Map(papers.flatMap(p=>p.questions.map(q=>[q.slug,{url:route(p),label:`${p.session} ${p.year} · Paper ${p.number}`}])));
}
