import { useTheme } from "@emotion/react"
import { Box, Button, CircularProgress, FormControl, Grid, CssBaseline, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, TextField, Typography } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSignupMutation } from "../redux/user/authApi"
import { signUp } from "../redux/user/userSlice"
import { toast } from "react-toastify"
import blogLogoGif from '../utils/Logo.gif'

const SignUpPage = () => {

    const theme = useTheme()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    })

    const [signupApi, { isLoading }] = useSignupMutation()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await signupApi(inputs).unwrap()

            dispatch(signUp({ ...res }))
            navigate("/")

        } catch (error) {
            if (error.data.error) {
                toast.error(error.data.error)
                return
            } else {
                toast.error(error.message)
                return
            }
        }
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
                    }}
                >
                    <RouterLink to={"/"}>
                        <img src={blogLogoGif} alt="Blog Logo" style={{ height: '60px', marginBottom: '40px' }} />
                    </RouterLink>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoComplete="off"
                            autoFocus
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="off"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                                autoComplete="off"
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
                            {isLoading ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Sign Up"}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/signin" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignUpPage
