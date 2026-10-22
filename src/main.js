import {mediaSlots} from './media-slots.mjs';
import {modalities,reviews} from './content.mjs';
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#main-nav');
function setMenu(open,{returnFocus=false}={}){menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);if(returnFocus)menuButton.focus();}
menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',e=>{if(menuButton.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape'){e.preventDefault();setMenu(false,{returnFocus:true});}if(e.key==='Tab'){const focusable=[menuButton,...menu.querySelectorAll('a')];const i=focusable.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();focusable.at(-1).focus();}else if(!e.shiftKey&&i===focusable.length-1){e.preventDefault();menuButton.focus();}}});
matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const link=menu.querySelector(`a[href="#${entry.target.id}"]`);if(link){menu.querySelectorAll('[aria-current]').forEach(a=>a.removeAttribute('aria-current'));link.setAttribute('aria-current','location');}}},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('main>section').forEach(s=>observer.observe(s));}
const tabs=[...document.querySelectorAll('[data-modality]')];
const previews=[...document.querySelectorAll('[data-modality-preview]')];
const panel=document.querySelector('#modality-panel');
function selectModality(index,{focus=false}={}){const m=modalities[index];if(!m)return;tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(index===i));t.tabIndex=index===i?0:-1;});previews.forEach(b=>{const selected=Number(b.dataset.modalityPreview)===index;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});panel.setAttribute('aria-labelledby',tabs[index].id);const slot=panel.querySelector('[data-media-slot]');slot.dataset.mediaSlot=m.mediaSlot;const media=mediaSlots[m.mediaSlot];slot.src=media.desktop.source;slot.alt=media.alt;slot.width=media.desktop.width;slot.height=media.desktop.height;panel.querySelector('figcaption').textContent=`0${index+1} / Treino em foco`;panel.querySelector('.modality-index').textContent=`0${index+1}`;panel.querySelector('.modality-name').textContent=m.name;panel.querySelector('.modality-tagline').textContent=m.tagline;panel.querySelector('.modality-description').textContent=m.description;if(focus)tabs[index].focus();}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectModality(i));tab.addEventListener('keydown',e=>{let next=i;if(['ArrowDown','ArrowRight'].includes(e.key))next=(i+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))next=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();selectModality(next,{focus:true});});});
previews.forEach((b,i)=>{b.addEventListener('click',()=>selectModality(Number(b.dataset.modalityPreview)));b.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%previews.length;else if(e.key==='ArrowLeft')next=(i-1+previews.length)%previews.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=previews.length-1;else return;e.preventDefault();selectModality(Number(previews[next].dataset.modalityPreview));previews[next].focus();});});
document.querySelectorAll('[data-modality-step]').forEach(b=>b.addEventListener('click',()=>{const selected=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');selectModality((selected+Number(b.dataset.modalityStep)+tabs.length)%tabs.length);}));
let reviewIndex=0;
const carousel=document.querySelector('.reviews-grid');
const reviewButtons=[...document.querySelectorAll('[data-review]')];
function selectReview(index){reviewIndex=(index+reviews.length)%reviews.length;const r=reviews[reviewIndex];carousel.querySelector('.review-topic').textContent=r.topic;carousel.querySelector('.review-summary').textContent=r.summary;carousel.querySelector('.review-author strong').textContent=r.author;carousel.querySelector('.review-count b').textContent=String(reviewIndex+1).padStart(2,'0');reviewButtons.forEach(b=>{if(Number(b.dataset.review)===reviewIndex)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});const list=carousel.querySelector('.review-list');const items=[...list.querySelectorAll('.review-list-item')];reviews.map((r,i)=>({r,i})).filter(({i})=>i!==reviewIndex).forEach(({r,i},j)=>{const item=items[j];item.dataset.review=i;item.querySelector('.review-list-number').textContent=String(i+1).padStart(2,'0');item.querySelector('strong').textContent=r.author;item.querySelector('small').textContent=r.summary;item.removeAttribute('aria-current');});}
carousel.addEventListener('click',e=>{const b=e.target.closest('[data-review]');if(b){selectReview(Number(b.dataset.review));return;}if(e.target.closest('[data-review-prev]'))selectReview(reviewIndex-1);if(e.target.closest('[data-review-next]'))selectReview(reviewIndex+1);});
carousel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();selectReview(reviewIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();selectReview(reviewIndex-1);}if(e.key==='Home'){e.preventDefault();selectReview(0);}if(e.key==='End'){e.preventDefault();selectReview(reviews.length-1);}});
function swipe(el,callback){let start=null;el.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')start={x:e.clientX,y:e.clientY};});el.addEventListener('pointerup',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4)callback(dx<0?1:-1);});el.addEventListener('pointercancel',()=>{start=null;});}
swipe(carousel.querySelector('.review-paper'),direction=>selectReview(reviewIndex+direction));
swipe(panel.querySelector('figure'),direction=>{const selected=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');selectModality((selected+direction+tabs.length)%tabs.length);});

// One reveal per page load; keep a visible static mascot without IntersectionObserver.
const expansionPeek=document.querySelector('.expansion-peek');
if(expansionPeek&&'IntersectionObserver' in window){
 const mobile=matchMedia('(max-width:760px)'),reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
 let revealed=false;
 const observer=new IntersectionObserver(async entries=>{
  if(revealed||!mobile.matches||!entries.some(entry=>entry.isIntersecting))return;
  revealed=true;observer.disconnect();
  await expansionPeek.querySelector('img').decode().catch(()=>{});
  expansionPeek.dataset.entrance=mobile.matches&&!reducedMotion.matches?'entering':'shown';
 },{threshold:.15});
 const watch=()=>{
  observer.disconnect();
  if(revealed){expansionPeek.dataset.entrance='shown';return;}
  if(!mobile.matches){delete expansionPeek.dataset.entrance;return;}
  if(reducedMotion.matches){revealed=true;expansionPeek.dataset.entrance='shown';return;}
  expansionPeek.dataset.entrance='waiting';
  observer.observe(document.querySelector('.expansion-media'));
 };
 expansionPeek.addEventListener('animationend',event=>{if(event.animationName==='expansion-peek-in')expansionPeek.dataset.entrance='shown';});
 mobile.addEventListener('change',watch);reducedMotion.addEventListener('change',watch);watch();
}
