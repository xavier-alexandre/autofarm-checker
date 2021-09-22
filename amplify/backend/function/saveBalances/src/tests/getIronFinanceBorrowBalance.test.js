const getIronFinanceBorrowBalance = require("../getIronFinanceBorrowBalance");

Promise.all([getIronFinanceBorrowBalance()]).then(console.log);
