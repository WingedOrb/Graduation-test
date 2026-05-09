// ===== ENDANGERED SPECIES DATA =====
const speciesData = [
    {
        id: 1,
        name: "Amur Leopard",
        scientific: "Panthera pardus orientalis",
        status: "CR",
        statusFull: "Critically Endangered",
        population: 100,
        populationTrend: "increasing",
        region: "Russian Far East, China",
        habitat: "Temperate forests",
        threats: ["poaching", "habitat loss", "prey scarcity"],
        image: "./images/amur-leopard.jpg",
        conservation: "Anti-poaching patrols, habitat corridors"
    },
    {
        id: 2,
        name: "Mountain Gorilla",
        scientific: "Gorilla beringei beringei",
        status: "EN",
        statusFull: "Endangered",
        population: 1063,
        populationTrend: "increasing",
        region: "Virunga Mountains, Central Africa",
        habitat: "Montane forests",
        threats: ["habitat loss", "poaching", "disease"],
        image: "./images/gorilla.webp",
        conservation: "Vigorous protection, veterinary care"
    },
    {
        id: 3,
        name: "Sumatran Elephant",
        scientific: "Elephas maximus sumatranus",
        status: "CR",
        statusFull: "Critically Endangered",
        population: 2400,
        populationTrend: "decreasing",
        region: "Sumatra, Indonesia",
        habitat: "Lowland forests",
        threats: ["habitat loss", "human conflict", "poaching"],
        image: "./images/elephant.webp",
        conservation: "Protected areas, conflict mitigation"
    },
    {
        id: 4,
        name: "Vaquita",
        scientific: "Phocoena sinus",
        status: "CR",
        statusFull: "Critically Endangered",
        population: 10,
        populationTrend: "decreasing",
        region: "Gulf of California, Mexico",
        habitat: "Coastal waters",
        threats: ["bycatch", "illegal fishing"],
        image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        conservation: "Gillnet bans, enforcement"
    },
    {
        id: 5,
        name: "Snow Leopard",
        scientific: "Panthera uncia",
        status: "VU",
        statusFull: "Vulnerable",
        population: 4000,
        populationTrend: "decreasing",
        region: "Central Asian mountains",
        habitat: "Alpine regions",
        threats: ["poaching", "climate change", "prey decline"],
        image: "./images/snow-leopard.jpg",
        conservation: "Community-based conservation"
    },
    {
        id: 6,
        name: "Black Rhino",
        scientific: "Diceros bicornis",
        status: "CR",
        statusFull: "Critically Endangered",
        population: 5630,
        populationTrend: "increasing",
        region: "Eastern and Southern Africa",
        habitat: "Savanna, desert",
        threats: ["poaching", "habitat loss"],
        image: "./images/black-rhino.jpg",
        conservation: "Anti-poaching, translocation"
    },
    {
        id: 7,
        name: "Orangutan",
        scientific: "Pongo pygmaeus",
        status: "CR",
        statusFull: "Critically Endangered",
        population: 55000,
        populationTrend: "decreasing",
        region: "Borneo, Sumatra",
        habitat: "Rainforests",
        threats: ["deforestation", "poaching", "fires"],
        image: "./images/orangutan.jpg",
        conservation: "Rehabilitation, habitat protection"
    },
    {
        id: 8,
        name: "Hawksbill Turtle",
        scientific: "Eretmochelys imbricata",
        status: "CR",
        statusFull: "Critically Endangered",
        population: 23000,
        populationTrend: "decreasing",
        region: "Tropical oceans worldwide",
        habitat: "Coral reefs",
        threats: ["poaching", "bycatch", "habitat loss"],
        image: "./images/hawksbill-turtle.webp",
        conservation: "Nesting beach protection"
    }
];

// ===== DOM ELEMENTS =====
const speciesGrid = document.getElementById('speciesGrid');
const newsletterForm = document.getElementById('newsletterForm');
const searchIcon = document.querySelector('.search-icon');
const menuIcon = document.querySelector('.menu-icon');

