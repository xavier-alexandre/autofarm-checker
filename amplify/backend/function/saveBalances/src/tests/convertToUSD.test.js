const convertToUSD = require("../convertToUSD");
const maticRate = convertToUSD(
  "https://rpc-mainnet.matic.quiknode.pro",
  "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
  "gwei",
  10
);
const avaxRate = convertToUSD(
  "https://api.avax.network/ext/bc/C/rpc",
  "0x0A77230d17318075983913bC2145DB16C7366156",
  "gwei",
  10
);

Promise.all([maticRate, avaxRate]).then(console.log);
