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

/**
 * @see https://docs.amplify.aws/guides/functions/graphql-from-lambda/q/platform/ios/
 */
exports.handler = async (event) => {
  try {
    const autofarmBalance = await getAutoFarmBalance();
    const ironfinanceBalance = await getIronFinanceBorrowBalance();
    console.log("autofarmBalance", autofarmBalance);
    console.log("ironfinanceBalance", ironfinanceBalance);

    const createAutofarmBalance = gql`
        mutation createAutofarmBalance {
            createAutofarmBalance(input: {balance: ${autofarmBalance}}) {
                createdAt
            }
        }
    `;
    const createIronfinanceBalance = gql`
        mutation createIronfinanceBalance {
            createIronfinanceBalance(input: {balance: ${ironfinanceBalance}}) {
                createdAt
            }
        }
    `;

    // Save balances
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

    const body = {
      message: "Balances successfully saved!",
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log("error posting to appsync: ", err);
  }
};
