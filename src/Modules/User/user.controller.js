import { Router } from "express";
import { getByEmail, getById, signup, updateOrCreate } from "./user.service.js";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) =>
{
    const result = await signup(req.body);

    res.status(201).json(result);
});

userRouter.patch("/:id", async (req, res) =>
{
    const { id } = req.params;
    console.log(req.params);
    const result = await updateOrCreate(id, req.body);

    res.status(200).json(result);
});

userRouter.get("/by-email", async (req, res) =>
{
    const { email } = req.query;
    const result = await getByEmail(email);

    res.status(200).json(result);
});

userRouter.get("/:id", async (req, res) =>
{
    const { id } = req.params;
    const result = await getById(id);

    res.status(200).json(result);
});