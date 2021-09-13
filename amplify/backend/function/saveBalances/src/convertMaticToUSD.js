const config = require("./config.json");
const Web3 = require("web3");
const web3 = new Web3(config.RPC_URL);

const CHAINLINK_MATIC_USD_CONTRACT_ADDRESS =
  config.CHAINLINK_MATIC_USD_CONTRACT_ADDRESS;
const CHAINLINK_ABI = require("./abis/EACAggregatorProxy.json");
const chainlinkMaticUSDContract = new web3.eth.Contract(
  CHAINLINK_ABI,
  CHAINLINK_MATIC_USD_CONTRACT_ADDRESS
);

const convertMaticToUSD = async () => {
  const maticToUSD = await chainlinkMaticUSDContract.methods
    .latestAnswer()
    .call();
  return Number.parseFloat(web3.utils.fromWei(maticToUSD, "gwei")) * 10;
};

module.exports = convertMaticToUSD;
