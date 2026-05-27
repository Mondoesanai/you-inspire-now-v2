import { readFileSync, writeFileSync } from 'fs';

// ── 1. FIX SHOE CURSOR SIZE ON ALL SECONDARY PAGES ─────────────────────────
const secondary = ['about.html','events.html','merch.html','donate.html','contact.html'];
secondary.forEach(f => {
  let c = readFileSync(f, 'utf8');
  // 24px → 42px, translate(-4px,-20px) → translate(-6px,-32px)
  c = c.replace(
    '#cursor{position:fixed;pointer-events:none;z-index:10000;font-size:24px;line-height:1;user-select:none;transform:translate(-4px,-20px) rotate(-15deg);transition:font-size 0.15s ease,transform 0.15s ease;filter:drop-shadow(0 2px 8px rgba(0,232,200,0.5));}',
    '#cursor{position:fixed;pointer-events:none;z-index:10000;font-size:42px;line-height:1;user-select:none;transform:translate(-6px,-32px) rotate(-15deg);transition:font-size 0.15s ease,transform 0.15s ease;filter:drop-shadow(0 2px 8px rgba(0,232,200,0.5));}'
  );
  // hov 32px → 54px
  c = c.replace(
    '#cursor.hov{font-size:32px;transform:translate(-4px,-24px) rotate(-20deg);}',
    '#cursor.hov{font-size:54px;transform:translate(-6px,-40px) rotate(-20deg);}'
  );
  writeFileSync(f, c, 'utf8');
  console.log('cursor fixed: ' + f);
});

// ── 2. PATCH index.html ─────────────────────────────────────────────────────
let idx = readFileSync('index.html', 'utf8');

// 2a. Replace intro CSS block
const OLD_INTRO_CSS = `/* ── INTRO SPLASH ── */
/* ── BLUR INTRO OVERLAY ── */
#intro{position:fixed;inset:0;z-index:99999;cursor:none;
  background:rgba(8,8,8,0.70);
  -webkit-backdrop-filter:blur(22px) saturate(1.2);
  backdrop-filter:blur(22px) saturate(1.2);
  display:flex;align-items:center;justify-content:center;
  transition:opacity 1.2s cubic-bezier(0.16,1,0.3,1);}
#intro.out{opacity:0;pointer-events:none;}
.intro-splats{position:absolute;inset:0;pointer-events:none;}
.intro-content{position:relative;z-index:2;text-align:center;padding:2rem;max-width:540px;}
.intro-logo{height:82px;filter:invert(1) drop-shadow(0 0 24px rgba(0,232,200,0.5));opacity:0;
  animation:ib-rise 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) forwards;}
.ib-rule{width:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--teal),transparent);margin:1.2rem auto;
  animation:ib-rule-expand 0.8s 0.9s ease forwards;}
.ib-main{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.4rem,5vw,4rem);
  color:#fff;line-height:0.96;letter-spacing:0.06em;opacity:0;
  animation:ib-rise 0.8s 1.1s cubic-bezier(0.16,1,0.3,1) forwards;}
.ib-main .tl{color:var(--teal);text-shadow:0 0 40px rgba(0,232,200,0.6);}
.ib-shoe{font-size:2.6rem;display:block;margin:1.6rem auto 0.4rem;opacity:0;transform:rotate(-20deg);
  animation:ib-rise 0.7s 1.7s ease forwards, shoe-float 2.2s 2.5s ease-in-out infinite;}
.ib-cta{font-size:0.58rem;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;
  color:rgba(255,255,255,0.28);opacity:0;
  animation:ib-rise 0.6s 2.0s ease forwards;}
@keyframes ib-rise{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
@keyframes ib-rule-expand{to{width:70px;}}
@keyframes shoe-float{
  0%,100%{transform:translateY(0) rotate(-20deg);filter:drop-shadow(0 2px 10px rgba(0,232,200,0.3));}
  50%{transform:translateY(-10px) rotate(-20deg);filter:drop-shadow(0 10px 28px rgba(0,232,200,0.9));}}`;

