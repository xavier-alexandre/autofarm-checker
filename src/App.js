// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { CurrencyConversionFetcher } from './utils/CurrencyConversionFetcher';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <CurrencyConversionFetcher>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </CurrencyConversionFetcher>
    </ThemeConfig>
  );
}
