import * as React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useGetPostsByCategoryQuery } from "../redux/posts/postsApi";
import { categories } from "../utils/constants";

const ViewsPerCategoryPage = () => {
  const { data: postsByCategory } = useGetPostsByCategoryQuery();

  const viewsByCategoryData = postsByCategory?.map(categoryData => ({
    category: categories.find(cat => cat.urlName === categoryData._id)?.name || categoryData._id,
    views: categoryData.totalViews
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
        <Typography variant="h4" align="center" mb={4}>Views per Category</Typography>
        <BarChart
          layout="vertical"
          width={1000}
          height={500}
          data={viewsByCategoryData}
          barSize={20}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip contentStyle={tooltipStyles.contentStyle} labelStyle={tooltipStyles.labelStyle} />
          <Bar dataKey="views" fill="#009975" label={{ position: 'right' }} />
        </BarChart>
      </Box>
    </Box>
  );
};

export default ViewsPerCategoryPage;
