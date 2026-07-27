export function initMap() {    
    const mapDiv = document.getElementById('map-render');  
    if (!mapDiv) {
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
            category: "campus",
            lat: 35.6570,
            lng: 139.5435,
            shortDesc: "The 100-yen breakfast spot.",
            longDesc: "Highly competitive breakfast area. Look for color-coded dietary labels here.",
            image: "/assets/images/food/campus-cafeteria.jpg" 
        },
        {
            name: "7-Eleven International House",
            category: "food",
            lat: 35.65946793420129,
            lng: 139.54289250457037,
            shortDesc: "7-Eleven convenience close to the International House.",
            longDesc: "Convenience store for snacks, drinks, and daily necessities. Open 24/7.",
            image: "/assets/images/living/7-11-ih.jpg"
        },
        {
            name: "Chofu City Hall",
            category: "living",
            lat: 35.65061287070515, 
            lng: 139.54111435874373,
            shortDesc: "Address Registration & Insurance.",
            longDesc: "Mandatory visit within your first 14 days to register your address and apply for pension exemption.",
            image: "/assets/images/living/Chofu-CH.jpg"
        },
        {
            name: "Ok Super",
            category: "food",
            lat: 35.65565457901373, 
            lng: 139.54249611401696,
            shortDesc: "Affordable groceries and fresh produce.",
            longDesc: "Ok Super is a local supermarket offering a variety of groceries, fresh produce, and household items at reasonable prices.",
            image: "/assets/images/living/ok-super.jpg"
        },
        {
            name: "International House",
            category: "living",
            lat: 35.659322427869895,
            lng: 139.54414430785795,
            shortDesc: "Student accommodation with shared facilities.",
            longDesc: "International House is a student dormitory that offers shared facilities and a multicultural environment.",
            image: "/assets/images/day-one/international-dorm.jpg"
        },
        {
            name: "Chofu Station",
            category: "living",
            lat: 35.651831100271686,
            lng: 139.54483352893322,
            shortDesc: "Local train station with easy access to the city.",
            longDesc: "Chofu Station is a convenient transportation hub connecting students to various parts of the city.",
            image: "/assets/images/living/chofu-station.jpg"
        },
        {
            name: "Chofu PARCO",
            category: "living",
            lat: 35.652884351913876,
            lng: 139.5437101565297,
            shortDesc: "Shopping mall with various stores and restaurants.",
            longDesc: "Chofu PARCO is a modern shopping mall offering a wide range of retail stores and dining options.",
            image: "/assets/images/living/parco-chofu.jpg"
        },
        {
            name: "Don Quijote Chofu",
            category: "living",
            lat: 35.653688429479075, 
            lng: 139.54413664773637,
            shortDesc: "Convenience store with a wide range of products.",
            longDesc: "Don Quijote Chofu is a popular convenience store offering various snacks, drinks, and daily necessities.",
            image: "/assets/images/living/seiyu-donqui-2.jpg"
        },
        {
            name: "GIGO Chofu",
            category: "entertainment",
            lat: 35.65099536104127, 
            lng: 139.54426467864934,
            shortDesc: "Entertainment complex with arcade games and claw machines.",
            longDesc: "GIGO Chofu is a popular entertainment complex featuring arcade games, claw machines, and other fun activities for students and locals.",
            image: "/assets/images/living/gigo.jpg"
        },
        {
            name: "ÆON Cinema THEATUS Chofu",
            category: "entertainment",
            lat: 35.65258941308933,  
            lng: 139.5421475812725,
            shortDesc: "Modern cinema with comfortable seating.",
            longDesc: "ÆON Cinema THEATUS Chofu is a state-of-the-art cinema offering the latest movies in a comfortable and modern environment.",
            image: "/assets/images/living/AEON-Cin.jpg"
        },
        {
            name: "Health Care Center UEC",
            category: "campus",
            lat: 35.65810186500254,   
            lng: 139.5437146905445,
            shortDesc: "On-campus health services for students.",
            longDesc: "The Health Care Center at UEC provides medical services, health consultations, and support for students' well-being.",
            image: "/assets/images/day-one/HCC-UEC.jpg"
        },
        {
            name: "Jonathan's Chofu",
            category: "food",
            lat: 35.65079290566301,    
            lng: 139.5444922462146,
            shortDesc: "Delicious food options for students.",
            longDesc: "Jonathan's Chofu offers a variety of tasty meals and snacks for students.",
            image: "/assets/images/food/restaurants-chofu.jpg"
        },
        {
            name: "Shabuyo Chofu",
            category: "food",
            lat: 35.65008131178715,  
            lng: 139.54422760042326,
            shortDesc: "Shabu-shabu restaurant for a hot pot dining experience.",
            longDesc: "Shabuyo Chofu offers a delicious shabu-shabu dining experience for students.",
            image: "/assets/images/food/Shabuyo.jpeg"
        },
        {
            name: "Kura Sushi Chofu",
            category: "food",
            lat: 35.65357179497112,  
            lng: 139.54334869158635,
            shortDesc: "Sushi restaurant for a fresh and authentic dining experience.",
            longDesc: "Kura Sushi Chofu offers a variety of fresh sushi and traditional Japanese dishes for students.",
            image: "/assets/images/food/KuraSushi.webp"
        },
        {
            name: "Uta-Hiroba Chofu",
            category: "entertainment",
            lat: 35.65322812521227,   
            lng: 139.5449956347159,
            shortDesc: "Karaoke spot for students to enjoy singing and socializing.",
            longDesc: "Uta-Hiroba Chofu is a popular karaoke venue where students can sing their hearts out and socialize with friends.",
            image: "/assets/images/living/Karaoke.jpeg"
        },
        {
            name: "Jindai-ji Temple",
            category: "entertainment",
            lat: 35.668207853519,    
            lng: 139.55134055590506,
            shortDesc: "Historic temple with beautiful gardens and cultural significance.",
            longDesc: "Jindai-ji Temple is a historic temple known for its beautiful gardens and cultural significance, offering a serene escape for students and visitors.",
            image: "/assets/images/living/Jindaji.jpg"
        },
        
        

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