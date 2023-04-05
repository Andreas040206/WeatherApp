import { create, get, reject, some } from "lodash";
import { createPage, appendLoadingEl } from "./UI";

const getInfoFromAPI = async (location) => {
  try {
    // Get data from API
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=86c4e4787a1b49ee91a190852230304&q=${location}`,
      {
        mode: "cors",
      }
    );

    if (response.ok) {
      // If data is OK, convert with .json() and return data
      return response.json().then((data) => {
        console.log(data);
        return data;
      });
    } else {
      // If data is NOT OK, then return null
      return null;
    }
  } catch {
    // If any error occurs, throw one.
    (err) => {
      throw console.error(err);
    };
  }
};

const delay = (time) => {
  // Lets return a promise, that we at some point
  // will resolve or reject something
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

let location;

if (!localStorage.getItem("Location")) {
  localStorage.setItem("Location", "London");
  location = localStorage.getItem("Location");
}

const reloadPage = async (currentLocation) => {
  // Appends The loading screen
  const loadingEl = appendLoadingEl();
  document.body.appendChild(loadingEl);

  // If no Location is added, check local storage, else set "London"
  if (currentLocation === undefined) {
    location = localStorage.getItem("Location");
  } else {
    location = currentLocation;
  }

  // GET data from API
  const data = await getInfoFromAPI(location);

  // Is there any data?
  if (data !== null) {
    // If there is data, lets add this location to local storage
    localStorage.setItem("Location", location);

    // If content already exist, remove it.
    const content = document.querySelector("#content");
    if (content) {
      document.body.removeChild(content);
    }

    // Wait for the async funtion to create the page
    const newPage = await createPage(data);

    document.body.appendChild(newPage);
  } else {
    // If the data was not okey

    const content = document.querySelector("#content");
    // If no content exist on the page, lets add some
    if (!content) {
      // London is the standard here
      const newData = await getInfoFromAPI("London");

      const newPage = await createPage(newData);

      document.body.appendChild(newPage);
    }
  }
  loadingEl.style.opacity = "0";

  // Only remove when opacity is 0
  delay(1000).then(() => {
    document.body.removeChild(loadingEl);
  });
};

reloadPage();

const btnActivation = {
  searchBtn: (val) => {
    reloadPage(val);
  },
};

export { btnActivation };
