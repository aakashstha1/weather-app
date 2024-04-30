import { useState, useEffect } from "react";
import Temperature from "./components/Temperature.jsx";
import Highlights from "./components/Highlights.jsx";
function App() {
  const [city, setCity] = useState("Itahari");
  const [weatherData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=bfb3cb3684da4905b9d140159242304&q=${city}&aqi=no`;

  useEffect(() => {
    //It runs only when component mount

    //API call
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json(); //converting response in json and return to  second .then
      })
      .then((data) => {
        //that response is received here
        console.log(data);
        setWeatherData(data); //data fetched from api is set to this state
      })
      .catch((e) => {
        console.log(e);
      });
  }, [apiURL, city]); //Here dependency is city whenever city is changed useEffect is called

  return (
    <div className="bg-slate-700 h-screen flex justify-center align-top">
      <div className=" mt-40 w-1/5 h-1/3">
        {weatherData && (
          <Temperature //If weather data is available then only show data else wait untill data is available
            setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
              country:weatherData.location.country
            }}
          />
        )}
      </div>
      <div className=" mt-40 w-1/3 h-1/3 p-5 grid grid-cols-2 gap-6">
        <h2 className="text-slate-200 text-2xl col-span-2">Today Highlights</h2>
        {weatherData && (
          <>
            <Highlights 
            stats={{
              title:"Wind Status",
              value:weatherData.current.wind_mph,
              unit:"mph",
              direction:weatherData.current.wind_dir
            }} />
            <Highlights 
            stats={{
              title:"Humidity",
              value:weatherData.current.humidity,
              unit:"%",
             
            }}/>
            <Highlights 
            stats={{
              title:"Visibility",
              value:weatherData.current.vis_miles,
              unit:"miles",
             
            }}/>
            <Highlights 
            stats={{
              title:"Air Pressure",
              value:weatherData.current.pressure_mb,
              unit:"mb",
              
            }}/>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
