import fs from 'node:fs';
import path from 'node:path';
const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
let pages=0;const errors=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else if(file.endsWith('.html')){pages++;const html=fs.readFileSync(file,'utf8');if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(file+': needs exactly one h1');for(const [,raw]of html.matchAll(/(?:href|src)="([^"]+)"/g)){const value=raw.split(/[?#]/)[0];if(!value||/^(?:https?:|mailto:|data:)/.test(value))continue;if(base&&!value.startsWith(base+'/')){errors.push(file+': invalid base '+value);continue}const relative=value.slice(base.length).replace(/^\//,'');const target=path.join('dist',relative);if(!fs.existsSync(target))errors.push(file+': missing '+value);else if(fs.statSync(target).isDirectory()&&!fs.existsSync(path.join(target,'index.html')))errors.push(file+': missing index '+value)}}}}
walk('dist');if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`PASS: ${pages} HTML pages; local links, assets, page headings and base paths.`);
