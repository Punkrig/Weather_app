const apiKey = "b176dddeb99dac4fac16ada45f2ad491"; // Define a chave da API para acessar o OpenWeatherMap
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Define a URL base da API

const searchBox = document.querySelector(".search input"); // Seleciona a caixa de entrada de pesquisa
const searchBtn = document.querySelector(".search button"); // Seleciona o botão de pesquisa
const weatherIcon = document.querySelector(".weather-icon"); // Seleciona o ícone de clima

async function checkWeather(city) { // Define uma função assíncrona para verificar o clima
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // Faz a requisição à API
        const data = await response.json(); // Converte a resposta em JSON

        if (response.status == 404) { // Verifica se a cidade não foi encontrada
            showErrorMessage(); // Exibe a mensagem de erro
        } else {
            showWeatherData(data); // Exibe os dados do clima
        }
    } catch (error) {
        console.error("Erro ao obter dados do clima:", error); // Exibe um erro no console
        showErrorMessage(); // Exibe a mensagem de erro
    }
}

function showWeatherData(data) { // Define uma função para exibir os dados do clima
    document.querySelector(".city").innerHTML = data.name; // Exibe o nome da cidade
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " ºC"; // Exibe a temperatura
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Exibe a umidade
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/H"; // Exibe a velocidade do vento

    setWeatherIcon(data.weather[0].main); // Define o ícone de acordo com o clima
    document.querySelector(".weather").style.display = "block"; // Exibe a seção de informações de clima
    document.querySelector(".error").style.display = "none"; // Oculta a mensagem de erro
}

function setWeatherIcon(weatherType) { // Define uma função para definir o ícone de clima
    let iconSrc = ""; // Inicializa a variável do caminho do ícone
    switch (weatherType) { // Verifica o tipo de clima
        case "Clouds":
            iconSrc = "images/clouds.png";
            break;
        case "Clear":
            iconSrc = "images/clear.png";
            break;
        case "Rain":
            iconSrc = "images/rain.png";
            break;
        case "Drizzle":
            iconSrc = "images/drizzle.png";
            break;
        case "Mist":
            iconSrc = "images/mist.png";
            break;
        default:
            break;
    }
    weatherIcon.src = iconSrc; // Define o ícone de acordo com o tipo de clima
}

function showErrorMessage() { // Define uma função para exibir a mensagem de erro
    document.querySelector(".city").innerHTML = "Cidade não encontrada"; // Exibe a mensagem de cidade não encontrada
    document.querySelector(".temp").innerHTML = ""; // Limpa a temperatura
    document.querySelector(".humidity").innerHTML = ""; // Limpa a umidade
    document.querySelector(".wind").innerHTML = ""; // Limpa a velocidade do vento
    weatherIcon.src = ""; // Limpa o ícone
    document.querySelector(".weather").style.display = "none"; // Oculta a seção de informações de clima
    document.querySelector(".error").style.display = "block"; // Exibe a mensagem de erro
}

searchBtn.addEventListener("click", () => { // Adiciona um evento de clique ao botão de pesquisa
    checkWeather(searchBox.value); // Chama a função para verificar o clima com o valor da caixa de entrada de pesquisa
});
