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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../services/FirebaseConfig";


const theme = createTheme();

const schema = yup.object().shape({
  userName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, \nOne Uppercase, \nOne Lowercase, \nOne Number and \nOne Special Case Character"
  ),
});

export default function Register() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),  
    });

    const isError = (nameField: string): boolean => Object.keys(errors)?.some(arrVal => nameField === arrVal)

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
      if (loading) {
        return;
      }
      if (user) navigate("/PayOrder");
    }, [user, loading, navigate]);

    const onSubmit = async (data: any) => {
      setEmail(data.email.trim());
      setPassword(data.password.trim());
      if (!data.userName) alert("Please enter name");
      registerWithEmailAndPassword(data.userName, email.trim(), password);
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
                Get your account
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  fullWidth
                  id="userName"
                  label="Name"
                  error={isError("userName")}
                  {...register("userName", { required: "This is required." })}
                  placeholder="Type name"
                  variant="outlined"
                />
                <Typography component="div" sx={{ color: "red", textAlign: "left" }}>
                  <>
                  <ErrorMessage errors={errors} name="userName" />
                  </>
                </Typography>
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  Registrar
                </Button>
                <Grid container sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "75%", whiteSpace: "pre-line" }}>
                  <Grid item xs>
                    <Link href="#" variant="body2" >
                      <LinkRoute to="/reset">Forgot Password?</LinkRoute>
                    </Link>
                  </Grid>
                  <Grid item sx={{ textAlign: "Left" }}>
                    <Link href="#" variant="body2">
                      Already have an account? <LinkRoute to="/Login">Login</LinkRoute> now.
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