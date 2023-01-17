import React from "react";
import Chart from "react-apexcharts";
import "./index.scss";

function PieChart(props) {
  const { myData } = props;
  return (
    <div className="container__chart">
      <h3>Overall Report</h3>
      <Chart
        type="pie"
        width={550}
        height={350}
        series={[myData.active, myData.recovered, myData.deaths]}
        options={{
          labels: ["Active", "Recovered", "Death"],
          colors: ["#00B8E6", "#90EE70", "#FF000B"],
        }}
      />
    </div>
  );
}

export default PieChart;
