import express from 'express';
import { syncDBConnection, testDBConnection } from './DB/Connection.js';
import { createBulkComments } from './DB/Comment/comment.model.js';
import { createBulkPosts } from './DB/Post/post.model.js';
import { createBulkUsers } from './DB/User/user.model.js';
import { postRouter } from './Modules/Post/post.controller.js';
import { userRouter } from './Modules/User/user.controller.js';
import { ResponseError } from './util/ResponseError.js';



export async function bootstrap()
{
    await testDBConnection();

    await syncDBConnection({ alter: false, force: false });

    // create bulk data to test the api upon
    // uncomment only in the first run 
    // await createBulkUsers();
    // await createBulkPosts();
    // await createBulkComments();




    const port = 3000;
    const server = express();


    server.use(express.json());

    server.use("/users", userRouter);
    server.use("/posts", postRouter);

    server.use((err, req, res, next) =>
    {
        if (err instanceof ResponseError)
        {
            return res.status(err.statusCode).json({ error: err.message, statusCode: err.statusCode, info: err.info });
        }

        res.status(500).json({ error: 'Server Error', message: err.message, stack: err.stack, name: err.name, err });
    });

    server.use((req, res, next) =>
    {
        res.status(404).json({ error: "Endpoint not found" });
    });

    server.listen(port, () =>
    {
        console.log(`Server is running on port :: ${port}`);
    });

}