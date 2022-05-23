const express = require ('express')
const router = express.Router();
const postController = require('../controller/PostController');


router.post('/create', postController.createPost);
router.post('/like', postController.like);
router.post('/unlike', postController.unlike);
router.get('/fetch', postController.fetchPosts);
// router.post('/comment/:postID', postController.comment);

module.exports = router;