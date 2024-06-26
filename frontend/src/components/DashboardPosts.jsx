import * as React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDeletePostMutation, useGetAllPostsQuery } from "../redux/posts/postsApi";
import DeletePostFromDataGridModal from "./DeletePostFromDataGridModal";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import formatCategory from "../utils/formatCategory";

const DashboardPosts = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [rowCountState, setRowCountState] = useState(0);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(null);
  const navigate = useNavigate();

  const handleDeletePostOpen = (postId) => setOpenDeletePostModal(postId);
  const handleDeletePostClose = () => setOpenDeletePostModal(null);

  // Get all posts
  const { data, isLoading } = useGetAllPostsQuery(paginationModel);

  // Delete post
  const [deletePostApi, { isLoading: isDeletePostLoading }] = useDeletePostMutation();

  useEffect(() => {
    if (data) {
      setRowCountState(data.totalPosts);
    }
  }, [data]);

  const handleDeletePostFromDataGrid = async (postId) => {
    try {
      await deletePostApi({ postId }).unwrap();
      handleDeletePostClose();
      toast.success("Post has been successfully deleted.");
    } catch (error) {
      toast.error(error.data?.error || error.message);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "title",
      headerName: "Title",
      width: 350,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography variant="body2">
          {formatCategory(params.row.category)}
        </Typography>
      )
    },
    {
      field: "postPicture",
      headerName: "Post Picture",
      width: 220,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Link to={`/post/${params.row._id}`}>
          <img src={params.row.postPicture} width={60} height={40} alt="Post" />
        </Link>
      )
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDeletePostOpen(params.row._id)} sx={{ color: "#009975" }}>
            <DeleteIcon />
          </IconButton>
          <DeletePostFromDataGridModal
            open={openDeletePostModal === params.row._id}
            handleClose={handleDeletePostClose}
            handleDeletePost={() => handleDeletePostFromDataGrid(params.row._id)}
            isLoading={isDeletePostLoading}
            rowId={params.row._id}
          />
        </>
      )
    },
    {
      field: "update",
      headerName: "Update",
      width: 70,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Link to={`/update-post/${params.row._id}`}>
          <IconButton sx={{ color: "#009975" }}>
            <EditIcon />
          </IconButton>
        </Link>
      )
    },
    {
      field: "view",
      headerName: "View",
      width: 70,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton sx={{ color: "#009975" }} onClick={() => navigate(`/post/${params.row._id}`)}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  ];

  return (
    <Box height={"80vh"} mx={5}>
      <DataGrid
        loading={isLoading}
        rows={data?.posts || []}
        getRowId={(row) => row._id}
        columns={columns}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Box>
  );
};

export default DashboardPosts;
