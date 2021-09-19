const getFarmBalance = require("../getFarmBalance");
const farmConfigs = require("../farmConfigs.json");
const maticUsdtFarmBalance = getFarmBalance(farmConfigs[0]);
const avaxUsdcFarmBalance = getFarmBalance(farmConfigs[1]);

Promise.all([maticUsdtFarmBalance, avaxUsdcFarmBalance]).then(console.log);
