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

  // Modal Logic
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  ctaBtns.forEach(btn => {
    // Only bind modal to buttons that don't have form submission type
    if (btn.type !== 'submit') {
      btn.addEventListener('click', openModal);
    }
  });

  closeModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking on background overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Adding entry animations for service cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
    observer.observe(card);
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
        const response = await fetch('/api/book', {
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
          closeModal();
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