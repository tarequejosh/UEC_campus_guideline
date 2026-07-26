export function initMap() {
    console.log("🗺️ initMap() se está ejecutando!");
    
    const mapDiv = document.getElementById('map-render');
    
    if (!mapDiv) {
        console.error("❌ ERROR: No se encontró el div #map-render en el HTML.");
        return; 
    }

    const map = L.map('map-render').setView([35.656, 139.544], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);


    const locations = [
        {
            name: "UEC Cafeteria",
            category: "food",
            lat: 35.6565,
            lng: 139.5445,
            shortDesc: "The 100-yen breakfast spot.",
            longDesc: "Highly competitive breakfast area. Look for color-coded dietary labels here.",
            image: "assets/images/food/campus-cafeteria.jpg" 
        },
        {
            name: "East-1 Building",
            category: "campus",
            lat: 35.6570,
            lng: 139.5435,
            shortDesc: "Information Technology Center.",
            longDesc: "Go to the 4th floor if you have any issues with your UEC-Wireless Wi-Fi or passwords.",
            image: "https://via.placeholder.com/400x250.png?text=East-1+Building"
        },
        {
            name: "Chofu City Hall",
            category: "living",
            lat: 35.6515,
            lng: 139.5442,
            shortDesc: "Address Registration & Insurance.",
            longDesc: "Mandatory visit within your first 14 days to register your address and apply for pension exemption.",
            image: "https://via.placeholder.com/400x250.png?text=Chofu+City+Hall"
        },
        {
            name: "Gyomu Super",
            category: "food",
            lat: 35.6530,
            lng: 139.5460,
            shortDesc: "Halal chicken & cheap bulk.",
            longDesc: "The best place to buy imported spices, frozen meats, and save money cooking at home.",
            image: "https://via.placeholder.com/400x250.png?text=Gyomu+Super"
        }
    ];

    const markerGroup = L.layerGroup().addTo(map);

    function renderMarkers(filterType) {
        markerGroup.clearLayers();

        locations.forEach(loc => {
            if (filterType === 'all' || loc.category === filterType) {
                const marker = L.marker([loc.lat, loc.lng]);

                marker.bindTooltip(`<b>${loc.name}</b><br>${loc.shortDesc}`, {
                    direction: 'top',
                    offset: [0, -10]
                });

                marker.on('click', () => {
                    document.getElementById('modal-title').innerText = loc.name;
                    document.getElementById('modal-desc').innerText = loc.longDesc;
                    document.getElementById('modal-img').src = loc.image;
                    document.getElementById('map-modal').style.display = 'flex';
                });

                markerGroup.addLayer(marker);
            }
        });
    }

    renderMarkers('all');

    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderMarkers(e.target.getAttribute('data-filter'));
        });
    });

    const modal = document.getElementById('map-modal');
    document.querySelector('.map-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });
    resizeObserver.observe(mapDiv);
}