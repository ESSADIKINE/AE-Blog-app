import React from 'react';
import { Box, CircularProgress, Container, Grid, Paper, Typography, Toolbar } from "@mui/material";
import { Link } from "react-router-dom"; // Updated import
import { useGetPopularPostsQuery, useGetRecentPostsQuery } from "../redux/posts/postsApi";
import PostCard from "../components/PostCard";
import { categories } from "../utils/constants";
import Footer from "../components/Footer";

const HomePage = () => {
  // get recent posts
  const { data: recentPostData, isLoading: isRecentPostsLoading } = useGetRecentPostsQuery({ limit: 20 });

  // get popular posts
  const { data: popularPostData, isLoading: isPopularPostsLoading } = useGetPopularPostsQuery();

  const post = {
    image: '../../Green.png',
    bg: '../../Design.png',
    imageText: 'main image description'
  };

  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto', mx: 20, my: 1 }}
      >
        {categories.map((section) => (
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={section.name}
            to={`/category?category=${section.urlName}`} // Updated for navigation
          >
            {section.name}
          </Link>
        ))}
      </Toolbar>
      <Paper
        sx={{
          position: 'relative',
          mb: 4,
          pl: 35,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${post.image})`,
        }}
      >
        <img style={{ display: 'none' }} src={post.image} alt={post.imageText} />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.1)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" sx={{ mb: 5 }} gutterBottom>
                Welcome to the Anass Essadikine Blog
              </Typography>
              <Typography variant="h5" color="inherit" sx={{ mb: 5 }} paragraph>
                A place for exploring new ideas and insights. Discover engaging articles on a wide range of topics.</Typography>
              <Link to="#" style={{ pl: 4, textDecoration: 'none', color: '#009975' }}>
                Continue reading…
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: "40px", mb: "10px" }}>
        {(isRecentPostsLoading || isPopularPostsLoading) && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {recentPostData && (
          <>
            <Typography variant="h5" sx={{ mb: "20px", pl: "10px" }}>
              <Box
                component="span"
                sx={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${post.bg})`,
                  padding: "20px 40px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Recent Posts
              </Box>
            </Typography>
            <Grid container spacing={3}>
              {recentPostData.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} lg={3}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {!isRecentPostsLoading && recentPostData?.length === 0 && (
          <Typography variant="h5" textAlign="center" py={7}>
            There are no recent posts yet.
          </Typography>
        )}
        {popularPostData && (
          <>
            <Typography variant="h5" sx={{ mb: "20px", pl: "10px", mt: "50px" }}>
              <Box
                component="span"
                sx={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${post.bg})`,
                  padding: "20px 40px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Popular Posts
              </Box>
            </Typography>
            <Grid container spacing={3}>
              {popularPostData.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} lg={3}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {!isPopularPostsLoading && popularPostData?.length === 0 && (
          <Typography variant="h5" textAlign="center" py={7}>
            There are no popular posts yet.
          </Typography>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
