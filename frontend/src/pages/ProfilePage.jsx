import { useTheme } from "@emotion/react"
import { Avatar, Box, Container, Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography, CssBaseline } from "@mui/material"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDeleteUserAccountMutation, useUpdateUserProfileMutation } from "../redux/user/usersApi"
import { toast } from "react-toastify"
import { deleteUserAccount, signOut, updateUserProfile } from "../redux/user/userSlice"
import usePreviewImg from "../hooks/usePreviewImg"
import { useSignoutMutation } from "../redux/user/authApi"
import DeleteAccountModal from "../components/DeleteAccountModal"
import Footer from "../components/Footer";


const ProfilePage = () => {
    const theme = useTheme()

    const { mode, user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const handleOpen = () => setOpenDeleteModal(true)
    const handleClose = () => setOpenDeleteModal(false)

    const [inputs, setInputs] = useState({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: ""
    })
    const profilePictureRef = useRef(null)

    const { handleImgChange, previewImg } = usePreviewImg()

    const [updateUserProfileApi, { isLoading }] = useUpdateUserProfileMutation()
    const [signOutApi] = useSignoutMutation()
    const [deleteUserAccountApi, { isLoading: isDeleteUserAccountLoading }] = useDeleteUserAccountMutation()

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const res = await updateUserProfileApi({ ...inputs, _id: user._id, profilePicture: previewImg }).unwrap()
            dispatch(updateUserProfile({ ...res }))
            toast.success("Profile has been successfully updated.")
        } catch (error) {
            if (error.data) {
                toast.error(error.data.error)
            } else {
                toast.error(error.message)
            }
        }
    }

    const handleSignOut = async () => {
        try {
            await signOutApi().unwrap()
            dispatch(signOut())
        } catch (error) {
            console.error("Error" + error.message)
        }
    }

    const handleDeleteUserAccount = async () => {
        try {
            await deleteUserAccountApi({ _id: user._id }).unwrap()
            dispatch(deleteUserAccount())
            toast.success("Your account has been successfully deleted.")
        } catch (error) {
            if (error.data) {
                toast.error(error.data.error)
            } else {
                console.error("Error" + error.message)
            }
        }
    }

    return (
            <Grid container component="main" sx={{ height: '93vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={4}
                    sx={{
                        backgroundImage: 'url(../../profilLEFT.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Container maxWidth="xl">
                        <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: "14px" }}>
                            Update Profile
                        </Typography>
                        <Stack onSubmit={handleUpdateProfile} component="form" gap={3} width="100%">
                            <Stack flexDirection="row" alignItems="center" gap={4}>
                                <Avatar src={previewImg || user.profilePicture} sx={{ width: 64, height: 64 }} />
                                <input type="file" hidden ref={profilePictureRef} onChange={handleImgChange} />
                                <Button onClick={() => profilePictureRef.current.click()} variant="contained">
                                    Change Avatar
                                </Button>
                            </Stack>
                            <TextField
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                autoComplete="off"
                                value={inputs.fullName}
                                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                            />
                            <TextField
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
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                            <FormControl required fullWidth>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    type="password"
                                    label="Password"
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
                                {isLoading ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Update Profile"}
                            </Button>
                            <Stack flexDirection="row" justifyContent="space-between" px={1}>
                                <Box onClick={handleOpen} sx={{ color: "#d32f2f", cursor: "pointer", mt: "2px" }}>
                                    Delete Account
                                </Box>
                                <DeleteAccountModal open={openDeleteModal} handleClose={handleClose} handleDeleteUserAccount={handleDeleteUserAccount} isLoading={isDeleteUserAccountLoading} />
                                <Box onClick={handleSignOut} sx={{ color: "#d32f2f", cursor: "pointer", mt: "5px" }}>
                                    Sign Out
                                </Box>
                            </Stack>
                        </Stack>
                    </Container>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={4}
                    sx={{
                        backgroundImage: 'url(../../profilRIGHT.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
    )
}

export default ProfilePage
