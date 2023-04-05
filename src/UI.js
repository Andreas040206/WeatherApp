import { btnActivation } from "./controller";
import loadingGif from "./Img/Loading.gif";

const createPage = () => {
  const content = document.createElement("div");
  content.classList.add("content");

  content.appendChild(createSearchBar());

  document.body.appendChild(content);
};

const createSearchBar = () => {
  const searchBarCon = document.createElement("form");
  searchBarCon.classList.add("searchBarCon");

  searchBarCon.setAttribute("onsubmit", "return false");

  const searchBarInput = document.createElement("input");
  searchBarInput.setAttribute("type", "text");
  searchBarInput.classList.add("searchBarInput");

  const searchBarBtn = document.createElement("button");
  searchBarBtn.classList.add("searchBarBtn");
  searchBarBtn.textContent = "Search";

  searchBarBtn.addEventListener("click", () => {
    btnActivation.searchBtn(searchBarInput.value);
    searchBarInput.value = "";
  });

  searchBarCon.appendChild(searchBarInput);
  searchBarCon.appendChild(searchBarBtn);

  return searchBarCon;
};

const appendLoader = () => {
  const loadingGifCon = document.createElement("div");
  loadingGifCon.classList.add("loadingGifCon");

  const loadingGifEl = new Image();
  loadingGifEl.classList.add("loadingGif");
  loadingGifEl.src = loadingGif;

  loadingGifCon.appendChild(loadingGifEl);

  return loadingGifCon;
};

export { createPage, appendLoader };
