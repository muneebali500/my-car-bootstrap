// Pagination Configuration
const itemsPerPage = 6;
let currentPage = 1;

// Get all service items
const serviceItems = document.querySelectorAll("#store-items .row > li");
const totalItems = serviceItems.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

// Function to display items for current page
function displayPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Hide all items
  serviceItems.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  // Update results text
  const resultsText = document.querySelector("#pagination-count");
  console.log(resultsText);
  const displayedStart = startIndex + 1;
  const displayedEnd = Math.min(endIndex, totalItems);
  resultsText.textContent = `عرض ${displayedStart}-${displayedEnd} من ${totalItems} نتيجة`;

  // Update pagination buttons
  updatePaginationButtons(page);
}

// Function to create pagination buttons
function createPaginationButtons() {
  const pagination = document.querySelector(".pagination");

  // Clear existing page numbers (keep prev/next buttons)
  const pageItems = pagination.querySelectorAll(
    ".page-item:not(:first-child):not(:last-child)"
  );
  pageItems.forEach((item) => item.remove());

  // Get prev and next buttons
  const prevButton = pagination.querySelector(".page-item:first-child");
  const nextButton = pagination.querySelector(".page-item:last-child");

  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    if (i === currentPage) {
      li.classList.add("active");
    }

    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = i;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      displayPage(currentPage);
    });

    li.appendChild(a);
    pagination.insertBefore(li, nextButton);
  }
}

// Function to update pagination button states
function updatePaginationButtons(page) {
  const pagination = document.querySelector(".pagination");
  const pageItems = pagination.querySelectorAll(".page-item");

  // Update active state
  pageItems.forEach((item, index) => {
    item.classList.remove("active");
    if (index > 0 && index <= totalPages) {
      if (index === page) {
        item.classList.add("active");
      }
    }
  });

  // Update prev button state
  const prevButton = pagination.querySelector(".page-item:first-child");
  if (page === 1) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  // Update next button state
  const nextButton = pagination.querySelector(".page-item:last-child");
  if (page === totalPages) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}

// Add event listeners for prev/next buttons
function initializePagination() {
  const pagination = document.querySelector(".pagination");

  // Previous button
  const prevButton = pagination.querySelector(".page-item:first-child a");
  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  // Next button
  const nextButton = pagination.querySelector(".page-item:last-child a");
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  // Create page buttons
  createPaginationButtons();

  // Display first page
  displayPage(1);
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePagination);
} else {
  initializePagination();
}
