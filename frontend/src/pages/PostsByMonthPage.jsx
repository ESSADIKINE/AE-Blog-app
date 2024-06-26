import * as React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useGetPostsByMonthQuery } from "../redux/posts/postsApi";

const PostsByMonthPage = () => {
  const { data: postsByMonth } = useGetPostsByMonthQuery();

  const chartData = postsByMonth?.map(monthData => ({
    month: `${monthData._id.month}-${monthData._id.year}`,
    posts: monthData.count
  }));

  const theme = useTheme();

  const tooltipStyles = {
    contentStyle: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    labelStyle: {
      color: theme.palette.text.primary,
    },
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Box width={1000} height={600}>
        <Typography variant="h4" align="center" mb={4}>Posts by Month</Typography>
        <BarChart
          layout="horizontal"
          width={1000}
          height={500}
          data={chartData}
          barSize={20}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" type="category" />
          <YAxis type="number" />
          <Tooltip contentStyle={tooltipStyles.contentStyle} labelStyle={tooltipStyles.labelStyle} />
          <Bar dataKey="posts" fill="#009975" label={{ position: 'top' }} />
        </BarChart>
      </Box>
    </Box>
  );
};

export default PostsByMonthPage;
