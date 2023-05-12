import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useMutation } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import LOGIN_MUTATION from '../../../graphql/Mutations/Login'
import { useNavigate } from 'react-router-dom'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        GraphQL POC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Signin({ onClick }: any) {
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [login] = useMutation(LOGIN_MUTATION)

  const onSubmit = (data: any) => {
    login({
      variables: {
        email: data.email,
        password: data.password,
      },
      onCompleted: ({ login }) => {
        if (login) {
          const {accessToken, username, email, cartId} = login
          localStorage.setItem('access-token', accessToken)
          localStorage.setItem('user', JSON.stringify({username, email}))
          localStorage.setItem('cartId', cartId)
          navigate('/products')
        }
      },
    })
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" color="secondary" variant="body2" onClick={onClick}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
