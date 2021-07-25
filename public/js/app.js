console.log("client side javascript is loaded");
const form = document.querySelector("form");
const input = document.querySelector("#location");
const p = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  p.textContent = "Loading...";
  getWeather();
});

async function getWeather() {
  try {
    const response = await fetch(`/weather?address=${input.value}`);
    data = await response.json();
    if (data.error) {
      return (p.textContent = data.error);
    }
    p.textContent = `Em ${data.location}, a temperatura é ${data.temperature}ºC, com sensação de ${data.feelslike}ºC. ${data.precipitation}% de chance de chuva. Visibilidade de ${data.visibility}%.`;
  } catch (error) {
    p.textContent = "Não foi possível conectar com o servidor.";
  }
}
