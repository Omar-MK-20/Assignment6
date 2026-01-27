import { DataTypes, Model } from "sequelize";
import { User } from "../User/user.model.js";
import { sequelize } from "../Connection.js";

export class Post extends Model { }

Post.init(
    {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Post",
        timestamps: true,
        paranoid: true
    });

User.hasMany(Post, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: { allowNull: false } });
Post.belongsTo(User);