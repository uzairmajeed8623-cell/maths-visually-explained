import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {matchesCatalog} from '../src/catalog.js';
import {validateClassification,youtubeId} from './catalog.mjs';

const shared={search:'Pythagoras geometry right angled triangles',category:'Geometry',tier:'Foundation|Higher',grade:'4|5',board:'Example board',year:'2024',format:'written|video'};
assert(matchesCatalog(shared,'TRIANGLES pythagoras',{tier:'Foundation',grade:'4',category:'Geometry'}));
assert(matchesCatalog(shared,'',{tier:'Higher',board:'Example board',year:'2024',format:'video'}));
assert(!matchesCatalog(shared,'',{tier:'Higher',grade:'7'}));
assert(!matchesCatalog(shared,'',{category:'Algebra'}));
assert(!matchesCatalog({...shared,format:'written'},'',{format:'video'}));
assert(matchesCatalog(shared,'',{}));
assert.throws(()=>validateClassification({slug:'bad',tier:'Both',grades:[4,10]}));
assert.throws(()=>youtubeId('https://example.com/watch?v=abcdefghijk'));
assert.equal(youtubeId('https://youtu.be/abcdefghijk'),'abcdefghijk');

// Exercise real page generation with isolated fixtures, never published examples.
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'maths-catalog-'));
try {
  for(const dir of ['scripts','src','data','config','public','content'])fs.cpSync(dir,path.join(temp,dir),{recursive:true});
  fs.copyFileSync('package.json',path.join(temp,'package.json'));
  const content='content/past-papers/test-written.html';
  fs.copyFileSync('examples/past-papers/solution.html',path.join(temp,content));
  fs.copyFileSync('examples/past-papers/triangle.svg',path.join(temp,'public/diagrams/triangle.svg'));
  const q={slug:'test-written',published:true,title:'Test written solution',description:'Original test fixture',board:'Test board',qualification:'GCSE',year:2024,session:'June',paper:'Test paper',questionNumber:'1',topic:'Trigonometry',tier:'Higher',grades:[6,7],youtubeUrl:'',sourceUrl:'',contentFile:content};
  const fixture=[q,{...q,slug:'test-video',title:'Test video solution',youtubeUrl:'https://youtu.be/abcdefghijk',contentFile:''},{...q,slug:'test-both',title:'Test both formats',youtubeUrl:'https://www.youtube.com/watch?v=abcdefghijk'},{slug:'test-draft',published:false}];
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  for(const base of ['', '/maths-visually-explained']) {
    execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,env:{...process.env,BASE_PATH:base},stdio:'pipe'});
    const read=p=>fs.readFileSync(path.join(temp,'dist',p),'utf8');
    const written=read('past-papers/test-written/index.html');
    const video=read('past-papers/test-video/index.html');
    const both=read('past-papers/test-both/index.html');
    assert(written.includes(`src="${base}/diagrams/triangle.svg"`));
    assert(written.includes('\\[a^2=b^2+c^2-2bc\\cos A\\]'));
    assert(written.includes('katex@0.18.9'));
    assert(!written.includes('<iframe'));
    assert(video.includes('https://www.youtube-nocookie.com/embed/abcdefghijk'));
    assert(!video.includes('class="written-solution"'));
    assert(both.includes('<iframe')&&both.includes('class="written-solution"'));
    assert(read('past-papers/index.html').includes('data-format="video|written"'));
    assert(!fs.existsSync(path.join(temp,'dist/past-papers/test-draft')));
    assert(!read('sitemap.xml').includes('test-draft'));
    assert(read('sitemap.xml').includes('/past-papers/test-both/'));
    assert.match(written, /app\.js\?v=[a-f0-9]{12}/);
    assert.match(written, /style\.css\?v=[a-f0-9]{12}/);
    assert.match(read('app.js'), /catalog\.js\?v=[a-f0-9]{12}/);
    for(const html of [written,video,both,read('past-papers/index.html')]){
      assert.equal((html.match(/ml\('account'/g)||[]).length,1);
      assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
      assert(!html.includes('data-form="g4crXY"'));
    }
  }
  fixture[0].contentFile='../../secret.html';
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  assert.throws(()=>execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,stdio:'pipe'}));
} finally { fs.rmSync(temp,{recursive:true,force:true}); }
console.log('PASS: combined filters; written/video/both solutions; maths and diagrams; draft exclusion; root/project paths; invalid content rejection.');
