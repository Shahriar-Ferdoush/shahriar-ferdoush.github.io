// ===================================
// Theme Toggle
// ===================================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-toggle-icon");
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

// ===================================
// Navigation & Mobile Menu
// ===================================

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class for backdrop effect
  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ===================================
// Smooth Scroll & Active Link
// ===================================

// Highlight active section in navigation
const sections = document.querySelectorAll("section[id]");

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (
      navLink &&
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// ===================================
// Typing Animation for Hero
// ===================================

const typingText = document.querySelector(".typing-text");
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  // Start typing animation after a short delay
  setTimeout(typeWriter, 500);
}

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll(`
    .about-content,
    .research-card,
    .timeline-item,
    .project-card,
    .skill-category,
    .cert-card,
    .contact-item,
    .contact-social
`);

animateOnScroll.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ===================================
// Counter Animation for Stats (if needed)
// ===================================

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ===================================
// Parallax Effect for Hero Background
// ===================================

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroOverlay = document.querySelector(".hero-overlay");

  if (heroOverlay) {
    heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===================================
// Skill Badge Hover Effect Enhancement
// ===================================

const skillBadges = document.querySelectorAll(".skill-badge");

skillBadges.forEach((badge) => {
  badge.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(2deg)";
  });

  badge.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
});

// ===================================
// Tech Tag Interactive Effect
// ===================================

const techTags = document.querySelectorAll(".tech-tag");

techTags.forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// ===================================
// Project Card Tilt Effect (Optional)
// ===================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", handleCardTilt);
  card.addEventListener("mouseleave", handleCardReset);
});

function handleCardTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
}

function handleCardReset(e) {
  const card = e.currentTarget;
  card.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
}

// ===================================
// Dynamic Year in Footer
// ===================================

const footer = document.querySelector(".footer p");
if (footer) {
  const currentYear = new Date().getFullYear();
  footer.textContent = footer.textContent.replace("2025", currentYear);
}

// ===================================
// Back to Top Button (Optional)
// ===================================

// Create back to top button
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = "back-to-top";
backToTopButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(backToTopButton);

// Style the button
const style = document.createElement("style");
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(0, 113, 227, 0.3);
        font-size: 1.2rem;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 30px rgba(0, 113, 227, 0.5);
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide back to top button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===================================
// Loading Animation (Optional)
// ===================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Remove any loading screen if exists
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  }
});

// ===================================
// Copy Email on Click (Optional Enhancement)
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const email = link.getAttribute("href").replace("mailto:", "");

    // Copy to clipboard
    navigator.clipboard
      .writeText(email)
      .then(() => {
        // Show temporary notification
        const notification = document.createElement("div");
        notification.textContent = "Email copied to clipboard!";
        notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, var(--accent-green) 0%, var(--accent-blue) 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.animation = "slideOut 0.3s ease";
          setTimeout(() => notification.remove(), 300);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy email:", err);
        // Fallback: open email client
        window.location.href = link.getAttribute("href");
      });
  });
});

// Add notification animations
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===================================
// Console Easter Egg
// ===================================

console.log(
  "%c👋 Hello, Developer!",
  "color: #0071e3; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cInterested in how this was built? Check out the source code!",
  "color: #bf5af2; font-size: 14px;"
);
console.log(
  "%cLooking for a developer? Let's connect!",
  "color: #30d158; font-size: 14px;"
);
console.log(
  "%c📧 shahriar.ss1212@gmail.com",
  "color: #ff9f0a; font-size: 14px;"
);

// ===================================
// Performance Optimization
// ===================================

// Lazy load images when they come into viewport
const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));

// ===================================
// Accessibility Enhancements
// ===================================

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Press 'T' to go to top
  if (e.key === "t" || e.key === "T") {
    if (!e.target.matches("input, textarea")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

// Focus management for mobile menu
hamburger.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    navLinks[0].focus();
  }
});

// ===================================
// Initialize Everything
// ===================================

console.log(
  "%c✅ Portfolio loaded successfully!",
  "color: #30d158; font-size: 16px; font-weight: bold;"
);
