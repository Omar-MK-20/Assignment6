import { Post } from "../../DB/Post/post.model.js";
import { User } from "../../DB/User/user.model.js";
import { ResponseError } from "../../util/ResponseError.js";

export async function createPost(bodyData)
{
    const { UserId } = bodyData;

    const existUser = await User.findByPk(UserId);

    if (!existUser)
    {
        throw new ResponseError("User not found", 404, { UserId: UserId });
    }

    const newPost = new Post({ title: bodyData.title, content: bodyData.content, UserId: bodyData.UserId });

    const result = await newPost.save();

    return { message: "Post created successfully", result };
}

export async function deletePost(postId, bodyData)
{
    const { UserId } = bodyData;

    const existPost = await Post.findByPk(postId);

    if (!existPost)
    {
        throw new ResponseError("post not found", 404, { postId: postId });
    }

    // searching for the post that owned by the `UserId`
    const usersPost = await Post.findOne({ where: { id: postId, UserId: UserId } });

    if (!usersPost)
    {
        throw new ResponseError("You are not authorized to delete this post", 403, { reason: "Forbidden" });
    }

    const result = await Post.destroy({ where: { id: postId, UserId: UserId } });

    return { message: "Post deleted successfully", result };
}