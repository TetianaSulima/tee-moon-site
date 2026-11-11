
const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

menuButton.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});

sideMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });
});

document.getElementById("searchButton").addEventListener("click", () => {
  // Search functionality can be added later
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
});

document.getElementById("subscribeForm").addEventListener("submit", e => {
  e.preventDefault();
});

document.getElementById("subscribeForm").addEventListener("submit", function(e) {
  e.preventDefault();
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
});
