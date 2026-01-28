import { col, fn } from "sequelize";
import { Comment } from "../../DB/Comment/comment.model.js";
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

export async function getDetails()
{
    const posts = await Post.findAll({
        include: [
            { model: User, attributes: ["id", "name"] },
            { model: Comment, attributes: ["id", "content"] }
        ],
        attributes: ["id", "title"]
    });

    if (!posts.length)
    {
        throw new ResponseError("No posts found", 404);
    }

    return { message: "success", result: posts };
}

export async function getCommentCount()
{
    const posts = await Post.findAll({
        attributes: ["id", "title", [fn("COUNT", col("comments.id")), "CommentCount"]],
        include: { model: Comment, attributes: [] },
        group: ["id"]
    });

    return { message: "success", result: posts };
}