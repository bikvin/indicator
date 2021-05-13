const backdrop = document.querySelector(".backdrop");
const mobileNav = document.querySelector(".mobile-nav");
const mobileMenuButton = document.querySelector(".mobile-menu__toggle-button");



mobileMenuButton.addEventListener("click", function() {

    mobileNav.classList.add("open");
    backdrop.classList.add("open");
});

backdrop.addEventListener("click", function() {
    mobileNav.classList.remove("open");
    backdrop.classList.remove("open");
});