import { useTheme } from "@emotion/react"
import { Avatar, Box, Button, CircularProgress, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, Paper, CssBaseline } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ClearIcon from '@mui/icons-material/Clear'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useCreatePostMutation } from "../redux/posts/postsApi"
import { toast } from "react-toastify"
import { categories } from "../utils/constants"
import usePreviewImg from "../hooks/usePreviewImg"

const CreatePostPage = () => {
    const theme = useTheme()

    const navigate = useNavigate()

    const { user } = useSelector((state) => state.user)

    const { handleImgChange, previewImg, setPreviewImg } = usePreviewImg()

    const [inputs, setInputs] = useState({
        title: "",
        desc: "",
        category: ""
    })
    const postPictureRef = useRef(null)

    const [createPostApi, { isLoading }] = useCreatePostMutation()

    const handleCreatePost = async (e) => {
        e.preventDefault()
        try {
            const res = await createPostApi({ ...inputs, userId: user._id, postPicture: previewImg }).unwrap()

            toast.success("Post is created successfully.")
            setInputs({
                title: "",
                desc: "",
                category: ""
            })
            setPreviewImg(null)
            navigate(`/post/${res.slug}`)
            
        } catch (error) {
            if (error.data) {
                toast.error(error.data.error)
                return
            } else {
                toast.error(error.message)
                return
            }
        }
    }

    return (
        <Grid container component="main" sx={{ height: '93vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={4}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?left)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={4}
                md={4}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="xl">
                    <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: "14px" }}>
                        Create Post
                    </Typography>
                    <Stack onSubmit={handleCreatePost} component="form" gap={3}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: 0
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: 0
                                    },
                                    PaperProps: {
                                        style: {
                                            height: "200px"
                                        }
                                    }
                                }}
                                value={inputs.category}
                                onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
                            >
                                {categories.map((c) => (
                                    <MenuItem key={c.name} value={c.urlName}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Post Title"
                            name="title"
                            autoComplete="off"
                            value={inputs.title}
                            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                        />
                        <TextField
                            required
                            fullWidth
                            id="desc"
                            label="Description"
                            name="desc"
                            autoComplete="off"
                            multiline
                            rows={7}
                            value={inputs.desc}
                            onChange={(e) => setInputs({ ...inputs, desc: e.target.value })}
                        />
                        <IconButton onClick={() => postPictureRef.current.click()} sx={{ alignSelf: "flex-start" }}>
                            <AddPhotoAlternateIcon sx={{ width: "32px", height: "32px" }} />
                        </IconButton>
                        <input type="file" hidden ref={postPictureRef} onChange={handleImgChange} />
                        {previewImg && (
                            <Box position={"relative"} mt={2}>
                                <IconButton onClick={() => setPreviewImg(null)} sx={{ position: "absolute", top: "-44px", right: "4px" }}>
                                    <ClearIcon sx={{ width: "30px", height: "30px" }} />
                                </IconButton>
                                <img src={previewImg} style={{ borderRadius: "6px", overflow: "hidden", width: "100%" }} />
                            </Box>
                        )}
                        <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{
                            "&.Mui-disabled": {
                                backgroundColor: theme.palette.primary.main
                            }
                        }}>
                            {isLoading ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Post"}
                        </Button>
                    </Stack>
                </Container>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={4}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?right)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    )
}

export default CreatePostPage
