import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "./style.css";

const cities = [
  "Jakarta",
  "Bandung kota",
  "Surabaya",
  "Yogyakarta",
  "Padang",
  "Makassar",
  "Sumedang",
];

function LandingPage() {
  const [weatherInpo, setWeatherInpo] = useState([]);
  const weatherMany = weatherInpo?.list?.slice(0, 10);
  const nexTWeatherDay = () => {
    let data = [];
    if (weatherInpo?.list) {
      for (let i = 0; i < 39; i++) {
        if (i % 8 == 0) {
          data.push(weatherInpo.list[i]);
        }
      }
    }
    return data;
  };

  const key = process.env.REACT_APP_PRIVAT_KEY;

  const getCoordinate = (e) => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=5&appid=${key}`
      )
      .then((res) => {
        // setCityCordinate();
        getWeather(res?.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWeather = (param) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          param?.lat
        }&lon=${param?.lon ? param?.lon : "106.827183"}&appid=${key}`
      )
      .then((res) => {
        setWeatherInpo(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOncange = (e) => {
    getCoordinate(e);
  };

  useEffect(() => {
    getCoordinate("Jakarta");
  }, []);

  return (
    <div className="bgRain h-[100vh] w-full flex justify-center">
      <div className="container flex justify-between">
        <div className="hidden w-[70%] p-5 md:flex flex-col justify-between">
          <div className="w-full flex justify-end items-center">
            <p className="text-white border-r-2 pr-4">
              <Moment format="DD MMMM YY">{weatherMany?.dt_txt}</Moment>
            </p>
            <p className="text-white ml-4">
              <Moment format="LT"></Moment>
            </p>
          </div>
          <div className="flex w-full flex-col">
            <div className="w-full border-b-[3px] py-9 mb-4 border-white/75">
              <p className="text-8xl font-normal text-white/75 text-right w-full ">
                {weatherInpo?.list
                  ? weatherInpo?.list[0]?.weather[0]?.description
                  : 0}
              </p>
            </div>
            <div className="flex w w-full justify-between">
              {weatherMany?.map((item, i) => (
                <div
                  key={i}
                  className="w-[70px] backdrop-blur-xs bg-white/10  rounded-md p-3 flex flex-col items-center"
                >
                  <p className="text-white/75 underline underline-offset-2 mb-2">
                    <Moment format="HH:mm">{item.dt_txt}</Moment>
                  </p>
                  <div className="backdrop-blur-md bg-white/10 rounded-sm">
                    <img
                      alt="icon"
                      src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
                    />
                  </div>
                  <p className="text-white/75 mt-2">
                    {Math.ceil(item.main.temp - 273.15)}&deg;C
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[30%] backdrop-blur-md bg-white/10 flex flex-col items-center p-8">
          <div className="w-full flex justify-center">
            <select
              onChange={(e) => handleOncange(e.target.value)}
              id="pet-select"
              className="bg-transparent border-[1px] rounded-md border-white/75 p-2 text-white/75 w-2/3"
            >
              {cities.map((item, i) => (
                <option
                  key={i}
                  className="text-black bg-gray-400 backdrop-blur-sm max-w-[80%]"
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="p-10 border-b-[1px] border-white/60">
            <p className="md:hidden text-lg font-semibold text-white text-center mb-2">
              {weatherInpo?.list
                ? weatherInpo?.list[0]?.weather[0]?.description
                : 0}
            </p>
            <p className="text-7xl text-white">
              {weatherInpo?.list
                ? Math.ceil(weatherInpo?.list[0]?.main?.temp - 273.15)
                : 0}
              &deg;C
            </p>
            <p className="text-white/60 mt-5">
              Northwest{" "}
              {weatherInpo?.list ? weatherInpo?.list[0].wind.speed : 0} km/h
            </p>
          </div>
          <div className="p-8 flex flex-col items-center w-fulls">
            <p className="text-lg font-semibold text-white">
              The Next Day Forest
            </p>
            <div className="flex w-full justify-between my-5">
              {["5", "14", "30"].map((item, i) => (
                <button
                  key={i}
                  className="text-white backdrop-blur-sm bg-white/5 px-2 py-1 rounded-lg mx-2"
                >
                  {item} days
                </button>
              ))}
            </div>
            {nexTWeatherDay()?.map((item, i) => (
              <div
                key={i}
                className="flex items-center w-full justify-between mt-5"
              >
                <div className="flex">
                  <div className="w-12 h-12 backdrop-blur-md bg-white/10 rounded-md mr-2">
                    <img
                      alt="icon"
                      src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
                    />
                  </div>
                  <div>
                    <p className="text-white">
                      <Moment format="dddd">{item?.dt_txt}</Moment>,{" "}
                      <Moment format="MMMM DD">{item?.dt_txt}</Moment>
                    </p>
                    <p className="text-white/60 text-sm">
                      {item?.weather[0]?.description}
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col justify-center h-full  p-0">
                  <p className="text-white border-l-[1px] pl-4">
                    {item ? Math.ceil(item?.main?.temp - 273.15) : 0}&deg;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
