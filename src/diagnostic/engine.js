// Pure, deterministic marking. No network, storage, eval or floating-point tolerances.
export const statusNames = {correct:'Correct',incorrect:'Revisit',dont_know:'Don’t know',not_yet_taught:'Not yet taught',missing:'Not answered',invalid:'Check entry'};
export const skillName = key => key.replaceAll('_',' ').replace(/^./,s=>s.toUpperCase());
export const itemsFor = a => a.questions.flatMap(q=>q.items.map(i=>({...i,domain:q.domain,question:q.number})));
const norm = v => String(v??'').trim().replace(/[−–﹣－]/g,'-');
const special = v => ({DK:'dont_know',NT:'not_yet_taught'}[norm(v).toUpperCase()]);
function decimal(s){
  if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
  const negative=s[0]==='-', parts=s.replace(/^[+-]/,'').split('.');
  return [BigInt((parts[0]||'0')+(parts[1]||''))*(negative?-1n:1n),10n**BigInt((parts[1]||'').length)];
}
export function parseNumber(raw,unit=''){
  let s=norm(raw); if(!s || s.length>80)return null;
  if(unit==='£')s=s.replace(/^£\s*/,'');
  const units={'cm²':/\s*cm(?:²|\^2|2)$/i,cm:/\s*cm$/i,g:/\s*g$/i,'°':/\s*(?:°|degrees?)$/i,'km/h':/\s*km\s*\/\s*h$/i,minutes:/\s*(?:minutes?|mins?)$/i};
  if(units[unit])s=s.replace(units[unit],'');
  s=s.trim();
  // Remove commas only when they form conventional thousands groups.
  if(/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(s))s=s.replaceAll(',','');
  const parts=s.split('/'); if(parts.length>2)return null;
  const a=decimal(parts[0].trim()); if(!a)return null;
  if(parts.length===1)return a;
  const b=decimal(parts[1].trim()); if(!b || b[0]===0n)return null;
  return [a[0]*b[1],a[1]*b[0]];
}
const equal=(a,b)=>!!a&&!!b&&a[0]*b[1]===b[0]*a[1];
export function markItem(item,entry={}){
  if(['dont_know','not_yet_taught'].includes(entry.mode))return {status:entry.mode};
  const pair=item.type.endsWith('_pair');
  const values=(Array.isArray(entry.values)?entry.values:[]).slice(0,pair?2:1).map(norm);
  while(values.length<(pair?2:1))values.push('');
  if(values.every(v=>!v))return {status:'missing'};
  if(pair){
    const codes=values.filter(Boolean).map(special);
    if(codes[0] && codes.every(c=>c===codes[0]))return {status:codes[0]};
    if(codes.some(Boolean))return {status:'invalid',error:'Choose “Don’t know” or “Not yet taught” for this whole question, or enter both numbers.'};
    if(values.some(v=>!v))return {status:'invalid',error:'Enter both values, or clear both to leave this check unanswered.'};
  }else if(special(values[0]))return {status:special(values[0])};
  if(item.type==='choice'){
    const choice=values[0].toUpperCase();
    return /^[ABCD]$/.test(choice)?{status:choice===item.answer?'correct':'incorrect'}:{status:'invalid',error:'Choose A, B, C or D.'};
  }
  const parsed=values.map(v=>parseNumber(v,item.unit));
  if(parsed.some(v=>!v))return {status:'invalid',error:'Use a number or fraction, such as -3, 0.5 or 1/2. Enter a final value, not a calculation.'};
  const expected=(pair?item.answer:[item.answer]).map(v=>parseNumber(v));
  let correct=parsed.every((v,i)=>equal(v,expected[i]));
  if(item.type==='unordered_pair')correct ||= equal(parsed[0],expected[1])&&equal(parsed[1],expected[0]);
  return {status:correct?'correct':'incorrect'};
}
export function formatEntry(entry={},item){
  if(entry.mode==='dont_know')return 'DK';
  if(entry.mode==='not_yet_taught')return 'NT';
  const v=(entry.values||[]).map(norm);
  if(v.every(x=>!x))return '—';
  if(item.type==='ordered_pair')return v.map((x,i)=>`${item.labels[i]} = ${x||'—'}`).join('; ');
  return v.join(', ');
}
export function formatAnswer(i){
  const value=i.type==='ordered_pair'?i.answer.map((v,j)=>`${i.labels[j]} = ${v}`).join('; '):Array.isArray(i.answer)?i.answer.join(' or '):String(i.answer);
  return i.unit==='£'?'£'+value:value+(i.unit?' '+i.unit:'');
}
export function makeReport(a,entries,student='',date=new Date()){
  const rows=itemsFor(a).map(i=>({...i,...markItem(i,entries[i.response_id]),given:formatEntry(entries[i.response_id],i),expected:formatAnswer(i)}));
  const counts=Object.fromEntries(Object.keys(statusNames).map(k=>[k,rows.filter(r=>r.status===k).length]));
  const domains=[...new Set(rows.map(r=>r.domain))].map(name=>{
    const rs=rows.filter(r=>r.domain===name), correct=rs.filter(r=>r.status==='correct').length;
    const missing=rs.filter(r=>r.status==='missing').length, nt=rs.filter(r=>r.status==='not_yet_taught').length;
    return {name,correct,total:rs.length,missing,nt,dk:rs.filter(r=>r.status==='dont_know').length,attempted:rs.filter(r=>['correct','incorrect'].includes(r.status)).length,label:missing?'Incomplete evidence':nt?'Partly or not yet taught':correct<=1?'Priority to revisit':correct===2?'Developing in this sample':'Stronger in this sample'};
  });
  const groups=new Map();
  rows.forEach((r,index)=>{
    if(!['incorrect','dont_know'].includes(r.status))return;
    if(!groups.has(r.resource_key))groups.set(r.resource_key,{key:r.resource_key,title:skillName(r.resource_key),first:index,prerequisite:r.prerequisite,rows:[]});
    groups.get(r.resource_key).rows.push(r);
  });
  const priorities=[...groups.values()].sort((a,b)=>Number(b.prerequisite)-Number(a.prerequisite)||b.rows.length-a.rows.length||a.first-b.first).slice(0,3).map(g=>({...g,
    mixed:rows.some(r=>r.resource_key===g.key&&r.status==='correct'),
    advice:[...new Set(g.rows.map(r=>r.feedback_if_incorrect))].join(' ')
  }));
  return {assessmentId:a.assessment_id,tier:a.tier,student:String(student).trim().slice(0,60),date:date.toISOString(),counts,domains,priorities,rows,total:a.total_marks,attempted:counts.correct+counts.incorrect,completed:rows.length-counts.missing-counts.invalid};
}
export function sanitizeDraft(raw,a){
  if(!raw || raw.assessmentId!==a.assessment_id)return null;
  const entries={};
  for(const i of itemsFor(a)){
    const e=raw.entries?.[i.response_id]; if(!e||typeof e!=='object')continue;
    entries[i.response_id]={mode:['answer','dont_know','not_yet_taught'].includes(e.mode)?e.mode:'answer',values:(Array.isArray(e.values)?e.values:[]).slice(0,i.type.endsWith('_pair')?2:1).map(v=>typeof v==='string'?v.slice(0,80):'')};
  }
  return {assessmentId:a.assessment_id,student:typeof raw.student==='string'?raw.student.slice(0,60):'',entries};
}
