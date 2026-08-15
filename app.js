// Oslo Travel Companion data & state manager
const SIGHTS_DATA = [
    {
        id: "vigeland",
        title: "Vigeland Szoborpark",
        address: "Kirkeveien, 0268 Oslo",
        description: "A világ legnagyobb olyan szoborparkja, amelyet egyetlen művész alkotott. Gustav Vigeland több mint 200 életnagyságú bronz, gránit és kovácsoltvas szobra látható itt, köztük a híres Monolit és a Dühös Fiú.",
        image: "img/vigeland.jpg",
        lat: 59.9271,
        lon: 10.7008,
        day: 3
    },
    {
        id: "opera",
        title: "Oslói Operaház",
        address: "Kirsten Flagstads Plass 1, 0150 Oslo",
        description: "A fjordból kiemelkedő, jéghegyet mintázó hófehér márvány épület. Különlegessége, hogy a látogatók szabadon felsétálhatnak a tetőre, ahonnan csodálatos panoráma nyílik az egész városra és a fjordra.",
        image: "img/opera.jpg",
        lat: 59.9079,
        lon: 10.7533,
        day: 1
    },
    {
        id: "munch",
        title: "MUNCH Múzeum",
        address: "Edvard Munchs plass 1, 0194 Oslo",
        description: "A modern, tengerparti felhőkarcoló épület Edvard Munch, a világhírű norvég expresszionista festő műveinek ad otthont. Itt látható többek között az ikonikus 'Sikoly' (The Scream) festmény is.",
        image: "img/munch.jpg",
        lat: 59.9064,
        lon: 10.7554,
        day: 1
    },
    {
        id: "holmenkollen",
        title: "Holmenkollen Síugró Sánc",
        address: "Kongeveien 40, 0787 Oslo",
        description: "Az oslói sziluett elengedhetetlen része. Ez a világ egyik legmodernebb síugró sánca. A tetejéről elképesztő kilátás nyílik, az aljában pedig egy interaktív Símúzeum várja az érdeklődőket.",
        image: "img/holmenkollen.jpg",
        lat: 59.9639,
        lon: 10.6677,
        day: 3
    },
    {
        id: "akershus",
        title: "Akershus Erőd",
        address: "Akershus Festning, 0150 Oslo",
        description: "A 13. század végén épült középkori vár, amely Oslo védelmére szolgált. Később királyi reneszánsz kastéllyá alakították át. Gyönyörű történelmi falak, bástyák és parkosított sétányok alkotják.",
        image: "img/akershus.jpg",
        lat: 59.9072,
        lon: 10.7364,
        day: 1
    },
    {
        id: "palace",
        title: "Királyi Palota",
        address: "Slottsplassen 1, 0010 Oslo",
        description: "A norvég királyi család hivatalos rezidenciája, amely egy szép dombtetőn áll a Karl Johans kapu végén. Ha délután 13:30 körül érkezel, megnézheted a látványos őrségváltást is.",
        image: "img/palace.jpg",
        lat: 59.9169,
        lon: 10.7275,
        day: 1
    },
    {
        id: "fram",
        title: "Fram Múzeum",
        address: "Bygdøynesveien 39, 0286 Oslo",
        description: "A Bygdøy-félszigeten található múzeum, amely a híres sarkvidéki kutatóhajót, a Fram-ot mutatja be. Felsétálhatsz a hajó fedélzetére és megtapasztalhatod, milyen volt a sarkkutatók élete a jég fogságában.",
        image: "img/fram.jpg",
        lat: 59.9037,
        lon: 10.6997,
        day: 2
    },
    {
        id: "karljohan",
        title: "Karl Johans Gate",
        address: "Karl Johans gate, 0154 Oslo",
        description: "Oslo lüktető főutcája, amely a Főpályaudvartól egészen a Királyi Palotáig vezet. Hangulatos kávézók, üzletek, utcazenészek, és olyan fontos épületek találhatók itt, mint a Parlament és a Nemzeti Színház.",
        image: "img/karljohan.jpg",
        lat: 59.9126,
        lon: 10.7428,
        day: 1
    }
];

const PRESET_CHECKLIST = [
    { id: "item-1", text: "Útlevél / Személyi igazolvány", checked: false },
    { id: "item-2", text: "Biztosítási kártya (kék EU kártya)", checked: false },
    { id: "item-3", text: "Kényelmes, vízálló gyaloglócipo", checked: false },
    { id: "item-4", text: "Esőkabát / Szélálló dzseki", checked: false },
    { id: "item-5", text: "Ruter mobilalkalmazás letöltése", checked: false },
    { id: "item-6", text: "Telefontöltő és powerbank az útra", checked: false },
    { id: "item-7", text: "Kulacs (a csapvíz ingyenes és szuper finom)", checked: false },
    { id: "item-8", text: "Meleg pulóver (északi szél ellen)", checked: false }
];

