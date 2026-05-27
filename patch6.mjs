import { readFileSync, writeFileSync } from 'fs';

const pages = ['index.html','about.html','events.html','merch.html','donate.html','contact.html'];

// ── Clean, reliable music JS ─────────────────────────────────────────────────
const goodMusicJS = `(function(){
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

// Old music JS patterns to replace on secondary pages (events, about, merch, donate, contact)
const oldSecondaryMusicPattern = /\(function\(\)\{const btn=document\.getElementById\('music-btn'\)[\s\S]*?}\)\(\);[\s\S]*?document\.body\.addEventListener[\s\S]*?}\s*,\s*\{once:true\}\);/;

// Old music JS pattern on index.html (different, set up by intro overlay code)
const oldIndexMusicPattern = /\(function\(\)\{const btn=document\.getElementById\('music-btn'\)[\s\S]*?}\)\(\);/;

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');

  // ── 1. Font: add Dancing Script to Google Fonts import ──────────────────
  // Replace the existing font import line to add Dancing Script
  c = c.replace(
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap'
  );

  // ── 2. Nav brand font ────────────────────────────────────────────────────
  // Update .nav-brand to use Dancing Script
  c = c.replace(
    /\.nav-brand\{font-family:'Bebas Neue',sans-serif;font-size:1\.25rem;color:#fff;\s*letter-spacing:0\.06em;line-height:1;white-space:nowrap;\}/,
    ".nav-brand{font-family:'Dancing Script',cursive;font-size:1.35rem;color:#fff;letter-spacing:0.02em;line-height:1;white-space:nowrap;}"
  );
  // Mobile nav-brand
  c = c.replace(
    ".nav-brand{font-size:1.05rem;}",
    ".nav-brand{font-size:1.1rem;}"
  );

  // ── 3. Music JS: replace with clean version ──────────────────────────────
  if (f === 'index.html') {
    // index.html has its own music init embedded in the intro JS block
    // Replace the OLD secondary-style music block if present
    c = c.replace(oldSecondaryMusicPattern, goodMusicJS);
    // Also handle the case where it's the simpler pattern
    if (!c.includes('Save position every second')) {
      c = c.replace(oldIndexMusicPattern, goodMusicJS);
    }
  } else {
    // Secondary pages: replace old music block + the stale mus/playing line
    c = c.replace(oldSecondaryMusicPattern, goodMusicJS);
    // Remove the stale fallback click handler (references undefined `playing`/`mus`)
    c = c.replace(/\ndocument\.body\.addEventListener\('click',\(\)=>\{if\(!playing&&mus\.paused\).*?\}\),\{once:true\}\);/g, '');
  }

  writeFileSync(f, c, 'utf8');
  console.log(`✓ ${f}`);
});

console.log('\nFont + music patches done!');
