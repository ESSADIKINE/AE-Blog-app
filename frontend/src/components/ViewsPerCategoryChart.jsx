import * as React from 'react';
import { Paper, Typography, useTheme } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ViewsPerCategoryChart = ({ viewsByCategoryData }) => {
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
    <Paper elevation={3} sx={{ py: 2, px: 2, borderRadius: 2, width: 320, height: 600 }}>
      <Typography variant="h6" align="center">Views per Category</Typography>
      <BarChart
        layout="vertical"
        width={300}
        height={550}
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
    </Paper>
  );
};

export default ViewsPerCategoryChart;
