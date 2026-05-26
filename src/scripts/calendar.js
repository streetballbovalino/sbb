// =====================================================
//  STREETBALL BOVALINO — CALENDARIO
//  Dipende da: config.js, utils.js, menu-loader.js
// =====================================================

const CALENDARIO_URLS = [
  {
    label: "Giorno 1",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=0&single=true&output=csv",
  },
  {
    label: "Giorno 2",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=227217869&single=true&output=csv",
  },
  {
    label: "Giorno 3",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=745816722&single=true&output=csv",
  },
];

function renderCalendarTable(data, container, label) {
  const title = document.createElement("h1");
  title.textContent = label;
  title.style.textAlign = "center";
  container.appendChild(title);

  const table = document.createElement("table");

  // Intestazione (prime 3 colonne)
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    const th = document.createElement("th");
    th.textContent = data[0][i];
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Righe dati
  const tbody = document.createElement("tbody");
  data.slice(1).forEach(row => {
    const tr = document.createElement("tr");

    const tdOra = document.createElement("td");
    tdOra.textContent = row[0];
    tdOra.style.backgroundColor = "#fffbcc";
    tr.appendChild(tdOra);

    const tdCampo1 = document.createElement("td");
    tdCampo1.textContent = row[1];
    if (row[3]) tdCampo1.style.backgroundColor = row[3];
    if (row[5]?.toUpperCase().includes("IN CORSO")) tdCampo1.classList.add("live-cell");
    tr.appendChild(tdCampo1);

    const tdCampo2 = document.createElement("td");
    tdCampo2.textContent = row[2];
    if (row[4]) tdCampo2.style.backgroundColor = row[4];
    if (row[6]?.toUpperCase().includes("IN CORSO")) tdCampo2.classList.add("live-cell");
    tr.appendChild(tdCampo2);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("calendar-content");
  if (!container) return;

  container.innerHTML = "";

  for (const { label, url } of CALENDARIO_URLS) {
    try {
      const data = await fetchCSV(url); // da utils.js
      renderCalendarTable(data, container, label);
    } catch (err) {
      console.error(`Errore caricamento ${label}:`, err);
    }
  }
});