import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import themeOptions from '../config/theme'

const themes = createTheme(themeOptions)

function AppProvider({ children }) {
  return (
    <ThemeProvider theme={themes}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Header />
        {children}
        <Footer />
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default AppProvider
