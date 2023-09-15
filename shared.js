
const backdrop = document.querySelector(".backdrop");
const hamburger = document.querySelector(".toggle-button");
const mobileNav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  backdrop.style.display = "block";
})

backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
})

mobileNav.addEventListener("click", () => {
  backdrop.style.display = "none";
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
})