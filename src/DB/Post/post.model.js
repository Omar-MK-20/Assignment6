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


/**
 * Function that generates a dummy data to use in testing api.
 * `Post` data
 */
export async function createBulkPosts()
{
    // 1️⃣ Fetch user IDs dynamically
    const users = await User.findAll({
        attributes: ["id"],
        raw: true,
    });

    const userIds = users.map(u => u.id);

    if (!userIds.length)
    {
        throw new Error("No users found in database");
    }

    // 2️⃣ Post titles & contents
    const titles = [
        "Understanding REST APIs",
        "Introduction to Node.js",
        "Sequelize ORM Basics",
        "Working with Databases in Node.js",
        "Authentication with JWT",
        "Authorization vs Authentication",
        "Building CRUD APIs",
        "Handling Errors in Express",
        "Middleware Explained",
        "Async/Await in JavaScript",
        "Promises in JavaScript",
        "Database Relationships Explained",
        "One-to-Many Associations",
        "Many-to-Many Associations",
        "REST vs GraphQL",
        "What is MVC Architecture?",
        "Best Practices for API Design",
        "How HTTP Works",
        "Understanding Status Codes",
        "Secure Password Storage",
    ];

    const contents = [
        "This post explains the fundamentals of REST APIs and how clients and servers communicate using HTTP methods.",
        "Learn how Node.js works under the hood and why it is ideal for building scalable backend applications.",
        "Sequelize is a powerful ORM that simplifies database interactions using JavaScript models.",
        "Databases are the backbone of most applications. This article covers how to connect and query them in Node.js.",
        "JWT authentication is a popular method for securing APIs. This guide walks you through its implementation.",
        "Authentication verifies identity, while authorization determines access levels. Learn the difference here.",
        "CRUD operations form the basis of most applications. This article demonstrates how to build them step by step.",
        "Error handling is crucial for stable applications. Learn how to handle and log errors properly in Express.",
        "Middleware functions run between requests and responses. Understand how they work and why they matter.",
        "Async/Await simplifies asynchronous code and makes it easier to read and maintain.",
        "Promises represent the eventual result of asynchronous operations. Learn how to use them effectively.",
        "Understanding database relationships helps you design efficient data models.",
        "One-to-many relationships are common in databases. This post explains how to implement them using Sequelize.",
        "Many-to-many relationships require join tables. Learn how to model them correctly.",
        "REST and GraphQL are popular API styles. This article compares their strengths and weaknesses.",
        "MVC architecture separates concerns and improves code maintainability.",
        "Good API design leads to better developer experience and fewer bugs.",
        "HTTP is the foundation of the web. This post explains requests, responses, and headers.",
        "Status codes tell clients what happened during a request. Learn the most important ones.",
        "Storing passwords securely is critical. This guide covers hashing and best practices.",
    ];

    // 3️⃣ Generate posts
    const posts = [];

    for (let i = 0; i < 50; i++)
    {
        posts.push({
            title: `${titles[i % titles.length]} #${i + 1}`,
            content: contents[i % contents.length],
            UserId: userIds[i % userIds.length],
        });
    }

    // 4️⃣ Insert
    await Post.bulkCreate(posts);
}