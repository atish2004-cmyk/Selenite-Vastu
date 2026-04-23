const productsData = [
  {
    id: "product-1",
    title: "Rings, Pendants & Gems stone",
    category: "Gemstones & Jewelry",
    image: "./rings_pendants_gems.png",
    description: "Premium collection of precious and semi-precious gemstones, rings, and pendants including Navratan Stone, 12 Rashi Pendant, and 9 Planet Ring & Pendant.",
    features: [
      "Ruby, A.Dimond, Red Coral, Gomed, Neelam, Moti",
      "Panna, Pukhraj, Cat eye & Navratan Stone",
      "Gomati chakra, Panchdhatu, Evil eye, Tiger eye"
    ]
  },
  {
    id: "product-2",
    title: "Brass Vastu Product",
    category: "Vastu Remedies",
    image: "./brass_vastu.png",
    description: "Auspicious Brass Vastu items including Kamdhenu, Ashoka Pillar, Nandi, Kuber, and various figurines to bring positive energy and prosperity.",
    features: [
      "Indra, Kamdhenu, Ashoka Pillar, Nandi, Kuber",
      "Musical Bowl, Trishul Om Swastik, Education Tower",
      "Tortoise, Sri yantra, Surya, Shivling"
    ]
  },
  {
    id: "product-3",
    title: "Sri Palani Spatika Mercury",
    category: "Spiritual Items",
    image: "./spatika_mercury.png",
    description: "Sacred Spatika and Mercury items for spiritual elevation including Sri Yantra, Shivling, Jap Mala, Idol, and Lotus Sri yantra.",
    features: [
      "Sri Yantra, Shivling, Jap Mala, Idol",
      "Nabhi, Nandi, Bracelet, Lotus Sri yantra",
      "Premium Sri Palani, Spatika & Mercury products"
    ]
  },
  {
    id: "product-4",
    title: "Essential Vastu Products",
    category: "Vastu Remedies",
    image: "./essential_vastu.png",
    description: "A complete range of essential Vastu remedies and items like Horse Nal, Supari Ganesh, Haldi Ganesh, Crystal Globe, and Wind Chime for home harmony.",
    features: [
      "Horse Nal, Supari Ganesh, Kali haldi, Nag Kesar",
      "3 Lucky Coin, Crystal Globe, Wind Chime, Fire Ball",
      "Gomati Chakra, Pili kodi, Narmdeswara, Chirami"
    ]
  }
];

// If there are 19 other products, you can simply add new objects to the productsData array above following the same format.

function renderProductsGrid() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;
  
  productsGrid.innerHTML = ''; // clear any existing content

  productsData.forEach(product => {
    const cardEl = document.createElement('div');
    cardEl.className = 'product-card reveal-on-scroll';
    
    // We create a list of features as LI items
    const featuresHtml = product.features.map(f => `<li><svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> <span>${f}</span></li>`).join('');

    cardEl.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.title}" onerror="this.src='./selenite_vastu_logo.png'; this.style.objectFit='contain'; this.style.padding='20px';"/>
        <span class="product-category-badge">${product.category}</span>
      </div>
      <div class="product-info">
        <h3>${product.title}</h3>
        <p class="product-desc">${product.description}</p>
        <ul class="product-features">
          ${featuresHtml}
        </ul>
        <a href="https://wa.me/917573085559?text=Hi,%20I'm%20interested%20in%20your%20${encodeURIComponent(product.title)}." target="_blank" class="cta-btn primary-btn product-btn">
          Inquire on WhatsApp
        </a>
      </div>
    `;
    productsGrid.appendChild(cardEl);
  });

  // Re-observe the dynamically created elements since script.js Observer can't see them
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -20px 0px" });

    const cards = productsGrid.querySelectorAll('.reveal-on-scroll');
    cards.forEach((el, index) => {
      const staggerDelay = (index % 5) * 0.1;
      el.style.transitionDelay = `${staggerDelay}s`;
      observer.observe(el);
    });
  } else {
    // Fallback if no IntersectionObserver
    const cards = productsGrid.querySelectorAll('.reveal-on-scroll');
    cards.forEach(card => card.classList.add('is-visible'));
  }
}

// Attach to DOMContentLoaded or run directly if defer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProductsGrid);
} else {
  renderProductsGrid();
}
