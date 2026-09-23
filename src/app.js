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
  const search=document.querySelector('#resource-search');
  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('.resource-card[data-search]')];
  let category='all';
  function filter(){if(!search)return [];const query=search.value.toLowerCase().trim();const matches=[];for(const card of cards){const show=(category==='all'||card.dataset.category===category)&&card.dataset.search.includes(query);card.hidden=!show;if(show)matches.push({title:card.querySelector('h3').textContent,url:card.querySelector('h3 a').href})}document.querySelector('#resource-count').textContent=`${matches.length} resource${matches.length===1?'':'s'}`;document.querySelector('#empty-results').hidden=matches.length>0;filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));return matches}
  search?.addEventListener('input',filter);
  filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filter()}));
  document.querySelector('#reset-search')?.addEventListener('click',()=>{search.value='';category='all';filter();search.focus()});
  const context=document.modelContext;
  if(search&&context?.registerTool){const lifecycle=new AbortController();try{Promise.resolve(context.registerTool({name:'filter_maths_resources',title:'Filter Maths resources',description:'Search the visible resource library and filter by a topic category. Does not submit forms or subscribe anyone.',inputSchema:{type:'object',properties:{query:{type:'string'},category:{type:'string'}},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['query','category'].includes(k))||(input.query!==undefined&&typeof input.query!=='string')||(input.category!==undefined&&typeof input.category!=='string'))throw Error('Expected query and category strings');const selected=input.category||'all';if(!filters.some(f=>f.dataset.filter===selected))throw Error('Unknown category');search.value=input.query||'';category=selected;return {resources:filter()}}},{signal:lifecycle.signal})).catch(()=>{});}catch{}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true})}
})();
