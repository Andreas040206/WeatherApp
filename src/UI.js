import { btnActivation } from "./controller";
import loadingGif from "./Img/Loading.gif";
import ClearDay from "./Img/ClearDay.jpg";
import ClearNight from "./Img/ClearNight.jpg";
import OvercastDay from "./Img/OvercastDay.jpg";
import OvercastNight from "./Img/OvercastNight.jpg";
import CloudyDay from "./Img/CloudyDay.jpg";
import CloudyNight from "./Img/CloudyNight.jpg";

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
    searchBarBtn.textContent = "🔍︎";

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
    const infoCon = document.createElement("div");
    infoCon.classList.add("infoCon");

    // Creating top part
    const topInfoCon = document.createElement("div");
    topInfoCon.classList.add("topInfoCon");

    const location = document.createElement("div");
    location.classList.add("infoLocation");
    location.textContent = ` ${data.location.name}`;

    const country = document.createElement("div");
    country.classList.add("infoCountry");
    country.textContent = `${data.location.localtime}`;

    const time = document.createElement("div");
    time.classList.add("infoTime");
    time.textContent = `Country. ${data.location.country}`;

    topInfoCon.appendChild(location);
    topInfoCon.appendChild(country);
    topInfoCon.appendChild(time);

    // Creating bottom part
    const bottomInfoCon = document.createElement("div");
    bottomInfoCon.classList.add("bottomInfoCon");

    // Creating left side
    const bottomInfoConLeft = document.createElement("div");
    bottomInfoConLeft.classList.add("infoSideLeft");

    const temp = document.createElement("div");
    temp.classList.add("InfoConMediumText");
    temp.textContent = "Temp";

    const tempNum = document.createElement("div");
    tempNum.classList.add("tempNum");
    tempNum.textContent = `${data.current.temp_c}°`;

    bottomInfoConLeft.appendChild(temp);
    bottomInfoConLeft.appendChild(tempNum);

    // Creating Right side
    const bottomInfoConRight = document.createElement("div");
    bottomInfoConRight.classList.add("infoSideRight");

    const feelsLike = document.createElement("div");
    feelsLike.classList.add("InfoConMediumText");
    feelsLike.textContent = `Feels like: ${data.current.feelslike_c}°`;

    const windsCon = document.createElement("div");
    windsCon.classList.add("windsCon");

    const winds = document.createElement("div");
    winds.classList.add("InfoConMediumText");
    winds.textContent = `Wind: ${data.current.wind_kph}km/h`;

    const windsArrow = document.createElement("div");
    windsArrow.classList.add("windArrow");
    windsArrow.textContent = "↖";

    windsArrow.style.rotate = `${data.current.wind_degree + 45 - 180}deg`;

    windsCon.appendChild(winds);
    windsCon.appendChild(windsArrow);

    const sky = document.createElement("div");
    sky.classList.add("InfoConMediumText");
    sky.textContent = `Clouds ${data.current.cloud}%`;

    const humidity = document.createElement("div");
    humidity.classList.add("InfoConMediumText");
    humidity.textContent = `Visibility ${data.current.vis_km}km`;

    bottomInfoConRight.appendChild(feelsLike);
    bottomInfoConRight.appendChild(windsCon);
    bottomInfoConRight.appendChild(sky);
    bottomInfoConRight.appendChild(humidity);

    bottomInfoCon.appendChild(bottomInfoConLeft);
    bottomInfoCon.appendChild(bottomInfoConRight);

    infoCon.appendChild(topInfoCon);
    infoCon.appendChild(bottomInfoCon);

    resolve(infoCon);
  });
};

const loadBg = (data) => {
  return new Promise((resolve, reject) => {
    const body = document.querySelector("body");

    if (data.current.cloud < 25) {
      if (data.current.is_day == 1) {
        body.style.backgroundImage = `url(${ClearDay})`;
      } else {
        body.style.backgroundImage = `url(${ClearNight})`;
      }
    } else if (data.current.cloud > 75) {
      if (data.current.is_day == 1) {
        body.style.backgroundImage = `url(${OvercastDay})`;
      } else {
        body.style.backgroundImage = `url(${OvercastNight})`;
      }
    } else {
      if (data.current.is_day == 1) {
        body.style.backgroundImage = `url(${CloudyDay})`;
      } else {
        body.style.backgroundImage = `url(${CloudyNight})`;
      }
    }

    setTimeout(() => {
      resolve();
    }, 1000);
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
