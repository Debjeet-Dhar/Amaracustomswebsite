// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.sunIcon = document.querySelector(".sun");
    this.moonIcon = document.querySelector(".moon");
    this.currentTheme = localStorage.getItem("theme") || "light";

    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener("click", () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      this.sunIcon.style.display = "none";
      this.moonIcon.style.display = "block";
    } else {
      this.sunIcon.style.display = "block";
      this.moonIcon.style.display = "none";
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(this.currentTheme);

    // Add animation to toggle button
    this.themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.themeToggle.style.transform = "scale(1)";
    }, 150);
  }
}

class ImageLoader {
  constructor() {
    this.images = document.querySelectorAll(".product-img");
    this.init();
  }

  init() {
    this.images.forEach((img) => {
      // Check if image is already loaded
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", () => {
          img.classList.add("loaded");
        });

        img.addEventListener("error", () => {
          // If image fails to load, show fallback
          img.style.display = "none";
        });
      }
    });
  }
}

// Header Scroll Effect
class HeaderManager {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }
  }
}

// Loading Animation
class LoadingManager {
  constructor() {
    this.loadingBar = document.getElementById("loadingBar");
    this.init();
  }

  init() {
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      this.loadingBar.style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.loadingBar.style.opacity = "0";
          setTimeout(() => this.loadingBar.remove(), 500);
        }, 300);
      }
    }, 50);
  }
}

// Smooth Scrolling
class ScrollManager {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}
// Mobile Navigation Manager
class MobileNavManager {
  constructor() {
    this.menuBtn = document.getElementById("mobileMenuBtn");
    this.mobileNav = document.getElementById("mobileNav");
    this.mobileNavClose = document.getElementById("mobileNavClose");
    this.mobileNavOverlay = document.getElementById("mobileNavOverlay");
    this.isOpen = false;

    this.init();
  }

  init() {
    // Open menu
    this.menuBtn.addEventListener("click", () => this.openMenu());

    // Close menu
    this.mobileNavClose.addEventListener("click", () => this.closeMenu());
    this.mobileNavOverlay.addEventListener("click", () => this.closeMenu());

    // Close menu when clicking on links
    this.mobileNav.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });

    // Prevent body scroll when menu is open
    this.preventBodyScroll();
  }

  openMenu() {
    this.mobileNav.classList.add("active");
    this.mobileNavOverlay.classList.add("active");
    this.isOpen = true;
    document.body.style.overflow = "hidden";

    // Change menu button icon
    this.menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }

  closeMenu() {
    this.mobileNav.classList.remove("active");
    this.mobileNavOverlay.classList.remove("active");
    this.isOpen = false;
    document.body.style.overflow = "";
  }

  preventBodyScroll() {
    // Prevent background scrolling when menu is open
    this.mobileNav.addEventListener(
      "touchmove",
      (e) => {
        if (this.isOpen) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
}
// Products Section Functionality
class ProductsManager {
  constructor() {
    this.orderButtons = document.querySelectorAll(".order-btn");
    this.detailButtons = document.querySelectorAll(".details-btn");

    this.init();
  }

  init() {
    // Order button functionality
    this.orderButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const product = e.target.closest("button").getAttribute("data-product");
        this.handleOrder(product);
      });
    });

    // Detail button functionality
    this.detailButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const product = e.target.closest("button").getAttribute("data-product");
        this.showDetails(product);
      });
    });
  }

  handleOrder(product) {
    const message = `Hi! I want to order ${product} custom water bottles`;
    const whatsappUrl = `https://wa.me/918100123040?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  showDetails(product) {
    const details = {
      "250ml": {
        title: "250ml Custom Water Bottle",
        features: [
          "Perfect for weddings, parties, and small events",
          "Compact size ideal for table placements",
          "High-quality digital printing",
          "Food-grade PET material",
          "Minimum order: 1 box (30 bottles)",
          "Delivery: 3-4 business days",
        ],
      },
      "500ml": {
        title: "500ml Custom Water Bottle",
        features: [
          "Most popular for restaurants and cafes",
          "Perfect balance of size and convenience",
          "Premium quality printing",
          "BPA-free materials",
          "Minimum order: 1 box (24 bottles)",
          "Delivery: 4-5 business days",
        ],
      },
      "1litre": {
        title: "1 Litre Custom Water Bottle",
        features: [
          "Ideal for corporate events and offices",
          "Professional appearance",
          "High-resolution printing",
          "Eco-friendly materials",
          "Minimum order: 1 box (12 bottles)",
          "Delivery: 5-7 business days",
        ],
      },
    };

    const productInfo = details[product];
    if (productInfo) {
      alert(
        `${productInfo.title}\n\nFeatures:\n ${productInfo.features.join(
          "\n "
        )}`
      );
    }
  }
}
class TestimonialsManager {
  constructor() {
    this.testimonials = document.querySelectorAll(".testimonial-card");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-testimonial");
    this.nextBtn = document.querySelector(".next-testimonial");
    this.currentSlide = 0;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto-play
    setInterval(() => this.nextSlide(), 5000);
  }

  goToSlide(slideIndex) {
    this.testimonials[this.currentSlide].classList.remove("active");
    this.dots[this.currentSlide].classList.remove("active");

    this.currentSlide = slideIndex;

    this.testimonials[this.currentSlide].classList.add("active");
    this.dots[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    const nextSlide = (this.currentSlide + 1) % this.testimonials.length;
    this.goToSlide(nextSlide);
  }

  prevSlide() {
    const prevSlide =
      (this.currentSlide - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.goToSlide(prevSlide);
  }
}
function filterDesigns(category) {
  // Get all design items
  const items = document.querySelectorAll(".design-item");

  // Get all filter buttons and remove active class
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Add active class to clicked button
  event.target.classList.add("active");

  // Loop through all design items
  items.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");

    // Show all if 'all' is clicked, otherwise filter
    if (category === "all" || itemCategory === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        // Form is valid, you can submit via AJAX or let it submit normally
        // For now, we'll just show an alert
        alert("Thank you for your message! We will get back to you soon.");
        contactForm.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  }
});

// Initialize all managers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LoadingManager();
  new ScrollManager();
  new ThemeManager();
  new HeaderManager();
  new MobileNavManager();
  new ImageLoader();
  new TestimonialsManager();
  new ProductsManager();

  // Add staggered fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});
