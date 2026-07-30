// --- NAVIGATION ---
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Sticky Navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
function toggleMenu() {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// --- SCROLL REVEAL ANIMATION (Intersection Observer) ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Uncomment below if you only want the animation to play once
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
  observer.observe(element);
});

// --- ANIMATED COUNTERS ---
const counterObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateValue(entry.target, 0, target, 2000);
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, counterObserverOptions);

document.querySelectorAll('.stat-number').forEach(element => {
  counterObserver.observe(element);
});

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // easing out
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    obj.innerHTML = Math.floor(easeOutQuart * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      // Final specific formats
      if (end === 150) obj.innerHTML = "150+";
      else if (end === 99) obj.innerHTML = "99%";
      else if (end === 100) obj.innerHTML = "100/100";
      else if (end === 24) obj.innerHTML = "24/7";
      else obj.innerHTML = end;
    }
  };
  window.requestAnimationFrame(step);
}

// --- FAQ ACCORDION ---
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all open items
    accordionItems.forEach(i => i.classList.remove('active'));
    
    // If it wasn't active, open it
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// --- SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip "#" only links
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for sticky header
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// --- SCROLL TO TOP ---
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// --- SCROLL TO TOP BUTTON ---
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
