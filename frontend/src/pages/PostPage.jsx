import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeletePostMutation, useGetPostQuery } from "../redux/posts/postsApi"
import { Avatar, Box, Button, CircularProgress, Container, IconButton, Stack, TextField, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGetUserQuery } from "../redux/user/usersApi"
import { useSelector } from "react-redux"
import { useState } from "react"
import DeletePostModal from "../components/DeletePostModal"
import { toast } from "react-toastify"
import formatCategory from "../utils/formatCategory"
import Comment from "../components/Comment"
import { useCreateCommentMutation, useGetPostCommentsQuery } from "../redux/comments/commentsApi"
import { useTheme } from "@emotion/react"
import Footer from "../components/Footer"

const PostPage = () => {
    const { user } = useSelector((state) => state.user)
    const theme = useTheme()
    const { slug } = useParams()
    const navigate = useNavigate()

    const [comment, setComment] = useState("")
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // get post
    const { data: post, isLoading: isPostLoading, isError: isPostError } = useGetPostQuery(slug)

    // get user
    const { data: postUser } = useGetUserQuery({ userId: post?.userId }, { skip: !post?.userId })

    // delete post
    const [deletePostApi, { isLoading: isDeletePostLoading }] = useDeletePostMutation()

    const handleDeletePost = async () => {
        try {
            await deletePostApi({ postId: post._id }).unwrap()
            toast.success("Post has been successfully deleted.")
            navigate("/your-posts")
        } catch (error) {
            if (error.data) {
                toast.error(error.data.error)
            } else {
                toast.error(error.message)
            }
        }
    }

    // create comment
    const [createCommentApi, { isLoading: isCreateCommentLoading }] = useCreateCommentMutation()

    // get post comments
    const { data: comments, isLoading: isCommentsLoading, isError: isCommentsError } = useGetPostCommentsQuery({ postId: post?._id }, { skip: !post?._id })

    const handleCreateComment = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error("You are not authorized to create a comment.")
            return
        }
        try {
            await createCommentApi({ comment, userId: user?._id, postId: post?._id }).unwrap()
            toast.success("Comment has been created successfully.")
            setComment("")
        } catch (error) {
            if (error.data) {
                toast.error(error.data.error)
            } else {
                toast.error(error.message)
            }
        }
    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Container maxWidth="sm" sx={{ mt: "50px", pb: "30px", flex: "1" }}>
                {isPostLoading && (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress size={24} />
                    </Box>
                )}
                {isPostError && (
                    <Typography variant="h6" textAlign="center">
                        Failed to load post.
                    </Typography>
                )}
                {!isPostLoading && !post && !isPostError && (
                    <Typography variant="h6" textAlign="center">
                        Post not found.
                    </Typography>
                )}
                {post && (
                    <>
                        <Box>
                            <Typography sx={{ fontSize: { xs: "21px", sm: "26px" }, mb: "8px" }} fontWeight="bold">
                                {post.title}
                            </Typography>
                            {post.postPicture && (
                                <img src={post.postPicture} alt="Post" style={{ width: "100%", borderRadius: "8px", overflow: "hidden" }} />
                            )}
                            {user?._id === post.userId && (
                                <Stack flexDirection="row" alignItems="center" gap={2} justifyContent="flex-end">
                                    <Link to={`/update-post/${post._id}`}>
                                        <IconButton sx={{ color: "#009975" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={handleOpen} sx={{ color: "#009975" }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <DeletePostModal open={open} handleClose={handleClose} isLoading={isDeletePostLoading} handleDeletePost={handleDeletePost} />
                                </Stack>
                            )}
                            {postUser && (
                                <Box my="10px" px={1}>
                                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                                        <Stack flexDirection="row" alignItems="center" gap={2}>
                                            <Avatar src={postUser.profilePicture} sx={{ width: { xs: 42, sm: 52 }, height: { xs: 42, sm: 52 } }} />
                                            <Typography sx={{ fontSize: { xs: "14px", sm: "17px" } }}>
                                                {postUser.fullName}
                                            </Typography>
                                        </Stack>
                                        <Typography sx={{ fontSize: { xs: "14px", sm: "17px" } }}>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )}
                            <Stack flexDirection="row" alignItems="center" gap={2} sx={{ mt: "20px", px: 1 }}>
                                <Typography>Category:</Typography>
                                <Box sx={{ backgroundColor: "#009975", py: 1, px: 2, borderRadius: "9999px", color: "#ffffff" }}>
                                    {formatCategory(post.category)}
                                </Box>
                            </Stack>
                            <Typography sx={{ px: "8px", mt: "20px", whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                <div dangerouslySetInnerHTML={{ __html: post.desc }} />
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" mt="20px" mb="10px">
                                Comments: {comments?.length || 0}
                            </Typography>
                            <Stack onSubmit={handleCreateComment} component="form" flexDirection="row" alignItems="center" gap={2}>
                                <TextField
                                    type="text"
                                    variant="standard"
                                    fullWidth
                                    placeholder="Comment"
                                    autoComplete="off"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button type="submit" disabled={isCreateCommentLoading} variant="contained" sx={{
                                    "&.Mui-disabled": {
                                        backgroundColor: theme.palette.primary.main
                                    },
                                    width: "110px",
                                    height: "38px"
                                }}>
                                    {isCreateCommentLoading ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Comment"}
                                </Button>
                            </Stack>
                            {isCommentsLoading && (
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress size={24} />
                                </Box>
                            )}
                            {!isCommentsLoading && comments?.length === 0 && (
                                <Typography variant="h6" textAlign="center" mt="20px">
                                    There are no comments for this post yet.
                                </Typography>
                            )}
                            {comments && (
                                <Stack gap={3} mt="20px">
                                    {comments.map((c) => (
                                        <Comment key={c._id} comment={c} />
                                    ))}
                                </Stack>
                            )}
                        </Box>
                    </>
                )}
            </Container>
            <Footer />
        </Box>
    )
}

export default PostPage
