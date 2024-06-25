import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useGetUserQuery } from "../redux/user/usersApi";
import { Link } from "react-router-dom";
import formatCategory from "../utils/formatCategory";

const PostCard = ({ post }) => {
    // Get user data for the post
    const { data: userData } = useGetUserQuery({ userId: post.userId });

    if (!userData) return null;

    return (
        <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }} elevation={2}>
                <CardMedia
                    component="img"
                    image={post.postPicture}
                    height="200"
                />
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <div className="p-0 m-0">
                        <Box fontSize="12px" sx={{ backgroundColor: "#009975", py: 0, px: 2, borderRadius: "9999px", display: "inline-block", fontWeight: "bold" }}>
                            {formatCategory(post.category)}
                        </Box>
                    </div>
                    <Typography fontSize="14px" sx={{ pt: 2, fontWeight: "bold", minHeight: "48px" }}>
                        {post.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </CardContent>
                <CardHeader
                    avatar={
                        <Avatar
                            src={userData.profilePicture}
                            sx={{ width: 35, height: 35, border: '2px solid white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
                        />
                    }
                    title={userData.fullName}
                />
            </Card>
        </Link>
    );
};

export default PostCard;