const NEW_INTRO_CSS = `/* ── INTRO OVERLAY ── */
#intro{position:fixed;inset:0;z-index:99999;
  background:rgba(8,8,8,0.78);
  -webkit-backdrop-filter:blur(22px) saturate(1.2);
  backdrop-filter:blur(22px) saturate(1.2);
  display:flex;align-items:center;justify-content:center;
  transition:opacity 0.5s ease;}
#intro.out{opacity:0;pointer-events:none;}
#intro-paint{position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;}
.ip-blob{position:absolute;border-radius:50%;transform:scale(0);will-change:transform;}
.ip1{width:300vmax;height:300vmax;right:0;bottom:0;margin-right:-150vmax;margin-bottom:-150vmax;background:#00E8C8;}
.ip2{width:280vmax;height:280vmax;left:0;top:0;margin-left:-140vmax;margin-top:-140vmax;background:#FF2D9E;}
.ip3{width:260vmax;height:260vmax;right:0;top:0;margin-right:-130vmax;margin-top:-130vmax;background:#8B2FFF;}
.ip4{width:240vmax;height:240vmax;left:0;bottom:0;margin-left:-120vmax;margin-bottom:-120vmax;background:#FF2D9E;}
.ip5{width:320vmax;height:320vmax;left:50%;top:50%;margin-left:-160vmax;margin-top:-160vmax;background:#080808;}
.ip-blob.fire{animation:ip-burst 0.55s cubic-bezier(0.16,1,0.3,1) forwards;}
.ip1.fire{animation-delay:0s;}.ip2.fire{animation-delay:0.06s;}.ip3.fire{animation-delay:0.12s;}
.ip4.fire{animation-delay:0.18s;}.ip5.fire{animation-delay:0.30s;}
@keyframes ip-burst{from{transform:scale(0);}to{transform:scale(1);}}
.intro-content{position:relative;z-index:2;text-align:center;padding:2rem;max-width:600px;}
.intro-logo{height:72px;filter:invert(1) drop-shadow(0 0 24px rgba(0,232,200,0.5));opacity:0;
  animation:ib-rise 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) forwards;margin-bottom:1.6rem;display:block;margin-left:auto;margin-right:auto;}
.ib-tag{font-size:0.56rem;font-weight:700;letter-spacing:0.38em;text-transform:uppercase;color:var(--teal);
  opacity:0;animation:ib-rise 0.6s 0.6s ease forwards;margin-bottom:1rem;}
.ib-main{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,6.5vw,6rem);
  color:#fff;line-height:0.9;letter-spacing:0.02em;opacity:0;
  animation:ib-rise 0.8s 0.9s cubic-bezier(0.16,1,0.3,1) forwards;margin-bottom:1.4rem;}
.ib-main .tl{color:var(--teal);text-shadow:0 0 40px rgba(0,232,200,0.7);}
.ib-sub{font-family:'Playfair Display',serif;font-style:italic;font-size:1rem;
  color:rgba(255,255,255,0.32);line-height:1.65;opacity:0;
  animation:ib-rise 0.6s 1.4s ease forwards;margin-bottom:2.6rem;}
.ib-btn{display:inline-flex;align-items:center;gap:0.9rem;padding:1.1rem 3.2rem;
  background:var(--teal);color:#080808;font-family:'Inter',sans-serif;font-weight:800;
  font-size:0.76rem;letter-spacing:0.18em;text-transform:uppercase;border:none;border-radius:100px;
  cursor:pointer;box-shadow:0 0 40px rgba(0,232,200,0.55),0 0 80px rgba(0,232,200,0.2);
  transition:transform 0.2s cubic-bezier(.34,1.56,.64,1),box-shadow 0.2s;opacity:0;
  animation:ib-rise 0.7s 1.8s cubic-bezier(0.16,1,0.3,1) forwards;}
.ib-btn:hover{transform:scale(1.06);box-shadow:0 0 60px rgba(0,232,200,0.8),0 0 120px rgba(0,232,200,0.35);}
.ib-btn:active{transform:scale(0.97);}
@keyframes ib-rise{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}`;

idx = idx.replace(OLD_INTRO_CSS, NEW_INTRO_CSS);

// 2b. Replace .ep-adventure colors (dark green → deep ocean navy)
idx = idx.replace(
  '.ep-adventure .ep-body{background:linear-gradient(148deg,#050F08 0%,#0A3020 55%,#0D5C30 100%);}',
  '.ep-adventure .ep-body{background:linear-gradient(148deg,#020810 0%,#041A30 55%,#074060 100%);}'
);
idx = idx.replace(
  '.ep-adventure .ep-orb{width:300px;height:300px;background:radial-gradient(circle,rgba(0,232,200,0.4),transparent 70%);}',
  '.ep-adventure .ep-orb{width:300px;height:300px;background:radial-gradient(circle,rgba(0,180,255,0.5),transparent 70%);}'
);
idx = idx.replace(
  '.ep-adventure:hover{box-shadow:0 50px 100px rgba(0,180,140,0.35);}',
  '.ep-adventure:hover{box-shadow:0 50px 100px rgba(0,120,220,0.4);}'
);
idx = idx.replace(
  '.ep-adventure .ep-ring{width:260px;height:260px;border:1px solid rgba(0,232,200,0.1);}',
  '.ep-adventure .ep-ring{width:260px;height:260px;border:1px solid rgba(0,180,255,0.12);}'
);

