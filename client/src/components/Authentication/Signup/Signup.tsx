import React from 'react'
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
import CREATE_USER_MUTATION from '../../../graphql/Mutations/CreateUser'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

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

export default function Signup({ onClick, onSignUp }: any) {
  const { control, handleSubmit } = useForm()
  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const [open, setOpen] = React.useState(false)

  const onSubmit = (data: any) => {
    createUser({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      onCompleted: ({ createUser }) => {
        if (createUser.email) {
          setOpen(true)
          setTimeout(() => {
            setOpen(false)
            onSignUp()
          }, 2000)
        }
      },
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Account creation is success!. Please login to continue.
        </Alert>
      </Snackbar>
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name={'username'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                onChange={onChange}
                value={value}
              />
            )}
          />
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" color="secondary" variant="body2" onClick={onClick}>
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
