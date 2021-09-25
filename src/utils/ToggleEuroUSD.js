import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';

// eslint-disable-next-line react/prop-types
const ToggleEuroUSD = ({ onChange }) => {
  const [currency, setCurrency] = useState('dollar');

  const handleChange = (event, newCurrency) => {
    setCurrency(newCurrency);
    onChange(newCurrency);
  };

  return (
    <ToggleButtonGroup
      value={currency}
      exclusive
      onChange={handleChange}
      aria-label="currency"
      size="small"
    >
      <ToggleButton value="euro" aria-label="euro">
        <EuroSymbolIcon />
      </ToggleButton>
      <ToggleButton value="dollar" aria-label="dollar">
        <AttachMoneyIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

ToggleEuroUSD.defaultProps = {
  onChange: () => {}
};

export default ToggleEuroUSD;
