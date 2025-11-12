class Carousel {
  constructor(carouselId) {
    this.carousel = document.getElementById(carouselId);
    // FIX: match the HTML id
    this.track = document.getElementById("dealsTrack");
    this.dotWrapper = document.getElementById("dotWrapper");

    // Guard: if something is missing, bail gracefully
    if (!this.carousel || !this.track || !this.dotWrapper) return;

    this.items = this.track.querySelectorAll(".slider-item");
    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();

    this.init();
    this.setupEventListeners();
  }

  getItemsPerView() {
    const width = window.innerWidth;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  init() {
    this.createDots();
    this.updateCarousel();
  }

  createDots() {
    this.dotWrapper.innerHTML = "";
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.type = "button";
      dot.setAttribute("aria-label", `الانتقال إلى الصفحة ${i + 1}`);
      // Use aria-current (matches your CSS selector)
      if (i === 0) dot.setAttribute("aria-current", "true");

      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotWrapper.appendChild(dot);
    }
  }

  updateCarousel() {
    if (!this.items.length) return;

    const itemWidth = this.items[0].offsetWidth;
    const styles = getComputedStyle(this.track);
    const gap = parseFloat(styles.gap) || 0;
    const isRTL = styles.direction === "rtl";

    const step = this.currentIndex * (itemWidth + gap);
    const offset = isRTL ? step : -step;

    this.track.style.transform = `translateX(${offset}px)`;
    this.updateDots();
  }

  updateDots() {
    const dots = this.dotWrapper.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  goToSlide(index) {
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    this.updateCarousel();
  }

  next() {
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      const newItemsPerView = this.getItemsPerView();
      if (newItemsPerView !== this.itemsPerView) {
        this.itemsPerView = newItemsPerView;
        this.currentIndex = 0;
        this.createDots();
        this.updateCarousel();
      }
    });

    // Touch/Swipe support
    let startX = 0;
    let isDragging = false;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.track.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
      isDragging = false;
    });
  }
}

// Initialize carousel
new Carousel("deals-slider");
