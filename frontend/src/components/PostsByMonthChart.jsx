import * as React from 'react';
import { Paper, Typography, useTheme } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const PostsByMonthChart = ({ chartData }) => {
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
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: 600, height: 400 }}>
      <Typography variant="h6" align="center">Posts by Month</Typography>
      <BarChart
        layout="horizontal"
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" type="category" />
        <YAxis type="number" />
        <Tooltip contentStyle={tooltipStyles.contentStyle} labelStyle={tooltipStyles.labelStyle} />
        <Bar dataKey="posts" fill="#009975" label={{ position: 'top' }} />
      </BarChart>
    </Paper>
  );
};

export default PostsByMonthChart;