// 2c. Replace intro HTML — find the big <div id="intro">...</div> block
// We'll find the opening and closing markers
const introStart = '<div id="intro">';
const introEnd = '</div>\n</div>\n\n<div class="grain">';
const introEndReplacement = '</div>\n\n<div class="grain">';
const newIntroHTML = `<div id="intro">
  <div id="intro-paint">
    <div class="ip-blob ip1"></div>
    <div class="ip-blob ip2"></div>
    <div class="ip-blob ip3"></div>
    <div class="ip-blob ip4"></div>
    <div class="ip-blob ip5"></div>
  </div>
  <div class="intro-content">
    <img src="Screenshot_2026-03-28_195930-removebg-preview.png" class="intro-logo" alt="You Inspire Now">
    <div class="ib-tag">You Inspire Now</div>
    <div class="ib-main">ARE YOU READY<br>TO TAKE THE <span class="tl">STEP?</span></div>
    <div class="ib-sub">"For I know the plans I have for you,<br>declares the Lord." — Jeremiah 29:11</div>
    <button class="ib-btn" id="take-step-btn">TAKE THE STEP &nbsp;→</button>
  </div>
</div>

<div class="grain">`;

// Find the intro div block and replace up to the grain div
const introIdx = idx.indexOf('<div id="intro">');
const grainIdx = idx.indexOf('\n<div class="grain">', introIdx);
if (introIdx !== -1 && grainIdx !== -1) {
  idx = idx.slice(0, introIdx) + newIntroHTML + idx.slice(grainIdx + 1);
  console.log('intro HTML replaced');
} else {
  console.error('Could not find intro block! introIdx='+introIdx+' grainIdx='+grainIdx);
}

// 2d. Remove #home-drop section + merge countdown into #merch-preview
// Find and remove the home-drop section
const homeDropStart = '\n<section id="home-drop"';
const homeDropEnd = '\n</section>\n\n<!-- MERCH PREVIEW -->';
const hdStart = idx.indexOf(homeDropStart);
const hdEnd = idx.indexOf(homeDropEnd);
if (hdStart !== -1 && hdEnd !== -1) {
  idx = idx.slice(0, hdStart) + '\n\n<!-- COLLECTION + DROP -->' + idx.slice(hdEnd + homeDropEnd.length);
  console.log('home-drop section removed');
} else {
  console.error('Could not find home-drop section! hdStart='+hdStart+' hdEnd='+hdEnd);
}

// 2e. Replace mp-header to add countdown on the right
const OLD_MP_HEADER = `    <div class="mp-header reveal">
      <div>
        <div class="section-label" style="color:var(--pink);">— Wear Your Inspiration</div>
        <div class="section-h">The <span class="pk">Collection.</span></div>
      </div>
      <a href="merch.html" class="mp-link">Shop All Merch →</a>
    </div>`;

const NEW_MP_HEADER = `    <div class="mp-header reveal">
      <div>
        <div class="section-label" style="color:var(--pink);">— Wear Your Inspiration</div>
        <div class="section-h">The <span class="pk">Collection.</span></div>
        <p style="font-size:0.92rem;color:rgba(255,255,255,0.36);line-height:1.8;margin-top:0.8rem;max-width:420px;">Every first of the month, a new faith-rooted piece drops. Don't miss it — once it's gone, it's gone.</p>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-size:0.52rem;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:rgba(0,232,200,0.7);margin-bottom:0.6rem;">Next Drop In</div>
        <div style="display:flex;align-items:flex-start;justify-content:flex-end;gap:0.5rem;margin-bottom:1.2rem;">
          <div style="text-align:center;"><div id="hd-hours" style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;color:#fff;line-height:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:0.1rem 0.6rem;min-width:1.8ch;text-shadow:0 0 24px rgba(0,232,200,0.3);">00</div><div style="font-size:0.5rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-top:0.3rem;">Hrs</div></div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;color:rgba(0,232,200,0.3);line-height:1;padding-top:0.05rem;">:</div>
          <div style="text-align:center;"><div id="hd-mins" style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;color:#fff;line-height:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:0.1rem 0.6rem;min-width:1.8ch;text-shadow:0 0 24px rgba(0,232,200,0.3);">00</div><div style="font-size:0.5rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-top:0.3rem;">Min</div></div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;color:rgba(0,232,200,0.3);line-height:1;padding-top:0.05rem;">:</div>
          <div style="text-align:center;"><div id="hd-secs" style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;color:#fff;line-height:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:0.1rem 0.6rem;min-width:1.8ch;text-shadow:0 0 24px rgba(0,232,200,0.3);">00</div><div style="font-size:0.5rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-top:0.3rem;">Sec</div></div>
        </div>
        <a href="merch.html" class="mp-link">Shop The Drop →</a>
      </div>
    </div>`;

