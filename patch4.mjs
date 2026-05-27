import { readFileSync, writeFileSync } from 'fs';

// Common footer + hero mobile CSS to append to each page's @media(max-width:600px) block
const footerMobile = `
  .hero-content{padding:0 1.5rem;}
  .hero-h1{font-size:clamp(3rem,14vw,6rem);}
  .hero-sub{font-size:1rem;max-width:100%;}
  .ft-brand p{font-size:0.9rem;}
  .ft-links a{font-size:0.92rem;}
  .ft-copy{font-size:0.78rem;}
  .ft-col h4{font-size:0.68rem;}
  .ft-soc{width:42px;height:42px;}`;

// ── about.html ────────────────────────────────────────────────────────────────
{
  let c = readFileSync('about.html','utf8');
  const marker = '.ft-grid{grid-template-columns:1fr;gap:1.5rem;}}';
  if (c.includes(marker)) {
    c = c.replace(marker,
      `.ft-grid{grid-template-columns:1fr;gap:1.5rem;}${footerMobile}
  .val-card{padding:2rem 1.8rem;}
  .val-icon{font-size:1.8rem;}
  .pl-card-ab{padding:2rem 1.8rem;}
}`
    );
    writeFileSync('about.html', c, 'utf8');
    console.log('✓ about.html');
  } else {
    // fallback — just insert before closing brace of 600px block
    const alt = '.values-grid{grid-template-columns:1fr;}.pillars-grid{grid-template-columns:1fr 1fr;}.ft-grid{grid-template-columns:1fr;gap:1.5rem;}}';
    if (c.includes(alt)) {
      c = c.replace(alt,
        `.values-grid{grid-template-columns:1fr;}.pillars-grid{grid-template-columns:1fr 1fr;}.ft-grid{grid-template-columns:1fr;gap:1.5rem;}${footerMobile}}`
      );
      writeFileSync('about.html', c, 'utf8');
      console.log('✓ about.html (alt path)');
    } else {
      console.warn('⚠ about.html marker not found');
    }
  }
}

// ── events.html ───────────────────────────────────────────────────────────────
{
  let c = readFileSync('events.html','utf8');
  const marker = '  .od-in{padding:6rem 1.5rem;}\n}';
  if (c.includes(marker)) {
    c = c.replace(marker,
      `  .od-in{padding:6rem 1.5rem;}${footerMobile}
  .od-h{font-size:clamp(2.5rem,12vw,5rem);}
  .od-stats{gap:1.5rem;flex-wrap:wrap;}
  .ev-title{font-size:1.8rem;}
}`
    );
    writeFileSync('events.html', c, 'utf8');
    console.log('✓ events.html');
  } else {
    console.warn('⚠ events.html marker not found');
  }
}

// ── merch.html ────────────────────────────────────────────────────────────────
{
  let c = readFileSync('merch.html','utf8');
  const marker = '  .col-grid{grid-template-columns:1fr;}.ft-grid{grid-template-columns:1fr;gap:2rem;}\n}';
  if (c.includes(marker)) {
    c = c.replace(marker,
      `  .col-grid{grid-template-columns:1fr;}.ft-grid{grid-template-columns:1fr;gap:2rem;}${footerMobile}
  .mp-header-merch{flex-direction:column;align-items:flex-start;gap:1.5rem;}
  .col-card-name{font-size:2rem;}
}`
    );
    writeFileSync('merch.html', c, 'utf8');
    console.log('✓ merch.html');
  } else {
    console.warn('⚠ merch.html marker not found');
  }
}

// ── donate.html ───────────────────────────────────────────────────────────────
{
  let c = readFileSync('donate.html','utf8');
  const marker = '  .imp-grid,.ti-grid{grid-template-columns:1fr;}\n  .ft-grid{grid-template-columns:1fr;gap:2rem;}\n}';
  if (c.includes(marker)) {
    c = c.replace(marker,
      `  .imp-grid,.ti-grid{grid-template-columns:1fr;}
  .ft-grid{grid-template-columns:1fr;gap:2rem;}${footerMobile}
  .ti-card{padding:2rem 1.8rem;}
}`
    );
    writeFileSync('donate.html', c, 'utf8');
    console.log('✓ donate.html');
  } else {
    console.warn('⚠ donate.html marker not found');
  }
}

// ── contact.html ──────────────────────────────────────────────────────────────
{
  let c = readFileSync('contact.html','utf8');
  const marker = '  .cf-row{grid-template-columns:1fr;}\n  .soc-grid{grid-template-columns:1fr;}\n  .ft-grid{grid-template-columns:1fr;gap:2rem;}\n}';
  if (c.includes(marker)) {
    c = c.replace(marker,
      `  .cf-row{grid-template-columns:1fr;}
  .soc-grid{grid-template-columns:1fr;}
  .ft-grid{grid-template-columns:1fr;gap:2rem;}${footerMobile}
}`
    );
    writeFileSync('contact.html', c, 'utf8');
    console.log('✓ contact.html');
  } else {
    console.warn('⚠ contact.html marker not found');
  }
}

console.log('\nMobile patches done!');
