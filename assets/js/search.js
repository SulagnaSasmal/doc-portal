/* ============================================================
   Doc-Portal — Client-side Search
   Searches project title, subtitle, description, and techs
   ============================================================ */

(function () {
  let allCards = [];

  function normalise(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9\s]/g, '');
  }

  function getCardText(card) {
    const parts = [
      card.dataset.title || '',
      card.dataset.subtitle || '',
      card.dataset.desc || '',
      card.dataset.techs || '',
      card.dataset.type || '',
      card.dataset.industry || ''
    ];
    return normalise(parts.join(' '));
  }

  function runSearch(query) {
    const q = normalise(query.trim());
    if (!q) {
      allCards.forEach(c => c.style.removeProperty('display'));
      return;
    }
    allCards.forEach(c => {
      const text = getCardText(c);
      const matches = q.split(/\s+/).every(word => text.includes(word));
      c.style.display = matches ? '' : 'none';
    });
    // Dispatch event so filter.js can sync empty state
    document.dispatchEvent(new CustomEvent('portal:search', { detail: { query: q } }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('search-input');
    if (!input) return;

    allCards = Array.from(document.querySelectorAll('.project-card'));

    let debounceTimer;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => runSearch(input.value), 180);
    });

    // Clear on Escape
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        input.value = '';
        runSearch('');
        input.blur();
      }
    });
  });
})();
