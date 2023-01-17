import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import Up from "../images/arrow-up.svg";
import Down from "../images/arrow-down.svg";

function Table() {
  const [tableData, setTableData] = useState([]);

  const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  };
  const sortReverseData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases < b.cases ? -1 : 1));
  };

  const handleAscendingClick = () => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        const sortedReverseData = sortReverseData(res.data);
        setTableData(sortedReverseData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleDescendingClick = () => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        const sortedData = sortData(res.data);
        setTableData(sortedData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        const sortedData = sortData(res.data);
        setTableData(sortedData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div className="container__table">
      <div className="container__tableTop">
        <h3>Live Cases by Country </h3>
        <div className="container__arrow">
          <img src={Up} onClick={handleAscendingClick} />
          <img src={Down} onClick={handleDescendingClick} />
        </div>
      </div>

      <div className="container__tableData">
        <table>
          {tableData.map((data) => (
            <tr key={data.cases}>
              <td>{data.country}</td>
              <td>{data.cases}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default Table;
