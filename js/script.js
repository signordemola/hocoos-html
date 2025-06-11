document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const hamburger = document.querySelector(".kmb-navbar-toggles");
  const navMenu = document.querySelector(".kmb-header-menu");

  hamburger.addEventListener("click", () => {
    body.classList.toggle("kmb-site-visible-menu");
    body.classList.toggle("kmb-site-horizontal-visible-menu");
    navMenu.classList.toggle("kmb-visible-menu");
  });
});
