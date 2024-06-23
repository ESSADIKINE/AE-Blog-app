import React from 'react';
import { Box, CircularProgress, Container, Grid, Paper, Typography, Toolbar, Link } from "@mui/material";
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

  const portfolio = '../../portfolio.png'; // Placeholder path for the Twitter icon
  const gmail = '../../gmail.png'; // Placeholder path for the Instagram icon
  const linkedin = '../../linkedin.png'; // Placeholder path for the LinkedIn icon
  const github = '../../github.png'; // Placeholder path for the GitHub icon

  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto', mx: 20, my: 1 }}
      >
        {categories.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.name}
            variant="body2"
            href={`search?category=${section.urlName}`}
            sx={{ flexShrink: 0 }}
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
                Title of a longer featured blog post
              </Typography>
              <Typography variant="h5" color="inherit" sx={{ mb: 5 }} paragraph>
                Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.
              </Typography>
              <Link variant="subtitle1" href="#" sx={{ pl: 4 }}>
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
          <Typography variant="h5" textAlign="center">
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
          <Typography variant="h5" textAlign="center">
            There are no popular posts yet.
          </Typography>
        )}
      </Container>
      <Footer
        categories={categories}
        portfolio={portfolio}
        gmail={gmail}
        linkedin={linkedin}
        github={github}
      />
    </>
  );
};

export default HomePage;