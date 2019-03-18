var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

router.post('/blog', ctrlBlog.blogCreate);
router.get('/blog/:blogid', ctrlBlog.blogReadOne);
router.get('/blog', ctrlBlog.blogList);
router.put('/blog/:blogid', ctrlBlog.blogUpdateOne);
router.delete('/blog/:blogid', ctrlBlog.blogDeleteOne);

module.exports = router;
