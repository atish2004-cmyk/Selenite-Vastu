// Selenite Vastu Interactions

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const ctaBtns = document.querySelectorAll('.cta-btn');

  // Sticky header shadow change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  });

  // Modal removed: Booking formulation is directly embedded in hero.

  // Adding entry animations
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

  const animatedElements = document.querySelectorAll('.service-card, .issue-card, .panchang-widget, .remedies-content, .profile-card, .shloka-banner, .review-box, .reveal-on-scroll');
  animatedElements.forEach((el, index) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
    const staggerDelay = (index % 5) * 0.1;
    el.style.transitionDelay = `${staggerDelay}s`;
    observer.observe(el);
  });

  // Backend Integration: Form Submission
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

  // AI Voice "Video" Player Logic
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
      utterance.rate = 0.9; // Slightly slower for a calming consultant voice

      utterance.onstart = () => {
        isPlayingAudio = true;
        playButton.innerHTML = '⏸'; // Change to pause icon
        videoImg.style.transition = 'transform 15s linear, filter 0.5s';
        videoImg.style.filter = 'brightness(1)';
        videoImg.style.transform = 'scale(1.15)'; // Slow zoom effect to simulate video
      };

      utterance.onend = () => {
        isPlayingAudio = false;
        playButton.innerHTML = '▶';
        videoImg.style.transition = 'transform 0.5s ease, filter 0.5s';
        videoImg.style.transform = 'scale(1)';
        videoImg.style.filter = 'brightness(0.85)';
      };
      
      // Error handling (e.g. if interrupted)
      utterance.onerror = () => {
        isPlayingAudio = false;
        playButton.innerHTML = '▶';
        videoImg.style.transform = 'scale(1)';
      };

      window.speechSynthesis.cancel(); // Clear any queued utterances
      window.speechSynthesis.speak(utterance);
    });
  }

  // Mobile Navigation Logic
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const dropdowns = document.querySelectorAll('.dropdown');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Handle mobile dropdown expansion
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        dropdown.classList.toggle('active');
      }
    });
  });

  // Theme Switcher Logic
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

});