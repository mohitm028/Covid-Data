import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";
import PieChart from "./PieChart";
import Table from "./Table";
function Tracker() {
  const [myData, setMyData] = useState([]);
  const [selectCountry, setSelectCountry] = useState([]);
  const handleSelectOption = (e) => {
    const country = e.target.value;
    if (country == "worldwide") {
      axios
        .get("https://disease.sh/v3/covid-19/all")
        .then((res) => {
          setMyData(res.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then((res) => {
          setMyData(res.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        setSelectCountry(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      <div className="tracker__main">
        <div className="tracker__top">
          <p>Overall Stats </p>
          <div className="tracker__select">
            <select
              type="text"
              name="category"
              id="category"
              onChange={handleSelectOption}
            >
              <option value="worldwide">World wide</option>
              {selectCountry.map((country) => (
                <option value={country.value}>{country.country}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="tracker__stats">
          <div className="tracker__singleStats">
            <p>Total Confirmed</p>
            <h6>{myData.updated}</h6>
          </div>
          <div className="tracker__singleStats">
            <p> Active</p>
            <h6>{myData.active}</h6>
          </div>
          <div className="tracker__singleStats">
            <p> Recovered</p>
            <h6>{myData.recovered}</h6>
          </div>
          <div className="tracker__singleStats">
            <p> Death</p>
            <h6>{myData.deaths}</h6>
          </div>
        </div>
      </div>
      <div className="tracker__tableAndChart">
        <div className="tracker__table">
          <Table />
        </div>
        <div className="tracker__chart">
          <PieChart myData={myData} />
        </div>
      </div>
    </div>
  );
}
export default Tracker;
