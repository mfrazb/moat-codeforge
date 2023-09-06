const postController = require('./../Controllers/postController');

describe('postController', () => {
    describe('postController.getPosts', () => {
        it('Should get all posts when category is not specified', async() => {})

        it('Should get all posts belonging to a correctly specified category', async()=>{})

        it('Should return an error if the category is not a defined category', async() => {})
    })

    describe('postController.votePost', () => {
        it('Should increment voting when user votes', () => {})

        it('Should remove voting when user sends another request', () => {})
    
    })

    describe('postController.createPost', () => {
        it('Should return an error if properties passed in are undefined', ()=>{})

        it('Should add post to the database', ()=>{})

    })


})