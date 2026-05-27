import { readFileSync, writeFileSync } from 'fs';

const pages = ['about.html','events.html','merch.html','donate.html','contact.html'];

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');

  // ── Cursor: bigger + higher z-index (above any overlays) ──────────────
  c = c.replace(
    /#cursor\{position:fixed;pointer-events:none;z-index:10000;font-size:24px;line-height:1;user-select:none;transform:translate\(-6px,-22px\) rotate\(-20deg\);transition:font-size 0\.15s ease;filter:drop-shadow\(0 2px 6px rgba\(0,0,0,0\.8\)\);\}/,
    '#cursor{position:fixed;pointer-events:none;z-index:100001;font-size:42px;line-height:1;user-select:none;transform:translate(-6px,-32px) rotate(-15deg);transition:font-size 0.15s ease,transform 0.15s ease;filter:drop-shadow(0 2px 8px rgba(0,232,200,0.5));}'
  );

  // ── Desktop nav padding → slightly bigger ────────────────────────────
  c = c.replace('padding:0.5rem 2.5rem;background:rgba(8,8,8,0.55)', 'padding:0.85rem 2.5rem;background:rgba(8,8,8,0.55)');

  // ── Desktop logo → slightly bigger ───────────────────────────────────
  c = c.replace('.nav-logo img{height:42px;display:block;filter:invert(1);mix-blend-mode:screen;}',
    '.nav-logo img{height:50px;display:block;filter:invert(1);mix-blend-mode:screen;}');

  // ── Hero padding-top → bigger gap below nav ───────────────────────────
  c = c.replace('padding-top:70px;padding-bottom:6rem', 'padding-top:110px;padding-bottom:6rem');

  // ── Mobile nav: standardise ────────────────────────────────────────────
  // contact/donate/events/merch style (inline)
  c = c.replace(
    /#nav\{padding:0\.45rem 1\.2rem;\}\.nav-logo img\{height:36px;\}\.nav-links\{display:none;\}/,
    '#nav{padding:0.65rem 1.2rem;}.nav-logo img{height:40px;}.nav-links{display:none;}'
  );
  // about.html style (separate rule block)
  c = c.replace(
    '#nav{padding:0.8rem 1.25rem;}',
    '#nav{padding:0.65rem 1.25rem;}'
  );
  // Replace height:36px if it still remains (about.html may not have it)
  c = c.replace('.nav-logo img{height:36px;}', '.nav-logo img{height:40px;}');

  writeFileSync(f, c, 'utf8');
  console.log(`✓ ${f}`);
});

console.log('\nAll secondary pages patched!');
