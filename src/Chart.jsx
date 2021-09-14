import React, { useEffect } from "react";
import Highcharts from "highcharts";

const Chart = ({ data }) => {
  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "area",
      },
      title: {
        text: "AutoFarm profit",
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Balance ($)",
        },
      },
      series: data,
    });
  }, [data]);

  return <div id="container" style={{ width: "80vw", height: "80vh" }}></div>;
};

export default Chart;
