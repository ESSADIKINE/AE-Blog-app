import * as React from 'react';
import { Avatar, Box, Stack, Typography, Paper, IconButton, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import TotalNumberCard from "./TotalNumberCard";
import { useGetTotalNumberOfCommentsQuery } from "../redux/comments/commentsApi";
import { useGetTotalNumberOfPostsQuery, useGetPostsByMonthQuery, useGetPostsByCategoryQuery, useGetTotalViewsQuery, useGetAllPostsQuery } from "../redux/posts/postsApi";
import { useGetTotalNumberOfUsersQuery, useGetRecentUsersQuery, useDeleteUserAccountMutation } from "../redux/user/usersApi";
import { categories } from "../utils/constants";
import DeleteUserFromDataGridModal from "./DeleteUserFromDataGridModal";
import InteractiveList from "./InteractiveList";
import { toast } from "react-toastify";
import PostsByCategoryChart from "./PostsByCategoryChart";
import PostsByMonthChart from "./PostsByMonthChart";
import ViewsPerCategoryChart from "./ViewsPerCategoryChart";

const DashboardHome = () => {
  const { data: commentsTotal } = useGetTotalNumberOfCommentsQuery();
  const { data: postsTotal } = useGetTotalNumberOfPostsQuery();
  const { data: usersTotal } = useGetTotalNumberOfUsersQuery();
  const { data: postsByMonth, isFetching: isFetchingPostsByMonth } = useGetPostsByMonthQuery();
  const { data: postsByCategory } = useGetPostsByCategoryQuery();
  const { data: totalViews } = useGetTotalViewsQuery();
  const { data: allPosts, isLoading: isAllPostsLoading } = useGetAllPostsQuery({ page: 0, pageSize: 100 });

  const { data: recentUsersData, isLoading: isRecentUsersDataLoading } = useGetRecentUsersQuery();
  const [deleteUserApi, { isLoading: isDeleteUserLoading }] = useDeleteUserAccountMutation();

  const [openDeleteModal, setOpenDeleteModal] = React.useState(null);

  const handleOpen = (userId) => setOpenDeleteModal(userId);
  const handleClose = () => setOpenDeleteModal(null);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserApi({ _id: userId }).unwrap();
      handleClose();
      toast.success("User has been deleted successfully.");
    } catch (error) {
      toast.error(error.data?.error || error.message);
    }
  };

  const navigate = useNavigate();

  const postColumns = [
    {
      field: "postPicture",
      headerName: "Post",
      width: 70,
      renderCell: (params) => (
        <Link to={`/post/${params.row._id}`}>
          <img src={params.row.postPicture} width={50} height={40} alt="Post" />
        </Link>
      )
    },
    {
      field: "title",
      headerName: "Title",
      width: 250
    },
    {
      field: "views",
      headerName: "Views",
      width: 70
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => (
        <IconButton sx={{ color: "#009975" }} onClick={() => navigate(`/post/${params.row._id}`)}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  ];

  const userColumns = [
    {
      field: "profilePicture",
      headerName: "Profile picture",
      width: 120,
      renderCell: (params) => <Avatar src={params.row.profilePicture} />
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200
    },
    {
      field: "username",
      headerName: "Username",
      width: 200
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 240
    },
    {
      field: "deleteUser",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton sx={{ color: "#009975" }} onClick={() => handleOpen(params.row._id)}>
            <DeleteIcon />
          </IconButton>
          <DeleteUserFromDataGridModal
            open={openDeleteModal === params.row._id}
            handleClose={handleClose}
            isLoading={isDeleteUserLoading}
            handleDeleteUser={() => handleDeleteUser(params.row._id)}
            rowId={params.row._id}
            username={params.row.username}
          />
        </>
      )
    }
  ];

  const chartData = postsByMonth?.map(monthData => ({
    month: `${monthData._id.month}-${monthData._id.year}`,
    posts: monthData.count
  }));

  const pieData = categories.map(category => {
    const categoryData = postsByCategory?.find(data => data._id === category.urlName);
    return {
      name: category.name,
      value: categoryData ? categoryData.count : 0
    };
  });

  const viewsByCategoryData = postsByCategory?.map(categoryData => ({
    category: categories.find(cat => cat.urlName === categoryData._id)?.name || categoryData._id,
    views: categoryData.totalViews
  }));

  const colors = [
    "#009975",
    "#007855",
    "#005f3f",
    "#004f34",
    "#003f29",
    "#002f1e",
    "#001f14",
    "#00100a",
    "#000505"
  ];

  const sortedPostsByViews = [...(allPosts?.posts || [])].sort((a, b) => a.views - b.views);

  return (
    <>
      <Stack flexDirection="column">
        <Stack flexDirection={{ md: "row", xs: "column" }} alignItems="center" justifyContent="center" flexWrap="wrap" gap={6}>
          <TotalNumberCard total={usersTotal?.totalUsers} totalLastMonth={usersTotal?.totalUsersLastMonth} Icon={PeopleIcon} label="USERS" />
          <TotalNumberCard total={postsTotal?.totalPosts} totalLastMonth={postsTotal?.totalPostsLastMonth} Icon={DescriptionIcon} label="POSTS" />
          <TotalNumberCard total={commentsTotal?.totalComments} totalLastMonth={commentsTotal?.totalCommentsLastMonth} Icon={CommentIcon} label="COMMENTS" />
          <TotalNumberCard total={totalViews?.totalViews} totalLastMonth={totalViews?.totalViews} Icon={VisibilityIcon} label="VIEWS" />
        </Stack>

        <Stack flexDirection={{ md: "row", xs: "column" }} alignItems="center" justifyContent="center" flexWrap="wrap" gap={4} mt={4}>
          <PostsByCategoryChart pieData={pieData} colors={colors} />
          <PostsByMonthChart chartData={chartData} />
        </Stack>

        <Stack flexDirection={{ md: "row", xs: "column" }} alignItems="center" justifyContent="center" flexWrap="wrap" gap={4} mt={4} mb= {5}>
          <ViewsPerCategoryChart viewsByCategoryData={viewsByCategoryData} />
          <Paper elevation={3} sx={{ py: 2, px: 2, borderRadius: 2, width: 530, height: 600 }}>
            <Typography variant="h6" align="center">Posts by Views</Typography>
            <Box width={{ xs: "300px", sm: "600px", lg: "500px" }} height="520px" mb="20px" mt="10px">
              <DataGrid
                loading={isAllPostsLoading}
                rows={sortedPostsByViews || []}
                getRowId={(row) => row._id}
                columns={postColumns}
              />
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ py: 2, px: 2, borderRadius: 2, width: 320, height: 600 }}>
            <InteractiveList
              recentUsersData={recentUsersData}
              handleClose={handleClose}
              handleOpen={handleOpen}
              openDeleteModal={openDeleteModal}
              isDeleteUserLoading={isDeleteUserLoading}
              handleDeleteUser={handleDeleteUser}
            />
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardHome;
