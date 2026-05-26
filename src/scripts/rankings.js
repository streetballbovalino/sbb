// =====================================================
//  STREETBALL BOVALINO — CLASSIFICHE
//  Dipende da: config.js, utils.js, menu-loader.js
// =====================================================

const CLASSIFICHE = [
  {
    id: "ranking-open-maschile",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=0&single=true&output=csv",
  },
  {
    id: "ranking-open-femminile",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=112140575&single=true&output=csv",
  },
  {
    id: "ranking-open-misto",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=1137452448&single=true&output=csv",
  },
  {
    id: "ranking-under-16M",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=909698791&single=true&output=csv",
  },
  {
    id: "ranking-under-14",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=724036286&single=true&output=csv",
  },
];

function renderRankingTable(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const table = document.createElement("table");

  // Intestazione (esclusa ultima colonna — usata per il colore di riga)
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (let i = 0; i < data[0].length - 1; i++) {
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
    const color = row[row.length - 1];
    if (color) tr.style.backgroundColor = color;

    for (let i = 0; i < row.length - 1; i++) {
      const td = document.createElement("td");
      td.textContent = row[i];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.innerHTML = "";
  container.appendChild(table);
}

window.addEventListener("DOMContentLoaded", async () => {
  await Promise.all(
    CLASSIFICHE.map(async ({ id, url }) => {
      try {
        const data = await fetchCSV(url); // da utils.js
        renderRankingTable(data, id);
      } catch (err) {
        console.error(`Errore caricamento classifica [${id}]:`, err);
      }
    })
  );
});