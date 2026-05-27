import { readFileSync, writeFileSync } from 'fs';

// ── HELPERS ────────────────────────────────────────────────────────────────
function replace(file, old, neo, label) {
  let c = readFileSync(file, 'utf8');
  if (!c.includes(old)) { console.warn(`⚠ NOT FOUND [${label}] in ${file}`); return; }
  writeFileSync(file, c.split(old).join(neo), 'utf8');
  console.log(`✓ ${label} in ${file}`);
}

// ══════════════════════════════════════════════════════════════════════════
// 1. index.html — NAV, LOGO, SMALL TEXT, INTRO REDESIGN
// ══════════════════════════════════════════════════════════════════════════
const idx = 'index.html';

// Nav padding → slimmer
replace(idx,
  '#nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:1rem 2.5rem;',
  '#nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:0.5rem 2.5rem;',
  'nav padding desktop');

// Desktop logo → smaller
replace(idx,
  '.nav-logo img{height:78px;display:block;filter:invert(1);mix-blend-mode:screen;}',
  '.nav-logo img{height:42px;display:block;filter:invert(1);mix-blend-mode:screen;}',
  'logo desktop');

// Hero padding-top to match new nav height (~58px)
replace(idx,
  '#hero{min-height:110vh;position:relative;overflow:hidden;\n  display:flex;align-items:flex-end;padding-bottom:7rem;padding-top:90px;}',
  '#hero{min-height:110vh;position:relative;overflow:hidden;\n  display:flex;align-items:flex-end;padding-bottom:7rem;padding-top:70px;}',
  'hero padding-top');

// Mobile nav + logo
replace(idx,
  '#nav{padding:0.8rem 1.2rem;}\n  .nav-logo img{height:60px;}',
  '#nav{padding:0.45rem 1.2rem;}\n  .nav-logo img{height:36px;}',
  'nav+logo mobile');

// Section labels bigger
replace(idx,
  '.section-label{font-size:0.68rem;font-weight:700;letter-spacing:0.28em;',
  '.section-label{font-size:0.78rem;font-weight:700;letter-spacing:0.24em;',
  'section-label text');

// Hero tag bigger
replace(idx,
  '.hero-tag{font-family:\'Inter\',sans-serif;font-size:0.65rem;font-weight:700;\n  letter-spacing:0.3em;',
  '.hero-tag{font-family:\'Inter\',sans-serif;font-size:0.75rem;font-weight:700;\n  letter-spacing:0.26em;',
  'hero-tag text');

// Hero sub bigger
replace(idx,
  '.hero-sub{font-size:1.05rem;font-weight:300;',
  '.hero-sub{font-size:1.12rem;font-weight:300;',
  'hero-sub text');

// ── INTRO: bigger small text + organic paint animation ─────────────────
// Intro tag
replace(idx,
  '.ib-tag{font-size:0.56rem;font-weight:700;letter-spacing:0.38em;text-transform:uppercase;color:var(--teal);\n  opacity:0;animation:ib-rise 0.6s 0.6s ease forwards;margin-bottom:1rem;}',
  '.ib-tag{font-size:0.72rem;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:var(--teal);\n  opacity:0;animation:ib-rise 0.6s 0.6s ease forwards;margin-bottom:1rem;}',
  'ib-tag font');

// Intro sub text (scripture)
replace(idx,
  '.ib-sub{font-family:\'Playfair Display\',serif;font-style:italic;font-size:1rem;\n  color:rgba(255,255,255,0.32);line-height:1.65;opacity:0;\n  animation:ib-rise 0.6s 1.4s ease forwards;margin-bottom:2.6rem;}',
  '.ib-sub{font-family:\'Playfair Display\',serif;font-style:italic;font-size:1.15rem;\n  color:rgba(255,255,255,0.42);line-height:1.7;opacity:0;\n  animation:ib-rise 0.6s 1.4s ease forwards;margin-bottom:2.8rem;}',
  'ib-sub font');

