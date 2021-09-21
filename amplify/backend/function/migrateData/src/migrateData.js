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

  const mutations = response.data.data.listAutofarmBalances.items
    .map((item) => item.id)
    .map((id) => {
      console.log("item id", id);
      console.log(
        "gql string",
        `mutation MyMutation {
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
    `
      );
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
        method: "put",
        headers: {
          "x-api-key": process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(addMissingData),
        },
      });
    });

  console.log("mutations", mutations);

  Promise.all(mutations).then(console.log);
};

module.exports = migrateData;
