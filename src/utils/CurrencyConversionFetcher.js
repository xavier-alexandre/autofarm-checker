import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyConversionContext = React.createContext({
  USD: 1.17
});

const CurrencyConversionFetcher = ({ children }) => {
  const [rates, setRates] = useState({
    USD: 1.17
  });

  useEffect(() => {
    axios
      .get('https://freecurrencyapi.net/api/v1/rates?apikey=c133b210-1e06-11ec-8c53-a95eebd76ae2')
      .then((result) => setRates(Object.values(result.data.data)[0]))
      .catch(console.warn);
  });

  return (
    <CurrencyConversionContext.Provider value={rates}>
      {children}
    </CurrencyConversionContext.Provider>
  );
};

export { CurrencyConversionFetcher, CurrencyConversionContext };
