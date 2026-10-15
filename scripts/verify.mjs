import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
const require=createRequire(import.meta.url);
let chromium;
try{({chromium}=require('playwright'));}catch{const modules=process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;if(!modules)throw Error('Playwright is required for browser QA. Install it in the test environment.');({chromium}=require(path.join(modules,'playwright')));}
let localServer;
if(!process.env.BASE_URL){({server:localServer}=await import('./serve.mjs'));}
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader']}: {})});
await mkdir('qa',{recursive:true});
const report={date:new Date().toISOString(),baseURL:process.env.BASE_URL||'http://127.0.0.1:4173',viewports:[],checks:[]};
try{
 for(const width of [1440,768,390,360,320,1920]){
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,hasTouch:width<761});
  const errors=[],failedLocal=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(report.baseURL)&&r.status()>=400)failedLocal.push([r.status(),r.url()]);});
  await page.goto(report.baseURL,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('main>section').count(),9);
  assert.equal(await page.locator('footer').count(),1);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('.plan').count(),5);
  const overflow=await page.evaluate(()=>({window:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>innerWidth+.5)&&getComputedStyle(el).position!=='absolute'&&!el.closest('.hero,.academy,.pricing,.footer,.location,.structure-grid');}).map(el=>`${el.tagName}.${el.className}`).slice(0,15)}));
  assert(overflow.scroll<=width+1,`Horizontal overflow at ${width}: ${JSON.stringify(overflow)}`);
  assert.equal(await page.locator('a[href="#"]').count(),0);
  const badAnchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));assert.deepEqual(badAnchors,[]);
  const cardio=page.getByRole('tab',{name:/Cardio/});await cardio.click();await assert.equal(await page.locator('.modality-name').textContent(),'Cardio');assert((await page.locator('.modality-image').getAttribute('src')).includes('06_cardio'));
  await cardio.press('ArrowUp');assert.equal(await page.locator('.modality-name').textContent(),'Musculação');assert.equal(await page.locator('#modality-tab-0').getAttribute('aria-selected'),'true');
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
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);assert.deepEqual(errors,[]);assert.deepEqual(failedLocal,[]);
  if([1440,768,390,360].includes(width)){
   await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});await page.screenshot({path:`qa/home-${width}.png`,fullPage:true});
   for(const id of ['inicio','academia','estrutura','modalidades','expansao','experiencia','avaliacoes','planos','contato'])await page.locator(`#${id}`).screenshot({path:`qa/${id}-${width}.png`});
   await page.locator('footer').screenshot({path:`qa/footer-${width}.png`});
  }
  console.log(`Viewport ${width}: passed`);report.viewports.push({width,overflow:overflow.scroll,sections:9,plans:5,images:'decoded',javascriptErrors:errors,localNetworkErrors:failedLocal});await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await page.goto(report.baseURL);assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');await page.close();
 report.checks=['six widths without document overflow','nine sections plus footer','one h1','five official plans','local anchors resolve','all local images decode','no JS exceptions','menu open, Escape, return focus and navigation close','modality click and arrow key synchronize photo and text','review arrows, Home/End and swipe change author','contextual WhatsApp links and plan prices','prefers-reduced-motion'];
 await writeFile('qa/results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();localServer?.close();}
