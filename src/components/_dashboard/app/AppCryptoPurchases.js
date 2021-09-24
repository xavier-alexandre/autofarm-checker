import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import creditCard from '@iconify/icons-noto/credit-card';
import { DataStore } from '@aws-amplify/datastore';
import { alpha, styled } from '@mui/material/styles';
import { Card, Skeleton, Typography } from '@mui/material';
import { CryptoPurchase } from '../../../models';
import Counter from '../../animate/Counter';

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

const SkeletonStyle = styled(Skeleton)(() => ({
  margin: 'auto'
}));

// ----------------------------------------------------------------------

const AppCryptoPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    const fetchPurchases = async () => {
      const data = await DataStore.query(CryptoPurchase);
      data.sort((a, b) => a.createdAt < b.createdAt);
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        setPurchases(data);
        setIsLoading(false);
      }
    };

    fetchPurchases()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future calls
    return () => (isSubscribed = false);
  }, []);

  const total = purchases.reduce((prev, curr) => prev + curr.amount, 0);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={creditCard} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {isLoading ? (
          <SkeletonStyle width="10rem" />
        ) : (
          <Counter from={0} to={total} duration={0.5} unit="€" />
        )}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Crypto purchases
      </Typography>
    </RootStyle>
  );
};

export default AppCryptoPurchases;
