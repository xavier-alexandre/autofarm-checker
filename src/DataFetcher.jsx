import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import sortBy from "lodash/sortBy";
import { IronfinanceBalance } from "./models";
import { AutofarmBalance } from "./models";
import Chart from "./Chart";

const DataFetcher = () => {
  const [autofarmBalances, setAutofarmBalances] = useState([]);
  const [ironfinanceBorrowBalances, setIronfinanceBorrowBalances] = useState(
    []
  );

  useEffect(() => {
    let isSubscribed = true;
    const fetchAutofarmBalance = async () => {
      const data = await DataStore.query(AutofarmBalance);
      data.sort((a, b) => a.createdAt < b.createdAt);
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        setAutofarmBalances(sortBy(data, "createdAt"));
      }
    };

    fetchAutofarmBalance()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future `setIronfinanceBorrowBalances`
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    const fetchIronBorrowBalance = async () => {
      const data = await DataStore.query(IronfinanceBalance);
      data.sort((a, b) => a.createdAt < b.createdAt);
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        setIronfinanceBorrowBalances(sortBy(data, "createdAt"));
      }
    };

    fetchIronBorrowBalance()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future `setIronfinanceBorrowBalances`
    return () => (isSubscribed = false);
  }, []);

  const chartData = [
    {
      name: "AutoFarm balance",
      color: "#4958c4",
      data: autofarmBalances
        .map((item) => [
          new Date(item.createdAt).getTime(),
          Number.parseFloat(item.balance.toFixed(2)),
        ])
        .sort(),
    },
    {
      name: "IronFinance borrowed amount",
      color: "rgb(239, 131, 39)",
      data: ironfinanceBorrowBalances.map((item) => [
        new Date(item.createdAt).getTime(),
        Number.parseFloat(item.balance.toFixed(2)),
      ]),
    },
    {
      name: "Profit",
      color: "#8bc34a",
      data: ironfinanceBorrowBalances.map((item) => [
        new Date(item.createdAt).getTime(),
        Number.parseFloat(
          (
            autofarmBalances.find(
              (e) =>
                e.createdAt.substring(0, 15) === item.createdAt.substring(0, 15)
            )?.balance - item.balance
          ).toFixed(2)
        ),
      ]),
    },
  ];

  return <Chart data={chartData} />;
};

export default DataFetcher;
