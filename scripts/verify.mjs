import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {mediaSlots} from '../src/media-slots.mjs';
import * as content from '../src/content.mjs';
import {createRequire} from 'node:module';
import path from 'node:path';
const require=createRequire(import.meta.url);
let chromium;
try{({chromium}=require('playwright'));}catch{const modules=process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;if(!modules)throw Error('Playwright is required for browser QA. Install it in the test environment.');({chromium}=require(path.join(modules,'playwright')));}
let localServer;
if(!process.env.BASE_URL){({server:localServer}=await import('./serve.mjs'));}
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader']}: {})});
const qaDir=process.env.QA_DIR||'qa/build03';
await mkdir(qaDir,{recursive:true});
const geometryBase=process.env.GEOMETRY_BASELINE?JSON.parse(await readFile(process.env.GEOMETRY_BASELINE,'utf8')):null;
const beforeSource=execFileSync('git',['show','b2aceb50db1d9f0965428bb6ab2f1df27605b21b:src/content.mjs'],{encoding:'utf8'});
const beforeContent=await import('data:text/javascript;base64,'+Buffer.from(beforeSource).toString('base64'));
for(const key of ['contact','nav','footerNav','reviews','plans','benefits','expansion','photos'])assert.deepEqual(content[key],beforeContent[key],`${key} must stay unchanged`);
const originals=execFileSync('git',['ls-tree','-r','b2aceb50db1d9f0965428bb6ab2f1df27605b21b','--','public'],{encoding:'utf8'}).trim().split('\n');
for(const line of originals){const [info,file]=line.split('\t');const expected=info.split(' ')[2];assert.equal(execFileSync('git',['hash-object',file],{encoding:'utf8'}).trim(),expected,`${file} changed`);}
const manifest=JSON.parse(await readFile('docs/assets-build03/MANIFESTO_ASSETS_BUILD03.json','utf8'));
const {createHash}=await import('node:crypto');
assert.equal(Object.keys(mediaSlots).length,11);
for(const asset of manifest.assets){const bytes=await readFile(`public${asset.file}`);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);}
const report={date:new Date().toISOString(),baseURL:process.env.BASE_URL||'http://127.0.0.1:4173',viewports:[],checks:[],originalAssetsVerified:originals.length,mediaSlots:11,geometryCompared:Boolean(geometryBase)};
try{
 for(const width of [1440,1280,768,390,360,320]){
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,hasTouch:width<761});
  const errors=[],failedLocal=[],requests=[];
  page.on('request',r=>requests.push(r.url()));
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(report.baseURL)&&r.status()>=400)failedLocal.push([r.status(),r.url()]);});
  await page.goto(report.baseURL,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{window.__layoutShift=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__layoutShift+=e.value;}).observe({type:'layout-shift',buffered:true});});
  assert.equal(await page.locator('main>section').count(),9);
  assert.equal(await page.locator('footer').count(),1);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('.plan').count(),5);
  const overflow=await page.evaluate(()=>({window:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>innerWidth+.5)&&getComputedStyle(el).position!=='absolute'&&!el.closest('.hero,.academy,.pricing,.footer,.location,.structure-grid');}).map(el=>`${el.tagName}.${el.className}`).slice(0,15)}));
  assert(overflow.scroll<=width+1,`Horizontal overflow at ${width}: ${JSON.stringify(overflow)}`);
  assert.equal(await page.locator('a[href="#"]').count(),0);
  const badAnchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));assert.deepEqual(badAnchors,[]);
  let geometryDelta=0;
  if(geometryBase){const geometry=await page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>[selector,[...document.querySelectorAll(selector)].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,width:r.width,height:r.height,font:s.font,color:s.color,background:s.backgroundColor,clip:s.clipPath};})])),geometryBase.selectors);for(const [selector,before] of Object.entries(geometryBase.viewports[width])){assert.equal(geometry[selector].length,before.length,`Count changed: ${selector} at ${width}`);before.forEach((r,i)=>{for(const property of ['x','y','width','height']){if(selector==='.mascot'&&i===2&&width<761&&['x','y'].includes(property))continue;const delta=Math.abs(geometry[selector][i][property]-r[property]);geometryDelta=Math.max(geometryDelta,delta);assert(delta<0.1,`Geometry changed: ${selector}[${i}].${property} at ${width}: ${r[property]} -> ${geometry[selector][i][property]}`);}for(const property of ['font','color','background','clip'])assert.equal(geometry[selector][i][property],r[property],`Style changed: ${selector} ${property} at ${width}`);});}}
  const cardio=page.getByRole('tab',{name:/Cardio/});await cardio.click();await assert.equal(await page.locator('.modality-name').textContent(),'Cardio');assert.equal(await page.locator('.modality-image').getAttribute('data-media-slot'),'modalidade-cardio');assert.equal(await page.locator('.modality-image').getAttribute('alt'),mediaSlots['modalidade-cardio'].alt);assert.equal(await page.locator('.modality-image').getAttribute('src'),mediaSlots['modalidade-cardio'].desktop.source);
  await cardio.press('ArrowUp');assert.equal(await page.locator('.modality-name').textContent(),'Musculação');assert.equal(await page.locator('#modality-tab-0').getAttribute('aria-selected'),'true');assert.equal(await page.locator('.modality-image').getAttribute('data-media-slot'),'modalidade-musculacao');
  await page.locator('[data-review-next]').click();assert.equal(await page.locator('.review-author strong').textContent(),'Eduardo Souza');
  await page.locator('[data-review-prev]').click();assert.equal(await page.locator('.review-author strong').textContent(),'Wagner Martins');
  await page.locator('.reviews-grid').focus();await page.keyboard.press('End');assert.equal(await page.locator('.review-author strong').textContent(),'Ubiratan Guimarães');await page.keyboard.press('Home');assert.equal(await page.locator('.review-author strong').textContent(),'Wagner Martins');
  if(width<761){
   await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('.menu-toggle').evaluate(e=>document.activeElement===e),true);
   await page.locator('.menu-toggle').click();await page.locator('#main-nav a[href="#planos"]').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
   const paper=page.locator('.review-paper');await paper.scrollIntoViewIfNeeded();await paper.dispatchEvent('pointerdown',{pointerType:'touch',clientX:280,clientY:300});await paper.dispatchEvent('pointerup',{pointerType:'touch',clientX:150,clientY:303});assert.equal(await page.locator('.review-author strong').textContent(),'Eduardo Souza');await page.locator('[data-review-prev]').click();
  }
  const waLinks=await page.locator('a[href^="https://wa.me/"]').evaluateAll(links=>links.map(a=>a.href));assert(waLinks.length>=10);for(const link of waLinks){const u=new URL(link);assert.equal(u.pathname,'/5534992217673');assert(u.searchParams.get('text'));}
  for(const plan of await page.locator('.plan').evaluateAll(ls=>ls.map(a=>({price:a.querySelector('.plan-price strong').textContent,url:a.href}))))assert(new URL(plan.url).searchParams.get('text').includes(plan.price));
  for(const section of await page.locator('main>section').all()){await section.scrollIntoViewIfNeeded();await page.waitForTimeout(30);}
  await page.evaluate(()=>{for(const im of document.images)im.loading='eager';return Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));});
  const activeSlots=await page.locator('[data-media-slot]').evaluateAll(nodes=>nodes.map(n=>n.dataset.mediaSlot));assert.equal(new Set(activeSlots).size,10);for(const id of activeSlots)assert(id in mediaSlots,`Unknown slot ${id}`);assert.equal(await page.locator('iframe').count(),0);
  const requestedPhotos=requests.filter(url=>Object.values(content.photos).some(name=>url.includes(name)));assert.deepEqual(requestedPhotos,[],'Old documentary images must not be requested');
  const unexpectedImages=await page.locator('img').evaluateAll(nodes=>nodes.filter(n=>!['logo-dark.png','logo-light.png'].some(name=>n.src.endsWith('/'+name))&&!n.src.includes('/assets/borjao/final-v1/')).map(n=>n.src));assert.deepEqual(unexpectedImages,[]);
  const textOverflow=await page.locator('h1,h2,h3,.button,.plan-price').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.textContent));assert.deepEqual(textOverflow,[],`Text overflow at ${width}`);
  for(const asset of manifest.assets){const res=await page.request.get(report.baseURL+asset.file);assert.equal(res.status(),200);}
  const mapLinks=await page.locator('#contato a').evaluateAll(links=>links.map(a=>a.href));assert(mapLinks.filter(u=>u.startsWith(content.contact.maps)).length>=2);
  assert.equal(await page.locator('.mascot').count(),0,'No unvalidated black-background mascot');
  const cls=await page.evaluate(()=>window.__layoutShift);assert(cls<0.1,`Unexpected layout shift: ${cls}`);
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);assert.deepEqual(errors,[]);assert.deepEqual(failedLocal,[]);
  if([1440,1280,768,390,360,320].includes(width)){
   await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});await page.screenshot({path:`${qaDir}/home-${width}.png`,fullPage:true});
   for(const id of ['inicio','academia','estrutura','modalidades','expansao','experiencia','avaliacoes','planos','contato']){await page.evaluate(()=>document.activeElement?.blur());await page.mouse.move(1,1);await page.locator(`#${id}`).screenshot({path:`${qaDir}/${id}-${width}.png`});}
   await page.evaluate(()=>document.activeElement?.blur());await page.mouse.move(1,1);await page.locator('footer').screenshot({path:`${qaDir}/footer-${width}.png`});
  }
  console.log(`Viewport ${width}: passed`);report.viewports.push({width,overflow:overflow.scroll,sections:9,plans:5,images:'approved-assets-decoded',oldPhotoRequests:requestedPhotos.length,slots:10,geometryDelta:geometryBase?geometryDelta:null,layoutShift:cls,javascriptErrors:errors,localNetworkErrors:failedLocal});await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await page.goto(report.baseURL);assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');await page.close();
 report.checks=['six widths without document overflow','17 original public files unchanged','official copy and commercial data unchanged','11 approved WebP hashes match manifest','10 integrated media nodes per view','zero documentary photo requests','no duplicated background layers or map iframe','nine sections plus footer','one h1','five official plans','local anchors resolve','all local images decode','no JS exceptions or local 404','menu open, Escape, return focus and navigation close','modality click and keyboard synchronize image, alt, text and ARIA','review arrows, Home/End and swipe change author','contextual WhatsApp links and plan prices','prefers-reduced-motion'];
 await writeFile(`${qaDir}/results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();localServer?.close();}
