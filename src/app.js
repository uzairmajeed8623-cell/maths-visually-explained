import {matchesCatalog} from './catalog.js';
(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  menu?.addEventListener('click', () => {const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));nav.classList.toggle('open',expanded)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
  const params=new URLSearchParams(location.search);
  // Keep only bounded campaign fields, never email or other personal form data.
  for(const key of ['source','video']){const value=params.get(key);if(value){try{sessionStorage.setItem('maths_'+key,value.slice(0,150))}catch{}}}
  const attribution = key=>{try{return (params.get(key)||sessionStorage.getItem('maths_'+key)||'').slice(0,150)}catch{return (params.get(key)||'').slice(0,150)}};
  for(const link of document.querySelectorAll('a[href]')){const target=new URL(link.href,location.href);if(target.origin===location.origin&&!target.pathname.endsWith('.pdf')){for(const key of ['source','video'])if(attribution(key))target.searchParams.set(key,attribution(key));link.href=target.href}}
  for(const wrapper of document.querySelectorAll('.provider-form')){
    const fill = () => {for(const form of wrapper.querySelectorAll('form'))for(const [field,value] of [[wrapper.dataset.resourceField,wrapper.dataset.resource],[wrapper.dataset.sourceField,attribution('source')],[wrapper.dataset.videoField,attribution('video')]]){if(!field)continue;let input=[...form.elements].find(el=>el.name===field);if(!input){input=document.createElement('input');input.name=field;input.type='hidden';form.appendChild(input)}if(input.value!==value)input.value=value;if(input.type!=='hidden'){input.type='hidden';const parent=input.closest('.ml-field-group');if(parent)parent.hidden=true}}};
    fill();const observer=new MutationObserver(fill);observer.observe(wrapper,{childList:true,subtree:true});wrapper.addEventListener('submit',fill,true);
  }
  for(const library of document.querySelectorAll('[data-library]')) {
    const search=library.querySelector('[data-catalog-search]');
    const selects=[...library.querySelectorAll('[data-select-filter]')];
    const topics=[...library.querySelectorAll('[data-filter]')];
    const cards=[...library.querySelectorAll('[data-catalog-list] > [data-search]')];
    const noun=library.dataset.countNoun;
    let category='all';
    function filter(){
      const selected=Object.fromEntries(selects.map(s=>[s.dataset.selectFilter,s.value]));
      if(topics.length)selected.category=category;
      const matches=[];
      for(const card of cards){card.hidden=!matchesCatalog(card.dataset,search.value,selected);if(!card.hidden){const link=card.querySelector('h2 a,h3 a');matches.push({title:link.textContent,url:link.href})}}
      library.querySelector('[data-catalog-count]').textContent=`${matches.length} ${noun}${matches.length===1?'':'s'}`;
      library.querySelector('[data-catalog-empty]').hidden=matches.length>0||cards.length===0;
      topics.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
      return matches;
    }
    search.addEventListener('input',filter);
    selects.forEach(s=>s.addEventListener('change',filter));
    topics.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;filter()}));
    library.querySelectorAll('[data-clear-filters]').forEach(b=>b.addEventListener('click',()=>{search.value='';category='all';selects.forEach(s=>s.value='all');filter();search.focus()}));
    filter();
    // Preserve the existing resource-search tool and let it combine tier/grade filters.
    const context=document.modelContext;
    if(library.dataset.library==='resources'&&context?.registerTool){
      const lifecycle=new AbortController();
      try{Promise.resolve(context.registerTool({name:'filter_maths_resources',title:'Filter Maths resources',description:'Search the visible resource library by topic, tier and approximate grade. Does not submit forms.',inputSchema:{type:'object',properties:{query:{type:'string'},category:{type:'string'},tier:{type:'string',enum:['all','Foundation','Higher']},grade:{type:'string',enum:['all','1','2','3','4','5','6','7','8','9']}},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){
        if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['query','category','tier','grade'].includes(k)||typeof input[k]!=='string'))throw Error('Expected string filter values');
        const chosen=input.category||'all';if(!topics.some(b=>b.dataset.filter===chosen))throw Error('Unknown topic');
        for(const s of selects){const value=input[s.dataset.selectFilter]||'all';if(![...s.options].some(o=>o.value===value))throw Error('Unknown '+s.dataset.selectFilter)}
        category=chosen;search.value=input.query||'';selects.forEach(s=>s.value=input[s.dataset.selectFilter]||'all');return {resources:filter()};
      }},{signal:lifecycle.signal})).catch(()=>{});}catch{}
      window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
    }
  }
})();
