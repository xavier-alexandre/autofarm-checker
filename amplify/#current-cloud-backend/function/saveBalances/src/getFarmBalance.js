const Web3 = require("web3");
const convertToUSD = require("./convertToUSD");

/**
 * Returns the Autofarm's farm balance
 * @param {*} farmConfig As defined in farmConfigs.json
 */
const getFarmBalance = async (farmConfig) => {
  const web3 = new Web3(farmConfig.RPC_URL);

  const token1Abi = require(`./abis/${farmConfig.TOKEN_1.ABI_NAME}.json`);
  const token1Contract = new web3.eth.Contract(
    token1Abi,
    farmConfig.TOKEN_1.CONTRACT_ADDRESS
  );

  const token2Abi = require(`./abis/${farmConfig.TOKEN_2.ABI_NAME}.json`);
  const token2Contract = new web3.eth.Contract(
    token2Abi,
    farmConfig.TOKEN_2.CONTRACT_ADDRESS
  );

  const poolAbi = require(`./abis/${farmConfig.POOL.ABI_NAME}.json`);
  const poolContract = new web3.eth.Contract(
    poolAbi,
    farmConfig.POOL.CONTRACT_ADDRESS
  );

  const AUTOFARM_ABI = require(`./abis/${farmConfig.AUTOFARM.ABI_NAME}.json`);
  const autoFarmContract = new web3.eth.Contract(
    AUTOFARM_ABI,
    farmConfig.AUTOFARM.CONTRACT_ADDRESS
  );

  const getTotalSupply = async () => {
    const value = await poolContract.methods.totalSupply().call();
    return Number.parseFloat(web3.utils.fromWei(value, farmConfig.POOL.UNIT));
  };

  const getPoolValue = async () => {
    const token1Balance = await token1Contract.methods
      .balanceOf(farmConfig.POOL.CONTRACT_ADDRESS)
      .call();
    const token1BalanceParsed = Number.parseFloat(
      web3.utils.fromWei(token1Balance, farmConfig.TOKEN_1.UNIT)
    );

    const token2Balance = await token2Contract.methods
      .balanceOf(farmConfig.POOL.CONTRACT_ADDRESS)
      .call();
    const token2BalanceParsed = Number.parseFloat(
      web3.utils.fromWei(token2Balance, farmConfig.TOKEN_2.UNIT)
    );

    const token1ToUSD = await convertToUSD(
      farmConfig.RPC_URL,
      farmConfig.TOKEN_1.CHAINLIN_USD_CONVERTER_CONTRACT_ADDRESS,
      farmConfig.TOKEN_1.CHANLINK_UNIT,
      farmConfig.TOKEN_1.CHAILINK_FACTOR
    );

    let token2ToUSD;
    switch (farmConfig.TOKEN_2.NAME) {
      case "USDC":
      case "USDT":
      case "DAI":
        token2ToUSD = 1;
        break;
      default:
        token2ToUSD = await convertToUSD(
          farmConfig.RPC_URL,
          farmConfig.TOKEN_2.CHAINLIN_USD_CONVERTER_CONTRACT_ADDRESS,
          farmConfig.TOKEN_2.CHANLINK_UNIT,
          farmConfig.TOKEN_2.CHAILINK_FACTOR
        );
        break;
    }

    return (
      token1BalanceParsed * token1ToUSD + token2BalanceParsed * token2ToUSD
    );
  };

  const getLpTokenBalance = async () => {
    const value = await autoFarmContract.methods
      .stakedWantTokens(farmConfig.POOL.ID, farmConfig.WALLET_ADDRESS)
      .call();
    return Number.parseFloat(web3.utils.fromWei(value, "ether"));
  };

  const balance = await getLpTokenBalance();
  const totalSupply = await getTotalSupply();
  const poolValue = await getPoolValue();
  return (poolValue / totalSupply) * balance;
};

module.exports = getFarmBalance;
