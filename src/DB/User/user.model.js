import { DataTypes } from "sequelize";
import { sequelize } from "../Connection.js";
import { ResponseError } from "../../util/ResponseError.js";


export const User = sequelize.define('User',
    {
        name: { type: DataTypes.STRING(50), allowNull: false },

        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                checkPasswordLength(password)
                {
                    if (password.length <= 6)
                    {
                        throw new ResponseError("Password must be more than 6 characters", 422);
                    }
                }
            }
        },

        role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
    },
    {
        timestamps: true
    }
);


User.beforeCreate("checkNameLength", (user) =>
{
    if (user.name.length <= 2)
    {
        throw new ResponseError("Name must be more than 2 characters");
    }
});