// =====================================================
//  STREETBALL BOVALINO — UTILITÀ CONDIVISE
//  Dipendenza di tutte le pagine interne.
// =====================================================

/**
 * Scarica un CSV da URL e lo restituisce come array 2D.
 * @param {string} url
 * @returns {Promise<string[][]>}
 */
async function fetchCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text.trim().split("\n").map(row => row.split(","));
}

/**
 * Inizializza il comportamento hamburger ↔ menu.
 * Chiamata automaticamente da menu-loader.js.
 */
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  if (!hamburger || !menu) return;
  hamburger.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => menu.classList.remove("open"))
  );
}

// =====================================================
//  LISTA SPONSOR
//  Per aggiungere uno sponsor: aggiungi una riga { name, src }.
//  Per rimuoverlo: cancella la riga.
//  L'ordine qui corrisponde all'ordine di scorrimento.
// =====================================================
const SPONSORS = [
  { name: "Comune",             src: "COMUNE.webp"             },
  { name: "FIP",                src: "FIP.webp"                },
  { name: "LB3",                src: "lb3.webp"                },
  { name: "HOPE",               src: "lohoHOPE.webp"           },
  { name: "Bonaparte",          src: "bonaparte.jpg"           },
  { name: "ProLoco",            src: "proloco.webp"            },
  { name: "Arangara",           src: "arangara.WEBP"           },
  { name: "Bimbi d'Idea",       src: "bimbidea.webp"           },
  { name: "Botteghe",           src: "botteghe.webp"           },
  { name: "Bruzze",             src: "bruzze.jpg"              },
  { name: "Brivido",            src: "brivido.PNG"             },
  { name: "Cataldo",            src: "cataldo.jpg"             },
  { name: "Conad",              src: "conad.PNG"               },
  { name: "Delice",             src: "delice.WEBP"             },
  { name: "Elettrauto Fazzari", src: "elettrauto_Fazzari.webp" },
  { name: "Eurocarne Bovalino", src: "eurocarnibovalino.webp"  },
  { name: "Farmacia Moscati",   src: "farmaciaMoscati.jpg"     },
  { name: "Hobby Bovalino",     src: "hobby_bovalino.webp"     },
  { name: "Italiana Ass.",      src: "italianaAss.webp"        },
  { name: "La Cart",            src: "lacart.webp"             },
  { name: "Leone",              src: "leone.webp"              },
  { name: "Mirime",             src: "mirime.PNG"              },
  { name: "Times Square",       src: "timesSquare.webp"        },
];

/**
 * Genera e inserisce il footer nel placeholder.
 * - Rileva il percorso immagini in base alla posizione della pagina.
 * - Calcola la durata dell'animazione in proporzione al numero di sponsor.
 * - Le immagini mancanti vengono nascoste automaticamente (onerror).
 */
function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  // Percorso immagini relativo alla pagina corrente
  const base    = window.location.pathname.includes("/nav/") ? "../" : "";
  const imgBase = `${base}assets/images/`;

  // Durata proporzionale al numero di sponsor (≈1.4s per sponsor)
  const duration = Math.round(SPONSORS.length * 1.4);

  // Genera i tag <img> una volta sola; vengono duplicati nel markup per il loop
  const items = SPONSORS.map(s =>
    `<img src="${imgBase}${s.src}" alt="${s.name}" loading="lazy" onerror="this.style.display='none'">`
  ).join("");

  placeholder.innerHTML = `
<footer>
  <div class="banner" aria-label="Sponsor">
    <div class="banner-content" style="--banner-duration:${duration}s">
      ${items}
      ${items}
    </div>
  </div>
  <div class="footer-content">
    <div class="social-icons">
      <a href="https://www.instagram.com/streetballbovalino/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.facebook.com/streetballbovalino/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <i class="fab fa-facebook"></i>
      </a>
    </div>
    <div class="credits">
      <p>&copy; ${new Date().getFullYear()} Streetball Bovalino</p>
    </div>
  </div>
</footer>`;
}