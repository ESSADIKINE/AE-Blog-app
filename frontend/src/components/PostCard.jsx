import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useGetUserQuery } from "../redux/user/usersApi";
import { Link } from "react-router-dom";
import formatCategory from "../utils/formatCategory";

const PostCard = ({ post }) => {
    // Get user data for the post
    const { data: userData } = useGetUserQuery({ userId: post.userId });

    if (!userData) return null;

    return (
        <Card sx={{ maxWidth: "440px" }} elevation={2}>
            <Link to={`/post/${post.slug}`}>
                <CardMedia
                    component={"img"}
                    image={post.postPicture}
                    height={"200"}
                />
            </Link>
            <CardContent>
                <div className="p-0 m-0"><Box fontSize={"12px"} sx={{ backgroundColor: "#009975", py: 0, px: 2, borderRadius: "9999px", display: "inline-block", fontWeight: "bold" }}>
                    {formatCategory(post.category)}
                </Box></div>
                <Typography fontSize={"14px"} sx={{p: 1, display:"inline", fontWeight: "bold" }} noWrap>
                    {post.title}
                </Typography>
                <Typography fontSize={"12px"} noWrap>
                    {post.desc}
                </Typography>

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
    );
};

export default PostCard;
