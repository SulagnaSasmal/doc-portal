/* ============================================================
   Doc-Portal — Filter
   Filters project grid by type and industry pill selection
   ============================================================ */

(function () {
  let activeType     = 'all';
  let activeIndustry = 'all';

  function applyFilters() {
    const cards = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    cards.forEach(card => {
      // Don't fight with search (if display:none from search, leave it)
      const hiddenBySearch = card.style.display === 'none';
      if (hiddenBySearch) return;

      const type     = card.dataset.type     || '';
      const industry = card.dataset.industry || '';

      const typeMatch     = activeType     === 'all' || type     === activeType;
      const industryMatch = activeIndustry === 'all' || industry === activeIndustry;

      if (typeMatch && industryMatch) {
        card.style.removeProperty('display');
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Show empty state if no results
    const emptyState = document.getElementById('empty-state');
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Update result count
    const countEl = document.getElementById('results-count');
    if (countEl) {
      countEl.textContent = `${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;
    }
  }

  function setActivePill(group, value) {
    const pills = document.querySelectorAll(`[data-filter-group="${group}"]`);
    pills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.filterValue === value);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Type filter pills
    document.querySelectorAll('[data-filter-group="type"]').forEach(pill => {
      pill.addEventListener('click', function () {
        activeType = this.dataset.filterValue || 'all';
        setActivePill('type', activeType);
        applyFilters();
      });
    });

    // Industry filter pills
    document.querySelectorAll('[data-filter-group="industry"]').forEach(pill => {
      pill.addEventListener('click', function () {
        activeIndustry = this.dataset.filterValue || 'all';
        setActivePill('industry', activeIndustry);
        applyFilters();
      });
    });

    // Category tiles on home page scroll to projects section + auto-filter
    document.querySelectorAll('[data-category-filter]').forEach(tile => {
      tile.addEventListener('click', function () {
        const filterValue = this.dataset.categoryFilter;
        // If on projects page, apply filter
        const typePill = document.querySelector(
          `[data-filter-group="type"][data-filter-value="${filterValue}"]`
        );
        if (typePill) {
          typePill.click();
          const grid = document.getElementById('project-grid');
          if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Navigate to projects page with filter query param
          window.location.href = `projects.html?type=${encodeURIComponent(filterValue)}`;
        }
      });
    });

    // Handle URL param on projects page load
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    if (typeParam) {
      activeType = typeParam;
      setActivePill('type', activeType);
      applyFilters();
    }

    // Apply initial filter on load
    applyFilters();

    // Listen for search events
    document.addEventListener('portal:search', function () {
      applyFilters();
    });
  });
})();
