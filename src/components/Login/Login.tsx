/* eslint-disable no-useless-escape */

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../services/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const theme = createTheme();

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, \nOne Uppercase, \nOne Lowercase, \nOne Number and \nOne Special Case Character"
  ),
});

export default function Login() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),  
    });

    const isError = (nameField: string): boolean => Object.keys(errors)?.some(arrVal => nameField === arrVal)
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
      if (loading) {
        return;
      }
      if (user) {
        navigate('/PayOrder')
        
      }
    }, [user, loading, navigate]);

    const onSubmit = async (data: any) => {
      logInWithEmailAndPassword(data.email.trim(), data.password.trim());
    };

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: "70%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login your account
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  error={isError("email")}
                  {...register("email", { required: "This is required." })}
                  placeholder="Type valid email e.g.: nombre@dominio.com"
                  variant="outlined"
                />
                <Typography component="div" sx={{ color: "red", textAlign: "left" }}>
                  <>
                  <ErrorMessage errors={errors} name="email" />
                  </>
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  error={isError("password")}
                  {...register("password", { required: "This is required." })}
                />
                <Typography component="div" sx={{ color: "red", textAlign: "left", whiteSpace: "pre-line"  }}>
                  <>
                  <ErrorMessage errors={errors} name="password" /></>
                </Typography>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 0.6 }}
                >
                  Sing In
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 2 }}
                  onClick={signInWithGoogle}
                >
                  <GoogleIcon sx={{pr: 1, fontSize: "24px"}} /> Login with Google
                </Button>
                <Grid container sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "75%", whiteSpace: "pre-line" }}>
                  <Grid item xs>
                    <Link href="#" variant="body2" >
                      <LinkRoute to="/reset">Forgot Password?</LinkRoute>
                    </Link>
                  </Grid>
                  <Grid item sx={{ textAlign: "Left" }}>
                    <Link href="#" variant="body2">
                      Don't have an account? <LinkRoute to="/register">Register</LinkRoute> now.
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}