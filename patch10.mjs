import { readFileSync, writeFileSync } from 'fs';

// These 4 pages still have the simple music pattern (no startPlay/loadedmetadata)
const pages = ['about.html','merch.html','donate.html','contact.html'];

const OLD = `(function(){
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

const NEW = `(function(){
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

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');
  if (c.includes(OLD)) {
    writeFileSync(f, c.replace(OLD, NEW), 'utf8');
    console.log(`✓ ${f}`);
  } else {
    console.warn(`⚠ ${f} — pattern not found, check manually`);
  }
});
console.log('done');
