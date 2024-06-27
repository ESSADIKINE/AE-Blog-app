import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useGetPostsByCategoryQuery } from "../redux/posts/postsApi";
import { categories } from "../utils/constants";

const PostsByCategoryPage = () => {
  const { data: postsByCategory } = useGetPostsByCategoryQuery();

  const pieData = categories.map(category => {
    const categoryData = postsByCategory?.find(data => data._id === category.urlName);
    return {
      name: category.name,
      value: categoryData ? categoryData.count : 0
    };
  });

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

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Box width={1000} height={540}>
        <Typography variant="h4" align="center" mb={4}>Posts by Category</Typography>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.name} (${item.value})`,
              arcLabelMinAngle: 15,
              data: pieData.map((d, i) => ({ ...d, label: d.name, color: colors[i % colors.length] })),
              outerRadius: 180,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PostsByCategoryPage;
