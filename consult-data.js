const consultData = {
  "financial": {
    title: "Financial Blockages",
    heroImage: "./financial_vastu.png",
    subtitle: "Unblock Cosmic Wealth Flow",
    description: "Are you facing sudden financial losses, stuck payments, or an inability to accumulate wealth despite hard work? Cosmic energy imbalances in specific zones of your property, primarily the South-East and North zones, severely restrict financial liquidity.",
    benefits: [
      "Immediate liquidation of stuck financial payments.",
      "Activation of the North wealth zone for endless opportunities.",
      "Cuts down unnecessary, uncontrollable expenses.",
      "Aligns the South-East fire elements to ignite business profits."
    ],
    areasCovered: [
      "South-East Fire Zone Correctness - Re-aligning the cash-flow engine of the space.",
      "North Water Zone (Opportunities) - Unblocking new streams of income and clients.",
      "Locker & Safe Placement - Securing accumulated wealth against unforeseen losses.",
      "Main Entrance Alignment - Ensuring wealth enters unobstructed.",
      "Location of Kitchen & Burners - Balancing expenses and saving ratios.",
      "Slope and Water Tank Placements - Neutralizing massive wealth drains."
    ]
  },
  "relationships": {
    title: "Relationship Issues",
    heroImage: "./relationship_vastu.png",
    subtitle: "Restore Harmony and Trust",
    description: "Frequent family arguments, delayed marriages, and marital discord are often directly linked to Vastu Doshas (defects) in the South-West and East directions. Our scientific approach identifies these energetic friction points and neutralizes them.",
    benefits: [
      "Restores peace and harmony among family members.",
      "Clears cosmic hurdles delaying marriages.",
      "Improves intimacy and understanding between spouses.",
      "Enhances social connectivity and trustworthy friendships."
    ],
    areasCovered: [
      "South-West Master Bedroom Location - Solidifying mutual trust and long-term bonding.",
      "Placement of Mirrors in Bedrooms - Removing illusions and third-party interference.",
      "Color Palettes and Elements - Calming temperaments and aggressive energies.",
      "East Zone (Social Associations) - Expanding positive social networks.",
      "North-West Zone (Support Systems) - Ensuring you receive timely help.",
      "Toilets in Faulty Directions - Stopping the flush of positive romantic energies."
    ]
  },
  "health": {
    title: "Health Restoration",
    heroImage: "./health_vastu.png",
    subtitle: "Reclaim Vitality and Peace of Mind",
    description: "Prolonged illnesses, chronic fatigue, and depression are physical manifestations of stagnant cosmic energies. Imbalances in the North-South magnetic orientation or defective North-East zones directly deteriorate the occupants' immunity and mental health.",
    benefits: [
      "Creates an energetic healing environment.",
      "Alleviates chronic stress and mental anxieties.",
      "Optimizes sleeping directions for deeper rest.",
      "Boosts overall immunity and vitality for elders."
    ],
    areasCovered: [
      "North-East (Clarity & Mind) Zone - Relieving mental stress and chronic anxiety.",
      "North-North-East (Health) Node - The critical zone governing physical immunity.",
      "Sleeping Head Directions - Enhancing deep REM sleep and natural body healing.",
      "Toilet and Septic Tank Placements - Preventing major chronic illnesses.",
      "Medication Storage Areas - Ensuring medicines work effectively and rapidly.",
      "Kitchen Fire & Health Links - Aligning nutrition with life force energy."
    ]
  },
  "business": {
    title: "Business Growth",
    heroImage: "./business_vastu.png",
    subtitle: "Scale Your Business to Cosmic Heights",
    description: "When efforts don’t match results and business expansion feels impossible, your workspace is misaligned. Correcting the elemental geometry of your factory, shop, or office ensures your efforts are met with explosive market traction and massive sales.",
    benefits: [
      "Dramatically increases daily sales and footfall.",
      "Attracts high-value, loyal clients and partners.",
      "Ensures smoother banking and loan approvals.",
      "Motivates employees toward significantly higher productivity."
    ],
    areasCovered: [
      "Executive Cabin Placements - Establishing unshakable market authority and focus.",
      "Staff Orientations - Boosting employee dedication and operational speed.",
      "Marketing and Sales Department Zones - Converting active leads into massive sales.",
      "South Zone (Brand Fame) - Expanding your brand reputation globally.",
      "West Zone (Gains and Profits) - Ensuring consistent return on investments.",
      "Company Logo and Branding Colors - Attuning your corporate identity to success."
    ]
  }
};

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const consultId = urlParams.get('id');
  
  if (consultId && consultData[consultId]) {
    const data = consultData[consultId];
    
    document.getElementById('service-title').innerText = data.title;
    document.getElementById('breadcrumb-title').innerText = data.title;
    document.getElementById('service-subtitle').innerText = data.subtitle;
    document.getElementById('service-description').innerText = data.description;
    
    const imgEl = document.getElementById('service-image');
    if (imgEl && data.heroImage) {
      imgEl.src = data.heroImage;
      imgEl.alt = data.title;
    }
    
    // Populate Benefits
    const benefitsList = document.getElementById('benefits-list');
    benefitsList.innerHTML = '';
    data.benefits.forEach(benefit => {
      const li = document.createElement('li');
      li.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> <span>${benefit}</span>`;
      benefitsList.appendChild(li);
    });
    
    // Populate Areas as an Accordion
    const areasList = document.getElementById('areas-list');
    areasList.innerHTML = '';
    areasList.classList.add('accordion-container');
    
    data.areasCovered.forEach(area => {
      let parts = area.split(' - ');
      let title = parts[0];
      let desc = parts.slice(1).join(' - ');
      
      const item = document.createElement('div');
      item.className = 'accordion-item';
      
      if (desc) {
        item.innerHTML = `
          <div class="accordion-header" onclick="this.classList.toggle('active'); const content = this.nextElementSibling; if(content.style.maxHeight){content.style.maxHeight=null;}else{content.style.maxHeight=content.scrollHeight+'px';}">
            <div style="display:flex; align-items:center; gap: 12px; font-weight:600; color:var(--primary-maroon);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="color:var(--primary-gold);"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <span>${title}</span>
            </div>
            <svg class="accordion-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="accordion-content">
            <p style="padding: 10px 10px 15px 32px; color:var(--text-light); margin:0; line-height:1.6;">${desc}</p>
          </div>
        `;
      } else {
        item.innerHTML = `
          <div class="accordion-header no-arrow" style="cursor:default;">
            <div style="display:flex; align-items:center; gap: 12px; font-weight:600; color:var(--text-dark);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="color:var(--primary-gold);"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <span>${title}</span>
            </div>
          </div>
        `;
      }
      areasList.appendChild(item);
    });

  } else {
    document.getElementById('service-title').innerText = "Topic Not Found";
    document.getElementById('service-description').innerText = "Please select a valid consultation topic from the homepage.";
  }
};
