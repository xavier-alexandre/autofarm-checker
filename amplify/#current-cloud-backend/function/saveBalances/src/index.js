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

const farmConfigs = require("./farmConfigs.json");
const getFarmBalance = require("./getFarmBalance");
const getIronFinanceBorrowBalance = require("./getIronFinanceBorrowBalance");

/**
 * @see https://docs.amplify.aws/guides/functions/graphql-from-lambda/q/platform/ios/
 */
exports.handler = async (event) => {
  try {
    const promises = farmConfigs.map(async (farmConfig) => {
      const balance = await getFarmBalance(farmConfig);
      console.log(
        "For farm",
        `${farmConfig.CHAIN}:${farmConfig.TOKEN_1}:${farmConfig.TOKEN_2}`
      );
      console.log("Balance is", balance);
      const createAutofarmBalance = gql`
            mutation createAutofarmBalance {
                createAutofarmBalance(input: {balance: ${balance}, chain: "${farmConfig.CHAIN}", token1: "${farmConfig.TOKEN_1.NAME}", token2: "${farmConfig.TOKEN_2.NAME}"}) {
                    createdAt
                }
            }
        `;
      return axios({
        url: process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(createAutofarmBalance),
        },
      });
    });

    await Promise.all(promises);

    const ironfinanceBalance = await getIronFinanceBorrowBalance();
    const createIronfinanceBalance = gql`
        mutation createIronfinanceBalance {
            createIronfinanceBalance(input: {balance: ${ironfinanceBalance}}) {
                createdAt
            }
        }
    `;
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
