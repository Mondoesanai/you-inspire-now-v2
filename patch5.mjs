import { readFileSync, writeFileSync } from 'fs';

const pages = ['index.html','about.html','events.html','merch.html','donate.html','contact.html'];

const brandCSS = `
.nav-brand{font-family:'Bebas Neue',sans-serif;font-size:1.25rem;color:#fff;
  letter-spacing:0.06em;line-height:1;white-space:nowrap;}`;

pages.forEach(f => {
  let c = readFileSync(f, 'utf8');

  // Make .nav-logo a flex row so logo icon + text sit side by side
  c = c.replace(
    '.nav-logo img{height:50px;display:block;filter:invert(1);mix-blend-mode:screen;}',
    '.nav-logo{display:flex;align-items:center;gap:0.65rem;text-decoration:none;}' +
    '.nav-logo img{height:50px;display:block;filter:invert(1);mix-blend-mode:screen;}' +
    brandCSS
  );

  // Mobile: also make it flex (the mobile logo rule may differ)
  c = c.replace(
    '.nav-logo img{height:40px;}',
    '.nav-logo img{height:40px;}.nav-brand{font-size:1.05rem;}'
  );

  // Add brand span — single-line version (secondary pages)
  c = c.replace(
    '<a href="index.html" class="nav-logo"><img src="Screenshot_2026-03-28_195930-removebg-preview.png" alt="You Inspire Now"></a>',
    '<a href="index.html" class="nav-logo"><img src="Screenshot_2026-03-28_195930-removebg-preview.png" alt="You Inspire Now"><span class="nav-brand">You Inspire Now</span></a>'
  );
  // Also handle the go-inspire-now.html variant (different attribute order)
  c = c.replace(
    '<a class="nav-logo" href="index.html"><img src="Screenshot_2026-03-28_195930-removebg-preview.png" alt="You Inspire Now"></a>',
    '<a class="nav-logo" href="index.html"><img src="Screenshot_2026-03-28_195930-removebg-preview.png" alt="You Inspire Now"><span class="nav-brand">You Inspire Now</span></a>'
  );

  // Multi-line version (index.html)
  c = c.replace(
    `    <a href="index.html" class="nav-logo">
      <img src="Screenshot_2026-03-28_195930-removebg-preview.png" alt="You Inspire Now">
    </a>`,
    `    <a href="index.html" class="nav-logo">
      <img src="Screenshot_2026-03-28_195930-removebg-preview.png" alt="You Inspire Now">
      <span class="nav-brand">You Inspire Now</span>
    </a>`
  );

  writeFileSync(f, c, 'utf8');
  console.log(`✓ ${f}`);
});

console.log('\nBrand name added to all navs!');
