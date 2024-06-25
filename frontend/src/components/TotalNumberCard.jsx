import { IconButton, Paper, Stack, Typography, Box } from "@mui/material"
import { styled } from '@mui/system'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '260px',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[5],
  }
}));

const TotalNumberCard = ({ total, totalLastMonth, Icon, label }) => {
  return (
    <StyledPaper elevation={1}>
      <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="subtitle1" color="textSecondary">
          TOTAL {label}
        </Typography>
        <IconButton>
          <Icon sx={{ width: 30, height: 30, color: 'primary.main' }} />
        </IconButton>
      </Stack>
      <Typography variant="h4" color="textPrimary" mt={1}>
        {total}
      </Typography>
      <Box mt={1} display="flex" alignItems="center">
        <Typography variant="body2" color="textSecondary">
          {totalLastMonth} last month
        </Typography>
      </Box>
    </StyledPaper>
  )
}

export default TotalNumberCard
