// Selenite Vastu Interactions - Desktop Layout on All Devices

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const ctaBtns = document.querySelectorAll('.cta-btn');

  // ============================================
  // STICKY HEADER SHADOW ON SCROLL
  // ============================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  });

  // ============================================
  // SCROLL ANIMATION OBSERVER
  // ============================================
  const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.service-card, .issue-card, .panchang-widget, .remedies-content, ' +
    '.profile-card, .shloka-banner, .review-box, .reveal-on-scroll, ' +
    '.value-card, .stat-box, .detail-card'
  );
  
  animatedElements.forEach((el, index) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
    const staggerDelay = (index % 5) * 0.1;
    el.style.transitionDelay = `${staggerDelay}s`;
    observer.observe(el);
  });

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = bookingForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Submitting...';
      submitBtn.disabled = true;

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('http://localhost:3000/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert('Thank you! Your consultation request has been received.');
          bookingForm.reset();
        } else {
          alert('Error: ' + (result.error || 'Something went wrong.'));
        }
      } catch (err) {
        console.error(err);
        alert('Error submitting form. Please ensure the backend is running.');
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // ============================================
  // AI VOICE "VIDEO" PLAYER LOGIC
  // ============================================
  const playButton = document.querySelector('.play-button');
  const videoImg = document.querySelector('.video-img');
  let isPlayingAudio = false;

  // Load voices securely
  let availableVoices = [];
  window.speechSynthesis.onvoiceschanged = () => {
    availableVoices = window.speechSynthesis.getVoices();
  };

  if (playButton && videoImg) {
    playButton.addEventListener('click', () => {
      // If already playing, stop the audio and reset the "video" state
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        isPlayingAudio = false;
        playButton.innerHTML = '▶';
        videoImg.style.transform = 'scale(1)';
        videoImg.style.filter = 'brightness(0.85)';
        return;
      }

      // Start the "video" AI voice
      const scriptText = "Welcome to Selenite Vastu. Selenite Vastu is a profound, scientific approach to aligning your living and working spaces with cosmic energy. Rooted in ancient principles, our methodology combines Vastu Shastra with modern energy scanning. We focus on balancing the Five Elements and the 16 Vastu Zones to invite harmony and unblock stagnant paths to wealth and health.";
      
      const utterance = new SpeechSynthesisUtterance(scriptText);
      
      // Try to find a premium Female English voice
      if (availableVoices.length === 0) {
         availableVoices = window.speechSynthesis.getVoices();
      }
      const premiumVoice = availableVoices.find(v => 
         v.name.includes('Natural') || 
         v.name.includes('Zira') || 
         v.name.includes('Google UK English Female') || 
         v.name.includes('Samantha')
      );
      
      if (premiumVoice) {
         utterance.voice = premiumVoice;
      }
      
      utterance.pitch = 1.0;
      utterance.rate = 0.9;

      utterance.onstart = () => {
        isPlayingAudio = true;
        playButton.innerHTML = '⏸';
        videoImg.style.transition = 'transform 15s linear, filter 0.5s';
        videoImg.style.filter = 'brightness(1)';
        videoImg.style.transform = 'scale(1.15)';
      };

      utterance.onend = () => {
        isPlayingAudio = false;
        playButton.innerHTML = '▶';
        videoImg.style.transition = 'transform 0.5s ease, filter 0.5s';
        videoImg.style.transform = 'scale(1)';
        videoImg.style.filter = 'brightness(0.85)';
      };
      
      utterance.onerror = () => {
        isPlayingAudio = false;
        playButton.innerHTML = '▶';
        videoImg.style.transform = 'scale(1)';
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }

  // ============================================
  // NAVIGATION - DESKTOP LAYOUT ON ALL DEVICES
  // ============================================
  // Mobile menu navigation is hidden via CSS
  // Desktop navigation is always visible
  // Navigation dropdowns work via CSS hover on desktop
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Ensure navigation is always visible
  if (mainNav) {
    mainNav.classList.remove('active');
  }

  // ============================================
  // THEME SWITCHER LOGIC
  // ============================================
  const themeBtns = document.querySelectorAll('.theme-btn');
  const root = document.documentElement;
  
  const applyTheme = (theme) => {
    let activeTheme = theme;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      activeTheme = prefersDark ? 'dark' : 'light';
    }
    root.setAttribute('data-theme', activeTheme);
    localStorage.setItem('seleniteTheme', theme);
    
    // Update active button state
    themeBtns.forEach(btn => {
      if (btn.dataset.themeVal === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('seleniteTheme') || 'system';
  applyTheme(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.themeVal);
    });
  });

  // Listen for system theme changes if 'system' is selected
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('seleniteTheme') === 'system') {
      applyTheme('system');
    }
  });

  // ============================================
  // SMOOTH SCROLL BEHAVIOR
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Calculate offset for sticky header
        const headerHeight = header ? header.offsetHeight : 0;
        const offsetTop = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // ============================================
  // DEVICE DETECTION - DESKTOP-ONLY LAYOUT
  // ============================================
  // All devices now display desktop layout
  const getDeviceType = () => {
    return 'desktop';
  };

  const deviceType = getDeviceType();
  console.log('Device Type:', deviceType);

  // All buttons use desktop sizing since all devices show desktop layout
  const buttons = document.querySelectorAll('.cta-btn, .contact-pill, .sticky-whatsapp, .sticky-book');
  buttons.forEach(btn => {
    btn.style.minHeight = '44px';
    btn.style.minWidth = '44px';
  });

  // ============================================
  // MODAL / DIALOG HANDLING
  // ============================================
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close');
  const bookConsultationBtns = document.querySelectorAll('[data-modal="bookConsultation"]');

  if (modalOverlay && modalCloseBtn) {
    // Close modal
    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    modalCloseBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Open modal
    bookConsultationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // ============================================
  // ACCORDION FUNCTIONALITY
  // ============================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          otherContent.style.maxHeight = '0';
        }
      });

      // Toggle current accordion
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ============================================
  // LAZY LOADING FOR IMAGES
  // ============================================
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // TOUCH-FRIENDLY ENHANCEMENTS
  // ============================================
  // Add touch feedback to buttons
  const touchButtons = document.querySelectorAll('.cta-btn, .contact-pill, .accordion-header');
  touchButtons.forEach(btn => {
    btn.addEventListener('touchstart', () => {
      btn.style.opacity = '0.8';
    });
    btn.addEventListener('touchend', () => {
      btn.style.opacity = '1';
    });
  });

  // ============================================
  // VIEWPORT HEIGHT MANAGEMENT - DESKTOP LAYOUT
  // ============================================
  // Viewport height is managed via CSS custom properties
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);

  // ============================================
  // PERFORMANCE: DEBOUNCE SCROLL & RESIZE
  // ============================================
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const handleScroll = debounce(() => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ============================================
  // CONSOLE LOG FOR DEBUGGING
  // ============================================
  console.log('✅ Selenite Vastu JS loaded successfully');
  console.log('Device:', getDeviceType());
  console.log('Layout: Desktop-Only (All Devices)');
  console.log('Theme:', savedTheme);

});