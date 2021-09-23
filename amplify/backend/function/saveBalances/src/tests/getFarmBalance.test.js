const getFarmBalance = require("../getFarmBalance");
const farmConfigs = require("../farmConfigs.json");
// const maticUsdtFarmBalance = getFarmBalance(farmConfigs[0]);
// const avaxUsdcFarmBalance = getFarmBalance(farmConfigs[1]);
const avaxUsdtFarmBalance = getFarmBalance(farmConfigs[2]);

Promise.all([avaxUsdtFarmBalance]).then(console.log);
