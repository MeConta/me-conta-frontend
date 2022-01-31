import { ThemeProvider } from 'styled-components';
import { RouterContext } from "next/dist/shared/lib/router-context";

import theme from '../src/styles/theme'
import GlobalStyles from '../src/styles/global'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
