// script.js

const grid = document.getElementById('grid');
const resultCount = document.getElementById('result-count');
const cityFilter = document.getElementById('city-filter');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

// Les 12 départements du Bénin, toujours affichés dans le filtre
// même si un département n'a pas encore de guest house.
const DEPARTMENTS = [
  "Alibori", "Atacora", "Atlantique", "Borgou", "Collines", "Couffo",
  "Donga", "Littoral", "Mono", "Ouémé", "Plateau", "Zou",
];

function formatPrice(value) {
  return value.toLocaleString('fr-FR') + ' FCFA';
}

function populateCityFilter() {
  DEPARTMENTS.forEach((dep) => {
    const opt = document.createElement('option');
    opt.value = dep;
    opt.textContent = dep;
    cityFilter.appendChild(opt);
  });
}

function whatsappLink(guestHouse) {
  const message = encodeURIComponent(
    `Bonjour, je souhaite réserver à "${guestHouse.name}" (${guestHouse.city}). ` +
    `Pouvez-vous me confirmer la disponibilité ?`
  );
  return `https://wa.me/${guestHouse.whatsapp}?text=${message}`;
}

function renderCard(g) {
  const photo = g.photo
    ? `<img src="${g.photo}" alt="${g.name}" loading="lazy">`
    : `Photo à venir`;

  return `
    <article class="card">
      <div class="card-photo">${photo}</div>
      <div class="card-body">
        <span class="card-city">${g.city} · ${g.department}</span>
        <h3 class="card-title">${g.name}</h3>
        <p class="card-desc">${g.description}</p>
        <div class="card-amenities">
          ${g.amenities.map((a) => `<span class="tag">${a}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span class="price">${formatPrice(g.pricePerNight)}<br><small>par nuit</small></span>
          <a class="btn-book" href="${whatsappLink(g)}" target="_blank" rel="noopener">
            Demander à réserver
          </a>
        </div>
      </div>
    </article>
  `;
}

function render(list) {
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">Aucune guest house ne correspond à ta recherche pour le moment.</div>`;
  } else {
    grid.innerHTML = list.map(renderCard).join('');
  }
  resultCount.textContent = `${list.length} guest house${list.length > 1 ? 's' : ''}`;
}

function applyFilters() {
  const department = cityFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = GUEST_HOUSES.filter((g) => {
    const matchesDepartment = !department || g.department === department;
    const matchesQuery =
      !query ||
      g.name.toLowerCase().includes(query) ||
      g.city.toLowerCase().includes(query) ||
      g.department.toLowerCase().includes(query);
    return matchesDepartment && matchesQuery;
  });

  render(filtered);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyFilters();
});

cityFilter.addEventListener('change', applyFilters);

let GUEST_HOUSES = [];

async function init() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    GUEST_HOUSES = data.guest_houses || [];
  } catch (err) {
    grid.innerHTML = `<div class="empty-state">Impossible de charger les guest houses pour le moment.</div>`;
    return;
  }
  populateCityFilter();
  render(GUEST_HOUSES);
}

init();