if (idx.includes(OLD_MP_HEADER)) {
  idx = idx.replace(OLD_MP_HEADER, NEW_MP_HEADER);
  console.log('mp-header updated with countdown');
} else {
  console.error('Could not find OLD_MP_HEADER');
}

// 2f. Replace intro JS block
const OLD_INTRO_JS = `// Intro blur overlay — click anywhere to enter
(function(){
  const intro=document.getElementById('intro');
  if(!intro) return;
  if(sessionStorage.getItem('yin-intro-seen')){
    intro.style.display='none'; return;
  }
  function dismiss(){
    sessionStorage.setItem('yin-intro-seen','1');
    intro.classList.add('out');
    setTimeout(()=>intro.style.display='none',1200);
  }
  intro.addEventListener('click', dismiss, {once:true});
  setTimeout(dismiss, 12000);
})();`;

const NEW_INTRO_JS = `// Intro — TAKE THE STEP button fires paint explosion + auto-starts music
(function(){
  const intro=document.getElementById('intro');
  const btn=document.getElementById('take-step-btn');
  const aud=document.getElementById('bg-music');
  const mBtn=document.getElementById('music-btn');
  if(!intro||!btn) return;
  if(sessionStorage.getItem('yin-intro-seen')){intro.style.display='none';return;}
  btn.addEventListener('click',function(){
    sessionStorage.setItem('yin-intro-seen','1');
    // Auto-play music — user gesture unlocks the browser
    if(aud){
      aud.volume=0.38;
      aud.play().then(()=>{
        localStorage.setItem('yin-playing','1');
        if(mBtn){mBtn.classList.add('playing');mBtn.classList.remove('resume-needed');mBtn.innerHTML='\\u266b';}
        const t=parseFloat(localStorage.getItem('yin-time')||'0');
        if(t>0){try{aud.currentTime=t;}catch(e){}}
      }).catch(()=>{if(mBtn)mBtn.classList.add('resume-needed');});
    }
    // Fire paint blobs from corners
    document.querySelectorAll('.ip-blob').forEach(b=>b.classList.add('fire'));
    // Fade out overlay after black blob covers screen
    setTimeout(()=>intro.classList.add('out'),850);
    setTimeout(()=>{intro.style.display='none';},1450);
  });
  // Auto-dismiss after 20s if nobody clicks
  setTimeout(()=>{
    if(!sessionStorage.getItem('yin-intro-seen')){
      sessionStorage.setItem('yin-intro-seen','1');
      intro.classList.add('out');
      setTimeout(()=>{intro.style.display='none';},600);
    }
  },20000);
})();`;

if (idx.includes(OLD_INTRO_JS)) {
  idx = idx.replace(OLD_INTRO_JS, NEW_INTRO_JS);
  console.log('intro JS replaced');
} else {
  console.error('Could not find OLD_INTRO_JS');
}

// 2g. Remove the click-fallback from music JS since intro handles first play
idx = idx.replace(
  `  const wasOn=localStorage.getItem('yin-playing')==='1';
  if(wasOn){play();}
  else{document.addEventListener('click',function first(){if(!on)play();},{once:true});}`,
  `  const wasOn=localStorage.getItem('yin-playing')==='1';
  if(wasOn){play();}`
);

// 2h. Add countdown JS before closing </script>
const COUNTDOWN_JS = `
// 12-hour countdown from first load (persists in sessionStorage)
(function(){
  let end=parseInt(sessionStorage.getItem('yin-drop-end')||'0');
  if(!end||end<=Date.now()){
    end=Date.now()+12*3600*1000;
    sessionStorage.setItem('yin-drop-end',end.toString());
  }
  function pad(n){return String(n).padStart(2,'0');}
  function tick(){
    const diff=Math.max(0,end-Date.now());
    const h=Math.floor(diff/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    const hEl=document.getElementById('hd-hours');
    const mEl=document.getElementById('hd-mins');
    const sEl=document.getElementById('hd-secs');
    if(hEl)hEl.textContent=pad(h);
    if(mEl)mEl.textContent=pad(m);
    if(sEl)sEl.textContent=pad(s);
    if(diff<=0){sessionStorage.removeItem('yin-drop-end');}
  }
  tick();
  setInterval(tick,1000);
})();
`;

idx = idx.replace('\n</script>', COUNTDOWN_JS + '\n</script>');

writeFileSync('index.html', idx, 'utf8');
console.log('\n✓ index.html patched');
console.log('All done!');
