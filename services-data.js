const servicesData = {
  "residential": {
    title: "Residential Vastu",
    heroImage: "./residential_vastu.png",
    subtitle: "Harmony and Prosperity within your Home",
    description: "Selenite Vastu expertly analyzes the cosmic energy of your home to unlock peace, better health, and prosperity. Following traditional Vastu Shastra principles blended with modern energy scanning, we evaluate directional alignments to correct structural imbalances without the need for demolition.",
    benefits: [
      "Attracts lasting financial growth and wealth accumulation.",
      "Improves relationships and reduces familial conflicts.",
      "Enhances the physical and mental well-being of all occupants.",
      "Aids in academic performance and focus for children."
    ],
    areasCovered: [
      "Main Entrance & Direction - Analyzing the flow of initial energy entering the home.",
      "Master & Guest Bedrooms - Ensuring optimal sleep and harmony among family members.",
      "Kitchen Placement & Appliances - Balancing the fire element for health and nutrition.",
      "Pooja Room (Prayer Space) - Creating a serene and high-vibration environment.",
      "Living Room Layout - Fostering positive social interactions and familial bonding.",
      "Staircases & Balconies - Preventing energy drains and structural imbalances."
    ]
  },
  "commercial": {
    title: "Commercial & Office Vastu",
    heroImage: "./commercial_vastu.png",
    subtitle: "Accelerate Business Growth & Sales",
    description: "Your office or commercial space's primary purpose is to generate success, manage assets efficiently, and yield significant profits. A Vastu-compliant setup actively removes financial blockages, enhances staff productivity, and fosters goodwill amongst your clients.",
    benefits: [
      "Massive increase in sales and return on investment.",
      "Greater operational efficiency and staff focus.",
      "Reduces legal disputes and prevents financial leakages.",
      "Attracts higher-tier investors and clientele."
    ],
    areasCovered: [
      "CEO / Director Cabin Location - Enhancing leadership authority and decision-making.",
      "Staff Seating Arrangement - Boosting employee productivity and reducing conflicts.",
      "Cash Counter & Account Dept - Maximizing cash flow and securing financial stability.",
      "Meeting / Conference Rooms - Ensuring successful negotiations and client pitches.",
      "Reception Area & Entrance - Creating a welcoming and authoritative first impression.",
      "Pantry & Washroom Placement - Preventing energy contamination and wealth drain."
    ]
  },
  "industrial": {
    title: "Industrial Vastu",
    heroImage: "./industrial_vastu.png",
    subtitle: "Maximize Factory Production & Efficiency",
    description: "Industrial sites handle heavy machinery, mass production, and large workforces. Industrial Vastu aligns these volatile energies to ensure smooth operations. Proper spatial mapping significantly enhances output quality while minimizing costly machinery breakdowns and labor disputes.",
    benefits: [
      "Reduces structural accidents and mechanical failures.",
      "Optimizes raw material flow and finished goods dispatch.",
      "Enhances harmony between management and labor forces.",
      "Unblocks stuck payments and accelerates inventory turnover."
    ],
    areasCovered: [
      "Heavy Machinery Placement - Reducing breakdowns and ensuring smooth operations.",
      "Raw Material Storage - Maintaining a steady supply chain and minimizing waste.",
      "Finished Goods Godown - Accelerating dispatch and improving product turnover.",
      "Labour & Admin Quarters - Promoting workforce harmony and administrative control.",
      "Boiler / Heating Units Zone - Properly housing fire elements to prevent accidents.",
      "Main Factory Gates - Facilitating smooth entry for resources and exit for products."
    ]
  },
  "astronumerology": {
    title: "Astro Numerology",
    heroImage: "./astro_numerology.png", 
    subtitle: "Align Your Numbers for Cosmic Success",
    description: "Beyond physical spaces, your birth dates, names, and karmic numbers intricately weave into your destiny. Astro Numerology decodes these hidden energies, providing personalized, numerical remedies to align your personal vibrational frequencies with success in career, marriage, and wealth.",
    benefits: [
      "Name-correction for exponential career growth.",
      "Identifying lucky dates for major business decisions.",
      "Predicting and mitigating negative life phases.",
      "Matching compatibility for partnerships and marriage."
    ],
    areasCovered: [
      "Name Correction Analysis - Aligning name vibrations with life goals and destiny.",
      "Business / Brand Naming - Choosing auspicious names for corporate success.",
      "Mobile Number Numerology - Attracting positive communications and opportunities.",
      "Locality / Plot Number Sync - Ensuring your address resonates with personal energy.",
      "Vehicle Number Auspiciousness - Enhancing safety and luck during travel.",
      "Signature Analysis - Modifying signatures to unblock wealth and career paths."
    ]
  }
};

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');
  
  if (serviceId && servicesData[serviceId]) {
    const data = servicesData[serviceId];
    
    // Populate the DOM
    document.getElementById('service-title').innerText = data.title;
    document.getElementById('breadcrumb-title').innerText = data.title;
    document.getElementById('service-subtitle').innerText = data.subtitle;
    document.getElementById('service-description').innerText = data.description;
    
    // Set Image
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
      // Split the string by ' - ' assuming "Title - Description" format
      let parts = area.split(' - ');
      let title = parts[0];
      let desc = parts.slice(1).join(' - ');
      
      const item = document.createElement('div');
      item.className = 'accordion-item';
      
      // If there's no description, just render the title normally, otherwise use accordion
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
    // Fallback if no ID found or ID is invalid
    document.getElementById('service-title').innerText = "Service Not Found";
    document.getElementById('service-description').innerText = "Please select a valid service from the homepage.";
  }
};
