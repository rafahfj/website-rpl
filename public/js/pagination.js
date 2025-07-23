
  const members = Array.from({ length: 25 }, (_, i) => ({
    name: `Member ${i + 1}`,
    role: `Role ${i + 1}`
  }));

  const cardsPerPage = 6;
  let currentPage = 1;

  const memberContainer = document.getElementById('member-card');
  const paginationControls = document.getElementById('pagination-controls');

  function renderCards() {
    memberContainer.innerHTML = '';
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const currentMembers = members.slice(start, end);

    currentMembers.forEach(member => {
      const card = document.createElement('div');
      card.className = 'bg-white text-black p-4 rounded-lg w-[200px] shadow-md';
      card.innerHTML = `<h3 class="text-xl font-bold">${member.name}</h3><p>${member.role}</p>`;
      memberContainer.appendChild(card);
    });
  }

  function renderPagination() {
    paginationControls.innerHTML = '';
    const pageCount = Math.ceil(members.length / cardsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `px-3 py-1 rounded ${i === currentPage ? 'bg-white text-third font-bold' : 'bg-third border border-white'}`;
      btn.addEventListener('click', () => {
        currentPage = i;
        renderCards();
        renderPagination();
      });
      paginationControls.appendChild(btn);
    }
  }

  renderCards();
  renderPagination();
