const result = document.getElementById("result");
const spin = document.querySelector(".fas");

//suppression de la function enter sur l'appuie de la toucher entrer
window.addEventListener(
  "keydown",
  function (e) {
    if (
      e.keyIdentifier == "U+000A" ||
      e.keyIdentifier == "Enter" ||
      e.keyCode == 13
    ) {
      if (e.target.nodeName == "INPUT" && e.target.type == "text") {
        e.preventDefault();
        return false;
      }
    }
  },
  true
);

const city = document.getElementById("city");

//appel de l'api

const askWeather = () => {
  const request = new XMLHttpRequest();
  if (city.placeholder === "Caen") {
    request.open(
      "GET",
      "https://api.openweathermap.org/data/2.5/weather?q=Caen&APPID=e974c29f2c56ef90f6c1567c3c667fc0&units=metric&lang=fr"
    );
  } else {
    request.open(
      "GET",
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city.value +
        "&APPID=e974c29f2c56ef90f6c1567c3c667fc0&units=metric&lang=fr"
    );
  }
  request.onreadystatechange = function () {
    if (this.readyState == this.DONE && this.status == 200) {
      const response = JSON.parse(this.responseText);

      result.style.display = "block";

      result.innerHTML =
        response.main.temp +
        " °C" +
        " <br> " +
        response.weather[0].description +
        "<br>" +
        response.name +
        ", " +
        response.sys.country;

      if (response.weather[0].main == "Clear") {
        document.body.style.backgroundImage = "url('img/clearsky.jpg')";
      } else if (response.weather[0].main == "Clouds") {
        document.body.style.backgroundImage = "url('img/clouds.jpg')";
      } else if (response.weather[0].main == "Snow") {
        document.body.style.backgroundImage = "url('img/snow.jpg')";
      } else if (response.weather[0].main == "Rain") {
        document.body.style.backgroundImage = "url('img/rain.jpg')";
      } else if (response.weather[0].main == "Drizzle") {
        document.body.style.backgroundImage = "url('img/drizzle.jpg')";
      } else if (response.weather[0].main == "Thunderstorm") {
        document.body.style.backgroundImage = "url('img/thunderstrom.jpg')";
      }
    } else if (this.readyState == this.DONE && this.status == 404) {
      result.style.display = "block";
      result.innerHTML = "oups ! localisation inconnue";
    }
  };

  request.send();
};

askWeather();

city.addEventListener("input", function () {
  city.placeholder = "Entrez une localisation";
  spin.style.display = "block";
  result.style.display = "none";
  setTimeout(() => {
    spin.style.display = "none";
    askWeather();
  }, 7000);
});
