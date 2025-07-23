` <li>
    <a href="#" class="flex justify-center items-center bg-white hover:bg-gray-100 px-3 border border-gray-300 h-8 text-gray-500 hover:text-gray-700 leading-tight">1</a>
  </li>
  <li>
    <a href="#" class="flex justify-center items-center bg-white hover:bg-gray-100 px-3 border border-gray-300 h-8 text-gray-500 hover:text-gray-700 leading-tight">2</a>
  </li>

  <li>
    <a href="#" class="flex justify-center items-center bg-white hover:bg-gray-100 px-3 border border-gray-300 h-8 text-gray-500 hover:text-gray-700 leading-tight">4</a>
  </li>
  <li>
    <a href="#" class="flex justify-center items-center bg-white hover:bg-gray-100 px-3 border border-gray-300 h-8 text-gray-500 hover:text-gray-700 leading-tight">5</a>
  </li>`;

const singleNav = (numPage) => {
  return `
   <li>
    <a id="${numPage}" href="#member" class="flex justify-center items-center bg-white hover:bg-gray-100 px-3 border border-gray-300 h-8 text-gray-500 hover:text-gray-700 leading-tight">${numPage}</a>
  </li>`;
};

export default function pagination(numPage) {
  let navigation = ``;
  for (let i = 0; i < numPage; i++) {
    navigation += singleNav(i + 1);
  }
  return navigation;
}
