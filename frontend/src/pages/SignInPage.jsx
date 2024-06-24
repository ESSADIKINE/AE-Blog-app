import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  CssBaseline,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSigninMutation } from "../redux/user/authApi";
import { signIn, setMode } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import blogLogoGif from '../utils/Logo.gif';

const SignInPage = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { user, mode } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [signInApi, { isLoading }] = useSigninMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInApi(inputs).unwrap();

      dispatch(signIn({ ...res }));
      navigate("/");
    } catch (error) {
      if (error.data) {
        toast.error(error.data.error);
        return;
      } else {
        toast.error(error.message);
        return;
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box>
      <Tooltip title="Switch theme" arrow>
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ color: theme.palette.text.primary, mx: 2 }}
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RouterLink to={"/"}>
            <img src={blogLogoGif} alt="Blog Logo" style={{ height: '60px', marginBottom: '110px' }} />
          </RouterLink>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="current-password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, "&.Mui-disabled": { backgroundColor: theme.palette.primary.main } }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(../../SignIn.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default SignInPage;
