import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";
function Tracker() {
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        setMyData(res.data);
        console.log("data", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  console.log("yuss", myData);
  return (
    <div className="tracker__main">
      <p>Overall Stats </p>
      <div className="tracker__stats">
        <div className="tracker__singleStats">
          <p>Total Confirmed</p>
          <p>{myData.updated}</p>
        </div>
        <div className="tracker__singleStats">
          <p> Active</p>
          <p>{myData.active}</p>
        </div>
        <div className="tracker__singleStats">
          <p> Recovered</p>
          <p>{myData.recovered}</p>
        </div>
        <div className="tracker__singleStats">
          <p> Death</p>
          <p>{myData.deaths}</p>
        </div>
      </div>
    </div>
  );
}
export default Tracker;
