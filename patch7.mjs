import { readFileSync, writeFileSync } from 'fs';

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
  setInterval(()=>{if(!aud.paused)localStorage.setItem('yin-time',aud.currentTime.toString());},1000);
  window.addEventListener('pagehide',()=>{localStorage.setItem('yin-playing',on?'1':'0');localStorage.setItem('yin-time',aud.currentTime.toString());});
  if(localStorage.getItem('yin-playing')==='1'){play();}
})();`;

// The old music IIFE start marker (same on all secondary pages)
const OLD_START = `(function(){const btn=document.getElementById('music-btn'),aud=document.getElementById('bg-music');if(!btn||!aud)return;let on=false;const t=parseFloat(localStorage.getItem('yin-time')||'0');function play(){aud.volume=0.38;aud.play().then(()=>{on=true;btn.classList.add('playing');btn.classList.remove('resume-needed');btn.innerHTML='♫';if(t>0){try{aud.currentTime=t;}catch(e){}}}).catch(()=>{btn.classList.add('resume-needed');});}function pause(){aud.pause();on=false;btn.classList.remove('playing');btn.innerHTML='♪';}btn.addEventListener('click',()=>{btn.classList.remove('resume-needed');on?pause():play();});window.addEventListener('beforeunload',()=>{localStorage.setItem('yin-playing',on?'1':'0');localStorage.setItem('yin-time',aud.currentTime.toString());});const wasOn=localStorage.getItem('yin-playing')==='1';if(wasOn){play();}else{document.addEventListener('click',function first(){if(!on)play();},{once:true});}})();`;

// The stale fallback line on events.html
const STALE_LINE = `\ndocument.body.addEventListener('click',()=>{if(!playing&&mus.paused){mus.play().then(()=>{playing=true;mb.classList.add('playing');mb.textContent='♫';}).catch(()=>{});}},{once:true});`;

const pages = ['about.html','merch.html','donate.html','contact.html','events.html'];

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');
  if (c.includes(OLD_START)) {
    c = c.replace(OLD_START, goodMusicJS);
    c = c.replace(STALE_LINE, ''); // remove stale line if present
    writeFileSync(f, c, 'utf8');
    console.log(`✓ ${f}`);
  } else {
    console.warn(`⚠ old music pattern not found in ${f}`);
  }
});

// index.html has a different music setup (wired via intro overlay)
// Just check and fix if the old pattern is there
const idx = readFileSync('index.html', 'utf8');
if (idx.includes(OLD_START)) {
  writeFileSync('index.html', idx.replace(OLD_START, goodMusicJS), 'utf8');
  console.log('✓ index.html');
} else {
  console.log('ℹ index.html uses intro-wired music — checking...');
  // Verify it has the new "pagehide" save logic
  if (idx.includes('pagehide')) {
    console.log('  index.html already has pagehide ✓');
  } else {
    console.warn('  index.html may need manual music check');
  }
}

console.log('\nMusic persistence fixed!');
