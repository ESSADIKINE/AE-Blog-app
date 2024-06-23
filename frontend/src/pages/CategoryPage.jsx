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
  import { useGetCategoryPostsQuery } from "../redux/posts/postsApi";
  import PostCard from "../components/PostCard";
  
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
      <Container maxWidth={"lg"} sx={{ mt: "40px", mb: "20px" }}>
        {isCategoryPostLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {!isCategoryPostLoading && categoryPostData && categoryPostData.posts.length === 0 && (
          <Typography variant="h5" textAlign={"center"}>
            Posts not found.
          </Typography>
        )}
        {categoryPostData && categoryPostData.posts && (
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
    );
  };
  
  export default CategoryPage;
  