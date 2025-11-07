// class TestimonialSlider {
//   constructor() {
//     this.currentIndex = 0;
//     this.cardsPerView = 3;
//     this.totalCards = 0;
//     this.maxIndex = 0;
//     this.resizeTimeout = null;
//     this.isRTL = document.documentElement.dir === "rtl";

//     this.selectors = {
//       wrapper: ".testimonials-wrapper",
//       track: "#testimonials-track",
//       cards: ".testimonial-card",
//       dotsContainer: "#dots-container",
//       prevBtn: "#prevBtn",
//       nextBtn: "#nextBtn",
//     };

//     this.init();
//     this.addEventListeners();
//   }

//   init() {
//     this.calculateLayout();
//     this.generateDots();
//     this.updateSlider();
//   }

//   calculateLayout() {
//     const wrapper = document.querySelector(this.selectors.wrapper);
//     if (!wrapper) return;

//     const width = wrapper.offsetWidth;

//     // Adjusted breakpoints for better coverage
//     if (width <= 767) {
//       this.cardsPerView = 1;
//     } else if (width >= 768 && width <= 1024) {
//       this.cardsPerView = 2;
//     } else {
//       // Handles all sizes above 1024px, including 1366px and 1440px
//       this.cardsPerView = 3;
//     }

//     this.totalCards = document.querySelectorAll(this.selectors.cards).length;
//     this.maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
//     this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
//   }

//   generateDots() {
//     const dotsContainer = document.querySelector(this.selectors.dotsContainer);
//     if (!dotsContainer) return;

//     dotsContainer.innerHTML = "";

//     // The loop iterates from 0 up to and including the maxIndex,
//     // which correctly creates the right number of dots.
//     for (let i = 0; i <= this.maxIndex; i++) {
//       const dot = document.createElement("span");
//       dot.className = `dot ${i === this.currentIndex ? "active" : ""}`;
//       dot.addEventListener("click", () => this.goToSlide(i));
//       dotsContainer.appendChild(dot);
//     }
//   }

//   updateSlider() {
//     const track = document.querySelector(this.selectors.track);
//     const cards = document.querySelectorAll(this.selectors.cards);
//     const card = cards[0];

//     if (!card || !track) return;

//     const cardStyle = window.getComputedStyle(card);
//     const cardWidth = card.offsetWidth;
//     const cardMargin = parseFloat(
//       this.isRTL ? cardStyle.marginLeft : cardStyle.marginRight
//     );
//     const totalCardWidth = cardWidth + cardMargin;

//     const translateX = this.isRTL
//       ? this.currentIndex * totalCardWidth
//       : -(this.currentIndex * totalCardWidth);

//     track.style.transform = `translateX(${translateX}px)`;

//     const dots = document.querySelectorAll(".dot");
//     dots.forEach((dot, i) =>
//       dot.classList.toggle("active", i === this.currentIndex)
//     );

//     cards.forEach((card, i) => {
//       card.classList.remove("active");

//       if (this.cardsPerView === 3) {
//         const middleIndex = this.currentIndex + 1;
//         if (i === middleIndex) {
//           card.classList.add("active");
//         }
//       } else if (this.cardsPerView === 2) {
//         if (i === this.currentIndex) {
//           card.classList.add("active");
//         }
//       } else {
//         if (i === this.currentIndex) {
//           card.classList.add("active");
//         }
//       }
//     });

//     this.updateNavButtons();
//   }

//   updateNavButtons() {
//     const prevBtn = document.querySelector(this.selectors.prevBtn);
//     const nextBtn = document.querySelector(this.selectors.nextBtn);

//     if (prevBtn) {
//       prevBtn.classList.toggle("disabled", this.currentIndex === 0);
//       prevBtn.classList.toggle("active", this.currentIndex > 0);
//     }

//     if (nextBtn) {
//       nextBtn.classList.toggle("disabled", this.currentIndex >= this.maxIndex);
//       nextBtn.classList.toggle("active", this.currentIndex < this.maxIndex);
//     }
//   }

