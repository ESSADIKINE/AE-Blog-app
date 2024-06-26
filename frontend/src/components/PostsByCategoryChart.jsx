import * as React from 'react';
import { Paper, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const PostsByCategoryChart = ({ pieData, colors }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: 600, height: 400 }}>
      <Typography variant="h6" align="center">Posts by Category</Typography>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.name} (${item.value})`,
            arcLabelMinAngle: 15,
            data: pieData.map((d, i) => ({ ...d, label: d.name, color: colors[i % colors.length] })),
            outerRadius: 120,
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
  );
};

export default PostsByCategoryChart;
