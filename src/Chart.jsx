import React, { useEffect } from "react";
import Highcharts from "highcharts";

const Chart = ({ series }) => {
  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        zoomType: "x",
      },
      plotOptions: {
        area: {
          stacking: "normal",
          marker: {
            enabled: true,
            symbol: "circle",
            radius: 2,
          },
        },
        line: {
          marker: {
            enabled: true,
            symbol: "circle",
            radius: 2,
          },
        },
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
      series: series,
    });
  }, [series]);

  return <div id="container" style={{ width: "80vw", height: "80vh" }}></div>;
};

export default Chart;
