import React, { useState, useEffect } from "react";
import "./weatherApp.css";

function Weather() {
    const [location, setLocation] = useState("");

    //By using React Hook initially setting the data as empty
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        windSpeed: "",
        temperature: "",
        cityName: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            if (location === "") 
            {
                return;
            }

            // An api to fetch the data of weather report based on the user location
            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=54603b03ad426185c29a94a4fa1d479f`;

            try 
            {
                const response = await fetch(weatherApi);
                // converting api data into json format so that we can eaisly get the data
                const data = await response.json();

                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: Math.floor(data.wind.speed),
                    temperature:data.main.temp,
                    cityName: data.name,
                });
            } 
            catch (error) 
            {
                // error handling
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    });

    // onclick function for the searchIcon to fetch the data according to input data
    const handleSearch = () => {
        const input = document.getElementsByClassName("searchBar");
        setLocation(input[0].value);
    };
    

    return (
    <div>


        <div className="dashboard">

            <div className="display">
                <div>
                    <input className="searchBar"placeholder="search the location"/>
                </div>
                <div onClick={handleSearch}>
                    <img className="searchinImg"src="https://static.vecteezy.com/system/resources/thumbnails/007/528/226/small/search-icon-search-icon-design-illustration-search-icon-simple-sign-free-vector.jpg"alt="error"/>
                </div>
            </div>
            <h1 className="location margin">{weatherData.cityName}</h1>
    
            

            <div className="temp">
                <img className="weatherImg"src="https://cdn6.aptoide.com/imgs/5/e/b/5eb1c02595c28efa258dddbd86456d55_icon.png"alt="error"/>
                <h1 className="temparature margin">{weatherData.temperature}°C</h1>
            </div>

            <div className="display data">
                <div className="display top">
                    <img className="Img"src="https://media.istockphoto.com/id/960523764/vector/white-humidity-icon-isolated-on-blue-background-weather-and-meteorology-thermometer-symbol.jpg?s=170667a&w=0&k=20&c=9HfXBXILtfL1EPuQMgjXk3kj9AJYMmo7LKYQW6p2M8w=" alt="error" />
                    <h3 className="humidity"> : {weatherData.humidity}%</h3>
                </div>
                <div className="display top">
                    <img className="Img" src="https://img.freepik.com/premium-photo/3d-wind-turbines-blue-background-wind-power-station-with-long-vanes-renewable-wind-energy_691504-813.jpg" alt="error"/>
                    <h3 className="wind">: {weatherData.windSpeed} km/h</h3>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Weather;

