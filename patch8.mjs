import { readFileSync, writeFileSync } from 'fs';

const pages = ['index.html','about.html','events.html','merch.html','donate.html','contact.html'];

// ── Nav brand: Dancing Script → Bebas Neue ─────────────────────────────────
const OLD_NAV_BRAND = `.nav-brand{font-family:'Dancing Script',cursive;font-size:1.35rem;color:#fff;letter-spacing:0.02em;line-height:1;white-space:nowrap;}`;
const NEW_NAV_BRAND = `.nav-brand{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:#fff;letter-spacing:0.1em;line-height:1;white-space:nowrap;}`;

// ── Music IIFE (secondary pages — with comments) ───────────────────────────
const OLD_MUSIC = `(function(){
  const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');
  if(!btn||!aud)return;
  let on=false;
  function syncBtn(){btn.classList.toggle('playing',on);btn.innerHTML=on?'\\u266b':'\\u266a';btn.classList.remove('resume-needed');}
  function play(){
    const t=parseFloat(localStorage.getItem('yin-time')||'0');
    if(t>0){try{aud.currentTime=t;}catch(e){}}
    aud.volume=0.38;
    aud.play().then(()=>{on=true;syncBtn();}).catch(()=>{btn.classList.add('resume-needed');});
  }
  function pause(){aud.pause();on=false;syncBtn();}
  btn.addEventListener('click',()=>{on?pause():play();});
  // Save position every second while playing
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  // Also save on page leave
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');localStorage.setItem('yin-time',aud.currentTime.toString());});
  // Resume if was playing
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

// Robust version: waits for metadata before seeking if not yet loaded
const NEW_MUSIC = `(function(){
  const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');
  if(!btn||!aud)return;
  let on=false;
  function syncBtn(){btn.classList.toggle('playing',on);btn.innerHTML=on?'\\u266b':'\\u266a';btn.classList.remove('resume-needed');}
  function startPlay(t){
    if(t>0){try{aud.currentTime=t;}catch(e){}}
    aud.volume=0.38;
    aud.play().then(()=>{on=true;syncBtn();}).catch(()=>{btn.classList.add('resume-needed');});
  }
  function play(){
    const t=parseFloat(localStorage.getItem('yin-time')||'0');
    if(t>0&&aud.readyState<1){aud.addEventListener('loadedmetadata',()=>startPlay(t),{once:true});aud.load();}
    else{startPlay(t);}
  }
  function pause(){aud.pause();on=false;syncBtn();}
  btn.addEventListener('click',()=>{on?pause():play();});
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());});
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');
  const before = c;

  // 1. Nav brand font
  c = c.replace(OLD_NAV_BRAND, NEW_NAV_BRAND);

  // 2. Audio preload — ensure metadata loads so seek works
  c = c.replace('<audio id="bg-music" loop preload="none">', '<audio id="bg-music" loop preload="metadata">');
  c = c.replace('<audio id="bg-music" loop>', '<audio id="bg-music" loop preload="metadata">');

  // 3. Music IIFE (secondary pages with comments)
  if (c.includes(OLD_MUSIC)) {
    c = c.replace(OLD_MUSIC, NEW_MUSIC);
  }

  // 4. Adventure Odyssey → pink (footer links on all pages)
  c = c.replace(
    /<a href="events\.html#adventure">Adventure Odyssey<\/a>/g,
    `<a href="events.html#adventure" style="color:var(--pink)!important;">Adventure Odyssey</a>`
  );
  // events.html footer (href="#")
  c = c.replace(
    `<a href="#">Adventure Odyssey</a>`,
    `<a href="#" style="color:var(--pink)!important;">Adventure Odyssey</a>`
  );

  if (c !== before) {
    writeFileSync(f, c, 'utf8');
    console.log(`✓ ${f}`);
  } else {
    console.log(`  ${f} (no changes)`);
  }
});

// ── index.html specific fixes ──────────────────────────────────────────────
let idx = readFileSync('index.html', 'utf8');

// Fix music IIFE on index.html (no comments version)
const OLD_IDX_MUSIC = `// Music — localStorage persistence
(function(){
  const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');
  if(!btn||!aud)return;
  let on=false;
  function syncBtn(){btn.classList.toggle('playing',on);btn.innerHTML=on?'♫':'♪';btn.classList.remove('resume-needed');}
  function play(){
    const t=parseFloat(localStorage.getItem('yin-time')||'0');
    if(t>0){try{aud.currentTime=t;}catch(e){}}
    aud.volume=0.38;
    aud.play().then(()=>{on=true;syncBtn();}).catch(()=>{btn.classList.add('resume-needed');});
  }
  function pause(){aud.pause();on=false;syncBtn();}
  btn.addEventListener('click',()=>{on?pause():play();});
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');localStorage.setItem('yin-time',aud.currentTime.toString());});
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

const NEW_IDX_MUSIC = `// Music — localStorage persistence
(function(){
  const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');
  if(!btn||!aud)return;
  let on=false;
  function syncBtn(){btn.classList.toggle('playing',on);btn.innerHTML=on?'♫':'♪';btn.classList.remove('resume-needed');}
  function startPlay(t){
    if(t>0){try{aud.currentTime=t;}catch(e){}}
    aud.volume=0.38;
    aud.play().then(()=>{on=true;syncBtn();}).catch(()=>{btn.classList.add('resume-needed');});
  }
  function play(){
    const t=parseFloat(localStorage.getItem('yin-time')||'0');
    if(t>0&&aud.readyState<1){aud.addEventListener('loadedmetadata',()=>startPlay(t),{once:true});aud.load();}
    else{startPlay(t);}
  }
  function pause(){aud.pause();on=false;syncBtn();}
  btn.addEventListener('click',()=>{on?pause():play();});
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());});
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

if (idx.includes(OLD_IDX_MUSIC)) {
  idx = idx.replace(OLD_IDX_MUSIC, NEW_IDX_MUSIC);
  console.log('✓ index.html music IIFE');
} else {
  console.warn('⚠ index.html music IIFE pattern not found — check manually');
}

// Remove black SVG rectangle from Watch on YouTube button
const OLD_YT_BTN = `<a href="https://www.youtube.com/@youinspirenow" target="_blank" class="btn-teal" data-magnetic style="display:inline-flex;align-items:center;gap:0.6rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808"/></svg>
          Watch on YouTube →
        </a>`;
const NEW_YT_BTN = `<a href="https://www.youtube.com/@youinspirenow" target="_blank" class="btn-teal" data-magnetic>
          Watch on YouTube →
        </a>`;

if (idx.includes(OLD_YT_BTN)) {
  idx = idx.replace(OLD_YT_BTN, NEW_YT_BTN);
  console.log('✓ index.html YouTube SVG removed');
} else {
  console.warn('⚠ YouTube button pattern not found — check manually');
}

writeFileSync('index.html', idx, 'utf8');

// ── events.html: Adventure Odyssey event name → pink ──────────────────────
let evts = readFileSync('events.html', 'utf8');
evts = evts.replace(
  `<div class="ev-name">Adventure Odyssey</div>`,
  `<div class="ev-name" style="color:var(--pink);">Adventure Odyssey</div>`
);
writeFileSync('events.html', evts, 'utf8');
console.log('✓ events.html Adventure Odyssey pink');

console.log('\nAll patches applied!');
