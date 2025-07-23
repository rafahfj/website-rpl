export const card = function (src, nama, ig) {
  return `
       <div class="relative shadow-lg rounded-2xl md:rounded-3xl w-40 md:w-56 max-w-sm overflow-hidden "> <img src="image/member/${src}.jpg" class="w-full h-64 md:h-80 object-cover" alt=""/><div class="bottom-0 absolute bg-kuning h-16 text-center flex items-center justify-center bg-opacity-50 px-4 py-2 rounded-2xl w-full text-black"><h3><a href="https://instagram.com/${ig}" target="_blank">${nama}</a></h3></div></div>
  `;
};
