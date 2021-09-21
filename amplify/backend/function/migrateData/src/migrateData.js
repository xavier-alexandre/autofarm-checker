const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const migrateData = async () => {
  const listAutofarmBalanceIds = gql`
    query listAutofarmBalanceIds {
      listAutofarmBalances {
        items {
          id
        }
      }
    }
  `;

  console.log(
    "process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT",
    process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT
  );
  console.log(
    "process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT",
    process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT
  );

  const response = await axios({
    url: process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT,
    },
    data: {
      query: print(listAutofarmBalanceIds),
    },
  });

  const promises = response.data.data.listAutofarmBalances.items
    .map((item) => item.id)
    .map((id) => {
      //   console.log("item id", id);

      const addMissingData = gql`
      mutation MyMutation {
        updateAutofarmBalance(input: {id: "${id}", token1: "WMATIC", token2: "USDT", chain: "Polygon"}) {
          id
          token1
          token2
          createdAt
          updatedAt
          chain
          balance
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
          query: print(addMissingData),
        },
      });
    });

  //   console.log("promises", promises);

  await Promise.all(promises);
  console.log("Yup");
};

module.exports = migrateData;
