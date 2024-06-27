import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from "@mui/x-data-grid";
import { useDeleteCommentMutation, useGetAllComentsQuery } from "../redux/comments/commentsApi";
import { useEffect, useState } from "react";
import DeleteCommentFromDataGridModal from "./DeleteCommentFromDataGridModal";
import { toast } from "react-toastify";
import UpdateCommentModal from "./UpdateCommentModal";
import { Link, useNavigate } from "react-router-dom";

const DashboardComments = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [rowCountState, setRowCountState] = useState(0);
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(null);
  const navigate = useNavigate();

  const handleUpdateModalOpen = (commentId) => setOpenUpdateModal(commentId);
  const handleUpdateModalClose = () => setOpenUpdateModal(null);

  const handleDeleteCommentModalOpen = (commentId) => setOpenDeleteCommentModal(commentId);
  const handleDeleteCommentModalClose = () => setOpenDeleteCommentModal(null);

  // get all comments
  const { data, isLoading } = useGetAllComentsQuery(paginationModel);

  useEffect(() => {
    if (data) {
      setRowCountState(data.totalComments);
    }
  }, [data]);

  // delete comment
  const [deleteCommentApi, { isLoading: isDeleteCommentLoading }] = useDeleteCommentMutation();

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteCommentApi({ commentId }).unwrap();

      toast.success("Comment has been deleted successfully.");
      handleDeleteCommentModalClose();

    } catch (error) {
      if (error.data) {
        toast.error(error.data.error);
      } else {
        toast.error(error.message);
      }
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
      field: "comment",
      headerName: "Comment",
      width: 350,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography>
          {params.row.likes.length} likes
        </Typography>
      )
    },
    {
      field: "postPicture",
      headerName: "Post",
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const postPicture = params.row.postId?.postPicture;

        return postPicture ? (
          <Link to={`/post/${params.row.postId._id}`}>
            <img src={postPicture} width={60} height={40} alt="Post" />
          </Link>
        ) : (
          <Typography>No Post</Typography>
        );
      }
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDeleteCommentModalOpen(params.row._id)} sx={{ color: "#009975" }}>
            <DeleteIcon />
          </IconButton>
          <DeleteCommentFromDataGridModal
            isLoading={isDeleteCommentLoading}
            open={openDeleteCommentModal === params.row._id}
            handleClose={handleDeleteCommentModalClose}
            handleDeleteComment={handleDeleteComment}
            rowId={params.row._id}
          />
        </>
      )
    },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleUpdateModalOpen(params.row._id)} sx={{ color: "#009975" }}>
            <EditIcon />
          </IconButton>
          <UpdateCommentModal
            open={openUpdateModal === params.row._id}
            handleClose={handleUpdateModalClose}
            comment={params.row.comment}
            commentId={params.row._id}
          />
        </>
      )
    },
    {
      field: "view",
      headerName: "View Post",
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton sx={{ color: "#009975" }} onClick={() => navigate(`/post/${params.row.postId._id}`)}>
          <VisibilityIcon />
        </IconButton>
      )
    }
  ];

  return (
    <Box height={"80vh"} mx={5}>
      <DataGrid
        loading={isLoading}
        rows={data?.comments || []}
        getRowId={(row) => row._id}
        columns={columns}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        columnBuffer={5}
      />
    </Box>
  );
};

export default DashboardComments;