// ===== LOAD SPECIES CARDS =====
function loadSpecies() {
    if (!speciesGrid) return;
    
    speciesGrid.innerHTML = speciesData.map(species => {
        const statusClass = species.status.toLowerCase();
        const trendIcon = species.populationTrend === 'increasing' ? '↑' : '↓';
        const trendColor = species.populationTrend === 'increasing' ? 'var(--safe)' : 'var(--crit)';
        
        return `
            <div class="species-card" data-id="${species.id}">
                <div class="species-image">
                    <img src="${species.image}" alt="${species.name}" loading="lazy">
                    <span class="status-badge ${statusClass}">${species.status}</span>
                </div>
                <div class="species-info">
                    <div class="species-name">
                        <h3>${species.name}</h3>
                        <span style="color: ${trendColor};">${trendIcon}</span>
                    </div>
                    <div class="scientific">${species.scientific}</div>
                    <div class="species-details">
                        <div class="detail-item">
                            <span class="detail-label">Population</span>
                            <span class="detail-value">${species.population.toLocaleString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Region</span>
                            <span class="detail-value">${species.region.split(',')[0]}</span>
                        </div>
                    </div>
                    <div class="threat-icons">
                        ${species.threats.slice(0, 3).map(threat => `<span>${threat}</span>`).join('')}
                    </div>
                    <button class="learn-more" onclick="showSpeciesDetails(${species.id})">
                        Learn More <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ===== SHOW SPECIES DETAILS (MODAL) =====
function showSpeciesDetails(id) {
    const species = speciesData.find(s => s.id === id);
    if (!species) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="modal-grid">
                <div class="modal-image">
                    <img src="${species.image}" alt="${species.name}">
                </div>
                <div class="modal-info">
                    <h2>${species.name}</h2>
                    <p class="scientific">${species.scientific}</p>
                    <p class="status ${species.status.toLowerCase()}">${species.statusFull}</p>
                    
                    <div class="modal-details">
                        <div class="modal-detail">
                            <strong>Population:</strong> ${species.population.toLocaleString()}
                            <span class="trend">(${species.populationTrend})</span>
                        </div>
                        <div class="modal-detail">
                            <strong>Region:</strong> ${species.region}
                        </div>
                        <div class="modal-detail">
                            <strong>Habitat:</strong> ${species.habitat}
                        </div>
                        <div class="modal-detail">
                            <strong>Threats:</strong> ${species.threats.join(', ')}
                        </div>
                        <div class="modal-detail">
                            <strong>Conservation:</strong> ${species.conservation}
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not present
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                max-width: 900px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                border-radius: 20px;
                position: relative;
                padding: 20px;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 2rem;
                cursor: pointer;
                color: #888;
                transition: var(--transition);
            }
            
            .close-modal:hover {
                color: var(--accent);
            }
            
            .modal-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
            
            .modal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 15px;
            }
            
            .modal-info h2 {
                margin-bottom: 5px;
            }
            
            .status {
                display: inline-block;
                padding: 5px 15px;
                border-radius: 30px;
                color: white;
                font-weight: 600;
                margin: 10px 0 15px;
            }
            
            .status.cr { background: var(--crit); }
            .status.en { background: var(--end); }
            .status.vu { background: var(--vul); color: var(--dark); }
            
            .modal-details {
                margin: 20px 0;
            }
            
            .modal-detail {
                margin-bottom: 10px;
            }
            
            .trend {
                color: var(--gray);
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .modal-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ===== NEWSLETTER SUBSCRIPTION =====
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            alert('Thank you for subscribing! You will receive conservation updates.');
            e.target.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        const searchTerm = prompt('Search for an animal:');
        if (searchTerm) {
            const found = speciesData.filter(s => 
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.scientific.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (found.length > 0) {
                alert(`Found ${found.length} species! Scroll to view.`);
                // Could implement actual filtering here
            } else {
                alert('No species found. Try another search.');
            }
        }
    });
}

// ===== MOBILE MENU =====
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        alert('Mobile navigation would open here in a full implementation.');
    });
}

// ===== QUICK FACTS ROTATOR =====
const facts = [
    "100 million animals are killed for their fur each year.",
    "A single tiger poached can fetch $50,000 on black market.",
    "95% of black rhinos have been lost since 1960.",
    "Orangutan populations have declined 50% in last 60 years.",
    "Every day, 150 species go extinct.",
    "Half the world's rainforests have been destroyed."
];

let factIndex = 0;
setInterval(() => {
    const factElement = document.querySelector('.hero-description');
    if (factElement && factIndex < facts.length) {
        // This is just for fun - you could add a fact rotator
        factIndex = (factIndex + 1) % facts.length;
    }
}, 5000);

// ===== STAT COUNTER ANIMATION =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.innerText.replace(/[+,]/g, ''));
        if (!isNaN(target)) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = stat.innerText.includes('+') ? 
                        target.toLocaleString() + '+' : 
                        target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.floor(current).toLocaleString();
                }
            }, 30);
        }
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadSpecies();
    animateStats();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
