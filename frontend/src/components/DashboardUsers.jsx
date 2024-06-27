import { DataGrid } from "@mui/x-data-grid";
import { useDeleteUserAccountMutation, useGetAllUsersQuery } from "../redux/user/usersApi";
import { useEffect, useState } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";
import DeleteUserFromDataGridModal from "./DeleteUserFromDataGridModal";
import { useNavigate } from "react-router-dom";

const DashboardUsers = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    });
    const [rowCountState, setRowCountState] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(null);
    const navigate = useNavigate();

    const handleOpen = (userId) => setOpenDeleteModal(userId);
    const handleClose = () => setOpenDeleteModal(null);

    // get all users
    const { data, isLoading } = useGetAllUsersQuery(paginationModel);

    // delete user
    const [deleteUserApi, { isLoading: isDeleteUserLoading }] = useDeleteUserAccountMutation();

    useEffect(() => {
        if (data) {
            setRowCountState(data.totalUsers);
        }
    }, [data]);

    const handleDeleteUserFromDataGrid = async (userId) => {
        try {
            await deleteUserApi({ _id: userId }).unwrap();
            handleClose();
            toast.success("User has been deleted successfully.");
        } catch (error) {
            toast.error(error.data?.error || error.message);
        }
    };

    const columns = [
        {
            field: "profilePicture",
            headerName: "Profile picture",
            width: 120,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <Avatar src={params.row.profilePicture} />
        },
        {
            field: "_id",
            headerName: "ID",
            width: 220,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: "fullName",
            headerName: "Full Name",
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: "username",
            headerName: "Username",
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: "email",
            headerName: "Email Address",
            width: 240,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: "deleteUser",
            headerName: "Delete",
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <IconButton sx={{ color: "#009975" }} onClick={() => handleOpen(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <DeleteUserFromDataGridModal 
                        open={openDeleteModal === params.row._id} 
                        handleClose={handleClose} 
                        isLoading={isDeleteUserLoading} 
                        handleDeleteUser={() => handleDeleteUserFromDataGrid(params.row._id)} 
                        rowId={params.row._id} 
                        username={params.row.username} 
                    />
                </>
            )
        },
        {
            field: "view",
            headerName: "View",
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <IconButton sx={{ color: "#009975" }} onClick={() => navigate(`/user/${params.row._id}`)}>
                    <VisibilityIcon />
                </IconButton>
            )
        }
    ];

    return (
        <Box height={"80vh"} mx={5}>
            <DataGrid 
                loading={isLoading}
                getRowId={(row) => row._id}
                rows={data?.users || []}
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

export default DashboardUsers;
