import { Router, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  sharePost,
} from "../handlers/posts";
import { CreatePostRequest, CommentRequest } from "../interfaces";

const postRouter = Router();

/**
 * @route GET /posts
 * @returns List of posts
 * @description This route is used to get all posts with pagination and filtering options
 */
postRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { data, error } = await getAllPosts(req.query);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /posts
 * @param title, description, location, userId
 * @returns Created post data
 * @description This route is used to create a new post
 */
postRouter.post(
  "/",
  async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
    try {
      const { title, description, location, userId } = req.body;
      const data = await createPost({ title, description, location, userId });
      res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * @route POST /posts/:postId/like
 * @param postId
 * @returns Message indicating like status
 * @description This route handles liking/unliking a post
 */
postRouter.post(
  "/:postId/like",
  async (
    req: Request<{ postId: string }, {}, { userId: string }>,
    res: Response
  ) => {
    const { postId } = req.params;
    const { userId } = req.body; // Assume userId is available in the request body
    try {
      const message = await likePost(postId, userId);
      res.status(200).json({ message });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * @route POST /posts/:postId/comment
 * @param postId, commentText, userId
 * @returns Comment data
 * @description This route adds a comment to a post
 */
postRouter.post(
  "/:postId/comment",
  async (
    req: Request<{ postId: string }, {}, CommentRequest>,
    res: Response
  ) => {
    const { postId } = req.params;
    const { userId, commentText } = req.body;
    try {
      const comment = await addComment(postId, userId, commentText);
      res.status(201).json(comment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * @route POST /posts/:postId/share
 * @param postId, userId
 * @returns Share confirmation message
 * @description This route handles sharing a post
 */
// postRouter.post(
//   "/:postId/share",
//   async (
//     req: Request<{ postId: string }, {}, { userId: string }>,
//     res: Response
//   ) => {
//     const { postId } = req.params;
//     const { userId } = req.body;
//     try {
//       const message = await sharePost(postId, userId);
//       res.status(200).json({ message });
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// );

export default postRouter;
