const form = document.querySelector("form");

async function getWeatherData(location) {
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=TR6GZY33MR8HMFEEWGX24LWZW`,
    { mode: "cors" }
  );
  const response = await result.json();
  const temperature = response.currentConditions.temp;
  

  renderWeather(response);
}

function renderWeather(weatherData) {
  const tempDom = document.querySelector(".temp");
  const toggleBtn = document.createElement("button");
  const body = document.querySelector("body");
  toggleBtn.textContent = "Toggle";
  toggleBtn.onclick = () => toggleTemp();
  body.appendChild(toggleBtn)
    tempDom.textContent = weatherData.currentConditions.temp + " °F";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.querySelector("input");
  getWeatherData(location.value);
});

function toggleTemp(){
    let tempDom = document.querySelector(".temp");
    let tempNumber = tempDom.textContent.split(" ");
    let result = "";
    if(tempDom.textContent.includes("F")){
        const temp = (tempNumber[0] - 32) * 5/9;
        result = temp.toFixed(1) + " °C";
    }
    else{
        const temp = (tempNumber[0] * 9/5) + 32;
        result = temp.toFixed(1) + " °F";
    }

    tempDom.textContent = result;
}