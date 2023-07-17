import { useState, useEffect } from "react";
import { forecastType } from "../types";
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "./helpers";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Tiles from "./Tiles";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const [Data, setData] = useState<any>(null);
  const today = Data !== null ? Data.list[0] : "";

  useEffect(() => {
    const mydata = localStorage.getItem("myData");
    if (mydata) {
      setData(JSON.parse(mydata));
    }
  }, []);

  const formatDate = (date: any) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const next2Days = new Date(today);
    next2Days.setDate(next2Days.getDate() + 2);

    if (date === today.toLocaleDateString()) {
      return "Today";
    } else if (date === tomorrow.toLocaleDateString()) {
      return "Tomorrow";
    } else if (date === next2Days.toLocaleDateString()) {
      return "Next 2 days";
    } else {
      return "Later";
    }
  };

  return (
    <div className="w-[90vw] md:max-w-[500px] p-4 flex flex-col text-center md:px-10 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg text-zinc-700">
      <div className="mx-auto w-[300px]">
        <div className="text-center">
          <h2 className="text-2xl font-black">
            {Data !== null ? Data.name : ""}
            <span className="font-thin">
              {Data !== null ? Data.country : ""}
            </span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Data !== null ? Math.round(today.main.temp) : 0} />
          </h1>
          <p>
            {Data !== null ? today.weather[0].main : ""}{" "}
            {Data !== null ? today.weather[0].description : ""}
          </p>
          <p className="text-sm">
            H:{" "}
            <Degree temp={Data !== null ? Math.ceil(today.main.temp_max) : 0} />{" "}
            L:{" "}
            <Degree
              temp={Data !== null ? Math.floor(today.main.temp_min) : 0}
            />
          </p>
        </div>
        <div className="flex scrollbar-thin scrollbar-hide scrollbar-track-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-x-scroll mt-4 pb-2 mb-5">
          {Data !== null &&
            Data.list.map((item: any, i: any) => (
              <div
                key={i}
                className="inline-block text-center w-[50px] flex-shrink-0"
              >
                {/* <p className="break-all h-10">
                  {Data !== null
                    ? formatDate(new Date(item.dt_txt).toLocaleDateString())
                    : ""}
                </p> */}
                <p>
                  {Data !== null
                    ? new Date(item.dt_txt).toLocaleDateString().slice(0, 3)
                    : ""}
                </p>
                <p>
                  {i === 0
                    ? "Now"
                    : Data !== null
                    ? new Date(item.dt_txt).toLocaleTimeString([], {
                        hour: "numeric",
                      })
                    : ""}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${
                    Data !== null ? item.weather[0].icon : ""
                  }@2x.png`}
                  alt="pic"
                />
                <p>
                  <Degree
                    temp={Data !== null ? Math.round(item.main.temp) : 0}
                  />{" "}
                </p>
              </div>
            ))}
        </div>
        <div className="flex flex-wrap justify-between text-zinc-700">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-3">
            <Sunrise />{" "}
            <span className="mt-2">
              {Data !== null ? getSunTime(Data.sunrise) : ""}
            </span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-3">
            <Sunset />{" "}
            <span className="mt-2">
              {Data !== null ? getSunTime(Data.sunset) : ""}
            </span>
          </div>
          <Tiles
            icon="wind"
            title="Wind"
            info={`${Data !== null ? Math.round(today.wind.speed) : ""} km/h`}
            description={`${
              Data !== null ? getWindDirection(Math.round(today.wind.deg)) : ""
            }, gusts ${Data !== null ? today.wind.gust.toFixed(1) : ""} km/h`}
          />
          <Tiles
            icon="feels"
            title="Feels like"
            info={
              <Degree
                temp={Data !== null ? Math.round(today.main.feels_like) : 0}
              />
            }
            description={`Feels ${
              Data !== null
                ? Math.round(today.main.feels_like)
                : 0 < Data !== null
                ? Data !== null
                  ? Math.round(today.main.temp)
                  : 0
                : 0
                ? "colder"
                : "warmer"
            }`}
          />
          <Tiles
            icon="humidity"
            title="Humidity"
            info={`${Data !== null ? today.main.humidity : 0}%`}
            description={
              Data !== null ? getHumidityValue(today.main.humidity) : ""
            }
          />
          <Tiles
            icon="pop"
            title="Precipitation"
            info={`${Data !== null ? Math.round(today.pop) : 0}%`}
            description={`${
              Data !== null ? getPop(today.pop) : ""
            }, clouds at ${Data !== null ? today.clouds.all : 0}`}
          />
          <Tiles
            icon="pressure"
            title="Pressure"
            info={`${Data !== null ? Math.round(today.main.pressure) : 0} hPa`}
            description={`${
              Data !== null
                ? Math.round(today.main.pressure)
                : 0 < 1013
                ? "Lower"
                : "Higher"
            } than standard`}
          />
          <Tiles
            icon="visibility"
            title="Visibility"
            info={`${
              Data !== null ? (today.visibility / 1000).toFixed() : ""
            } km`}
            description={
              Data !== null ? getVisibilityValue(today.visibility) : ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Forecast;
