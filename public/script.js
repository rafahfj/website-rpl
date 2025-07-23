import { card } from "./js/card.js";
import { data } from "./js/member.js";
import pagination from "./js/pagination.js";

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

// card
const memCard = document.querySelector("#member-card");
const paginationCover = document.querySelector("#list-pagination");

let numPage = 0;
let elMember = ``;
let allElMember = [];

data.forEach((orang, i) => {
  const { nama, ig, src } = orang;
  elMember += card(src, nama, ig);
  let current = i + 1;

  if (current % 10 === 0) {
    numPage += 1;
    allElMember.push(elMember);
    elMember = ``;
  }
  if (i + 1 === data.length) {
    numPage += 1;
    allElMember.push(elMember);
  }
});

memCard.innerHTML = allElMember[0];
paginationCover.innerHTML = pagination(numPage);
const paginationNav = document.querySelectorAll("#pagination #list-pagination li");
let currentPage = 0;

addEventListenerList(paginationNav, "click", function navPageMember(e) {
  memCard.innerHTML = allElMember[e.target.id - 1];
  currentPage = e.target.id - 1;
});
document.querySelector("#pagination #prev").addEventListener("click", (e) => {
  currentPage -= 1;
  memCard.innerHTML = allElMember[currentPage];
});
document.querySelector("#pagination #next").addEventListener("click", (e) => {
  currentPage += 1;
  memCard.innerHTML = allElMember[currentPage];
});

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
