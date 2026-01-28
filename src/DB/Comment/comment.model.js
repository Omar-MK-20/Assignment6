import { DataTypes, Model } from "sequelize";
import { User } from "../User/user.model.js";
import { Post } from "../Post/post.model.js";
import { sequelize } from "../Connection.js";

export class Comment extends Model { }

Comment.init({
    content: { type: DataTypes.TEXT, allowNull: false }
},
    {
        sequelize,
        modelName: "Comment",
        timestamps: true
    });


User.hasMany(Comment, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: { allowNull: false } });
Comment.belongsTo(User);

Post.hasMany(Comment, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: { allowNull: false } });
Comment.belongsTo(Post);


/**
 * Function that generates a dummy data to use in testing api.
 * `Comment` data
 */
export async function createBulkComments()
{
    // 1️⃣ Fetch IDs dynamically
    const users = await User.findAll({
        attributes: ["id"],
        raw: true,
    });

    const posts = await Post.findAll({
        attributes: ["id"],
        raw: true,
    });

    const userIds = users.map(u => u.id);
    const postIds = posts.map(p => p.id);

    if (!userIds.length || !postIds.length)
    {
        throw new Error("Users or Posts table is empty");
    }

    // 2️⃣ Comment content pool
    const commentContents = [
        "Great explanation, very easy to understand.",
        "This post helped clarify a lot of things for me.",
        "Thanks for sharing this useful information.",
        "I really like how you explained this topic.",
        "Well written and informative.",
        "This answered a question I had for a while.",
        "Looking forward to more posts like this.",
        "Nice breakdown of the concepts.",
        "This is exactly what I was looking for.",
        "Very helpful, thanks!",
        "Clear and concise explanation.",
        "I appreciate the examples you included.",
        "This makes much more sense now.",
        "Good overview of the topic.",
        "Helpful content, keep it up.",
        "I learned something new today.",
        "Thanks for taking the time to write this.",
        "Simple explanation, well done.",
        "This topic is explained very clearly.",
        "Great post, keep sharing.",
    ];

    // 3️⃣ Generate comments
    const comments = [];

    for (let i = 0; i < 150; i++)
    {
        comments.push({
            content: commentContents[i % commentContents.length],
            UserId: userIds[i % userIds.length],
            PostId: postIds[i % postIds.length],
        });
    }

    // 4️⃣ Insert
    await Comment.bulkCreate(comments);
}