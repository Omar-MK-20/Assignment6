import { Op } from "sequelize";
import { Comment } from "../../DB/Comment/comment.model.js";
import { ResponseError } from "../../util/ResponseError.js";
import { Post } from "../../DB/Post/post.model.js";
import { User } from "../../DB/User/user.model.js";

export async function createBulkComments(bodyData)
{
    const { comments } = bodyData;

    const result = await Comment.bulkCreate(comments);

    return { message: "Comments created successfully", result };
}

export async function updateComment(commentId, bodyData)
{


    const existComment = await Comment.findByPk(commentId, { attributes: ["id"] });

    if (!existComment)
    {
        throw new ResponseError("Comment doesn't exist", 404, { commentId });
    }

    const { UserId, content } = bodyData;

    const result = await Comment.update({ content: content }, { where: { id: commentId, UserId: UserId } });

    console.log(result[0]);

    if (result[0] == 0)
    {
        throw new ResponseError("You are not authorized to edit this comment", 403, { UserId: UserId });
    }

    return { message: "Comment updated successfully", result };
}

export async function findOrCreateComment(bodyData)
{
    const result = await Comment.findOrCreate({ where: { ...bodyData } });

    if (result[1])
    {
        return { statusCode: 201, message: "Comment Created", result };
    }

    return { statusCode: 200, message: "Success", result };
}

export async function searchComment(word)
{
    const { count, rows: comments } = await Comment.findAndCountAll({
        where: {
            content: { [Op.like]: `%${word}%` }
        }
    });

    if (!count)
    {
        throw new ResponseError("No Comments found", 404, { word: word });
    }

    return { message: "success", count, comments };
}

export async function getThreeComment(PostId)
{
    const comments = await Comment.findAll({
        where: { PostId },
        limit: 3,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'content', 'createdAt']
    });

    if (!comments.length)
    {
        throw new ResponseError("No comments found", 404, { PostId });
    }

    return { message: "success", comments };
}

export async function getCommentById(commentId)
{
    const result = await Comment.findByPk(commentId, {
        include: [
            { model: User, attributes: ['id', 'name', 'email'] },
            { model: Post, attributes: ['id', 'title', 'content'] },
        ],
        attributes: ['id', 'content']
    });

    if (!result)
    {
        throw new ResponseError("No comment found", 404, { commentId });
    }

    return { message: "success", result };
}
