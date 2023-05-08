import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import themeOptions from '../config/theme';

const themes = createTheme(themeOptions);

function AppProvider({ children }) {
  return (
    <ThemeProvider theme={themes}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {children}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
