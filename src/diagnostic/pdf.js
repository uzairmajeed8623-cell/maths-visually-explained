import {statusNames,skillName} from './engine.js';
let libraryPromise=null,fontPromise=null;
function loadLibrary(base){
 if(window.jspdf?.jsPDF)return Promise.resolve(window.jspdf.jsPDF);
 if(!libraryPromise)libraryPromise=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src=base+'/vendor/jspdf/jspdf.umd.min.js';script.async=true;
  script.onload=()=>window.jspdf?.jsPDF?resolve(window.jspdf.jsPDF):reject(new Error('PDF library unavailable'));
  script.onerror=()=>{script.remove();reject(new Error('PDF library unavailable'));};document.head.appendChild(script);
 }).catch(e=>{libraryPromise=null;throw e;});
 return libraryPromise;
}
function loadFont(base){
 if(!fontPromise)fontPromise=fetch(base+'/fonts/DejaVuSans.ttf').then(r=>{if(!r.ok)throw new Error('Font unavailable');return r.arrayBuffer();}).then(buffer=>{
  let binary='';const bytes=new Uint8Array(buffer);for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(binary);
 }).catch(e=>{fontPromise=null;throw e;});
 return fontPromise;
}
export function createReportPDF(report,links,siteUrl,{jsPDF,font}){
 const doc=new jsPDF({unit:'mm',format:'a4',compress:true});
 doc.addFileToVFS('DejaVuSans.ttf',font);doc.addFont('DejaVuSans.ttf','Diagnostic','normal');doc.setFont('Diagnostic','normal');
 doc.setProperties({title:`${report.tier} Maths Diagnostic Report`,subject:report.assessmentId,author:'Maths, Visually Explained',creator:'Browser diagnostic checker'});
 const ink=[23,32,51],forest=[41,72,61],clay=[167,100,72],muted=[87,98,91],line=[214,221,210];
 let y=28;const left=18,width=174,bottom=273;
 function header(){doc.setFillColor(...forest);doc.rect(0,0,210,13,'F');doc.setTextColor(255,255,255);doc.setFontSize(9);doc.text('MATHS, VISUALLY EXPLAINED',left,8.5);doc.setTextColor(...ink);}
 function next(){doc.addPage();header();y=25;}
 function ensure(h){if(y+h>bottom)next();}
 function text(value,size=10,color=ink,space=3,x=left,w=width){
  doc.setFontSize(size);doc.setTextColor(...color);const lines=doc.splitTextToSize(String(value),w),lh=size*.46;
  for(const l of lines){ensure(lh);doc.text(l,x,y);y+=lh;}
  y+=space;
 }
 function heading(value){ensure(18);y+=3;text(value,16,forest,5);}
 function link(label,url){doc.setFontSize(9);doc.setTextColor(...forest);const lines=doc.splitTextToSize(label,width);for(const l of lines){ensure(5);doc.textWithLink(l,left,y,{url});y+=5;}y+=3;}
 header();
 text(report.tier.toUpperCase()+' · DIAGNOSTIC REPORT',9,clay,5);
 text('Your revision starting point',24,forest,5);
 if(report.student)text('Prepared for '+report.student,12,ink,3);
 text(new Date(report.date).toLocaleDateString('en-GB',{year:'numeric',month:'long',day:'numeric'})+' · '+report.assessmentId,9,muted,6);
 text(`${report.counts.correct} of ${report.total} checks answered correctly`,18,forest,5);
 text(`${report.attempted} answered with a value · ${report.counts.dont_know} don’t know · ${report.counts.not_yet_taught} not yet taught · ${report.counts.missing} not answered`,10,muted,5);
 text('Final answers only; no method marks. This short diagnostic is not a predicted GCSE grade or an official exam-board assessment. Foundation and Higher scores are not directly comparable.',9,muted,5);
 if(report.counts.missing)text('INCOMPLETE REPORT: unanswered checks are missing evidence, not diagnosed weaknesses. Return to the checker to complete them.',10,clay,5);
 heading('Your topic snapshot');
 for(const d of report.domains){
  ensure(20);doc.setDrawColor(...line);doc.line(left,y-2,left+width,y-2);
  doc.setTextColor(...forest);doc.setFontSize(11);doc.text(d.name,left,y+3);doc.text(`${d.correct}/${d.total}`,left+width,y+3,{align:'right'});y+=10;
  text(d.label+` · ${d.attempted} answered · ${d.dk} DK · ${d.nt} NT · ${d.missing} blank`,8.5,muted,3);
 }
 heading('What went well');
 const strong=report.domains.filter(d=>d.label==='Stronger in this sample');
 text(strong.length?strong.map(d=>d.name).join(', ')+': stronger on the questions sampled here. Keep practising these in mixed questions.':report.counts.correct?`You answered ${report.counts.correct} checks correctly. The detailed review identifies those successes; there is not enough consistent evidence to label a whole area a strength yet.`:'No correct answers are recorded yet. This is a starting point for learning, not a judgement of your potential.',10,ink,3);
 next();text('A SMALL, PRACTICAL PLAN',9,clay,5);text('What to work on next',23,forest,7);
 if(report.priorities.length){
 report.priorities.forEach((p,n)=>{
  ensure(45);heading(`${n+1}. ${p.title}`);
  text('Q'+p.rows.map(r=>r.code).join(', Q')+' · '+(p.mixed?'Mixed evidence: some related checks were correct.':'These answers suggest a useful area to revisit.'),9,muted,4);
  text(p.advice,11,ink,4);
  const r=links[p.key];if(r)link(r.label,siteUrl+'/resources/'+r.slug+'/');
 });
 heading('Put it into practice');text('Start with priority 1. Review the method, practise a few similar questions, then try a fresh question independently a day or two later. Move on when you can explain your method.',10);
 }else text(report.counts.not_yet_taught||report.counts.missing?'No revision gaps can be selected from the available taught-topic responses. Complete missing checks and discuss untaught topics before choosing more work.':'No revision gaps were found in these sampled answers. Try a mixed practice set and explain your reasoning rather than repeating this same test.',11);
 const nt=report.rows.filter(r=>r.status==='not_yet_taught');
 if(nt.length){heading('Not yet taught');text(nt.map(r=>'Q'+r.code+' · '+skillName(r.skill)).join('; '),9,muted);text('Discuss when to learn these topics with your teacher. They have not been treated as revision weaknesses.',10);}
 ensure(45);heading('Review it together');text('Parents: bring this report and the student’s written working to a free 30-minute diagnostic review. This report has not been sent to the tutor automatically.',10);link('Book a free parent and student review',siteUrl+'/book/');
 next();text('KEEP YOUR WRITTEN WORKING',9,clay,5);text('Your answer review',23,forest,6);
 text('Each check is worth one diagnostic mark. Pair questions need both values correct. DK = don’t know; NT = not yet taught. Use the explanations to reflect on your method.',9,muted,6);
 for(const r of report.rows){
  doc.setFontSize(9);const given=`Your entry: ${r.given}    |    Expected: ${r.expected}`;
  const required=15+doc.splitTextToSize(given,width).length*4.2+doc.splitTextToSize(r.solution,width).length*4.2;
  ensure(required+3);doc.setDrawColor(...line);doc.line(left,y-2,left+width,y-2);y+=3;
  text(`Q${r.code} · ${skillName(r.skill)} · ${statusNames[r.status]}`,10,r.status==='correct'?forest:ink,2);
  text(given,9,muted,2);text(r.solution,9,ink,5);
 }
 const pages=doc.getNumberOfPages();
 for(let p=1;p<=pages;p++){
  doc.setPage(p);doc.setFont('Diagnostic','normal');doc.setFontSize(8);doc.setTextColor(...muted);doc.setDrawColor(...line);doc.line(left,281,left+width,281);
  doc.text(report.assessmentId+' · Browser-generated report',left,287);doc.text(`${p} / ${pages}`,192,287,{align:'right'});
 }
 return doc;
}
export async function downloadReport(report,links,siteUrl,base){
 const [jsPDF,font]=await Promise.all([loadLibrary(base),loadFont(base)]);
 const doc=createReportPDF(report,links,siteUrl,{jsPDF,font});
 doc.save(`Maths-Diagnostic-${report.tier}-${report.date.slice(0,10)}.pdf`);
}
