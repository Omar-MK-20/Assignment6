import { Router } from "express";
import { createBulkComments, findOrCreateComment, getCommentById, getThreeComment, searchComment, updateComment } from "./comment.service.js";

export const commentRouter = Router();

commentRouter.post("/", async (req, res) =>
{
    const result = await createBulkComments(req.body);

    res.status(201).json(result);
});

commentRouter.patch("/:commentId", async (req, res) =>
{
    const { commentId } = req.params;

    const result = await updateComment(commentId, req.body);

    res.status(200).json(result);

});

commentRouter.post("/find-or-create", async (req, res) =>
{
    const result = await findOrCreateComment(req.body);

    res.status(result.statusCode).json(result);
});

commentRouter.get("/search", async (req, res) =>
{
    const { word } = req.query;

    const result = await searchComment(word);

    res.status(200).json(result);
});

commentRouter.get("/newest/:PostId", async (req, res) =>
{
    console.log(req.params);

    const { PostId } = req.params;

    const result = await getThreeComment(PostId);

    res.status(200).json(result);
});

commentRouter.get("/details/:id", async (req, res) =>
{
    const { id } = req.params;

    const result = await getCommentById(id);

    res.status(200).json(result);
})



