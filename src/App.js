import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Weather from "./components/weather";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("Yattinahalli");

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);

        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
      
           console.log('GEOCODING',GEOCODING);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?q=${cityName}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log("result", result);
        });
    };
    fetchData();
  }, [lat, long]);
  return (
    <div className="App">
      <React.Fragment>
        <input
          type="text"
          placeholder="search"
          value={cityName}
          onChange={(e) => setCityName(e)}
        />
      </React.Fragment>
      {typeof data.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

export default App;
