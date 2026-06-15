/*************************************************
 * STAYHUB CLEAN PRODUCTION SCRIPT (FIXED)
 *************************************************/


/* =========================
   NAVIGATION
========================= */

function goToListings() {
  const input = document.querySelector(".search-box input");
  const searchInput = input ? input.value.trim() : "";

  if (searchInput) {
    localStorage.setItem("searchQuery", searchInput);
  } else {
    localStorage.removeItem("searchQuery");
  }

  window.location.href = "listings.html";
}

function goToExplore() {
  window.location.href = "index.html";
}

function goToHost() {
  window.location.href = "host.html";
}

function goToLogin() {
  window.location.href = "login.html";
}


/* =========================
   LISTINGS DATABASE
========================= */

const allListings = [
  {
    id: 1,
    name: "Coral Bay Resort",
    location: "Watamu",
    type: "hotel",
    price: "KES 8,500/night",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2106e",
    description: "Beachfront luxury hotel with ocean view."
  },
  {
    id: 2,
    name: "Beach Apartment",
    location: "Watamu",
    type: "airbnb",
    price: "KES 6,000/night",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    description: "Modern Airbnb near the beach."
  },
  {
    id: 3,
    name: "Nairobi City Hotel",
    location: "Nairobi",
    type: "hotel",
    price: "KES 7,000/night",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Luxury city hotel in CBD."
  },
  {
    id: 4,
    name: "Diani Ocean Villa",
    location: "Diani",
    type: "villa",
    price: "KES 12,000/night",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    description: "Private villa with pool and ocean view."
  },
  {
    id: 5,
    name: "Naivasha Safari Lodge",
    location: "Naivasha",
    type: "lodge",
    price: "KES 5,500/night",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description: "Wildlife lodge near Lake Naivasha."
  }
];


/* =========================
   FILTER STATE
========================= */

let currentFilter = "all";


function setFilter(type) {
  currentFilter = type;
  renderListings();
}


/* =========================
   RENDER ENGINE (ONLY ONE)
========================= */

function renderListings() {
  const container = document.getElementById("listingsContainer");
  if (!container) return;

  const searchInput = document.getElementById("searchInput");
  const search = searchInput ? searchInput.value.toLowerCase() : "";

  const filtered = allListings.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search);

    const matchFilter =
      currentFilter === "all" || item.type === currentFilter;

    return matchSearch && matchFilter;
  });

  container.innerHTML = filtered.map(item => `
    <div style="
      background:white;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 10px rgba(0,0,0,0.08);
      cursor:pointer;
    " onclick="openModal(${item.id})">

      <img src="${item.image}"
        style="width:100%;height:180px;object-fit:cover;">

      <div style="padding:12px;">
        <h3>${item.name}</h3>
        <p>${item.location}</p>
        <strong>${item.price}</strong>
      </div>

    </div>
  `).join("");
}


/* =========================
   MODAL SYSTEM (FIXED)
========================= */

function openModal(id) {
  const item = allListings.find(l => l.id === id);
  if (!item) return;

  const modal = document.getElementById("modal");
  if (!modal) return;

  document.getElementById("modalImage").src = item.image;
  document.getElementById("modalTitle").innerText = item.name;
  document.getElementById("modalLocation").innerText = item.location;
  document.getElementById("modalPrice").innerText = item.price;
  document.getElementById("modalDesc").innerText = item.description;

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}


/* =========================
   CAROUSEL DRAG (SAFE)
========================= */

const carousel = document.getElementById("carousel");

if (carousel) {
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => isDown = false);
  carousel.addEventListener("mouseup", () => isDown = false);

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;

    carousel.scrollLeft = scrollLeft - walk;
  });
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderListings();
});

function goToDetails(id) {
  window.location.href = `listings.html?id=${id}`;
}
function bookNow(id){
   localStorage.setItem("selectedPropertyId", id);
   window.location.href = "booking.html";
}