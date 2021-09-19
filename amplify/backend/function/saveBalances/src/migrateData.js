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

  const items = await axios({
    url: process.env.API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT,
    },
    data: {
      query: print(listAutofarmBalanceIds),
    },
  });

  const mutations = items
    .map((item) => item.id)
    .map((id) => {
      const addMissingData = gql`
        updateAutofarmBalance(input: {token2: "USDT", token1: "WMATIC", id: ${id}, chain: "Polygon"}) {
            id
            chain
            balance
            token2
            token1
            createdAt
            updatedAt
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

  Promise.all(mutations).then(console.log);
};

module.exports = migrateData;
