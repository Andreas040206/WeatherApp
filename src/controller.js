import { createPage, appendLoader } from "./UI";

const getInfoFromAPI = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=86c4e4787a1b49ee91a190852230304&q=${location}`,
      {
        mode: "cors",
      }
    );

    return response.json().then((data) => {
      return data;
    });
  } catch {
    (err) => {
      throw console.error(err);
    };
  }
};

const btnActivation = {
  searchBtn: (val) => {
    const loadingEl = appendLoader();
    document.body.appendChild(loadingEl);
    getInfoFromAPI(val).then((data) => {
      console.log(data);
      document.body.removeChild(loadingEl);
    });
  },
};

createPage();

export { btnActivation };