// Intro button bigger
replace(idx,
  '.ib-btn{display:inline-flex;align-items:center;gap:0.9rem;padding:1.1rem 3.2rem;\n  background:var(--teal);color:#080808;font-family:\'Inter\',sans-serif;font-weight:800;\n  font-size:0.76rem;letter-spacing:0.18em;',
  '.ib-btn{display:inline-flex;align-items:center;gap:0.9rem;padding:1.2rem 3.6rem;\n  background:var(--teal);color:#080808;font-family:\'Inter\',sans-serif;font-weight:800;\n  font-size:0.88rem;letter-spacing:0.18em;',
  'ib-btn size');

// Paint blob shapes — organic + slower
replace(idx,
  `.ip-blob{position:absolute;border-radius:50%;transform:scale(0);will-change:transform;}
.ip1{width:300vmax;height:300vmax;right:0;bottom:0;margin-right:-150vmax;margin-bottom:-150vmax;background:#00E8C8;}
.ip2{width:280vmax;height:280vmax;left:0;top:0;margin-left:-140vmax;margin-top:-140vmax;background:#FF2D9E;}
.ip3{width:260vmax;height:260vmax;right:0;top:0;margin-right:-130vmax;margin-top:-130vmax;background:#8B2FFF;}
.ip4{width:240vmax;height:240vmax;left:0;bottom:0;margin-left:-120vmax;margin-bottom:-120vmax;background:#FF2D9E;}
.ip5{width:320vmax;height:320vmax;left:50%;top:50%;margin-left:-160vmax;margin-top:-160vmax;background:#080808;}
.ip-blob.fire{animation:ip-burst 0.55s cubic-bezier(0.16,1,0.3,1) forwards;}
.ip1.fire{animation-delay:0s;}.ip2.fire{animation-delay:0.06s;}.ip3.fire{animation-delay:0.12s;}
.ip4.fire{animation-delay:0.18s;}.ip5.fire{animation-delay:0.30s;}
@keyframes ip-burst{from{transform:scale(0);}to{transform:scale(1);}}`,
  `.ip-blob{position:absolute;transform:scale(0);will-change:transform;}
.ip1{width:320vmax;height:320vmax;right:0;bottom:0;margin-right:-160vmax;margin-bottom:-160vmax;
  background:radial-gradient(ellipse at 58% 42%,#00E8C8,#00C0A8);
  border-radius:63% 37% 71% 29% / 55% 48% 52% 45%;filter:blur(8px);}
.ip2{width:300vmax;height:300vmax;left:0;top:0;margin-left:-150vmax;margin-top:-150vmax;
  background:radial-gradient(ellipse at 42% 58%,#FF2D9E,#CC1A7A);
  border-radius:42% 58% 38% 62% / 70% 35% 65% 30%;filter:blur(7px);}
.ip3{width:280vmax;height:280vmax;right:0;top:0;margin-right:-140vmax;margin-top:-140vmax;
  background:radial-gradient(ellipse at 36% 55%,#8B2FFF,#6B18CC);
  border-radius:71% 29% 55% 45% / 38% 62% 38% 62%;filter:blur(9px);}
.ip4{width:260vmax;height:260vmax;left:0;bottom:0;margin-left:-130vmax;margin-bottom:-130vmax;
  background:radial-gradient(ellipse at 64% 36%,#FF2D9E,#FF6EC7);
  border-radius:38% 62% 45% 55% / 60% 42% 58% 40%;filter:blur(6px);}
.ip5{width:360vmax;height:360vmax;left:50%;top:50%;margin-left:-180vmax;margin-top:-180vmax;
  background:#080808;border-radius:50%;filter:blur(0);}
.ip-blob.fire{animation:ip-burst 1.2s cubic-bezier(0.34,0,0.2,1) forwards;}
.ip1.fire{animation-delay:0s;}.ip2.fire{animation-delay:0.18s;}.ip3.fire{animation-delay:0.32s;}
.ip4.fire{animation-delay:0.44s;}.ip5.fire{animation-delay:0.65s;}
@keyframes ip-burst{
  0%{transform:scale(0);}
  65%{transform:scale(1.06);}
  82%{transform:scale(0.97);}
  100%{transform:scale(1);}}`,
  'paint blobs organic+slow');

