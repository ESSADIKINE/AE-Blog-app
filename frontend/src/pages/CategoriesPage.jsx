import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoryPostsQuery } from "../redux/posts/postsApi"; // Ensure this import is correct
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const searchParamsCategory = searchParams.get("category");
    if (searchParamsCategory) {
      setCategory(searchParamsCategory);
    }
  }, [search]);

  const { data: categoryPostData, isLoading: isCategoryPostLoading } = useGetCategoryPostsQuery({
    category: searchParams.get("category") || "",
    page,
  });

  const handlePageChange = (e, page) => {
    setPage(page);

    searchParams.set("page", page);
    const searchParamsCategory = searchParams.get("category");

    if (searchParamsCategory) {
      navigate(`/category?category=${searchParamsCategory}&page=${page}`);
    } else {
      navigate(`/category?page=${page}`);
    }

    window.scrollTo(0, 0);
  };

  return (
    <>
      <Container maxWidth={"lg"} sx={{ mt: "40px", mb: "20px" }}>
        {isCategoryPostLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!isCategoryPostLoading && category && (
          <Typography variant="h5" sx={{ mb: "20px", pl: "10px" }}>
            <Box
              component="span"
              sx={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('../../Design.png')`,
                padding: "20px 40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {category}
            </Box>
          </Typography>
        )}
        {!isCategoryPostLoading && categoryPostData && categoryPostData.posts.length === 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
            <Typography variant="h5" textAlign="center">
              No post exist in this category
            </Typography>
          </Box>
        )}
        {categoryPostData && categoryPostData.posts.length > 0 && (
          <>
            <Grid container spacing={3}>
              {categoryPostData.posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} lg={3}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
            {categoryPostData.totalPosts > 8 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={Math.ceil(categoryPostData.totalPosts / 8)}
                  page={page}
                  onChange={handlePageChange}
                  size="large"
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>

  );
};

export default CategoryPage;
