import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import { IronfinanceBalance } from "./models";
import { AutofarmBalance } from "./models";
import Chart from "./Chart";
import chainToColor from "./chainToColor.json";

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

  const groupedByFarm = groupBy(
    autofarmBalances,
    (balance) => `${balance.chain}:${balance.token1}:${balance.token2}`
  );
  const farmsSeries = map(groupedByFarm, (balances, index) => ({
    type: "area",
    name: `${balances[0].chain}, ${balances[0].token1}/${balances[0].token2}`,
    color: chainToColor[balances[0].chain],
    data: balances
      .map((item) => [
        new Date(item.createdAt.substring(0, 16)).getTime(),
        Number.parseFloat(item.balance.toFixed(2)),
      ])
      .sort(),
  }));

  const ironfinanceBorrowSerie = {
    type: "line",
    name: "IronFinance borrow",
    color: "rgb(239, 131, 39)",
    data: ironfinanceBorrowBalances.map((item) => [
      new Date(item.createdAt.substring(0, 16)).getTime(),
      Number.parseFloat(item.balance.toFixed(2)),
    ]),
  };

  const profitSerie = {
    name: "Profit",
    type: "line",
    color: "#8bc34a",
    data: ironfinanceBorrowBalances.map((item) => [
      new Date(item.createdAt.substring(0, 16)).getTime(),
      Number.parseFloat(
        (
          Object.values(groupedByFarm).reduce(
            (prev, current) =>
              prev +
              current.find(
                (e) =>
                  e.createdAt.substring(0, 16) ===
                  item.createdAt.substring(0, 16)
              )?.balance,
            0
          ) - item.balance
        ).toFixed(2)
      ),
    ]),
  };

  const series = [...farmsSeries, ironfinanceBorrowSerie, profitSerie];

  return <Chart series={series} />;
};

export default DataFetcher;
