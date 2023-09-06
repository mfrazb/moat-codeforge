const pool = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const text = `
INSERT INTO users(username, password, email)
VALUES ($1, $2, $3);`

const values = [
    ['john$456', '1234', 'thebestemail@gmail.com'],
    ['yeezuspeezus', '789', 'emailnumerodos@gmail.com'],
    ['testuser', 'pass', 'testuser@gmail.com'],
    ['user1', '1234', 'user1@gmail.com'],
]

/**
 * Adds test values into the users database
 */
values.forEach(async (element) => {
    element[1] = bcrypt.hashSync(element[1], SALT_ROUNDS);
    await pool.query(text, element);
})

const postsQuery = `
INSERT INTO posts(user_id, title, link, description, category, type)
VALUES ($1, $2, $3, $4, $5, $6);`

const postsValues = [
    ['1', 'JavaScript Algorithms and Data Structures tutorial from FreeCodeCamp', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', 'A step by step tutorial on algorithms and data structures.', 'algorithms', 'tutorial'],
    ['1', 'JavaScript Algorithms and Data Structures tutorial from FreeCodeCamp', 'https://www.youtube.com/watch?v=hQAHSlTtcmY', 'A 30 minute YouTube video on React.', 'react', 'video'],
    ['1', 'Test', 'https://mui.com/material-ui/react-text-field/', 'Help learning react, it\'s a pain', 'algorithms', 'article'],
    ['2', 'Learn React', 'https://mui.com/material-ui/react-dialog/', 'Help learning react, it\'s a pain', 'algorithms', 'article'],
]

postsValues.forEach(async(element) => {
    await pool.query(postsQuery, element);
})