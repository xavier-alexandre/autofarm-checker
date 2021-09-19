/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	FUNCTION_SAVEBALANCES_NAME
	API_AUTOFARMCHECKER_GRAPHQLAPIIDOUTPUT
	API_AUTOFARMCHECKER_GRAPHQLAPIENDPOINTOUTPUT
	API_AUTOFARMCHECKER_GRAPHQLAPIKEYOUTPUT
	API_AUTOFARMCHECKER_AUTOFARMBALANCETABLE_NAME
	API_AUTOFARMCHECKER_AUTOFARMBALANCETABLE_ARN
	API_AUTOFARMCHECKER_IRONFINANCEBALANCETABLE_NAME
	API_AUTOFARMCHECKER_IRONFINANCEBALANCETABLE_ARN
	stop
Amplify Params - DO NOT EDIT */

const migrateData = require("./migrateData");

exports.handler = async (event) => {
  try {
    await migrateData();
    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
  } catch (e) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(e),
    };
    return response;
  }
};
