// =====================================================
//  STREETBALL BOVALINO — MENU LOADER
//  Genera header + nav da SBB_CONFIG.
//  Sostituisce tutti gli script fetch('menu.html')
//  presenti nelle singole pagine.
//
//  Dipende da: config.js, utils.js
//  Includere nell'ordine: config.js → utils.js → menu-loader.js
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("menu-placeholder");
  if (!placeholder) return;

  // Definizione delle voci: [chiave config, label, href]
  const VOCI = [
    ["info",        "info",        "info.html"],
    ["iscriviti",   "iscriviti",   "team-registration.html"],
    ["garaDa3",     "gara da 3",   "three-point-registration.html"],
    ["calendario",  "calendario",  "calendar.html"],
    ["classifiche", "classifiche", "rankings.html"],
  ];

  const links = VOCI.map(([key, label, href]) => {
    const abilitato = SBB_CONFIG.menu[key];
    return `<a href="${abilitato ? href : "#"}" ${abilitato ? "" : 'class="disabled" aria-disabled="true" tabindex="-1"'}>${label}</a>`;
  }).join("\n    ");

  placeholder.innerHTML = `
<header>
  <button id="hamburger" aria-label="Apri menu">
    <span></span><span></span><span></span>
  </button>
  <nav id="menu">
    ${links}
  </nav>
</header>`;

  initHamburger();
});