/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import './balances.styles.css';

const AutofarmBalancesChart = ({ series }) => {
  useEffect(() => {
    Highcharts.chart('container', {
      chart: {
        zoomType: 'x'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2
          }
        },
        line: {
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2
          }
        }
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Balance ($)'
        }
      },
      series
    });
  }, [series]);

  return <div id="container" style={{ width: '100%', height: '100%' }} />;
};

export default AutofarmBalancesChart;
