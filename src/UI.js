import { reject } from "lodash";
import { btnActivation } from "./controller";
import loadingGif from "./Img/Loading.gif";

const createPage = async (data) => {
  const content = document.createElement("div");
  content.classList.add("content");
  content.setAttribute("id", "content");

  // Here make a promise to return content ones its done
  return new Promise((resolve, reject) => {
    // We use promise.all([]) so every promise can finish at the same time
    Promise.all([
      createSearchBar(data),
      createWeatherLocInfo(data),
      loadBg(data),
    ])
      // When it's done we will append the two and resolve
      .then((el) => {
        content.appendChild(el[0]);
        content.appendChild(el[1]);

        resolve(content);
      });
  });
};

const createSearchBar = (data) => {
  return new Promise((resolve, reject) => {
    const searchBarCon = document.createElement("form");
    searchBarCon.classList.add("searchBarCon");

    searchBarCon.setAttribute("onsubmit", "return false");

    const searchBarInput = document.createElement("input");
    searchBarInput.setAttribute("type", "text");
    searchBarInput.classList.add("searchBarInput");
    searchBarInput.value = data.location.name;

    const searchBarBtn = document.createElement("button");
    searchBarBtn.classList.add("searchBarBtn");
    searchBarBtn.textContent = "Search";

    searchBarBtn.addEventListener("click", () => {
      if (searchBarInput.value !== "") {
        btnActivation.searchBtn(searchBarInput.value);
      }
      searchBarInput.value = "";
    });

    searchBarCon.appendChild(searchBarInput);
    searchBarCon.appendChild(searchBarBtn);

    resolve(searchBarCon);
  });
};

const createWeatherLocInfo = (data) => {
  return new Promise((resolve, reject) => {
    const InfoCon = document.createElement("div");

    InfoCon.textContent = `${data.location.country}, ${data.location.name}`;

    resolve(InfoCon);
  });
};

const loadBg = (data) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const appendLoadingEl = () => {
  const loadingGifCon = document.createElement("div");
  loadingGifCon.classList.add("loadingGifCon");

  const loadingGifEl = new Image();
  loadingGifEl.classList.add("loadingGif");
  loadingGifEl.src = loadingGif;

  loadingGifCon.appendChild(loadingGifEl);

  return loadingGifCon;
};

export { createPage, appendLoadingEl };
