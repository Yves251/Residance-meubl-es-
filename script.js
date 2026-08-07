// script.js

const grid = document.getElementById('grid');
const resultCount = document.getElementById('result-count');
const cityFilter = document.getElementById('city-filter');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const departmentGrid = document.getElementById('department-grid');
const listingTitle = document.getElementById('listing-title');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

// Les 12 départements du Bénin, toujours affichés dans le filtre
// même si un département n'a pas encore de guest house.
const DEPARTMENTS = [
  "Alibori", "Atacora", "Atlantique", "Borgou", "Collines", "Couffo",
  "Donga", "Littoral", "Mono", "Ouémé", "Plateau", "Zou",
];

let GUEST_HOUSES = [];

function formatPrice(value) {
  return value.toLocaleString('fr-FR') + ' FCFA';
}

function getPhotos(g) {
  if (Array.isArray(g.photos) && g.photos.length) return g.photos;
  if (g.photo) return [g.photo];
  return [];
}

function populateCityFilter() {
  DEPARTMENTS.forEach((dep) => {
    const opt = document.createElement('option');
    opt.value = dep;
    opt.textContent = dep;
    cityFilter.appendChild(opt);
  });
}

function renderDepartmentTiles(departments) {
  departmentGrid.innerHTML = DEPARTMENTS.map((depName) => {
    const dep = (departments || []).find((d) => d.name === depName);
    const photo = dep && dep.photo;
    const img = photo ? `<img src="${photo}" alt="${depName}">` : '';
    return `
      <button type="button" class="department-tile${photo ? ' has-photo' : ''}" data-department="${depName}">
        ${img}
        <span>${depName}</span>
      </button>
    `;
  }).join('');

  departmentGrid.querySelectorAll('.department-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      cityFilter.value = tile.dataset.department;
      applyFilters();
      document.getElementById('listing').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function whatsappLink(guestHouse) {
  const message = encodeURIComponent(
    `Bonjour, je souhaite réserver à "${guestHouse.name}" (${guestHouse.city}). ` +
    `Pouvez-vous me confirmer la disponibilité ?`
  );
  return `https://wa.me/${guestHouse.whatsapp}?text=${message}`;
}

function renderCardPhotos(g) {
  const photos = getPhotos(g).slice(0, 2);
  if (photos.length === 0) {
    return `<div class="card-photos single"><div class="card-photo">Photo à venir</div></div>`;
  }
  const cells = photos
    .map((p) => `<div class="card-photo"><img src="${p}" alt="${g.name}" loading="lazy"></div>`)
    .join('');
  return `<div class="card-photos${photos.length === 1 ? ' single' : ''}">${cells}</div>`;
}

function renderCard(g, index) {
  const badge = g.featured ? `<span class="badge-featured">En vedette</span>` : '';
  return `
    <article class="card">
      <div class="card-media">
        ${renderCardPhotos(g)}
        ${badge}
      </div>
      <div class="card-body">
        <span class="card-city">${g.city} · ${g.department}</span>
        <h3 class="card-title">${g.name}</h3>
        <div class="card-amenities">
          ${g.amenities.map((a) => `<span class="tag">${a}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span class="price">${formatPrice(g.pricePerNight)}<br><small>par nuit</small></span>
          <div class="card-actions">
            <button type="button" class="btn-details" data-index="${index}">Détails</button>
            <a class="btn-book" href="${whatsappLink(g)}" target="_blank" rel="noopener">Réserver</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function openDetails(g) {
  const photos = getPhotos(g);
  const gallery = photos.length
    ? `<div class="modal-gallery">${photos
        .map((p) => `<div class="card-photo"><img src="${p}" alt="${g.name}"></div>`)
        .join('')}</div>`
    : `<div class="modal-gallery"><div class="card-photo">Photo à venir</div></div>`;

  modalContent.innerHTML = `
    ${gallery}
    <div class="modal-content">
      <span class="card-city">${g.city} · ${g.department}</span>
      <h3>${g.name}</h3>
      <p>${g.description}</p>
      <div class="card-amenities">
        ${g.amenities.map((a) => `<span class="tag">${a}</span>`).join('')}
      </div>
      <span class="price">${formatPrice(g.pricePerNight)}<br><small>par nuit</small></span>
      <a class="btn-book" href="${whatsappLink(g)}" target="_blank" rel="noopener">Demander à réserver</a>
    </div>
  `;
  modalOverlay.classList.add('open');
}

function closeDetails() {
  modalOverlay.classList.remove('open');
}

function render(list, hasFilter) {
  const sorted = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  if (sorted.length === 0) {
    grid.innerHTML = hasFilter
      ? `<div class="empty-state">Aucune guest house ne correspond à ta recherche pour le moment.</div>`
      : `<div class="empty-state">Aucune guest house mise en avant pour le moment — explore les départements ci-dessus pour voir toutes les guest houses disponibles.</div>`;
  } else {
    grid.innerHTML = sorted.map((g, i) => renderCard(g, i)).join('');
  }
  resultCount.textContent = `${sorted.length} guest house${sorted.length > 1 ? 's' : ''}`;

  grid.querySelectorAll('.btn-details').forEach((btn) => {
    btn.addEventListener('click', () => openDetails(sorted[Number(btn.dataset.index)]));
  });
}

function applyFilters() {
  const department = cityFilter.value;
  const query = searchInput.value.trim().toLowerCase();
  const hasFilter = Boolean(department || query);

  let list;
  if (!hasFilter) {
    list = GUEST_HOUSES.filter((g) => g.featured);
  } else {
    list = GUEST_HOUSES.filter((g) => {
      const matchesDepartment = !department || g.department === department;
      const matchesQuery =
        !query ||
        g.name.toLowerCase().includes(query) ||
        g.city.toLowerCase().includes(query) ||
        g.department.toLowerCase().includes(query);
      return matchesDepartment && matchesQuery;
    });
  }

  listingTitle.textContent = hasFilter ? 'Résultats' : 'Guest houses en vedette';
  render(list, hasFilter);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyFilters();
});

cityFilter.addEventListener('change', applyFilters);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeDetails();
});
document.getElementById('modal-close').addEventListener('click', closeDetails);

async function init() {
  try {
    const response = await fetch(`departments.json?v=${Date.now()}`, { cache: 'no-store' });
    const data = await response.json();
    const departments = data.departments || [];

    GUEST_HOUSES = [];
    departments.forEach((dep) => {
      (dep.apartments || []).forEach((apt) => {
        GUEST_HOUSES.push({ ...apt, department: dep.name });
      });
    });

    renderDepartmentTiles(departments);
  } catch (err) {
    grid.innerHTML = `<div class="empty-state">Impossible de charger les guest houses pour le moment.</div>`;
    return;
  }
  populateCityFilter();
  applyFilters();
}

init();
