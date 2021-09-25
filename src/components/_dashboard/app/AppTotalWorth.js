import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import heavyDollarSign from '@iconify/icons-noto/heavy-dollar-sign';
import { DataStore } from '@aws-amplify/datastore';
import { alpha, styled } from '@mui/material/styles';
import { Card, Skeleton, Typography } from '@mui/material';
import _ from 'lodash';
import { AutofarmBalance, IronfinanceBalance } from '../../../models';
import Counter from '../../animate/Counter';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

const SkeletonStyle = styled(Skeleton)(() => ({
  margin: 'auto'
}));

const AppTotalWorth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalWorth, setTotalWorth] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    const fetchAutofarmTotal = async () => {
      const autofarmBalances = await DataStore.query(AutofarmBalance);
      const autofarmTotal = _.chain(autofarmBalances)
        .sortBy('createdAt')
        .groupBy((balance) => `${balance.chain}:${balance.token1}:${balance.token2}`)
        .map(_.last)
        .map('balance')
        .sum()
        .value();
      return autofarmTotal;
    };

    const fetchIronfinanceBorrowTotal = async () => {
      const ironfinanceBorrownBalances = await DataStore.query(IronfinanceBalance);
      const ironfinanceBorrowTotal = _.last(ironfinanceBorrownBalances).balance;
      return ironfinanceBorrowTotal;
    };

    Promise.all([fetchAutofarmTotal(), fetchIronfinanceBorrowTotal()])
      .then(([autofarmTotal, ironfinanceBorrowTotal]) =>
        setTotalWorth(autofarmTotal - ironfinanceBorrowTotal)
      )
      .then(() => setIsLoading(false));
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={heavyDollarSign} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {isLoading ? (
          <SkeletonStyle width="10rem" />
        ) : (
          <Counter from={0} to={totalWorth} duration={0.5} unit="$" />
        )}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total worth
      </Typography>
    </RootStyle>
  );
};
export default AppTotalWorth;
