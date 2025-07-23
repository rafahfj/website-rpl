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

// Modal functionality
const modal = document.getElementById('member-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalIg = document.getElementById('modal-ig');
const igUsername = document.getElementById('ig-username');
const closeModal = document.getElementById('close-modal');

const showModal = (index) => {
  const member = data[index];
  modalImage.src = `image/member/${member.src}.jpg`;
  modalName.textContent = member.nama;
  
  if (member.ig) {
    igUsername.textContent = `@${member.ig}`;
    modalIg.href = `https://instagram.com/${member.ig}`;
    modalIg.classList.remove('hidden');
  } else {
    igUsername.textContent = 'No Instagram';
    modalIg.href = '#';
    modalIg.classList.add('opacity-50', 'cursor-default');
  }
  
  // Get clicked card position
  const card = document.querySelectorAll('#member-card > div')[index];
  const cardRect = card.getBoundingClientRect();
  
  // Calculate transform origin (center of clicked card)
  const originX = cardRect.left + cardRect.width/2;
  const originY = cardRect.top + cardRect.height/2;
  
  // Set initial transform origin
  modalContent.style.transformOrigin = `${originX}px ${originY}px`;
  
  // Show modal
  modal.classList.remove('hidden');
  
  // Trigger animation in the next frame
  requestAnimationFrame(() => {
    modalBackdrop.classList.remove('bg-opacity-0');
    modalBackdrop.classList.add('bg-opacity-75');
    
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  });
};

const hideModal = () => {
  modalBackdrop.classList.remove('bg-opacity-75');
  modalBackdrop.classList.add('bg-opacity-0');
  
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');
  
  setTimeout(() => {
    modal.classList.add('hidden');
    // Reset modal content position
    modalContent.style.transformOrigin = 'center';
  }, 300); // Match this with transition duration
};

// Add click event to all member cards
document.querySelectorAll('#member-card > div').forEach((card, index) => {
  card.addEventListener('click', () => showModal(index));
  card.style.cursor = 'pointer'; // Add pointer cursor
});

// Close modal events
closeModal.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});