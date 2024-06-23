import { useTheme } from "@emotion/react"
import { Avatar, Box, Button, CircularProgress, Container, IconButton, Link, Menu, MenuItem, Stack, Tooltip } from "@mui/material"
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import PostAddIcon from '@mui/icons-material/PostAdd'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { setMode, signOut } from "../redux/user/userSlice"
import { useEffect, useState } from "react"
import { useSignoutMutation } from "../redux/user/authApi"
import SearchInputModal from "./SearchInputModal"

// Import the GIF image
import blogLogoGif from '../utils/Logo.gif'

const Header = () => {
    const theme = useTheme()

    const { user, mode } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { pathname } = useLocation()

    const [openSearchModal, setOpenSearchModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleOpenSearchModal = () => setOpenSearchModal(true)
    const handleCloseSearchModal = () => setOpenSearchModal(false)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const [signOutApi, { isLoading }] = useSignoutMutation()

    const handleSignOut = async () => {
        try {
            const res = await signOutApi().unwrap()

            dispatch(signOut())

        } catch (error) {
            console.error("Error", error.message)
        }
    }

    useEffect(() => {
        return () => setAnchorEl(null)
    }, [pathname])

    return (
        <>
            {!user ? (
                <Box
                    position={"fixed"}
                    top={0}
                    left={0}
                    right={0}
                    sx={{
                        backgroundColor: theme.palette.mode === "light" ? "#AAA" : "#333",
                        zIndex: 100,
                        py: "5px"

                    }}
                >
                    <Container maxWidth="md">
                        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <RouterLink to={"/"}>
                                <img src={blogLogoGif} alt="Blog Logo" style={{ height: '45px' }} />
                            </RouterLink>
                            <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
                                <Tooltip title="Switch theme" arrow>
                                    <IconButton onClick={() => dispatch(setMode())} sx={{ color: theme.palette.text.primary }}>
                                        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                                    </IconButton>
                                </Tooltip>
                                <Button component={RouterLink} to={"/signup"} variant="contained">
                                    Sign Up
                                </Button>
                                <Button component={RouterLink} to={"/signin"} variant="contained">
                                    Sign In
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            ) : (
                <Box
                    position={"fixed"}
                    top={0}
                    left={0}
                    right={0}
                    sx={{
                        backgroundColor: theme.palette.mode === "light" ? "#f0f0f0" : "#333",
                        zIndex: 100,
                        py: "5px"
                    }}
                >
                    <Container maxWidth="md">
                        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <RouterLink to={"/"}>
                                <img src={blogLogoGif} alt="Blog Logo" style={{ height: '45px' }} />
                            </RouterLink>
                            <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
                                <Tooltip title="Search" arrow>
                                    <IconButton onClick={handleOpenSearchModal} sx={{ color: theme.palette.mode === "light" ? "#424242" : "#9e9e9e" }}>
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                                <SearchInputModal open={openSearchModal} handleClose={handleCloseSearchModal} />

                                <Tooltip title="Switch theme" arrow>
                                    <IconButton onClick={() => dispatch(setMode())} sx={{ color: theme.palette.text.primary }}>
                                        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Create Post" arrow>
                                    <Button component={RouterLink} to={"/create-post"} variant="contained">
                                        New Post
                                    </Button>
                                </Tooltip>
                                <IconButton onClick={handleClick}>
                                    <Avatar src={user.profilePicture} sx={{ width: 32, height: 32 }} />
                                </IconButton>
                                <Menu
                                    elevation={3}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    sx={{
                                        "& .MuiMenu-list": {
                                            py: 0,
                                            width: "140px"
                                        },
                                        "& .MuiMenuItem-root": {
                                            py: 1,
                                        }
                                    }}
                                >
                                    <MenuItem component={RouterLink} to={`/profile/${user.username}`}>Profile</MenuItem>
                                    <MenuItem component={RouterLink} to={"/your-posts?page=1"}>Your Posts</MenuItem>
                                    {user.isAdmin && (
                                        <MenuItem component={RouterLink} to={`/dashboard`}>Dashboard</MenuItem>
                                    )}
                                    <MenuItem onClick={handleSignOut} disabled={isLoading}>
                                        {isLoading ? <CircularProgress size={18} /> : "Sign Out"}
                                    </MenuItem>
                                </Menu>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            )}
        </>
    )
}

export default Header
