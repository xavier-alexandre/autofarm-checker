/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAutofarmBalance = /* GraphQL */ `
  query GetAutofarmBalance($id: ID!) {
    getAutofarmBalance(id: $id) {
      id
      date
      balance
      createdAt
      updatedAt
    }
  }
`;
export const listAutofarmBalances = /* GraphQL */ `
  query ListAutofarmBalances(
    $filter: ModelAutofarmBalanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAutofarmBalances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        balance
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIronfinanceBalance = /* GraphQL */ `
  query GetIronfinanceBalance($id: ID!) {
    getIronfinanceBalance(id: $id) {
      id
      date
      balance
      createdAt
      updatedAt
    }
  }
`;
export const listIronfinanceBalances = /* GraphQL */ `
  query ListIronfinanceBalances(
    $filter: ModelIronfinanceBalanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIronfinanceBalances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        balance
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
