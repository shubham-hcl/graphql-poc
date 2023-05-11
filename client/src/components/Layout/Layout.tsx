import React, { ReactNode } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.scss';

interface Props {
  children?: ReactNode
}

function Layout({ children }: Props) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container className={styles['main']}>{children}</Container>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default Layout
