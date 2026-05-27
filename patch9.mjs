import { readFileSync, writeFileSync } from 'fs';

const pages = ['index.html','about.html','events.html','merch.html','donate.html','contact.html'];

// ── New event-driven music IIFE (secondary pages) ──────────────────────────
const OLD_MUSIC_SEC = `(function(){
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

const NEW_MUSIC = `(function(){
  const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');
  if(!btn||!aud)return;
  let on=false;
  function syncBtn(){btn.classList.toggle('playing',on);btn.innerHTML=on?'\\u266b':'\\u266a';btn.classList.remove('resume-needed');}
  aud.addEventListener('play',()=>{on=true;syncBtn();});
  aud.addEventListener('pause',()=>{on=false;syncBtn();});
  function startPlay(t){
    if(t>0){try{aud.currentTime=t;}catch(e){}}
    aud.volume=0.38;
    aud.play().catch(()=>{btn.classList.add('resume-needed');});
  }
  function play(){
    const t=parseFloat(localStorage.getItem('yin-time')||'0');
    if(t>0&&aud.readyState<1){aud.addEventListener('loadedmetadata',()=>startPlay(t),{once:true});aud.load();}
    else{startPlay(t);}
  }
  function pause(){aud.pause();}
  btn.addEventListener('click',()=>{on?pause():play();});
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());});
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

// ── index.html music IIFE (uses ♫ / ♪ chars directly) ─────────────────────
const OLD_MUSIC_IDX = `// Music — localStorage persistence
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

const NEW_MUSIC_IDX = `// Music — localStorage persistence
(function(){
  const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');
  if(!btn||!aud)return;
  let on=false;
  function syncBtn(){btn.classList.toggle('playing',on);btn.innerHTML=on?'♫':'♪';btn.classList.remove('resume-needed');}
  aud.addEventListener('play',()=>{on=true;syncBtn();});
  aud.addEventListener('pause',()=>{on=false;syncBtn();});
  function startPlay(t){
    if(t>0){try{aud.currentTime=t;}catch(e){}}
    aud.volume=0.38;
    aud.play().catch(()=>{btn.classList.add('resume-needed');});
  }
  function play(){
    const t=parseFloat(localStorage.getItem('yin-time')||'0');
    if(t>0&&aud.readyState<1){aud.addEventListener('loadedmetadata',()=>startPlay(t),{once:true});aud.load();}
    else{startPlay(t);}
  }
  function pause(){aud.pause();}
  btn.addEventListener('click',()=>{on?pause():play();});
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());});
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');

  // ── 1. Nav CSS: flex → 3-col grid ─────────────────────────────────────────
  c = c.replace(
    '.nav-in{max-width:1340px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;}',
    '.nav-in{max-width:1340px;margin:0 auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:2rem;}.nav-actions{display:flex;align-items:center;justify-content:flex-end;gap:1rem;}'
  );
  // secondary pages have different spacing
  c = c.replace(
    '.nav-in{max-width:1340px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;}',
    '.nav-in{max-width:1340px;margin:0 auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:2rem;}.nav-actions{display:flex;align-items:center;justify-content:flex-end;gap:1rem;}'
  );

  // ── 2. Nav links: add justify-content center ───────────────────────────────
  c = c.replace(
    '.nav-links{display:flex;align-items:center;gap:2rem;}',
    '.nav-links{display:flex;align-items:center;justify-content:center;gap:2rem;}'
  );

  // ── 3. Bigger Give pill ────────────────────────────────────────────────────
  // index.html pill
  c = c.replace(
    /\.nav-pill\{display:inline-flex;align-items:center;gap:0\.6rem;padding:0\.5rem 1\.4rem;/,
    '.nav-pill{display:inline-flex;align-items:center;gap:0.6rem;padding:0.65rem 2rem;'
  );
  // secondary pages pill (different padding values)
  c = c.replace(
    /\.nav-pill\{padding:0\.45rem 1\.3rem;/,
    '.nav-pill{padding:0.65rem 2rem;'
  );

  // ── 4. Mobile: fix grid for 2-col (logo|actions), remove nav-brand ref ────
  // index.html mobile nav-brand line
  c = c.replace(
    '.nav-logo img{height:40px;}.nav-brand{font-size:1.1rem;}',
    '.nav-logo img{height:40px;}.nav-in{grid-template-columns:1fr auto;}'
  );
  // secondary pages mobile nav-brand line (slightly different)
  c = c.replace(
    '.nav-logo img{height:40px;}.nav-brand{font-size:1.1rem;}.nav-links{display:none;}',
    '.nav-logo img{height:40px;}.nav-in{grid-template-columns:1fr auto;}.nav-links{display:none;}'
  );

  // ── 5. Nav HTML: remove nav-brand span, restructure with nav-actions ───────
  // Remove nav-brand span
  c = c.replace(/<span class="nav-brand">You Inspire Now<\/span>/g, '');

  // index.html: multi-line nav structure
  c = c.replace(
    `      <a href="donate.html" class="nav-pill">Give →</a>
    </div>
    <button class="nav-burger" id="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>`,
    `    </div>
    <div class="nav-actions">
      <a href="donate.html" class="nav-pill">Give →</a>
      <button class="nav-burger" id="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>`
  );
  // secondary pages: inline style nav structure
  c = c.replace(
    `<a href="donate.html" class="nav-pill">Give →</a>
    </div>
    <button class="nav-burger" id="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>`,
    `</div>
    <div class="nav-actions"><a href="donate.html" class="nav-pill">Give →</a><button class="nav-burger" id="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button></div>
  </div>`
  );

  // ── 6. Music IIFE: event-driven state sync ─────────────────────────────────
  if (f === 'index.html') {
    if (c.includes(OLD_MUSIC_IDX)) {
      c = c.replace(OLD_MUSIC_IDX, NEW_MUSIC_IDX);
      console.log(`  ✓ ${f} music fixed`);
    } else {
      console.warn(`  ⚠ ${f} music IIFE not matched`);
    }
  } else {
    if (c.includes(OLD_MUSIC_SEC)) {
      c = c.replace(OLD_MUSIC_SEC, NEW_MUSIC);
      console.log(`  ✓ ${f} music fixed`);
    } else {
      console.warn(`  ⚠ ${f} music IIFE not matched`);
    }
  }

  writeFileSync(f, c, 'utf8');
  console.log(`✓ ${f}`);
});

console.log('\nNav + music event-driven patch done!');
