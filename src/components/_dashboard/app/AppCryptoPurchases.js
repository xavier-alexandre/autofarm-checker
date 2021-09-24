import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import creditCard from '@iconify/icons-noto/credit-card';
import { DataStore } from '@aws-amplify/datastore';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { Purchase } from '../../../models';
import { fShortenNumber } from '../../../utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const AppCryptoPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    const fetchPurchases = async () => {
      const data = await DataStore.query(Purchase);
      data.sort((a, b) => a.createdAt < b.createdAt);
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        setPurchases(data);
      }
    };

    fetchPurchases()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future calls
    return () => (isSubscribed = false);
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={creditCard} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {fShortenNumber(purchases.reduce((prev, curr) => prev + curr, 0))}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Crypto purchases
      </Typography>
    </RootStyle>
  );
};

export default AppCryptoPurchases;
