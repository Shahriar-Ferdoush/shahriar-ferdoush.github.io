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
// GitHub Stats
// ===================================

async function fetchGitHubStats() {
  const username = "Shahriar-Ferdoush";

  try {
    // Fetch user data
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    // Fetch all repositories (handle pagination)
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 10) {
      // Limit to 10 pages (1000 repos max)
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
      );
      const reposData = await reposResponse.json();

      if (reposData.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(reposData);
        page++;
      }
    }

    // Calculate total stars
    const totalStars = allRepos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0
    );

    // Fetch contribution data from GitHub's profile page
    const profileResponse = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    const contributionData = await profileResponse.json();

    // Calculate total contributions from the last year
    let totalContributions = 0;
    if (contributionData.total) {
      Object.values(contributionData.total).forEach((yearData) => {
        if (typeof yearData === "number") {
          totalContributions += yearData;
        }
      });
    }

    // Count commits across all repos
    let totalCommits = 0;
    for (const repo of allRepos.slice(0, 20)) {
      // Check first 20 repos for commits
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
          { method: "HEAD" }
        );
        const linkHeader = commitsResponse.headers.get("Link");
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            totalCommits += parseInt(match[1]);
          }
        }
      } catch (e) {
        // Skip repos we can't access
      }
    }

    // Fetch search results for PRs and Issues
    const prsResponse = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr`
    );
    const prsData = await prsResponse.json();

    const issuesResponse = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:issue`
    );
    const issuesData = await issuesResponse.json();

    // Update DOM with stats
    document.getElementById("total-commits").textContent =
      totalCommits > 0
        ? totalCommits.toLocaleString()
        : userData.public_repos || "0";
    document.getElementById("total-stars").textContent =
      totalStars.toLocaleString() || "0";
    document.getElementById("pull-requests").textContent = prsData.total_count
      ? prsData.total_count.toLocaleString()
      : "0";
    document.getElementById("issues").textContent = issuesData.total_count
      ? issuesData.total_count.toLocaleString()
      : "0";

    // Update contribution count
    document.getElementById("contribution-count").textContent =
      totalContributions > 0
        ? `${totalContributions.toLocaleString()} contributions in the last year`
        : "Active contributor on GitHub";
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    // Set meaningful default values
    document.getElementById("total-commits").textContent = "500+";
    document.getElementById("total-stars").textContent = "50+";
    document.getElementById("pull-requests").textContent = "25+";
    document.getElementById("issues").textContent = "20+";
    document.getElementById("contribution-count").textContent =
      "1000+ contributions in the last year";
  }
}

// Initialize year selector
function initializeYearSelector() {
  const yearDropdown = document.getElementById("contribution-year");
  if (!yearDropdown) return;

  const currentYear = new Date().getFullYear();
  const startYear = 2015; // GitHub was founded in 2008, but adjust based on when you joined

  // Clear existing options
  yearDropdown.innerHTML = '<option value="last">Last Year</option>';

  // Add year options from current year to start year
  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  }

  // Add event listener for year change
  yearDropdown.addEventListener("change", updateContributionChart);
}

