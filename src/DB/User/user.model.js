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
                        throw new ResponseError("Custom validation: Password must be more than 6 characters", 422);
                    }
                }
            }
        },

        role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user", allowNull: false }
    },
    {
        timestamps: true
    }
);


User.beforeCreate("checkNameLength", (user) =>
{
    if (user.name.length <= 2)
    {
        throw new ResponseError("`beforeCreate` Hook: Name must be more than 2 characters");
    }
});

/**
 * Function that generates a dummy data to use in testing api.
 * `User` data
 */
export async function createBulkUsers()
{
    const names = [
        "Omar Mohamed",
        "Ahmed Ali",
        "Sara Hassan",
        "Mohamed Adel",
        "Yara Khaled",
        "Khaled Samy",
        "Nour ElDin",
        "Mona Ibrahim",
        "Hassan Fathy",
        "Laila Mostafa",
        "Amr Youssef",
        "Dina Farouk",
        "Karim Nabil",
        "Rana Magdy",
        "Tarek Mahmoud",
        "Salma Ashraf",
        "Eslam Reda",
        "Heba Said",
        "Mostafa Kamal",
        "Aya Sherif",
        "Mahmoud Salah",
        "Nada Ibrahim",
    ];

    const users = [];

    for (let i = 0; i < names.length; i++)
    {
        const emailSlug = names[i].toLowerCase().replace(/\s+/g, ".");

        users.push({
            name: names[i],
            email: `${emailSlug}@email.com`,
            password: `${names[i].split(" ")[0]}@123`, // hashed via hook
            role: i % 6 === 0 ? "admin" : "user", // every 6th user is admin
        });
    }

    await User.bulkCreate(users);
}

