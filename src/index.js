import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  createAutofarmBalance,
  createIronfinanceBalance,
} from "./graphql/mutations";

import {
  listAutofarmBalances,
  listIronfinanceBalances,
} from "./graphql/queries";

Amplify.configure(awsconfig);

// const autofarmBalance = {
//   id: 1,
//   date: new Date().toISOString(),
//   balance: 2000,
// };
// const ironfinanceBalance = {
//   id: 1,
//   date: new Date().toISOString(),
//   balance: 2000,
// };
// API.graphql(
//   graphqlOperation(createAutofarmBalance, { input: autofarmBalance })
// );
// API.graphql(
//   graphqlOperation(createIronfinanceBalance, { input: ironfinanceBalance })
// );
API.graphql(graphqlOperation(listAutofarmBalances)).then(console.log);
API.graphql(graphqlOperation(listIronfinanceBalances)).then(console.log);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