// App State
let appState = {
    visited: {},
    photos: {},
    checklist: [...PRESET_CHECKLIST]
};

let map = null;
let markers = {};
let currentFilter = "all";

// Initialize Leaflet Map
function initMap() {
    // Center map on Oslo city center
    map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: false
    }).setView([59.9200, 10.7350], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create markers for each sight
    SIGHTS_DATA.forEach(sight => {
        updateMapMarker(sight);
    });
}

// Custom Marker design using DivIcon
function updateMapMarker(sight) {
    const isVisited = !!appState.visited[sight.id];
    
    // Remove old marker if exists
    if (markers[sight.id]) {
        map.removeLayer(markers[sight.id]);
    }

    // Custom HTML pin with responsive colors
    const color = isVisited ? "#00f5d4" : "#48cae4";
    const border = isVisited ? "#0b132b" : "#ffffff";
    const size = isVisited ? "36px" : "30px";

    const customIcon = L.divIcon({
        html: `<div style="
            background-color: ${color}; 
            width: ${size}; 
            height: ${size}; 
            border-radius: 50% 50% 50% 0; 
            transform: rotate(-45deg); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border: 2px solid ${border}; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        ">
            <div style="
                transform: rotate(45deg); 
                color: #0b132b; 
                font-weight: 800; 
                font-size: ${isVisited ? '12px' : '10px'};
            ">
                ${isVisited ? '✓' : sight.day}
            </div>
        </div>`,
        className: 'custom-map-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 36]
    });

    const marker = L.marker([sight.lat, sight.lon], { icon: customIcon }).addTo(map);
    
    marker.bindPopup(`
        <div style="font-family: 'Outfit', sans-serif;">
            <strong style="font-size: 1.05rem;">${sight.title}</strong><br>
            <span style="font-size: 0.8rem; color: #a3b1c6;">${sight.address}</span><br>
            <span style="font-size: 0.85rem; color: var(--accent-blue); font-weight: 600;">${sight.day}. Nap útiterv</span>
        </div>
    `);

    markers[sight.id] = marker;
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem("oslo_companion_state");
    if (saved) {
        try {
            appState = JSON.parse(saved);
            if (!appState.visited) appState.visited = {};
            if (!appState.photos) appState.photos = {};
            if (!appState.checklist) appState.checklist = [...PRESET_CHECKLIST];
        } catch (e) {
            console.error("Nem sikerült betölteni az állapotot", e);
        }
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem("oslo_companion_state", JSON.stringify(appState));
    updateProgress();
}

// Update top progress bar
function updateProgress() {
    const total = SIGHTS_DATA.length;
    const visitedCount = Object.keys(appState.visited).filter(id => appState.visited[id]).length;
    const percent = total > 0 ? Math.round((visitedCount / total) * 100) : 0;
    
    document.getElementById("progress-bar").style.width = `${percent}%`;
    document.getElementById("progress-text").textContent = `${percent}% (${visitedCount} / ${total})`;
}

// Render sight cards
function renderSights() {
    const container = document.getElementById("sights-grid");
    container.innerHTML = "";

    const filtered = SIGHTS_DATA.filter(sight => {
        if (currentFilter === "all") return true;
        return sight.day === parseInt(currentFilter);
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Nincs látnivaló ehhez a szűrőhöz.</p>`;
        return;
    }

    filtered.forEach(sight => {
        const isVisited = !!appState.visited[sight.id];
        const userPhoto = appState.photos[sight.id] || "";

        const card = document.createElement("div");
        card.className = `sight-card ${isVisited ? 'visited' : ''}`;
        card.id = `card-${sight.id}`;

        card.innerHTML = `
            <div class="sight-image-container">
                <img src="${sight.image}" alt="${sight.title}" class="sight-image">
                <div class="visited-overlay">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-top: 1px;"><path d="M20 6L9 17l-5-5"/></svg>
                    Meglátogatva
                </div>
            </div>
            <div class="sight-info">
                <h3 class="sight-title">${sight.title}</h3>
                <div class="sight-address">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>${sight.address}</span>
                </div>
                <p class="sight-description">${sight.description}</p>
                
                <div class="sight-actions">
                    <button class="btn-visit-toggle" onclick="toggleVisited('${sight.id}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            ${isVisited 
                                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' 
                                : '<circle cx="12" cy="12" r="10"/>'}
                        </svg>
                        <span>${isVisited ? 'Meglátogatva ✓' : 'Megjelölés meglátogatottként'}</span>
                    </button>

                    <div class="memory-container">
                        ${userPhoto ? `
                            <div class="memory-preview-wrapper">
                                <img src="${userPhoto}" class="memory-preview-img" onclick="openPhotoModal('${userPhoto}', '${sight.title}')" alt="Emléked itt">
                                <button class="btn-delete-photo" onclick="deletePhoto('${sight.id}')" title="Kép törlése">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                </button>
                            </div>
                        ` : `
                            <label class="photo-upload-label">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                Kép készítése / feltöltése
                                <input type="file" accept="image/*" class="photo-input" onchange="handlePhotoUpload(event, '${sight.id}')">
                            </label>
                        `}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Toggle visited state
window.toggleVisited = function(id) {
    appState.visited[id] = !appState.visited[id];
    
    if (!appState.visited[id]) {
        delete appState.photos[id];
    }
    
    saveState();
    renderSights();
    
    // Dynamically update the map marker representation
    const sight = SIGHTS_DATA.find(s => s.id === id);
    if (sight && map) {
        updateMapMarker(sight);
    }
};

// Handle photo uploads with compression
window.handlePhotoUpload = function(event, id) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const maxDimension = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxDimension) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                }
            } else {
                if (height > maxDimension) {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

            appState.photos[id] = compressedBase64;
            saveState();
            renderSights();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

// Delete photo
window.deletePhoto = function(id) {
    if (confirm("Biztosan törlöd ezt az emlékfotót?")) {
        delete appState.photos[id];
        saveState();
        renderSights();
    }
};

// Tab controller logic
window.switchMainTab = function(tabId) {
    // Update button styling
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    // Toggle content
    document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active");
    });
    document.getElementById(`tab-${tabId}`).classList.add("active");

    // Leaflet map refresh when returning to map tab to fix rendering bugs
    if (tabId === 'itinerary' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
};

// Day Filter Logic
window.filterDay = function(day) {
    currentFilter = day.toString();
    
    // Update filter active styling
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
    
    renderSights();

    // Pan map to fit current filter markers
    if (map) {
        const activeSights = SIGHTS_DATA.filter(s => currentFilter === "all" || s.day.toString() === currentFilter);
        if (activeSights.length > 0) {
            const group = new L.featureGroup(activeSights.map(s => markers[s.id]));
            map.fitBounds(group.getBounds().pad(0.15));
        }
    }
};

// --- Checklist Management ---

function renderChecklist() {
    const container = document.getElementById("packing-checklist");
    container.innerHTML = "";

    appState.checklist.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `checklist-item ${item.checked ? 'checked' : ''}`;
        
        itemDiv.innerHTML = `
            <div class="checklist-item-left" onclick="toggleChecklistItem('${item.id}')">
                <div class="checklist-checkbox">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <span class="checklist-item-text">${item.text}</span>
            </div>
            <button class="btn-delete-item" onclick="deleteChecklistItem('${item.id}')" title="Elem törlése">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        `;
        container.appendChild(itemDiv);
    });
}

