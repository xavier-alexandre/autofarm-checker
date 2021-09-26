/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import convertToUSD from './convertToUSD';

const CurrencyConversionContext = React.createContext({
  USD: 1.17
});

const CurrencyConversionFetcher = ({ children }) => {
  const [rates, setRates] = useState({
    USD: 1.17
  });

  useEffect(() => {
    convertToUSD(
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      '0x01d391a48f4f7339ac64ca2c83a07c22f95f587a',
      'gwei',
      10
    )
      .then((result) =>
        setRates((r) => ({
          ...r,
          USD: result
        }))
      )
      .catch(console.error);
  }, []);

  return (
    <CurrencyConversionContext.Provider value={rates}>
      {children}
    </CurrencyConversionContext.Provider>
  );
};

export { CurrencyConversionFetcher, CurrencyConversionContext };
