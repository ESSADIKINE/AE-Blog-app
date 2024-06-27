import * as React from 'react';
import { styled } from '@mui/material/styles';
import {  Divider } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteUserFromDataGridModal from './DeleteUserFromDataGridModal';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({
  recentUsersData,
  handleOpen,
  handleClose,
  openDeleteModal,
  isDeleteUserLoading,
  handleDeleteUser,
}) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Latest Users
          </Typography>
          <Demo>
            <List dense={dense}>
              {recentUsersData?.map((user, index) => (
                <React.Fragment key={user._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton sx={{ color: "#009975" }} onClick={() => handleOpen(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={user.profilePicture} alt={user.fullName} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.fullName}
                      secondary={secondary ? user.email : null}
                    />
                    <DeleteUserFromDataGridModal
                      open={openDeleteModal === user._id}
                      handleClose={handleClose}
                      isLoading={isDeleteUserLoading}
                      handleDeleteUser={handleDeleteUser}
                      rowId={user._id}
                      username={user.username}
                    />
                  </ListItem>
                  {index < recentUsersData.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