//   nextSlide() {
//     if (this.currentIndex < this.maxIndex) {
//       this.currentIndex++;
//       this.updateSlider();
//     }
//   }

//   prevSlide() {
//     if (this.currentIndex > 0) {
//       this.currentIndex--;
//       this.updateSlider();
//     }
//   }

//   goToSlide(index) {
//     this.currentIndex = index;
//     this.updateSlider();
//   }

//   handleResize() {
//     clearTimeout(this.resizeTimeout);
//     this.resizeTimeout = setTimeout(() => {
//       this.init();
//     }, 250);
//   }

//   handleKeyDown(e) {
//     if (this.isRTL) {
//       if (e.key === "ArrowRight") this.prevSlide();
//       else if (e.key === "ArrowLeft") this.nextSlide();
//     } else {
//       if (e.key === "ArrowLeft") this.prevSlide();
//       else if (e.key === "ArrowRight") this.nextSlide();
//     }
//   }

//   addEventListeners() {
//     window.addEventListener("resize", () => this.handleResize());
//     document.addEventListener("keydown", (e) => this.handleKeyDown(e));

//     const prevBtn = document.querySelector(this.selectors.prevBtn);
//     const nextBtn = document.querySelector(this.selectors.nextBtn);

//     if (prevBtn) prevBtn.addEventListener("click", () => this.prevSlide());
//     if (nextBtn) nextBtn.addEventListener("click", () => this.nextSlide());
//   }
// }

// // Initialize the slider when DOM is loaded
// let testimonialSlider;
// document.addEventListener("DOMContentLoaded", () => {
//   testimonialSlider = new TestimonialSlider();
// });

// //// Toggle functionality for Monthly/Annually Pricing //////////
// document.addEventListener("DOMContentLoaded", function () {
//   const toggleButtons = document.querySelectorAll(".toggle-btn");
//   // Select all cards using the data-plan attribute, which is language-independent.
//   const pricingCards = document.querySelectorAll("[data-plan]");

//   // Pricing data
//   const pricingData = {
//     monthly: {
//       webHosting: "$2.99",
//       wordpress: "$4.99",
//       reseller: "$9.99",
//       premier: "$9.99",
//     },
//     annually: {
//       webHosting: "$29.99",
//       wordpress: "$49.99",
//       reseller: "$99.99",
//       premier: "$99.99",
//     },
//   };

//   toggleButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       // Remove active class from all buttons.
//       toggleButtons.forEach((btn) => btn.classList.remove("active"));
//       // Add active class to the clicked button.
//       this.classList.add("active");

//       const period = this.dataset.period;

//       // Update prices based on selected period.
//       pricingCards.forEach((card) => {
//         // Use the data-plan attribute to get the plan key.
//         const planKey = card.dataset.plan;
//         const priceElement = card.querySelector(".plan-price");
//         const periodElement = card.querySelector(".plan-period");

//         // Check if the plan and period data exist.
//         if (planKey && pricingData[period][planKey]) {
//           priceElement.textContent = pricingData[period][planKey];
//           // Update the period text using the correct data attribute.
//           if (period === "monthly") {
//             periodElement.textContent = periodElement.dataset.monthlyText;
//           } else {
//             periodElement.textContent = periodElement.dataset.annuallyText;
//           }
//         }
//       });
//     });
//   });
// });

////////////   animations functionality /////////////
document.addEventListener("DOMContentLoaded", function () {
  // Configure Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute("data-animate");
          const delay = element.getAttribute("data-animate-delay") || 0;

          // Apply animation classes after delay
          setTimeout(() => {
            element.classList.add(
              "animate__animated",
              `animate__${animation}`,
              "animated"
            );
          }, delay);

          // Stop observing after animation triggers
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px", // Trigger when 50px from bottom of viewport
    }
  );

  // Observe all elements with data-animate attribute
  document.querySelectorAll("[data-animate]").forEach((element) => {
    observer.observe(element);
  });
});
