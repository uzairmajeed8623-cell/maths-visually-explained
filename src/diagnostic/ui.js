import {assessments,resourceLinks} from './data.js';
import {itemsFor,markItem,makeReport,statusNames,skillName,sanitizeDraft} from './engine.js';
import {downloadReport} from './pdf.js';
const root=document.querySelector('[data-diagnostic-checker]');
const base=document.body.dataset.base||'';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=s=>String(s??'').replace(/<br\s*\/?>/gi,' ').replace(/<[^>]*>/g,'');
const key=t=>`maths-diagnostic-v1:${t}`;
const empty=t=>({assessmentId:assessments[t].assessment_id,student:'',entries:{}});
let tier=null,step=0,report=null;
let drafts={F:empty('F'),H:empty('H')},remember=false;
try{remember=localStorage.getItem('maths-diagnostic-remember')==='yes';if(remember)for(const t of ['F','H'])drafts[t]=sanitizeDraft(JSON.parse(localStorage.getItem(key(t))),assessments[t])||empty(t);}catch{/* Storage can be unavailable in private browsing. */}
const restored=remember&&Object.values(drafts).some(d=>Object.keys(d.entries).length);
function save(){
  if(!remember)return;
  try{localStorage.setItem('maths-diagnostic-remember','yes');for(const t of ['F','H'])localStorage.setItem(key(t),JSON.stringify(drafts[t]));}
  catch{root.querySelector('[data-save-status]').textContent='This browser could not save progress. Keep this tab open and download your report when finished.';}
}
function clearSaved(){try{for(const t of ['F','H'])localStorage.removeItem(key(t));localStorage.removeItem('maths-diagnostic-remember');}catch{}}
function focusHeading(){const el=[...root.querySelectorAll('[data-focus]')].find(e=>!e.closest('[hidden]'));el?.focus();el?.scrollIntoView({block:'start',behavior:'smooth'});}
function diagram(kind){
 const wrap=(label,inside)=>`<svg class="dc-diagram" viewBox="0 0 350 200" role="img" aria-label="${label}">${inside}<text x="245" y="192" font-size="12">Not to scale</text></svg>`;
 if(['right','right_angle'].includes(kind))return wrap('Right triangle with perpendicular sides 6 cm and 8 cm, hypotenuse x'+(kind==='right_angle'?', angle theta at bottom right':''),`<path d="M65 25V160H245Z"/><path d="M65 144H81V160"/><text x="16" y="98">6 cm</text><text x="132" y="187">8 cm</text><text x="161" y="83">x</text>${kind==='right_angle'?'<path d="M214 160A31 31 0 0 1 220 141"/><text x="197" y="152">θ</text>':''}`);
 if(kind==='L')return wrap('8 by 5 cm rectangle with a 3 by 2 cm top-right rectangle removed',`<path d="M65 30H185V85H260V160H65Z"/><path class="dc-dashed" d="M185 30H260V85"/><text x="200" y="22">3 cm</text><text x="265" y="66">2 cm</text><text x="17" y="103">5 cm</text><text x="134" y="183">8 cm</text>`);
 if(kind==='circle')return wrap('Circle centre O, central angle AOB 104 degrees; P on the opposite arc, angle APB x',`<circle cx="170" cy="92" r="75"/><path d="M111 138L170 17L229 138M111 138L170 92L229 138"/><text x="166" y="14">P</text><text x="94" y="150">A</text><text x="234" y="150">B</text><text x="175" y="89">O</text><text x="150" y="125">104°</text><text x="165" y="57">x</text>`);
 if(kind==='cosine')return wrap('Triangle with sides 7 cm and 9 cm enclosing 60 degrees; opposite side x',`<path d="M75 165H280L150 35Z"/><text x="66" y="95">7 cm</text><text x="160" y="190">9 cm</text><text x="227" y="92">x</text><path d="M107 165A32 32 0 0 0 91 137"/><text x="110" y="153">60°</text>`);
 return '';
}
root.innerHTML=`<div class="dc-picker" data-picker><p class="eyebrow">YOUR PAPER, YOUR NEXT STEP</p><h1 tabindex="-1" data-focus>Turn your answers<br>into a <em>revision plan.</em></h1><p>Use the diagnostic PDF from your email, then enter your final answers here. Choose the tier printed on your paper.</p><div class="dc-tier-grid">${Object.entries(assessments).map(([t,a])=>`<button class="dc-tier" type="button" data-tier="${t}"><span class="eyebrow">${a.assessment_id}</span><strong>${a.tier}</strong><span>18 questions · 24 checks</span><span>${a.tier==='Foundation'?'About 30':'About 35–40'} minutes on paper</span><b>Enter ${a.tier} answers →</b></button>`).join('')}</div><p class="small">No calculator for Q1–9. A calculator is allowed for Q10–18. Use the formula support on your paper. This checker assesses final answers only, with no method marks or predicted GCSE grade.</p><p class="small">Need the paper first? <a href="${base}/diagnostic/">Request your free diagnostic</a>.</p>${restored?'<p class="notice">Saved progress is available on this device. Choose its tier to continue, or start a new attempt below.</p>':''}</div><section data-work hidden></section><section data-results hidden></section><div class="dc-device"><label><input type="checkbox" data-remember ${remember?'checked':''}> Save progress on this device</label><p class="small">Optional. Your answers and report are processed in this browser and are not sent to the tutor. Use this only on your own device.</p><p class="small" data-save-status role="status"></p><button class="dc-text-button" data-reset type="button">Start a new attempt / clear saved answers</button></div><dialog class="dc-dialog" data-reset-dialog><h2>Start fresh?</h2><p>This clears the answers and saved progress for both tiers on this device. Download your report first if you want to keep it.</p><div class="dc-actions"><button class="button secondary" data-cancel-reset>Keep my answers</button><button class="button" data-confirm-reset>Clear and start again</button></div></dialog><noscript><p class="notice">Enable JavaScript to check your answers and download a report.</p></noscript>`;
const work=root.querySelector('[data-work]'), results=root.querySelector('[data-results]');
function entry(i){return drafts[tier].entries[i.response_id]||{mode:'answer',values:[]};}
function count(){const rs=itemsFor(assessments[tier]).map(i=>markItem(i,entry(i)));return rs.filter(r=>!['missing','invalid'].includes(r.status)).length;}
function renderWork(){
 const a=assessments[tier],domains=[...new Set(a.questions.map(q=>q.domain))];
 root.querySelector('[data-picker]').hidden=true;results.hidden=true;work.hidden=false;
 work.innerHTML=`<div class="dc-work-top"><div><p class="eyebrow">${a.tier.toUpperCase()} · PDF VERSION 1.0</p><h1 class="dc-stage-title" tabindex="-1" data-focus>${domains[step]}</h1></div><button type="button" class="dc-text-button" data-change-tier>Change tier</button></div><div class="dc-progress"><span data-count>${count()} of 24 checks entered</span><span>Section ${step+1} of 6</span><progress max="24" value="${count()}" aria-label="Answer entry progress"></progress></div><div class="dc-section-nav" role="group" aria-label="Question sections">${domains.map((d,n)=>`<button type="button" data-step="${n}" aria-current="${n===step?'step':'false'}"><span>${n+1}</span> ${esc(d)}</button>`).join('')}</div><label class="dc-name">First name or initials <span class="small">(optional, for your report)</span><input data-student maxlength="60" autocomplete="off" value="${esc(drafts[tier].student)}"></label><p class="dc-entry-help">Copy final answers from your paper. Use <strong>1/2</strong> for a fraction. Choose “Don’t know” or “Not yet taught” where appropriate. Blank answers can be left for an incomplete report.</p><div data-errors class="notice dc-error-summary" role="alert" hidden></div><form data-answers novalidate><div class="dc-questions">${a.questions.filter(q=>q.domain===domains[step]).map(q=>`<fieldset class="dc-question"><legend>Question ${q.number}</legend><p>${esc(text(q.prompt))}</p>${diagram(q.diagram)}${q.table?`<div class="dc-table-wrap"><table class="dc-source-table"><caption class="sr-only">Data for question ${q.number}</caption>${q.table.map((row,n)=>`<tr>${row.map((v,j)=>`<${n===0||j===0?'th':'td'}${n===0?' scope="col"':j===0?' scope="row"':''}>${esc(v)}</${n===0||j===0?'th':'td'}>`).join('')}</tr>`).join('')}</table></div>`:''}${q.options?`<ul class="dc-options">${q.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`:''}${q.items.map(i=>{
const e=entry(i),pair=i.type.endsWith('_pair'),disabled=e.mode!=='answer';
return `<div class="dc-response" data-response="${i.response_id}">${i.prompt?`<p class="dc-part">${esc(text(i.prompt))}</p>`:''}<div class="dc-response-grid"><div><label for="${i.response_id}-mode">Q${i.code} · response</label><select id="${i.response_id}-mode" data-mode="${i.response_id}">${[['answer','My answer'],['dont_know','Don’t know'],['not_yet_taught','Not yet taught']].map(([v,s])=>`<option value="${v}" ${e.mode===v?'selected':''}>${s}</option>`).join('')}</select></div><div class="dc-values">${Array.from({length:pair?2:1},(_,j)=>`<div><label for="${i.response_id}-${j}">${pair?esc(i.labels?.[j]||'Solution '+(j+1)):'Answer'}${i.unit?' ('+esc(i.unit)+')':''}</label>${i.type==='choice'?`<select id="${i.response_id}-${j}" data-value="${i.response_id}" data-index="${j}" ${disabled?'disabled':''} aria-describedby="${i.response_id}-error"><option value="">Choose an option</option>${['A','B','C','D'].map(v=>`<option ${e.values[j]===v?'selected':''}>${v}</option>`).join('')}</select>`:`<input type="text" id="${i.response_id}-${j}" data-value="${i.response_id}" data-index="${j}" value="${esc(e.values[j]||'')}" maxlength="80" autocomplete="off" autocapitalize="off" spellcheck="false" ${disabled?'disabled':''} aria-describedby="${i.response_id}-error">`}</div>`).join('')}</div></div><p class="dc-field-error" id="${i.response_id}-error" hidden></p></div>`;}).join('')}</fieldset>`).join('')}</div><div class="dc-actions"><button type="button" class="button secondary" data-previous ${step===0?'disabled':''}>← Previous</button>${step<5?'<button class="button" type="submit">Next section →</button>':'<button class="button" type="submit">See my results →</button>'}</div></form>${step<5?'<button class="dc-text-button dc-early-report" type="button" data-report>View results so far</button>':''}`;
 work.querySelector('[data-answers]').addEventListener('submit',e=>{e.preventDefault();if(!validateVisible())return;if(step<5){step++;renderWork();focusHeading();}else showReport();});
}
function validateVisible(){
 let first=null;
 for(const el of work.querySelectorAll('[data-response]')){
 const i=itemsFor(assessments[tier]).find(i=>i.response_id===el.dataset.response),r=markItem(i,entry(i)),error=el.querySelector('.dc-field-error');
 error.hidden=r.status!=='invalid';error.textContent=r.error||'';
 for(const input of el.querySelectorAll('[data-value]'))input.setAttribute('aria-invalid',String(r.status==='invalid'));
 if(r.status==='invalid'&&!first)first=el.querySelector('[data-value]:not(:disabled)');
 }
 if(first){first.focus();return false;}return true;
}
function resource(key){const r=resourceLinks[key];return r?`<a class="text-link" href="${base}/resources/${r.slug}/" target="_blank" rel="noopener noreferrer">${esc(r.label)} ↗</a>`:'';}
function showReport(){
 const candidate=makeReport(assessments[tier],drafts[tier].entries,drafts[tier].student);
 const invalid=candidate.rows.find(r=>r.status==='invalid');
 if(invalid){step=[...new Set(assessments[tier].questions.map(q=>q.domain))].indexOf(invalid.domain);renderWork();validateVisible();return;}
 if(candidate.completed===0){const e=work.querySelector('[data-errors]');e.hidden=false;e.textContent='Enter at least one answer, or choose Don’t know / Not yet taught, before generating a report.';e.scrollIntoView({block:'center'});return;}
 report=candidate;work.hidden=true;results.hidden=false;
 const c=report.counts,strong=report.domains.filter(d=>d.label==='Stronger in this sample');
 results.innerHTML=`<p class="eyebrow">${report.tier.toUpperCase()} · YOUR DIAGNOSTIC REPORT</p><h1 class="dc-stage-title" tabindex="-1" data-focus>${report.student?esc(report.student)+', here’s':'Here’s'} your starting point.</h1><p class="dc-score"><strong>${c.correct}<span> / 24</span></strong><span>checks answered correctly</span></p><p>${report.attempted} answered with a value · ${c.dont_know} don’t know · ${c.not_yet_taught} not yet taught · ${c.missing} not answered</p><p class="small">Final answers only; no method marks. This small sample is not a predicted GCSE grade. Foundation and Higher totals should not be compared.</p>${c.missing?`<p class="notice">Incomplete report: ${c.missing} check${c.missing===1?' is':'s are'} unanswered. These are missing evidence, not diagnosed weaknesses. You can edit your answers below.</p>`:''}<div class="dc-actions"><button type="button" class="button" data-download>Download my results PDF ↓</button><button type="button" class="button secondary" data-edit>Edit answers</button></div><p role="status" data-pdf-status></p><h3>Your topic snapshot</h3><div class="dc-domain-grid">${report.domains.map(d=>`<div class="dc-domain"><div><strong>${d.name}</strong><b>${d.correct}/${d.total}</b></div><meter min="0" max="${d.total}" value="${d.correct}" aria-label="${d.name}: ${d.correct} of ${d.total} correct"></meter><p>${d.label}</p><small>${d.attempted} answered · ${d.dk} DK · ${d.nt} NT · ${d.missing} blank</small></div>`).join('')}</div><h3>What went well</h3><p>${strong.length?esc(strong.map(d=>d.name).join(', '))+': stronger on the questions sampled here. Keep practising these in mixed questions.':c.correct?`You answered ${c.correct} check${c.correct===1?'':'s'} correctly. Use the answer review below to see those successes; there isn’t enough consistent evidence to label a whole area a strength yet.`:'There are no correct answers recorded yet. That gives us a starting point, not a judgement of your potential.'}</p><h3>Your next steps</h3>${report.priorities.length?`<ol class="dc-priorities">${report.priorities.map(p=>`<li><h4>${esc(p.title)}</h4><p class="small">Q${p.rows.map(r=>r.code).join(', Q')} · ${p.mixed?'Mixed evidence: some related answers were correct.':p.rows.length>1?'These checks suggest a useful area to revisit.':'This check suggests a useful area to revisit.'}</p><p>${esc(p.advice)}</p>${resource(p.key)}</li>`).join('')}</ol><p class="dc-plan">For each priority: review the method, practise a few similar questions, then try a fresh question independently a day or two later. Start with priority 1; move on when you can explain your method.</p>`:`<p>${c.not_yet_taught||c.missing?'No revision gaps can be selected from the available taught-topic responses. Complete missing checks and discuss the untaught topics before choosing more work.':'No revision gaps were found in these sampled answers. Try a mixed practice set and explain your reasoning, rather than repeating this same test.'}</p>`}${c.not_yet_taught?`<div class="notice"><strong>Not yet taught</strong><p>${report.rows.filter(r=>r.status==='not_yet_taught').map(r=>'Q'+r.code+' ('+esc(skillName(r.skill))+')').join(', ')}. Discuss when to learn these topics with your teacher; they have not been treated as revision weaknesses.</p></div>`:''}<details class="dc-review"><summary>Review all 24 answers and explanations</summary><div>${report.rows.map(r=>`<article><div class="dc-review-title"><h4>Q${r.code} · ${esc(skillName(r.skill))}</h4><span class="dc-status dc-status-${r.status}">${statusNames[r.status]}</span></div><p>Your entry: <strong>${esc(r.given)}</strong> · Expected: <strong>${esc(r.expected)}</strong></p><p>${esc(r.solution)}</p></article>`).join('')}</div></details><div class="dc-consult"><div><p class="eyebrow">MAKE SENSE OF THE NEXT STEP</p><h3>Review it together.</h3><p>Parents: bring this PDF and the student’s written working to a free 30-minute review. Your report is not sent to the tutor automatically.</p></div><a class="button" href="${base}/book/">Book a free review ↗</a></div>`;
 focusHeading();
}
root.addEventListener('input',e=>{
 const el=e.target;
 if(el.matches('[data-student]'))drafts[tier].student=el.value;
 if(el.matches('[data-value]')){
 const id=el.dataset.value,item=itemsFor(assessments[tier]).find(i=>i.response_id===id);
 const draft=drafts[tier].entries[id]||{mode:'answer',values:Array(item.type.endsWith('_pair')?2:1).fill('')};
 draft.values[Number(el.dataset.index)]=el.value;drafts[tier].entries[id]=draft;
 const err=root.querySelector('#'+id+'-error');if(err){err.hidden=true;el.removeAttribute('aria-invalid');}
 }
 if(tier){const countEl=work.querySelector('[data-count]'),progress=work.querySelector('progress');if(countEl)countEl.textContent=`${count()} of 24 checks entered`;if(progress)progress.value=count();}
 save();
});
root.addEventListener('change',e=>{
 if(e.target.matches('[data-mode]')){
 const id=e.target.dataset.mode,item=itemsFor(assessments[tier]).find(i=>i.response_id===id);
 drafts[tier].entries[id]={...entry(item),mode:e.target.value};
 root.querySelectorAll(`[data-value="${id}"]`).forEach(el=>{el.disabled=e.target.value!=='answer';el.removeAttribute('aria-invalid');});
 root.querySelector('#'+id+'-error').hidden=true;
 work.querySelector('[data-count]').textContent=`${count()} of 24 checks entered`;work.querySelector('progress').value=count();save();
 }
 if(e.target.matches('[data-remember]')){remember=e.target.checked;if(remember){save();root.querySelector('[data-save-status]').textContent||= 'Progress will be saved on this device.';}else{clearSaved();root.querySelector('[data-save-status]').textContent='Saved progress removed. Your current answers remain in this tab.';}}
});
root.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.tier){tier=b.dataset.tier;step=0;renderWork();focusHeading();}
 if(b.hasAttribute('data-change-tier')){work.hidden=true;results.hidden=true;root.querySelector('[data-picker]').hidden=false;focusHeading();}
 if(b.dataset.step!==undefined){if(!validateVisible())return;step=Number(b.dataset.step);renderWork();focusHeading();}
 if(b.hasAttribute('data-previous')){if(!validateVisible())return;step--;renderWork();focusHeading();}
 if(b.hasAttribute('data-report'))showReport();
 if(b.hasAttribute('data-edit')){report=null;step=0;renderWork();focusHeading();}
 if(b.hasAttribute('data-download')){
 b.disabled=true;const status=results.querySelector('[data-pdf-status]');status.textContent='Preparing your PDF in this browser…';
 try{await downloadReport(report,resourceLinks,root.dataset.siteUrl,base);status.textContent='Your PDF is ready. Check your downloads.';}catch{status.textContent='The PDF could not be prepared. Please try again, or use your browser’s Print → Save as PDF.';}finally{b.disabled=false;}
 }
 if(b.hasAttribute('data-reset'))root.querySelector('[data-reset-dialog]').showModal();
 if(b.hasAttribute('data-cancel-reset'))root.querySelector('[data-reset-dialog]').close();
 if(b.hasAttribute('data-confirm-reset')){clearSaved();remember=false;drafts={F:empty('F'),H:empty('H')};tier=null;step=0;report=null;root.querySelector('[data-reset-dialog]').close();root.querySelector('[data-remember]').checked=false;root.querySelector('[data-save-status]').textContent='All saved diagnostic progress has been cleared.';root.querySelector('[data-picker]').hidden=false;root.querySelector('[data-picker] .notice')?.remove();work.hidden=true;results.hidden=true;results.replaceChildren();work.replaceChildren();focusHeading();}
});
const initial=new URLSearchParams(location.search).get('tier')?.toUpperCase();
if(['F','H','FOUNDATION','HIGHER'].includes(initial)){tier=initial.startsWith('F')?'F':'H';renderWork();}
