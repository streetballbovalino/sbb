// =====================================================
//  STREETBALL BOVALINO — CONFIGURAZIONE CENTRALE
//  Questo è l'unico file da modificare per gestire
//  la visibilità delle sezioni del sito.
// =====================================================

const SBB_CONFIG = {

  // true  → mostra "SEE YOU NEXT SUMMER" (fuori stagione)
  // false → mostra il menu con le voci attive
  offSeason: true,
  startDate: "2026-08-10", // Data di inizio del torneo (formato YYYY-MM-DD)
  endDate: "2026-08-12",   // Data di fine del torneo (formato YYYY-MM-DD)

  // Voci di menu: true = attiva e cliccabile, false = grigia e disabilitata
  menu: {
    info:       false,
    iscriviti:  false,
    garaDa3:    false,
    calendario: false,
    classifiche: false,
  },

};