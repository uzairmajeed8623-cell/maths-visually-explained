import assert from 'node:assert/strict';
import fs from 'node:fs';
import {assessments,resourceLinks} from '../src/diagnostic/data.js';
import {itemsFor,markItem,makeReport,sanitizeDraft,parseNumber} from '../src/diagnostic/engine.js';
// Independently transcribed from the supplied Foundation/Higher papers and worked through.
const fixtures={F:['5','-7','11/12','51','6','7','B','A','40','30','750','90','75','125','34','10','1/2','4/5','18','1/4','10','1.9','5.5','8'],H:['11/12','9/10','B','80','7',['4','-1'],['3','-4'],'-8','40','30','8','90','10','36.9','52','8.19','5/8','5/14','0.25','1/6','1.9','2','16','C']};
const entriesFor=t=>Object.fromEntries(itemsFor(assessments[t]).map((i,n)=>[i.response_id,{mode:'answer',values:[fixtures[t][n]].flat()}]));
const item=(t,code)=>itemsFor(assessments[t]).find(i=>i.code===code);
const status=(t,code,values)=>markItem(item(t,code),{mode:'answer',values:[values].flat()}).status;
assert.equal((Math.atan(6/8)*180/Math.PI).toFixed(1),'36.9');
assert.equal(Math.sqrt(7**2+9**2-2*7*9*Math.cos(Math.PI/3)).toPrecision(3),'8.19');
for(const t of ['F','H']){
 const a=assessments[t],items=itemsFor(a);assert.equal(a.questions.length,18);assert.equal(items.length,24);assert.equal(new Set(items.map(i=>i.response_id)).size,24);
 const correct=makeReport(a,entriesFor(t));assert.equal(correct.counts.correct,24);assert.equal(correct.priorities.length,0);assert(correct.domains.every(d=>d.correct===4&&d.label==='Stronger in this sample'));
 const blank=makeReport(a,{});assert.equal(blank.counts.missing,24);assert.equal(blank.priorities.length,0);assert(blank.domains.every(d=>d.label==='Incomplete evidence'));
 for(const mode of ['dont_know','not_yet_taught']){
  const r=makeReport(a,Object.fromEntries(items.map(i=>[i.response_id,{mode,values:[]}])));assert.equal(r.counts[mode],24);assert.equal(r.counts.incorrect,0);assert.equal(r.completed,24);
  assert.equal(r.priorities.length,mode==='dont_know'?3:0);assert(r.domains.every(d=>d.label===(mode==='dont_know'?'Priority to revisit':'Partly or not yet taught')));
 }
 for(const i of items){assert(i.solution);assert(i.feedback_if_incorrect);assert(i.resource_key);assert.equal(i.marks,1);}
}
for(const [t,c,v] of [['F','1b','−7'],['F','2','22/24'],['F','3','£51.00'],['F','13a','.5'],['H','13a','0.625'],['H','14','25/100'],['F','11','34 cm²'],['F','9','90 km/h'],['H','10b','36.90°'],['H','12','8.190 cm'],['H','4b',['-1','4']],['H','5',['3','-4']]])assert.equal(status(t,c,v),'correct',`${t} ${c} ${v}`);
for(const [t,c,v] of [['F','2','.9167'],['H','13b','0.357142857'],['H','10b','36.86989765'],['H','12','8.18535277'],['H','4b',['4','4']],['H','5',['-4','3']],['F','1a','0']])assert.equal(status(t,c,v),'incorrect',`${t} ${c} ${v}`);
for(const v of ['1/0','2+3','NaN','Infinity','<img src=x>','1,00','1e100','--5','5kg'])assert.equal(status('F','1a',v),'invalid',v);
assert.equal(parseNumber('1'.repeat(81)),null);
assert.equal(status('H','4b',['4','']),'invalid');assert.equal(status('H','4b',['DK','4']),'invalid');assert.equal(status('H','4b',['','']),'missing');
assert.equal(status('F','1a','dk'),'dont_know');assert.equal(status('H','4b',['NT','']),'not_yet_taught');
const mixed=entriesFor('F');mixed['F-16a']={values:['0']};mixed['F-16b']={mode:'not_yet_taught'};mixed['F-17']={values:[]};mixed['F-18']={mode:'dont_know'};
const r=makeReport(assessments.F,mixed);assert.equal(r.counts.correct,20);assert.equal(r.domains.at(-1).label,'Incomplete evidence');assert.equal(r.priorities.length,2);
assert.equal(sanitizeDraft({assessmentId:'wrong'},assessments.F),null);
const safe=sanitizeDraft({assessmentId:assessments.F.assessment_id,student:'a'.repeat(100),entries:{'H-1a':{values:['1']},'F-1a':{mode:'bogus',values:['a'.repeat(100),true]},'F-2':{values:'bad'}}},assessments.F);
assert.equal(safe.student.length,60);assert.equal(safe.entries['F-1a'].values[0].length,80);assert.equal(safe.entries['F-1a'].mode,'answer');assert(!safe.entries['H-1a']);
const slugs=new Set(JSON.parse(fs.readFileSync('data/resources.json','utf8')).map(r=>r.slug));for(const r of Object.values(resourceLinks))assert(slugs.has(r.slug));
console.log('PASS: diagnostic marking for 48 answers; fractions, rounding, pairs, invalid input, DK/NT, incomplete evidence, priorities and draft validation.');
