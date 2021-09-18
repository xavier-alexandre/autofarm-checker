const Web3 = require("web3");
const CHAINLINK_ABI = require("./abis/EACAggregatorProxy.json");

/**
 * @param {String} chainlinkConverterContractAddress Address of the Chainlink contract oracle that provides convertion rate
 * @see https://data.chain.link/polygon/mainnet/crypto-usd/matic-usd
 */
const convertToUSD = async (
  rpcUrl,
  chainlinkConverterContractAddress,
  unit,
  factor
) => {
  const web3 = new Web3(rpcUrl);
  const chainlinConverterContract = new web3.eth.Contract(
    CHAINLINK_ABI,
    chainlinkConverterContractAddress
  );
  const rate = await chainlinConverterContract.methods.latestAnswer().call();
  return Number.parseFloat(web3.utils.fromWei(rate, unit)) * factor;
};

module.exports = convertToUSD;
