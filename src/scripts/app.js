// =====================================================
//  STREETBALL BOVALINO — HOME PAGE
//  Dipende da: config.js, utils.js
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("home-header");
  if (!header) return;

  if (SBB_CONFIG.offSeason) {
    // Modalità fuori stagione: solo il messaggio testuale
    header.innerHTML = `<div style="text-align: center; color: #ffffff; font-size: 2rem;font-family: 'Grashrock', Arial, sans-serif;" 
    class="summer-message">COMING SOON</div>`;
} else {
    // Modalità attiva: mostra hamburger + nav generato dalla config
    const VOCI = [
      ["info",        "info",        "nav/info.html"],
      ["iscriviti",   "iscriviti",   "nav/team-registration.html"],
      ["garaDa3",     "gara da 3",   "nav/three-point-registration.html"],
      ["calendario",  "calendario",  "nav/calendar.html"],
      ["classifiche", "classifiche", "nav/rankings.html"],
    ];

    const links = VOCI.map(([key, label, href]) => {
      const on = SBB_CONFIG.menu[key];
      return `<a href="${on ? href : "#"}" ${on ? "" : 'class="disabled" aria-disabled="true" tabindex="-1"'}>${label}</a>`;
    }).join("\n      ");

    header.innerHTML = `
      <button id="hamburger" aria-label="Apri menu">
        <span></span><span></span><span></span>
      </button>
      <nav id="menu">
        ${links}
      </nav>`;

    initHamburger();
  }
});