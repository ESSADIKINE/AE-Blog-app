import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createComment, deleteComment, getAllComments, getPostComments, getTotalNumberOfComments, likeUnlikeComment, updateComment } from "../controllers/commentControllers.js"

const router = express.Router()

router.get("/all", getAllComments)
router.get("/total", getTotalNumberOfComments)
router.get("/post/:postId", getPostComments)
router.post("/create", protectRoute, createComment)
router.put("/update/:commentId", protectRoute, updateComment)
router.put("/like/:commentId", protectRoute, likeUnlikeComment)
router.delete("/delete/:commentId", protectRoute, deleteComment)

export default router