// Add mobile responsive CSS for intro (insert before closing @media)
// Find the mobile media query block that has the nav styles
const mobileIntroCSS = `\n  .intro-content{padding:1.2rem;max-width:100%;}\n  .intro-logo{height:52px;}\n  .ib-main{font-size:clamp(2.6rem,11vw,4rem);}\n  .ib-sub{font-size:1rem;}\n  .ib-btn{padding:1rem 2.4rem;font-size:0.82rem;}`;

// Insert into the existing @media(max-width:600px) block
let idxContent = readFileSync(idx, 'utf8');
// Find the mobile media query closing brace and insert before it
const mobileMarker = '  #music-btn{bottom:1.5rem;right:1.5rem;width:44px;height:44px;}}';
if (idxContent.includes(mobileMarker)) {
  idxContent = idxContent.replace(mobileMarker, `  #music-btn{bottom:1.5rem;right:1.5rem;width:44px;height:44px;}${mobileIntroCSS}}`);
  writeFileSync(idx, idxContent, 'utf8');
  console.log(`✓ mobile intro CSS in ${idx}`);
} else {
  console.warn(`⚠ mobile marker not found in ${idx}`);
}

// Update paint animation JS timing (slower fade-out)
replace(idx,
  '    // Fade out overlay after black blob covers screen\n    setTimeout(()=>intro.classList.add(\'out\'),850);\n    setTimeout(()=>{intro.style.display=\'none\';},1450);',
  '    // Fade out overlay after black blob covers screen (~1.85s)\n    setTimeout(()=>intro.classList.add(\'out\'),1900);\n    setTimeout(()=>{intro.style.display=\'none\';},2500);',
  'intro fade timing');

// ══════════════════════════════════════════════════════════════════════════
// 2. ALL PAGES — nav logo + small text
// ══════════════════════════════════════════════════════════════════════════
const pages = ['about.html','events.html','merch.html','donate.html','contact.html'];
pages.forEach(f => {
  let c = readFileSync(f, 'utf8');
  // Desktop logo
  c = c.replace(
    '.nav-logo img{height:78px;display:block;filter:invert(1);mix-blend-mode:screen;}',
    '.nav-logo img{height:42px;display:block;filter:invert(1);mix-blend-mode:screen;}'
  );
  // Desktop nav padding (various patterns across pages)
  c = c.replace(/padding:1rem 2\.5rem;(background:rgba\(8,8,8,0\.55\))/g,
    'padding:0.5rem 2.5rem;$1');
  // Mobile logo
  c = c.replace('.nav-logo img{height:60px;}', '.nav-logo img{height:36px;}');
  // Mobile nav padding
  c = c.replace('#nav{padding:0.8rem 1.2rem;}', '#nav{padding:0.45rem 1.2rem;}');
  // Section labels bigger
  c = c.replace(/font-size:0\.68rem;font-weight:700;letter-spacing:0\.28em;text-transform:uppercase;/g,
    'font-size:0.78rem;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;');
  c = c.replace(/font-size:0\.62rem;font-weight:700;letter-spacing:0\.3em;/g,
    'font-size:0.72rem;font-weight:700;letter-spacing:0.26em;');
  c = c.replace(/font-size:0\.62rem;font-weight:700;letter-spacing:0\.32em;/g,
    'font-size:0.72rem;font-weight:700;letter-spacing:0.28em;');
  // Hero sub bigger
  c = c.replace('font-size:1.05rem;font-weight:300;color:rgba(255,255,255,0.5)',
    'font-size:1.12rem;font-weight:300;color:rgba(255,255,255,0.5)');
  c = c.replace('font-size:1.05rem;color:rgba(255,255,255,0.45)',
    'font-size:1.12rem;color:rgba(255,255,255,0.45)');
  // Reduce hero padding-top for thinner nav
  c = c.replace('padding-top:90px;padding-bottom:6rem', 'padding-top:70px;padding-bottom:6rem');
  writeFileSync(f, c, 'utf8');
  console.log(`✓ ${f}`);
});

console.log('\nAll patches applied!');
