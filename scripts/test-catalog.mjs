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
  fs.copyFileSync('examples/past-papers/practice.html',path.join(temp,'content/past-papers/test-practice.html'));
  const q={slug:'test-written',published:true,title:'Test written solution',description:'Original test fixture',board:'Edexcel',qualification:'GCSE',year:2024,session:'June',paper:'Paper 1 (Higher, Non-calculator)',paperId:'edexcel-2024-summer-1h',questionNumber:'1',topic:'Trigonometry',tier:'Higher',grades:[6,7],youtubeUrl:'',sourceUrl:'',contentFile:content,practiceFile:'content/past-papers/test-practice.html'};
  const fixture=[q,{...q,slug:'test-video',questionNumber:'2',title:'Test video solution',youtubeUrl:'https://youtu.be/abcdefghijk',contentFile:''},{...q,slug:'test-both',questionNumber:'3',title:'Test both formats',youtubeUrl:'https://www.youtube.com/watch?v=abcdefghijk'},{slug:'test-draft',published:false}];
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  for(const base of ['', '/maths-visually-explained']) {
    execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,env:{...process.env,BASE_PATH:base},stdio:'pipe'});
    const read=p=>fs.readFileSync(path.join(temp,'dist',p),'utf8');
    const written=read('past-papers/test-written/index.html');
    const video=read('past-papers/test-video/index.html');
    const both=read('past-papers/test-both/index.html');
    const archive=read('past-papers/index.html');
    const foundation=read('past-papers/foundation/index.html');
    const paper=read('past-papers/edexcel/2024/summer/higher/paper-1/index.html');
    assert(archive.includes(`href="${base}/past-papers/foundation/"`));
    assert(archive.includes('aria-current="page">Higher'));
    assert(foundation.includes('aria-current="page">Foundation'));
    assert(archive.includes(`href="${base}/past-papers/edexcel/2024/summer/higher/paper-1/"`));
    assert(!archive.includes('/summer/foundation/paper-1/'));
    assert(foundation.includes('/summer/foundation/paper-1/'));
    assert(!foundation.includes('/summer/higher/paper-1/'));
    assert(!fs.existsSync(path.join(temp,'dist/past-papers/edexcel/2020/summer')));
    assert(!fs.existsSync(path.join(temp,'dist/past-papers/edexcel/2021/summer')));
    assert.equal((archive.match(/class="exam-year"/g)||[]).length,9);
    assert.equal((archive.match(/class="paper-option"/g)||[]).length,48);
    assert(paper.includes('3 available'));
    assert(paper.includes('test-written/#worked-solution'));
    assert(paper.includes('test-video/#video'));
    assert(paper.includes('test-both/#worked-solution')&&paper.includes('test-both/#video'));
    assert.equal((paper.match(/Not added yet/g)||[]).length,2);
    assert(!paper.includes('href=""'));
    assert(!read('past-papers/edexcel/2024/summer/foundation/paper-1/index.html').includes('test-written'));
    assert(written.includes(`href="${base}/past-papers/edexcel/2024/summer/higher/paper-1/"`));
    assert(written.includes(`src="${base}/diagrams/triangle.svg"`));
    assert(written.includes('\\[a^2=b^2+c^2-2bc\\cos A\\]'));
    assert(written.includes('katex@0.18.9'));
    assert(!written.includes('<iframe'));
    assert(video.includes('https://www.youtube-nocookie.com/embed/abcdefghijk'));
    assert(!video.includes('class="written-solution"'));
    for(const html of [written,video,both]) {
      assert(html.includes('id="try-these-next"'));
      assert.equal((html.match(/<summary>Show worked answer<\/summary>/g)||[]).length,3);
      assert(!html.includes('<form')&&!html.includes('provider-form'));
      assert(html.includes('katex@0.18.9'));
      assert(html.indexOf('id="try-these-next"')>html.indexOf('class="solution-content"'));
    }
    assert(both.indexOf('id="try-these-next"')>both.indexOf('class="written-solution"'));
    assert(both.includes('<iframe')&&both.includes('class="written-solution"'));
    assert(read('past-papers/solutions/index.html').includes('data-format="video|written"'));
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
  const archiveConfig=JSON.parse(fs.readFileSync(path.join(temp,'data/exam-papers.json'),'utf8'));
  archiveConfig.papers.push({id:'edexcel-2024-summer-1h',questionPaper:'/resources/pythagoras-practice.pdf',markScheme:'https://example.com/test-mark-scheme.pdf'});
  fs.writeFileSync(path.join(temp,'data/exam-papers.json'),JSON.stringify(archiveConfig));
  execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,env:{...process.env,BASE_PATH:''},stdio:'pipe'});
  const filePage=fs.readFileSync(path.join(temp,'dist/past-papers/edexcel/2024/summer/higher/paper-1/index.html'),'utf8');
  assert(filePage.includes('href="/resources/pythagoras-practice.pdf"'));
  assert(filePage.includes('href="https://example.com/test-mark-scheme.pdf"'));
  assert(!filePage.includes('Not added yet'));
  fixture[0].paperId='edexcel-2024-summer-1f';
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  assert.throws(()=>execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,stdio:'pipe'}));
  fixture[0].paperId='edexcel-2024-summer-1h';
  delete fixture[0].practiceFile;
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,stdio:'pipe'});
  assert(!fs.readFileSync(path.join(temp,'dist/past-papers/test-written/index.html'),'utf8').includes('id="try-these-next"'));
  fixture[0].practiceFile='../../secret.html';
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  assert.throws(()=>execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,stdio:'pipe'}));
  delete fixture[0].practiceFile;
  fixture[0].contentFile='../../secret.html';
  fs.writeFileSync(path.join(temp,'data/past-papers.json'),JSON.stringify(fixture));
  assert.throws(()=>execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,stdio:'pipe'}));
} finally { fs.rmSync(temp,{recursive:true,force:true}); }
console.log('PASS: paper archive tiers, sessions, file slots, question mapping and reference validation; combined filters; written/video/both solutions with open practice and expandable answers; maths and diagrams; draft exclusion; root/project paths; invalid content rejection.');
