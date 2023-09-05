const express = require('express');

const postController = require('../Controllers/postController');

const router = express.Router();

router.post('/createpost', postController.createPost, (req, res) => {
    res.status(200).json({ message: 'Created post!'})
})

router.post('/getposts', postController.getPosts, (req, res) => {
    res.status(200).json(res.locals.allPosts)
})
// route middleware still needs work
router.patch('/vote', postController.votePost, (req, res) => {
    res.status(200).json({ message: 'Voted post!'})
})



module.exports = router;