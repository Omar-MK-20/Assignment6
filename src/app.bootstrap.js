import express from 'express';
import { syncDBConnection, testDBConnection } from './DB/Connection.js';
import { User } from './DB/User/user.model.js';
import { Post } from './DB/Post/post.model.js';
import { Comment } from './DB/Comment/comment.model.js';



export async function bootstrap()
{
    await testDBConnection();

    await syncDBConnection({ alter: false, force: false });


    const port = 3000;
    const server = express();


    server.use(express.json());


    server.use((err, req, res, next) =>
    {
        if (err.status)
        {
            res.status(err.status).json({ "Application Error": err });
        }
        else
        {
            res.status(500).json({ "Server Error": err });
        }
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