import * as React from 'react';
import { useTheme } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Toolbar, Divider, Typography, useMediaQuery } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 220;

const DashboardPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1050px)");
  const { pathname } = useLocation();

  return (
    <>
      {isNonMobileScreen ? (
        <Box display={"flex"} flexDirection={"row"}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <Typography variant="subtitle2" sx={{ color: '#009975', textAlign: 'center', pt: 2 }}>Home</Typography>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard" selected={pathname === "/dashboard"}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <Typography variant="subtitle2" sx={{ color: '#009975', textAlign: 'center', pt: 2 }}>Tables</Typography>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard/users" selected={pathname === "/dashboard/users"}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard/posts" selected={pathname === "/dashboard/posts"}>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Posts" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard/comments" selected={pathname === "/dashboard/comments"}>
                    <ListItemIcon>
                      <CommentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <Typography variant="subtitle2" sx={{ color: '#009975', textAlign: 'center', pt: 2 }}>Charts</Typography>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard/views-per-category" selected={pathname === "/dashboard/views-per-category"}>
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Views / Category" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard/posts-by-category" selected={pathname === "/dashboard/posts-by-category"}>
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Posts / Category" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard/posts-by-month" selected={pathname === "/dashboard/posts-by-month"}>
                    <ListItemIcon>
                    <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Posts / Month" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, pt: 5 }}>
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Box mt={8}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default DashboardPage;
