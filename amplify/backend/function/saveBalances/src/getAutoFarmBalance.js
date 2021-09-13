const config = require("./config.json");
const Web3 = require("web3");
const convertMaticToUSD = require("./convertMaticToUSD");
const web3 = new Web3(config.RPC_URL);
const WALLET_ADDRESS = config.WALLET_ADDRESS;

const WMATIC_CONTRACT_ADDRESS = config.WMATIC_CONTRACT_ADDRESS;
const WMATIC_ABI = require("./abis/WMATIC.json");
const wmaticContract = new web3.eth.Contract(
  WMATIC_ABI,
  WMATIC_CONTRACT_ADDRESS
);

const USDT_CONTRACT_ADDRESS = config.USDT_CONTRACT_ADDRESS;
const USDT_ABI = require("./abis/UChildERC20.json");
const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);

const APESWAP_CONTRACT_ADDRESS = config.APESWAP_CONTRACT_ADDRESS;
const APESWAP_ABI = require("./abis/ApePair.json");
const apeSwapContract = new web3.eth.Contract(
  APESWAP_ABI,
  APESWAP_CONTRACT_ADDRESS
);

const AUTOFARM_POOL_ID = config.AUTOFARM_POOL_ID;
const AUTOFARM_CONTRACT_ADDRESS = config.AUTOFARM_CONTRACT_ADDRESS;
const AUTOFARM_ABI = require("./abis/AutoFarmV2_CrossChain.json");
const autoFarmContract = new web3.eth.Contract(
  AUTOFARM_ABI,
  AUTOFARM_CONTRACT_ADDRESS
);

const getTotalSupply = async () => {
  const totalSupply = await apeSwapContract.methods.totalSupply().call();
  return Number.parseFloat(web3.utils.fromWei(totalSupply, "ether"));
};

const getPoolValue = async () => {
  const wmaticBalance = await wmaticContract.methods
    .balanceOf(APESWAP_CONTRACT_ADDRESS)
    .call();
  const wmaticBalanceParsed = Number.parseFloat(
    web3.utils.fromWei(wmaticBalance, "ether")
  );

  const maticToUSD = await convertMaticToUSD();

  const usdtBalance = await usdtContract.methods
    .balanceOf(APESWAP_CONTRACT_ADDRESS)
    .call();
  const usdtBalanceParsed = Number.parseFloat(
    web3.utils.fromWei(usdtBalance, "Mwei")
  );

  return wmaticBalanceParsed * maticToUSD + usdtBalanceParsed;
};

const getLpTokenBalance = async () => {
  const balance = await autoFarmContract.methods
    .stakedWantTokens(AUTOFARM_POOL_ID, WALLET_ADDRESS)
    .call();
  return Number.parseFloat(web3.utils.fromWei(balance, "ether"));
};

async function getAutoFarmBalance() {
  const balance = await getLpTokenBalance();
  const totalSupply = await getTotalSupply();
  const poolValue = await getPoolValue();
  return (poolValue / totalSupply) * balance;
}

module.exports = getAutoFarmBalance;
