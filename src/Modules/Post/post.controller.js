import { Router } from "express";
import { createPost, deletePost, getCommentCount, getDetails } from "./post.service.js";

export const postRouter = Router();

postRouter.post("/", async (req, res) =>
{
    const result = await createPost(req.body);

    res.status(201).json(result);
});

postRouter.delete("/:postId", async (req, res) =>
{
    const { postId } = req.params;

    const result = await deletePost(postId, req.body);

    res.status(200).json(result);
});

postRouter.get("/details", async (req, res) =>
{
    const result = await getDetails();

    res.status(200).json(result);
});

postRouter.get("/comment-count", async (req, res) =>
{
    const result = await getCommentCount();

    res.status(200).json(result);
});