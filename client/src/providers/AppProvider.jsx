import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import themeOptions from '../config/theme'
import Layout from '../components/Layout/Layout'

const themes = createTheme(themeOptions)

function AppProvider({ children }) {
  return (
    <ThemeProvider theme={themes}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Layout children={children} />
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default AppProvider
