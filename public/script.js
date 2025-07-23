import { card } from "./js/card.js";
import { data } from "./js/member.js";

// card
const memCard = document.querySelector("#member-card");
let elMember = ``;

data.forEach((orang) => {
  const { nama, ig, src } = orang;
  elMember += card(src, nama, ig);
});
memCard.innerHTML = elMember;

// navbar
let lastScrollY = window.scrollY;
const navbar = document.querySelector("nav");

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    navbar.classList.remove("translate-y-0");
    navbar.classList.add("-translate-y-full");
  } else {
    navbar.classList.remove("-translate-y-full");
    navbar.classList.add("translate-y-0");
  }

  if (window.scrollY > 580) {
    navbar.classList.remove("bg-primary");
    navbar.classList.add("bg-white/30");
  } else {
    navbar.classList.remove("bg-white/30");
    navbar.classList.add("bg-primary");
  }

  lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
};

window.addEventListener("scroll", handleScroll);

const btnNavbar = document.querySelector("#navbar-toggle");
const ovlayNav = document.querySelector("#overlay-nav");

let conNavbar = false;
btnNavbar.addEventListener("click", (e) => {
  e.preventDefault();
  if (!conNavbar) {
    conNavbar = true;
    ovlayNav.classList.remove("hidden");
  } else {
    hideNavbar();
  }
});

const hideNavbar = () => {
  conNavbar = false;
  ovlayNav.classList.add("hidden");
};

ovlayNav.addEventListener("click", hideNavbar);

