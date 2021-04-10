let city = document.getElementById("city");
let submitbtn = document.getElementById("submit");
let ul = document.getElementById("weather");
let cityError = document.getElementById("cityError");
async function getWeather(city) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fbf594cd9374a4bf6bd9f09addd3f060`
    );
    const jsonResp = await response.json();
    return jsonResp;
}

submitbtn.onclick = () => {
    ul.innerText = "";
    if (city.value === "") {
        cityError.innerText = "**Please Enter a city !!";
    } else {
        const res = getWeather(city.value);
        cityError.innerText = "";
        city.value = "";
        res.then((fetchedData) => {
            //   console.log(fetchedData);

            //temp
            let temp = document.createElement("li");
            temp.innerText = Math.round(fetchedData.main.temp - 273) + " ";
            ul.appendChild(temp);

            // city
            let city = document.createElement("li");
            city.innerText = fetchedData.name + ", " + fetchedData.sys.country;
            city.style = "font-size : 30px";
            ul.appendChild(city);

            //date
            let date = document.createElement("li");
            let d = new Date();
            d = String(d);
            d = d.substr(0, 3) + ", " + d.substr(4, 11);
            date.innerText = d;
            ul.appendChild(date);


            //visibility
            let vis = document.createElement("li");
            vis.innerText = "Visibility : " + fetchedData.weather[0].main;
            ul.appendChild(vis);

            //max temp
            let maxTemp = document.createElement("li");
            maxTemp.innerText =
                "Max Temp : " + Math.round(fetchedData.main.temp_max - 273) + " ";
            ul.appendChild(maxTemp);

            //min temp
            let minTemp = document.createElement("li");
            minTemp.innerText =
                "Min Temp : " + Math.round(fetchedData.main.temp_min - 273) + " ";
            ul.appendChild(minTemp);
        });
    }
};

city.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submitbtn.onclick();
    }
});