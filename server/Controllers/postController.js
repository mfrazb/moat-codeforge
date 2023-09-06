const db = require('../Models/UserModel.js');
const express = require('express');


const postController = {};

postController.createPost = async (req, res, next) => {
    try {
        const { title, type, category, userId, link, description } = req.body;
        const createPostQuery = `INSERT INTO posts (user_id, title, link, description, category, type) VALUES ($1, $2, $3, $4, $5, $6);`;
        const params = [userId, title, link, description, category, type];
        await db.query(createPostQuery, params);
        return next();
    } catch(err) {
        return next({
            log: `postController.createPost: Error ${err}`,
            message: { err: 'Error occurred in postController.createPost'}
        });
    }
}

postController.getPosts = async (req, res, next) => {
    try {
        const { category } = req.body;
        const getPostsQuery = `SELECT * FROM posts WHERE category = $1;`;
        const params = [category];
        const allPosts = await db.query(getPostsQuery, params);
        res.locals.allPosts = allPosts.rows;
        return next();
    } catch (err) {
        return next({
            log: `postController.getPosts: Error ${err}`,
            message: { err: 'Error occurred in postController.getPosts'}
        });
    }
}
// unfinished and untested route
postController.votePost = async (req, res, next) => {
    try {
        const { vote, link } = req.body;
        let getPostQuery;
        if (vote === 'up') {
            getPostQuery = `UPDATE posts SET upvotes = upvotes + 1 WHERE link = $1 RETURNING *`
        }
        if (vote === 'down') {
            getPostQuery = `UPDATE posts SET upvotes = upvotes - 1 WHERE link = $1 RETURNING *`
        }
        const params = [link];
        const updatedPost = await db.query(getPostQuery, params)
        res.locals.votes = updatedPost
        return next();
    } catch(err) {
        return next({
            log: `postController.getPosts: Error ${err}`,
            message: { err: 'Error occurred in postController.getPosts'}
        });
    }
}

module.exports = postController;