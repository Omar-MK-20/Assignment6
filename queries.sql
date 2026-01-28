-- Active: 1766933187103@@127.0.0.1@3306@assignment6
CREATE DATABASE Assignment6;

USE Assignment6;

SELECT * FROM posts;
JOIN comments
ON comments.`PostId` = posts.id