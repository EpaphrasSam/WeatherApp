import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "../types";

const useForecast = () => {
  const [term, setterm] = useState<string>("");
  const [options, setoptions] = useState<[]>([]);
  const [city, setcity] = useState<optionType | null>(null);
  const [forecast, setforecast] = useState<any>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=76b60247cce8dfbf3d25eb5c4edbea61`
    )
      .then((res) => res.json())
      .then((data) => setoptions(data))
      .catch((e) => console.log(e));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setterm(value);

    if (value === "") {
      setoptions([]);
      return;
    }
    getSearchOptions(value);
  };

  const onOptionSelect = (option: optionType) => {
    setcity(option);
  };

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=76b60247cce8dfbf3d25eb5c4edbea61`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setforecast(forecastData);
        localStorage.setItem("myData", JSON.stringify(forecastData));
        window.location.href = "forecast";
      })
      .catch((e) => console.log(e));
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
    // console.log(forecast);
  };

  useEffect(() => {
    if (city) {
      setterm(city.name);
      setoptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};

export default useForecast;
