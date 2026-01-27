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