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

const getAutoFarmBalance = require("./getAutoFarmBalance");
const getIronFinanceBorrowBalance = require("./getIronFinanceBorrowBalance");

exports.handler = async (event) => {
  // TODO implement

  const autofarmBalance = await getAutoFarmBalance();
  const ironfinanceBalance = await getIronFinanceBorrowBalance();
  console.log("autofarmBalance", autofarmBalance);
  console.log("ironfinanceBalance", ironfinanceBalance);

  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
