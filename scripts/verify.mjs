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
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']}: {})});
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
const mapBrandAssets=[
 {file:'/assets/borjao/localizacao/mascote-mapa.png',sha256:'9d74d013a8ff2277610738a0de811fc8762f232a09ea617579db3198d33b30d7'},
 {file:'/assets/borjao/localizacao/logo-borjao-oficial.png',sha256:'32ff64919086e2134e372a3d8cdd705dde4a67fb118ed40cc4b9a13837acef35'}
];
for(const asset of mapBrandAssets){const bytes=await readFile(`public${asset.file}`);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,'Map artwork must match the official PNG supplied by the user');}

assert.equal(Object.keys(mediaSlots).length,11);
for(const asset of manifest.assets){const bytes=await readFile(`public${asset.file}`);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);}
const mobileManifest=JSON.parse(await readFile('docs/assets-build04/MANIFESTO_ASSETS_MOBILE.json','utf8'));
assert.equal(mobileManifest.assets.length,4);
for(const asset of mobileManifest.assets){const bytes=await readFile(`public${asset.file}`);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,'Mobile background must match the supplied approved JPG');}
const mobileSlots={'hero-composicao':'hero','academia-composicao':'academia','planos-composicao':'planos','localizacao-composicao':'localizacao'};
const report={date:new Date().toISOString(),baseURL:process.env.BASE_URL||'http://127.0.0.1:4173',viewports:[],checks:[],originalAssetsVerified:originals.length,mediaSlots:11,geometryCompared:Boolean(geometryBase)};
try{
 for(const width of [1536,1440,1280,1024,980,768,430,390,360,320]){
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
  let compositionGeometry=null;
  if(width>=761){
   compositionGeometry=await page.evaluate(()=>{
    const ratio=selector=>{const e=document.querySelector(selector),r=e.getBoundingClientRect();return {ratio:r.width/r.height,fit:getComputedStyle(e.querySelector('.section-art')).objectFit};};
    const rail=document.querySelector('#planos').getBoundingClientRect(),scale=1536/rail.width;
    // Independent samples of the photo/mineral boundary in the approved master.
    const edge=y=>y<=640?1080-(1080-768)*y/640:y<=768?768+(832-768)*(y-640)/128:832-(y-768)/2;
    const cards=[...document.querySelectorAll('.plan')].map(e=>{
     const r=e.getBoundingClientRect(),clip=getComputedStyle(e).clipPath;
     const points=clip.slice(8,-1).split(',').map(part=>part.trim().split(/\s+/).map((value,axis)=>Number.parseFloat(value)*(value.endsWith('%')?(axis?r.height:r.width)/100:1)));
     // Sample the actual rendered polygon rather than the CSS positioning variables.
     const leftAt=y=>{const xs=[];for(let i=0;i<points.length;i++){const [x1,y1]=points[i],[x2,y2]=points[(i+1)%points.length];if(Math.abs(y2-y1)<.001){if(Math.abs(y-y1)<.001)xs.push(x1,x2);}else if(y>=Math.min(y1,y2)-.001&&y<=Math.max(y1,y2)+.001)xs.push(x1+(x2-x1)*(y-y1)/(y2-y1));}return Math.min(...xs);};
     let clearance=Infinity;
     const ys=[...Array.from({length:49},(_,step)=>r.height*step/48),...points.map(p=>p[1])];
     for(const y of ys){const nativeY=(r.top-rail.top+y)*scale;clearance=Math.min(clearance,(r.left-rail.left+leftAt(y))*scale-edge(nativeY));}
     const leftBend=Math.max(...ys.map(y=>Math.abs(leftAt(y)-(leftAt(0)+(leftAt(r.height)-leftAt(0))*y/r.height))));
     const outerOffsets=ys.map(y=>(r.left-rail.left+leftAt(y))*scale-(1316-(r.top-rail.top+y)*scale/2));
     return {leftBend,outerClearance:Math.min(...outerOffsets),outerOffsetSpread:Math.max(...outerOffsets)-Math.min(...outerOffsets),left:r.left,topLeft:r.left+leftAt(0),bottomLeft:r.left+leftAt(r.height),top:r.top-rail.top,bottom:r.bottom-rail.top,height:r.height,right:r.right,clearance,transform:getComputedStyle(e).transform,vertices:points};
    });
    const grid=document.querySelector('.structure-grid').getBoundingClientRect();
    return {hero:ratio('#inicio'),academy:ratio('#academia'),structureRatio:grid.width/grid.height,railHeight:rail.height,cards,railShadow:getComputedStyle(document.querySelector('.plan-list')).filter,railClip:getComputedStyle(document.querySelector('.plan-list')).clipPath};
   });
   for(const key of ['hero','academy']){assert(Math.abs(compositionGeometry[key].ratio-1672/941)<.002,`${key}: master frame cropped at ${width}`);assert.equal(compositionGeometry[key].fit,'contain');}
   assert(compositionGeometry.structureRatio>2.8,'Structure must remain horizontal');
   compositionGeometry.cards.forEach((card,i)=>{
    assert.equal(card.transform,'none','Plan text and icons must not be skewed');
    assert(card.clearance>=19,`Plan ${i+1} crosses mineral safe area at ${width}: ${card.clearance}`);
    assert(card.top>=0&&card.bottom<=compositionGeometry.railHeight&&card.right<=width,`Plan ${i+1} outside section`);
    if(i>0&&i<4)assert(card.topLeft<compositionGeometry.cards[i-1].topLeft,'First four plan edges must open along the diagonal');
    assert(Math.abs(card.right-compositionGeometry.cards[0].right)<.1,'Plan right edges must align');assert(Math.abs(card.height-compositionGeometry.cards[0].height)<.1,'Plan heights must be consistent');
    if(i>1)assert(Math.abs((card.top-compositionGeometry.cards[i-1].top)-(compositionGeometry.cards[1].top-compositionGeometry.cards[0].top))<.1,'Vertical spacing must be regular');
   });
   assert(compositionGeometry.cards[4].left>compositionGeometry.cards[3].left,'Annual plan must return right after the chevron inflection');
   assert(compositionGeometry.cards[4].topLeft>compositionGeometry.cards[3].topLeft,'Annual top edge must follow the lower return');
   assert(compositionGeometry.cards[3].bottomLeft>compositionGeometry.cards[3].topLeft,'Semestral left edge must turn right around the mineral fold');
   assert(compositionGeometry.cards[3].leftBend<.1,`Semestral left edge must be straight, without a broken lower corner: ${compositionGeometry.cards[3].leftBend}px`);
   assert(compositionGeometry.cards[4].outerClearance>=19,'Annual must clear the outer crease (878,876) → (804,1024)');
   assert(compositionGeometry.cards[4].outerOffsetSpread<.1,'Annual left edge must remain parallel to the main outer crease');
   assert(compositionGeometry.railShadow.includes('drop-shadow'),'Plan depth belongs on the unclipped parent layer');assert.equal(compositionGeometry.railClip,'none');
  }
  const overflow=await page.evaluate(()=>({window:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>innerWidth+.5)&&getComputedStyle(el).position!=='absolute'&&!el.closest('.hero,.academy,.pricing,.footer,.location,.structure-grid');}).map(el=>`${el.tagName}.${el.className}`).slice(0,15)}));
  assert(overflow.scroll<=width+1,`Horizontal overflow at ${width}: ${JSON.stringify(overflow)}`);
  assert.equal(await page.locator('a[href="#"]').count(),0);
  const badAnchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));assert.deepEqual(badAnchors,[]);
  let geometryDelta=0;
  if(geometryBase){const geometry=await page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>[selector,[...document.querySelectorAll(selector)].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,width:r.width,height:r.height,font:s.font,color:s.color,background:s.backgroundColor,clip:s.clipPath};})])),geometryBase.selectors);for(const [selector,before] of Object.entries(geometryBase.viewports[width])){assert.equal(geometry[selector].length,before.length,`Count changed: ${selector} at ${width}`);before.forEach((r,i)=>{for(const property of ['x','y','width','height']){if(selector==='.mascot'&&i===2&&width<761&&['x','y'].includes(property))continue;const delta=Math.abs(geometry[selector][i][property]-r[property]);geometryDelta=Math.max(geometryDelta,delta);assert(delta<0.1,`Geometry changed: ${selector}[${i}].${property} at ${width}: ${r[property]} -> ${geometry[selector][i][property]}`);}for(const property of ['font','color','background','clip'])assert.equal(geometry[selector][i][property],r[property],`Style changed: ${selector} ${property} at ${width}`);});}}
  const cardio=page.getByRole('tab',{name:/Cardio/});await cardio.click();await assert.equal(await page.locator('.modality-name').textContent(),'Cardio');assert.equal(await page.locator('.modality-image').getAttribute('data-media-slot'),'modalidade-cardio');assert.equal(await page.locator('.modality-image').getAttribute('alt'),mediaSlots['modalidade-cardio'].alt);assert.equal(await page.locator('.modality-image').getAttribute('src'),mediaSlots['modalidade-cardio'].desktop.source);
  await cardio.press('ArrowUp');assert.equal(await page.locator('.modality-name').textContent(),'Musculação');assert.equal(await page.locator('#modality-tab-0').getAttribute('aria-selected'),'true');assert.equal(await page.locator('.modality-image').getAttribute('data-media-slot'),'modalidade-musculacao');
  assert.equal(await page.getByRole('tab').count(),2,'Only open modalities are tabs');
  assert.deepEqual(await page.locator('.modality-preview-label strong').allTextContents(),['Musculação','Cardio','Funcional','Aulas coletivas','Piscina e natação','Quadra de areia']);
  assert.deepEqual(await page.locator('.modality-preview-label small').allTextContents(),['Disponível','Disponível','A confirmar','Em breve','Em breve','Em breve']);
  assert.equal(await page.locator('.future-preview img').count(),0,'Future activities must not reuse unrelated photos');
  assert.equal(await page.locator('.modality-previews').isVisible(),true);
  const cardioPreview=page.locator('[data-modality-preview="1"]');await cardioPreview.click();
  assert.equal(await cardioPreview.getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#modality-tab-1').getAttribute('aria-selected'),'true');assert.equal(await page.locator('.modality-name').textContent(),'Cardio');
  await cardioPreview.press('ArrowLeft');assert.equal(await page.locator('[data-modality-preview="0"]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.modality-name').textContent(),'Musculação');
  await page.getByRole('button',{name:'Próxima modalidade disponível'}).click();assert.equal(await page.locator('.modality-name').textContent(),'Cardio');
  await page.getByRole('button',{name:'Modalidade disponível anterior'}).click();assert.equal(await page.locator('.modality-name').textContent(),'Musculação');
  await page.locator('.future-preview').last().click();assert.equal(await page.locator('.modality-name').textContent(),'Musculação');assert.equal(await page.locator('#modality-tab-0').getAttribute('aria-selected'),'true');
  for(const href of await page.locator('.future-preview,.modality-future').evaluateAll(links=>links.map(a=>a.getAttribute('href'))))assert.equal(href,'#expansao');
  const targetGeometry=await page.evaluate(()=>{
   const image=document.querySelector('.construction-picture'),style=getComputedStyle(image),photo=getComputedStyle(image.querySelector('img'));
   const order=[...document.querySelectorAll('.experience-copy,.experience-visual,.experience-values,.experience-quote,.experience-signoff')].map(e=>({class:e.className,y:e.getBoundingClientRect().top}));
   const main=document.querySelector('.experience-visual img'),box=main.getBoundingClientRect();
   return {mask:style.maskImage,filter:style.filter,photoFilter:photo.filter,mobileExperienceOrder:order,imageRatio:box.width/box.height};
  });
  assert.equal(targetGeometry.filter,'none');assert.equal(targetGeometry.photoFilter,'none');
  if(width<761){assert.equal(targetGeometry.mask,'none','Desktop fade must not reach mobile');const positions=targetGeometry.mobileExperienceOrder.map(e=>e.y);assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),'Mobile: introduction, photo, attributes, quote, signature');}
  else{assert(targetGeometry.mask.includes('linear-gradient'),'Construction uses alpha fade');assert(Math.abs(targetGeometry.imageRatio-1672/941)<.002,'Experience master must remain complete');}
  await page.locator('[data-review-next]').click();assert.equal(await page.locator('.review-author strong').textContent(),'Eduardo Souza');
  await page.locator('[data-review-prev]').click();assert.equal(await page.locator('.review-author strong').textContent(),'Wagner Martins');
  await page.locator('.reviews-grid').focus();await page.keyboard.press('End');assert.equal(await page.locator('.review-author strong').textContent(),'Ubiratan Guimarães');await page.keyboard.press('Home');assert.equal(await page.locator('.review-author strong').textContent(),'Wagner Martins');
  const reviewGeometry=()=>page.locator('.review-paper,.review-controls,.review-list').evaluateAll(nodes=>nodes.map(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height};}));
  const initialReviewGeometry=await reviewGeometry();
  for(let i=1;i<4;i++){await page.locator(`.review-dots [data-review="${i}"]`).click();assert.equal(await page.locator('.review-author strong').textContent(),content.reviews[i].author);assert.deepEqual(await reviewGeometry(),initialReviewGeometry,`Review composition shifts for entry ${i} at ${width}`);assert.equal(await page.locator('.review-dots [aria-current="true"]').getAttribute('data-review'),String(i));}
  if(width<761){const clipped=await page.locator('.review-paper').evaluate(e=>{const box=e.getBoundingClientRect();return [...e.querySelectorAll('.review-summary,.review-author strong,.review-author>span')].filter(node=>{const range=document.createRange();range.selectNodeContents(node);const r=range.getBoundingClientRect();return r.left<box.left+15||r.right>box.right-15||r.bottom>box.bottom-15;}).map(n=>n.textContent);});assert.deepEqual(clipped,[],'Review ink must stay within the editorial surface margins');}
  await page.locator('.review-list-item').filter({hasText:'Wagner Martins'}).click();assert.equal(await page.locator('.review-author strong').textContent(),'Wagner Martins');
  const contactGeometry=await page.evaluate(()=>{
   const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height};};
   return {section:rect('#contato'),card:rect('.location-card'),facade:rect('.location-visual'),map:rect('.map-mascot-slot'),buttons:[...document.querySelectorAll('.location-card .button')].map(e=>{const r=e.getBoundingClientRect();return {top:r.top,right:r.right,left:r.left,width:r.width};})};
  });
  const cg=contactGeometry;
  assert(cg.card.left>=0&&cg.card.right<=width,'Contact surface must fit viewport');assert(cg.card.top<cg.facade.bottom,'Contact surface must overlap the composition');
  if(width>=360)assert(Math.abs(cg.buttons[0].top-cg.buttons[1].top)<1,'Contact actions must align horizontally');
  for(const b of cg.buttons)assert(b.left>=cg.card.left&&b.right<=cg.card.right&&b.width>=width*.12,'Contact actions must fit the card');
  if(width<761){assert(cg.map.height>0&&cg.map.bottom<cg.facade.bottom,'Mobile map must precede the facade');assert(cg.card.width>=width*.9,'Mobile contact surface must remain generous');}
  else{assert(Math.abs(cg.section.width/cg.section.height-16/9)<.002,'Location frame must match reference proportion');assert(cg.card.left>width*.55&&cg.card.bottom<=cg.section.bottom,'Desktop contact surface must remain lower right');}
  const focusedPlan=page.locator('.plan').first();const initialClip=await focusedPlan.evaluate(e=>getComputedStyle(e).clipPath);await page.keyboard.press('Tab');await focusedPlan.focus();assert.equal(await focusedPlan.evaluate(e=>getComputedStyle(e).clipPath),initialClip,'Keyboard focus must preserve the mineral-safe contour');assert.equal(await focusedPlan.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  assert.equal(await page.locator('.plan').nth(2).locator('.plan-price strong').textContent(),'149,99');assert.equal(await page.locator('.plan').nth(2).locator('.plan-price small').textContent(),'/mês','3x/week confirmed by user on 2026-10-20');
  if(width<761){
   await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('.menu-toggle').evaluate(e=>document.activeElement===e),true);
   await page.locator('.menu-toggle').click();await page.locator('#main-nav a[href="#planos"]').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
   const paper=page.locator('.review-paper');await paper.scrollIntoViewIfNeeded();await paper.dispatchEvent('pointerdown',{pointerType:'touch',clientX:280,clientY:300});await paper.dispatchEvent('pointerup',{pointerType:'touch',clientX:150,clientY:303});assert.equal(await page.locator('.review-author strong').textContent(),'Eduardo Souza');await page.locator('[data-review-prev]').click();
  }
  const waLinks=await page.locator('a[href^="https://wa.me/"]').evaluateAll(links=>links.map(a=>a.href));assert(waLinks.length>=10);for(const link of waLinks){const u=new URL(link);assert.equal(u.pathname,'/5534992217673');assert(u.searchParams.get('text'));}
  for(const plan of await page.locator('.plan').evaluateAll(ls=>ls.map(a=>({price:a.querySelector('.plan-price strong').textContent,url:a.href}))))assert(new URL(plan.url).searchParams.get('text').includes(plan.price));
  for(const section of await page.locator('main>section').all()){await section.scrollIntoViewIfNeeded();await page.waitForTimeout(30);}
  await page.evaluate(()=>{for(const im of document.images)im.loading='eager';return Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));});
  const activeSlots=await page.locator('[data-media-slot]').evaluateAll(nodes=>nodes.map(n=>n.dataset.mediaSlot));assert.deepEqual([...new Set(activeSlots)].sort(),Object.keys(mediaSlots).sort());for(const id of activeSlots)assert(id in mediaSlots,`Unknown slot ${id}`);assert.equal(await page.locator('iframe').count(),0);
  const requestedPhotos=requests.filter(url=>Object.values(content.photos).some(name=>url.includes(name)));assert.deepEqual(requestedPhotos,[],'Old documentary images must not be requested');
  const unexpectedImages=await page.locator('img').evaluateAll((nodes,approved)=>nodes.filter(n=>!['logo-dark.png','logo-light.png'].some(name=>n.src.endsWith('/'+name))&&!n.src.includes('/assets/borjao/final-v1/')&&!approved.includes(new URL(n.src).pathname)).map(n=>n.src),mapBrandAssets.map(a=>a.file));assert.deepEqual(unexpectedImages,[]);
  assert.equal(await page.locator('.map-brand-marker').count(),1,'Only one map identity marker');
  assert.equal(await page.locator('.map-mascot-slot').getAttribute('aria-hidden'),'true','Illustrative marker must not imply an interactive real map');
  const mapBrandGeometry=await page.locator('.map-brand-marker').evaluate(group=>{
   const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
   const images=[...group.querySelectorAll('img')].map(im=>{
    const canvas=document.createElement('canvas');canvas.width=im.naturalWidth;canvas.height=im.naturalHeight;const ctx=canvas.getContext('2d');ctx.drawImage(im,0,0);
    return {src:new URL(im.src).pathname,native:[im.naturalWidth,im.naturalHeight],box:rect(im),transform:getComputedStyle(im).transform,cornerAlpha:[[0,0],[canvas.width-1,0],[0,canvas.height-1],[canvas.width-1,canvas.height-1]].map(([x,y])=>ctx.getImageData(x,y,1,1).data[3])};
   });
   const plaque=group.querySelector('.map-logo-plaque'),shadow=group.querySelector('.map-marker-shadow');
   return {group:rect(group),slot:rect(group.parentElement),map:(()=>{const r=document.querySelector('.location-art').getBoundingClientRect();return {left:r.left+r.width*40/720,right:r.left+r.width*680/720,top:r.top+r.height*280/1280,bottom:r.top+r.height*580/1280};})(),plaque:rect(plaque),background:getComputedStyle(plaque).backgroundColor,shadow:rect(shadow),shadowFilter:getComputedStyle(shadow).filter,ring:getComputedStyle(shadow,'::after').content,images,protected:[...document.querySelectorAll('.location-heading,.map-label,.location-card')].map(rect)};
  });
  const within=(a,b)=>a.left>=b.left-.1&&a.right<=b.right+.1&&a.top>=b.top-.1&&a.bottom<=b.bottom+.1;
  const overlaps=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  assert(within(mapBrandGeometry.group,mapBrandGeometry.slot),'Identity composition must stay inside the map coordinate field');
  if(width<761)assert(within(mapBrandGeometry.group,mapBrandGeometry.map),'Mobile marker must stay inside the existing map window');
  for(const r of mapBrandGeometry.protected)assert(!overlaps(mapBrandGeometry.group,r),'Marker must not cover heading, location label or contact surface');
  assert.deepEqual(mapBrandGeometry.images.map(im=>im.src),mapBrandAssets.map(a=>a.file),'Use exactly the two approved official files');
  assert.deepEqual(mapBrandGeometry.images.map(im=>im.native),[[1254,1254],[2172,724]]);
  for(const im of mapBrandGeometry.images){assert.deepEqual(im.cornerAlpha,[0,0,0,0],'Official PNG corners must remain transparent');assert.equal(im.transform,'none','Official artwork must not be skewed or mirrored');assert(Math.abs(im.box.width/im.box.height-im.native[0]/im.native[1])<.01,'Official artwork proportions must be preserved');}
  assert(mapBrandGeometry.images[0].box.right<=mapBrandGeometry.plaque.left+.1,'Logo plaque must sit beside, without covering the mascot');
  assert.equal(mapBrandGeometry.background,'rgb(255, 255, 255)');assert.equal(mapBrandGeometry.shadowFilter,'none','Marker must not rely on artificial blur');assert.notEqual(mapBrandGeometry.ring,'none');
  assert(mapBrandGeometry.shadow.width<mapBrandGeometry.images[0].box.width&&mapBrandGeometry.shadow.height<mapBrandGeometry.images[0].box.height*.4,'Ground marker must remain discreet');
  const selectedBackgrounds=await page.locator('.hero-art,.academy-art,.pricing-art,.location-art').evaluateAll(nodes=>nodes.map(im=>{const r=im.getBoundingClientRect(),style=getComputedStyle(im);return {slot:im.dataset.mediaSlot,path:new URL(im.currentSrc).pathname,width:r.width,height:r.height,fit:style.objectFit,filter:style.filter};}));
  for(const im of selectedBackgrounds){
   const expected=width<761?mobileManifest.assets.find(a=>a.slot===mobileSlots[im.slot]):mediaSlots[im.slot].desktop;
   assert.equal(im.path,expected.file||expected.source,'Browser must select the approved source for its breakpoint');
   assert.equal(im.fit,'contain','Approved master must stay complete');assert.equal(im.filter,'none','No artificial warm image treatment');
   assert(Math.abs(im.width/im.height-expected.width/expected.height)<.002,'Background must not be distorted');
  }
  if(width<761){
   for(const id of Object.keys(mobileSlots))assert(!requests.some(url=>new URL(url).pathname===mediaSlots[id].desktop.source),'Mobile must not download a cropped desktop background');
   assert.equal(await page.locator('.site-header .logo').isVisible(),false,'Hero source already includes the official logo; do not duplicate it');
   const academyStats=await page.locator('.academy .stat').evaluateAll(nodes=>nodes.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,blur:getComputedStyle(e).backdropFilter};}));
   for(let i=0;i<academyStats.length;i++){const c=academyStats[i];assert(c.blur.includes('blur(20px)'),'Academy cards need strong neutral glass blur');if(i)assert(c.left>academyStats[i-1].left&&c.top<academyStats[i-1].bottom,'Three academy cards must stay side by side');}
   const order=await page.locator('.pricing-intro,.plan-list,.pricing-benefits,.pricing-benefits .actions').evaluateAll(nodes=>nodes.map(e=>e.getBoundingClientRect().top));assert.deepEqual(order,[...order].sort((a,b)=>a-b),'Mobile pricing order: introduction, plans, benefits, actions');
   const paper=await page.locator('.review-paper').boundingBox();assert(paper.width/paper.height>(width>=360?1.3:1.1),'Mobile editorial review must be wider than tall');
  }else assert.equal(await page.locator('.site-header .logo').isVisible(),true,'Desktop keeps its approved HTML logo');
  const textOverflow=await page.locator('h1,h2,h3,.button,.plan-price').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.textContent));assert.deepEqual(textOverflow,[],`Text overflow at ${width}`);
  for(const asset of manifest.assets){const res=await page.request.get(report.baseURL+asset.file);assert.equal(res.status(),200);}
  const mapLinks=await page.locator('#contato a').evaluateAll(links=>links.map(a=>a.href));assert(mapLinks.filter(u=>u.startsWith(content.contact.maps)).length>=2);
  assert.equal(await page.locator('.mascot').count(),0,'No unvalidated black-background mascot');
  const cls=await page.evaluate(()=>window.__layoutShift);assert(cls<0.1,`Unexpected layout shift: ${cls}`);
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);assert.deepEqual(errors,[]);assert.deepEqual(failedLocal,[]);
  if([1536,1440,1280,1024,980,768,430,390,360,320].includes(width)){
   await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});await page.screenshot({path:`${qaDir}/home-${width}.png`,fullPage:true});
   for(const id of ['inicio','academia','estrutura','modalidades','expansao','experiencia','avaliacoes','planos','contato']){await page.evaluate(()=>document.activeElement?.blur());await page.mouse.move(1,1);await page.locator(`#${id}`).screenshot({path:`${qaDir}/${id}-${width}.png`});}
   await page.evaluate(()=>document.activeElement?.blur());await page.mouse.move(1,1);await page.locator('footer').screenshot({path:`${qaDir}/footer-${width}.png`});
  }
  console.log(`Viewport ${width}: passed`);report.viewports.push({width,overflow:overflow.scroll,sections:9,plans:5,images:'approved-assets-decoded',oldPhotoRequests:requestedPhotos.length,slots:new Set(activeSlots).size,selectedBackgrounds,mapBrandGeometry,compositionGeometry,geometryDelta:geometryBase?geometryDelta:null,layoutShift:cls,javascriptErrors:errors,localNetworkErrors:failedLocal});await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await page.goto(report.baseURL);assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');await page.close();
 const responsivePage=await browser.newPage({viewport:{width:390,height:844}});
 await responsivePage.goto(report.baseURL);
 for(const w of [390,1440,360]){await responsivePage.setViewportSize({width:w,height:1000});await responsivePage.locator('.hero-art,.academy-art,.pricing-art,.location-art').evaluateAll(nodes=>nodes.forEach(im=>im.loading='eager'));await responsivePage.waitForFunction(expected=>[...document.querySelectorAll('.hero-art,.academy-art,.pricing-art,.location-art')].every(im=>im.currentSrc&&new URL(im.currentSrc).pathname===expected[im.dataset.mediaSlot]),Object.fromEntries(Object.keys(mobileSlots).map(id=>[id,w<761?mediaSlots[id].mobile.source:mediaSlots[id].desktop.source])));await responsivePage.evaluate(async()=>{await Promise.all([...document.querySelectorAll('.hero-art,.academy-art,.pricing-art,.location-art')].map(async im=>{im.loading='eager';await im.decode();}));});for(const im of await responsivePage.locator('.hero-art,.academy-art,.pricing-art,.location-art').evaluateAll(nodes=>nodes.map(im=>({id:im.dataset.mediaSlot,path:new URL(im.currentSrc).pathname}))))assert.equal(im.path,w<761?mediaSlots[im.id].mobile.source:mediaSlots[im.id].desktop.source,'Sources must respond to viewport changes without JavaScript activation');}
 await responsivePage.close();
 report.checks=['ten widths without document overflow','17 original public files unchanged','four approved mobile JPG hashes verified; native picture source selection and resize; complete undistorted mobile frames; no desktop downloads for those four slots on mobile','official copy and commercial data unchanged','11 approved WebP hashes match manifest','all 11 approved media slots rendered per view','zero documentary photo requests','mobile map and facade use the approved vertical JPG; illustrative map with real route link, no iframe','nine sections plus footer','one h1','five plans, including 3x/week confirmed by user on 2026-10-20','local anchors resolve','all local images decode','no JS exceptions or local 404','menu open, Escape, return focus and navigation close','modality click and keyboard synchronize image, alt, text and ARIA','review arrows, indicators, list, Home/End and swipe change author with stable geometry','five plan contours trace the mineral chevron; straight Semestral edge, Annual parallel to the outer crease, unclipped parent shadow; aligned right edges, regular heights and gaps; contextual WhatsApp links and unchanged prices','location proportions, overlapping contact surface and aligned actions','two official map PNGs match source hashes, preserve alpha and aspect ratio; one noninteractive marker stays inside map without covering protected content','prefers-reduced-motion'];
 await writeFile(`${qaDir}/results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();localServer?.close();}
