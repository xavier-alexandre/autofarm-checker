const config = require("./config.json");
const Web3 = require("web3");
const web3 = new Web3(config.RPC_URL);
const WALLET_ADDRESS = config.WALLET_ADDRESS;

const IRONFINANCE_MATIC_BORROW_CONTRACT_ADDRESS =
  config.IRONFINANCE_MATIC_BORROW_CONTRACT_ADDRESS;
const RETHER_ABI = require("./abis/REther.json");
const ironfinanceMaticBorrowContract = new web3.eth.Contract(
  RETHER_ABI,
  IRONFINANCE_MATIC_BORROW_CONTRACT_ADDRESS
);

const getMaticBorrowBalance = async () => {
  const balance = await ironfinanceMaticBorrowContract.methods
    .borrowBalanceStored(WALLET_ADDRESS)
    .call();
  return Number.parseFloat(web3.utils.fromWei(balance, "ether"));
};

const IRONFINANCE_USDC_BORROW_CONTRACT_ADDRESS =
  config.IRONFINANCE_USDC_BORROW_CONTRACT_ADDRESS;
const RERC20DELEGATOR_ABI = require("./abis/RErc20Delegator.json");
const convertToUSD = require("./convertToUSD");
const ironfinanceUSDCBorrowContract = new web3.eth.Contract(
  RERC20DELEGATOR_ABI,
  IRONFINANCE_USDC_BORROW_CONTRACT_ADDRESS
);

const getUSDCBorrowBalance = async () => {
  const balance = await ironfinanceUSDCBorrowContract.methods
    .borrowBalanceStored(WALLET_ADDRESS)
    .call();
  return Number.parseFloat(web3.utils.fromWei(balance, "mwei"));
};

const getIronFinanceBorrowBalance = async () => {
  const maticBorrowBalance = getMaticBorrowBalance();
  const maticToUsdcRate = convertToUSD(
    config.RPC_URL,
    config.CHAINLINK_MATIC_USD_CONTRACT_ADDRESS,
    "gwei",
    10
  );
  const usdcBorrowBalance = getUSDCBorrowBalance();
  const values = await Promise.all([
    maticBorrowBalance,
    maticToUsdcRate,
    usdcBorrowBalance,
  ]);
  return values[0] * values[1] + values[2];
};

module.exports = getIronFinanceBorrowBalance;
