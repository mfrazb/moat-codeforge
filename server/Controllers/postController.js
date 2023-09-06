const db = require('../Models/UserModel.js');
const express = require('express');


const postController = {};

// Takes post request properties and sets up postgres query
postController.createPost = async (req, res, next) => {
    try {
        // destructuring the below categories from request body
        const { title, type, category, userId, link, description } = req.body;
        const createPostQuery = `INSERT INTO posts (user_id, title, link, description, category, type) VALUES ($1, $2, $3, $4, $5, $6);`;
        // creating paramaters to later be used in db Query
        const params = [userId, title, link, description, category, type];
        // use query method to extract desired fields from DB
        db.query(createPostQuery, params);
        return next();
    // if there is an error log and return string back to 
    } catch(err) {
        return next({
            log: `postController.createPost: Error ${err}`,
            message: { err: 'Error occurred in postController.createPost'}
        });
    }
}

// 
postController.getPosts = async (req, res, next) => {
    try {
        // deconstructs category property from request body
        const { category } = req.body;
        const getPostsQuery = `SELECT * FROM posts WHERE category = $1;`;
        // assaign parameter as a nested array of categories 
        const params = [category];
        console.log
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