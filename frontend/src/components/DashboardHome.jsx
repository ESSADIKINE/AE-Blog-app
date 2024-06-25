import * as React from 'react';
import { Avatar, Box, Stack, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CommentIcon from '@mui/icons-material/Comment';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Link } from "react-router-dom";

import TotalNumberCard from "./TotalNumberCard";
import { useGetTotalNumberOfCommentsQuery } from "../redux/comments/commentsApi";
import { useGetTotalNumberOfPostsQuery, useGetPostsByMonthQuery, useGetPostsByCategoryQuery } from "../redux/posts/postsApi";
import { useGetTotalNumberOfUsersQuery, useGetRecentUsersQuery } from "../redux/user/usersApi";
import { useGetRecentPostsQuery } from "../redux/posts/postsApi";
import { categories } from "../utils/constants";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const DashboardHome = () => {
  const { data: commentsTotal } = useGetTotalNumberOfCommentsQuery();
  const { data: postsTotal } = useGetTotalNumberOfPostsQuery();
  const { data: usersTotal } = useGetTotalNumberOfUsersQuery();
  const { data: postsByMonth, isFetching: isFetchingPostsByMonth } = useGetPostsByMonthQuery();
  const { data: postsByCategory } = useGetPostsByCategoryQuery();

  const { data: recentPostsData, isLoading: isRecentPostsDataLoading } = useGetRecentPostsQuery({ limit: 5 });
  const { data: recentUsersData, isLoading: isRecentUsersDataLoading } = useGetRecentUsersQuery();

  const postColumns = [
    {
      field: "postPicture",
      headerName: "Post picture",
      width: 120,
      renderCell: (params) => (
        <Link to={`/post/${params.row._id}`}>
          <img src={params.row.postPicture} width={40} height={40} alt="Post" />
        </Link>
      )
    },
    {
      field: "title",
      headerName: "Title",
      width: 200
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200
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


  return (
    <>
      <Stack flexDirection="column">
        <Stack flexDirection={{ md: "row", xs: "column" }} alignItems="center" flexWrap="wrap" gap={6}>
          <TotalNumberCard total={usersTotal?.totalUsers} totalLastMonth={usersTotal?.totalUsersLastMonth} Icon={PeopleIcon} label="USERS" />
          <TotalNumberCard total={postsTotal?.totalPosts} totalLastMonth={postsTotal?.totalPostsLastMonth} Icon={DescriptionIcon} label="POSTS" />
          <TotalNumberCard total={commentsTotal?.totalComments} totalLastMonth={commentsTotal?.totalCommentsLastMonth} Icon={CommentIcon} label="COMMENTS" />
        </Stack>

        <Stack flexDirection={{ md: "row", xs: "column" }} alignItems="center" justifyContent="space-around" flexWrap="wrap" gap={4} mt={4}>
        {pieData && (
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: 600, height: 400 }}>
              <Typography variant="h6" align="center">Posts by Category</Typography>
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.name} (${item.value})`,
                    arcLabelMinAngle: 15,
                    data: pieData.map(d => ({ ...d, label: d.name })),
                    outerRadius: 120,
                    paddingAngle: 1,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                  },
                }}
              />
            </Paper>
          )}
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: 600, height: 400 }}>
            <Typography variant="h6" align="center">Posts by Month</Typography>
            <BarChart
              layout="vertical"
              width={500}
              height={330}
              data={chartData}
              barSize={20}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis type="number" />
              <YAxis dataKey="month" type="category"/>
              <Tooltip />
              <Bar dataKey="posts" fill="#009975" label={{ position: 'right' }} />
            </BarChart>
          </Paper>
        </Stack>

        <Stack mt="20px" flexDirection="column">
          <Typography variant="h6">Recent Users</Typography>
          <Box width={{ xs: "300px", sm: "600px", lg: "770px" }} height="370px" mb="20px" mt="10px">
            <DataGrid
              loading={isRecentUsersDataLoading}
              rows={recentUsersData || []}
              getRowId={(row) => row._id}
              columns={userColumns}
            />
          </Box>
          <Typography variant="h6">Recent Posts</Typography>
          <Box width={{ xs: "300px", sm: "600px", lg: "570px" }} height="387px" mb="20px" mt="10px">
            <DataGrid
              loading={isRecentPostsDataLoading}
              rows={recentPostsData || []}
              getRowId={(row) => row._id}
              columns={postColumns}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardHome;