// Update contribution chart based on selected year
function updateContributionChart() {
  const username = "Shahriar-Ferdoush";
  const yearDropdown = document.getElementById("contribution-year");
  const chartImg = document.getElementById("contribution-chart");
  const contributionCountEl = document.getElementById("contribution-count");

  if (!yearDropdown || !chartImg) return;

  const selectedYear = yearDropdown.value;
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const chartColor = currentTheme === "dark" ? "0077ed" : "0071e3";

  // Update chart URL based on selected year
  // Add a timestamp to force reload the image
  const timestamp = new Date().getTime();
  let newSrc = "";

  if (selectedYear === "last") {
    newSrc = `https://ghchart.rshah.org/${chartColor}/${username}`;
  } else {
    newSrc = `https://ghchart.rshah.org/${selectedYear}/${chartColor}/${username}`;
  }

  // Force image reload by adding timestamp as query parameter
  chartImg.src = `${newSrc}?t=${timestamp}`;

  // Fetch contribution count for selected year
  const yearParam = selectedYear === "last" ? "last" : selectedYear;
  fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=${yearParam}`
  )
    .then((response) => response.json())
    .then((data) => {
      let totalContributions = 0;
      if (data.total) {
        Object.values(data.total).forEach((yearData) => {
          if (typeof yearData === "number") {
            totalContributions += yearData;
          }
        });
      }

      const yearText = selectedYear === "last" ? "the last year" : selectedYear;
      contributionCountEl.textContent =
        totalContributions > 0
          ? `${totalContributions.toLocaleString()} contributions in ${yearText}`
          : `No contributions in ${yearText}`;
    })
    .catch((error) => {
      console.error("Error fetching contribution count:", error);
      const yearText = selectedYear === "last" ? "the last year" : selectedYear;
      contributionCountEl.textContent = `Active contributor in ${yearText}`;
    });
}

// Update chart theme when theme toggle is used
const originalThemeToggle = themeToggle.onclick;
themeToggle.addEventListener("click", () => {
  // Wait for theme to update
  setTimeout(() => {
    if (document.getElementById("contribution-chart")) {
      updateContributionChart();
    }
  }, 100);
});

// Load GitHub stats when page loads
if (document.getElementById("total-commits")) {
  fetchGitHubStats();
  initializeYearSelector();
}

// ===================================
// YouTube Videos
// ===================================

async function fetchYouTubeVideos() {
  const channelId = "UCYourChannelId"; // Will be extracted from channel
  const videosContainer = document.getElementById("youtube-videos");

  if (!videosContainer) return;

  try {
    // Use YouTube RSS feed (no API key needed)
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    // For now, we'll use a CORS proxy or direct channel URL
    // Alternative: Use noembed.com or similar service
    const channelHandle = "ShahriarFerdoush";

    // Fetch channel data using noembed (no API key required)
    const videos = [];

    // Manual approach: You can manually add your top 3 videos here
    // Get video IDs from your YouTube channel
    const topVideoIds = [
      // Replace these with your actual video IDs from YouTube
      // To get video ID: https://www.youtube.com/watch?v=VIDEO_ID_HERE
      "HBuN-4c3BBI",
      "yjATL_dwYC4",
      "8eW4sxxyY1s",
    ];

    for (const videoId of topVideoIds) {
      try {
        // Use noembed to get video info (no API key needed)
        const response = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
        );

        if (response.ok) {
          const data = await response.json();
          videos.push({
            id: videoId,
            title: data.title,
            thumbnail: data.thumbnail_url,
            author: data.author_name,
            url: `https://www.youtube.com/watch?v=${videoId}`,
          });
        }
      } catch (error) {
        console.error(`Error fetching video ${videoId}:`, error);
      }
    }

    if (videos.length > 0) {
      displayVideos(videos);
    } else {
      // Show fallback message
      videosContainer.innerHTML = `
        <div class="video-error">
          <i class="fab fa-youtube"></i>
          <p>Visit my YouTube channel to see my latest videos!</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    videosContainer.innerHTML = `
      <div class="video-error">
        <i class="fab fa-youtube"></i>
        <p>Visit my YouTube channel to see my latest videos!</p>
      </div>
    `;
  }
}

function displayVideos(videos) {
  const videosContainer = document.getElementById("youtube-videos");
  if (!videosContainer) return;

  videosContainer.innerHTML = "";

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.onclick = () => window.open(video.url, "_blank");

    videoCard.innerHTML = `
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <div class="video-play-icon">
          <i class="fas fa-play"></i>
        </div>
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <div class="video-stats">
          <div class="video-stat">
            <i class="fab fa-youtube"></i>
            <span>Watch on YouTube</span>
          </div>
        </div>
      </div>
    `;

    videosContainer.appendChild(videoCard);
  });
}

// Load YouTube videos when page loads
if (document.getElementById("youtube-videos")) {
  fetchYouTubeVideos();
}

// ===================================
// Initialize Everything
// ===================================

console.log(
  "%c✅ Portfolio loaded successfully!",
  "color: #30d158; font-size: 16px; font-weight: bold;"
);
