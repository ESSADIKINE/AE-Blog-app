import { useTheme } from "@emotion/react"
import { BottomNavigation, BottomNavigationAction, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, useMediaQuery } from "@mui/material"
import PeopleIcon from '@mui/icons-material/People'
import DescriptionIcon from '@mui/icons-material/Description'
import CommentIcon from '@mui/icons-material/Comment'
import HomeIcon from '@mui/icons-material/Home'
import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const theme = useTheme()
    const isNonMobileScreen = useMediaQuery("(min-width: 1050px)")

    const [value, setValue] = useState("/dashboard/users")

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleValueChange = (e, newValue) => {
        setValue(newValue)
        navigate(newValue)
    }

    return (
        <>
            {isNonMobileScreen ? (
                <Box display={"flex"} flexDirection={"row"}>
                    <Box width={{ sm: "180px" }} pt={"28px"}>
                        <Stack height={"calc(100vh - 68px)"} sx={{ borderRight: "1px solid", borderColor: theme.palette.mode === "light" ? "#d4d4d8" : "#404040", position: "fixed" }}>
                            <List sx={{ py: 0 }}>
                                <ListItem sx={{ color: theme.palette.text.primary}} disablePadding>
                                    <ListItemButton selected={pathname === "/dashboard"} component={Link} to="/dashboard">
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{ color: theme.palette.text.primary}} disablePadding>
                                    <ListItemButton selected={pathname === "/dashboard/users"} component={Link} to="/dashboard/users">
                                        <ListItemIcon>
                                            <PeopleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Users" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{ color: theme.palette.text.primary}} disablePadding>
                                    <ListItemButton selected={pathname === "/dashboard/posts"} component={Link} to="/dashboard/posts">
                                        <ListItemIcon>
                                            <DescriptionIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Posts" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{ color: theme.palette.text.primary}} disablePadding>
                                    <ListItemButton selected={pathname === "/dashboard/comments"} component={Link} to="/dashboard/comments">
                                        <ListItemIcon>
                                            <CommentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Comments" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Stack>
                    </Box>
                    {pathname === "/dashboard" ? (
                        <Box px={3} pt={5}>
                            <Outlet />
                        </Box>
                    ) : (
                        <Box width={"calc(100vw - 180px)"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 68px)"}}>
                            <Outlet />
                        </Box>
                    )}
                </Box>
            ) : (
                <Box mt={8}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Outlet />
                    </Box>
                    <Paper sx={{ position: "fixed", left: 0, right: 0, bottom: 0 }} elevation={2}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={handleValueChange}
                        >
                            <BottomNavigationAction 
                                value={"/dashboard"}
                                label="Dashboard"
                                icon={<HomeIcon />}
                            />
                            <BottomNavigationAction 
                                value={"/dashboard/users"}
                                label="Users"
                                icon={<PeopleIcon />}
                            />
                            <BottomNavigationAction 
                                value={"/dashboard/posts"}
                                label="Posts"
                                icon={<DescriptionIcon />}
                            />
                            <BottomNavigationAction 
                                value={"/dashboard/comments"}
                                label="Comments"
                                icon={<CommentIcon />}
                            />
                        </BottomNavigation>
                    </Paper>
                </Box>
            )}
        </>
    )
}

export default DashboardPage