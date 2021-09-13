/* Amplify Params - DO NOT EDIT
	API_AUTOFARMCHECKER_AUTOFARMBALANCETABLE_ARN
	API_AUTOFARMCHECKER_AUTOFARMBALANCETABLE_NAME
	API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT
	API_AUTOFARMCHECKER_GRAPHQLAPIIDOUTPUT
	API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT
	API_AUTOFARMCHECKER_IRONFINANCEBALANCETABLE_ARN
	API_AUTOFARMCHECKER_IRONFINANCEBALANCETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const getAutoFarmBalance = require("./getAutoFarmBalance");
const getIronFinanceBorrowBalance = require("./getIronFinanceBorrowBalance");

exports.handler = async (event) => {
  try {
    const autofarmBalance = await getAutoFarmBalance();
    const ironfinanceBalance = await getIronFinanceBorrowBalance();
    console.log("autofarmBalance", autofarmBalance);
    console.log("ironfinanceBalance", ironfinanceBalance);

    const createAutofarmBalance = gql`
      mutation createAutofarmBalance {
        createAutofarmBalance(
          input: { date: "${new Date().toISOString()}", balance: ${autofarmBalance} }
        ) {
          id
          date
          balance
          createdAt
          updatedAt
        }
      }
    `;

    // Save Autofarm balance
    await axios({
      url: process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(createAutofarmBalance),
      },
    });

    const createIronfinanceBalance = gql`
      mutation createIronfinanceBalance {
        createIronfinanceBalance(
          input: { date: "${new Date().toISOString()}", balance: ${ironfinanceBalance} }
        ) {
          id
          date
          balance
          createdAt
          updatedAt
        }
      }
    `;

    // Save IronFinance balance
    await axios({
      url: process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(createIronfinanceBalance),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify("Balances successfully saved!"),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log("error posting to appsync: ", err);
  }
};
