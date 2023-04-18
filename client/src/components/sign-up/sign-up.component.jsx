import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { userThunks } from '../../store/redux/user/user-slice';
import './sign-up.styles.scss';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { withCms } from '../../cms';

export const MuiSignUp = withCms(function MuiSignUp({cms}) {
    const { branding: {titleText} } = cms
    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
              {titleText}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

      const [ error,setError ] = useState('')

    const theme = createTheme(
        {
            palette: {
              mode: 'dark',
            }
        }
    );

    const dispatch = useDispatch()
    const signUp = async (...args) => {
      const response = await dispatch(userThunks.signUp(...args))
      
      if (response && response.payload && response.payload.error) {
        setError(response.payload.error)
      }

    }
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({...userCredentials,[name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 6) {
            setError("password must be at least 6 characters")
            return
        }
        if (password !== confirmPassword) {
            setError("passwords do not match");
            return;
        }
        setError("")
        await signUp({ displayName, email, password });
    };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {
            error && <Alert severity="error">{error}</Alert>
          }
          <Box component="form" noValidate onChange={handleChange} onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

                <TextField
                  name="displayName"
                  value={displayName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="signUpemail"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="signUpPassword"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
})