window.toggleChecklistItem = function(id) {
    const item = appState.checklist.find(i => i.id === id);
    if (item) {
        item.checked = !item.checked;
        saveState();
        renderChecklist();
    }
};

window.addChecklistItem = function() {
    const input = document.getElementById("new-item-input");
    const text = input.value.trim();
    if (!text) return;

    const newItem = {
        id: 'item-' + Date.now(),
        text: text,
        checked: false
    };

    appState.checklist.push(newItem);
    saveState();
    renderChecklist();
    input.value = "";
};

// Add item on Enter key
document.getElementById("new-item-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addChecklistItem();
    }
});

window.deleteChecklistItem = function(id) {
    appState.checklist = appState.checklist.filter(i => i.id !== id);
    saveState();
    renderChecklist();
};

// --- Modal management ---

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");

window.openPhotoModal = function(imgSrc, title) {
    modalImg.src = imgSrc;
    modalCaption.textContent = title;
    modal.classList.add("active");
};

function closePhotoModal() {
    modal.classList.remove("active");
    setTimeout(() => {
        modalImg.src = "";
    }, 300);
}

modalClose.addEventListener("click", closePhotoModal);
modalBackdrop.addEventListener("click", closePhotoModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePhotoModal();
    }
});

// App Startup
loadState();
renderSights();
renderChecklist();
updateProgress();

// Initialize map after page load
window.addEventListener('DOMContentLoaded', () => {
    initMap();
});
