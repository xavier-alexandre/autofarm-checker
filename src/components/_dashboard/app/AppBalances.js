// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { AutofarmDataFetcher } from '../../balances';

// ----------------------------------------------------------------------

const AppBalances = () => (
  <Card>
    <CardHeader title="Balances" subheader="In Autofarm" />
    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      <AutofarmDataFetcher />
    </Box>
  </Card>
);

export default AppBalances;
