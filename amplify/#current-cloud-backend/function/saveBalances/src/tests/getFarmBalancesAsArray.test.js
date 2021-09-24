const getFarmBalance = require("../getFarmBalance");
const farmConfigs = require("../farmConfigs.json");

const balancesWithConfigs = farmConfigs.map((config) => ({
  config,
  balance: getFarmBalance(config),
}));

const promises = balancesWithConfigs.map((bwc) => bwc.balance);
Promise.all(promises).then(console.log);
