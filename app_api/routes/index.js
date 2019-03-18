var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

router.post('/blog', ctrlBlog.blogCreate);
router.get('/blog/:id', ctrlBlog.blogReadOne);
router.get('/blog', ctrlBlog.blogList);
router.put('/blog/:id', ctrlBlog.blogUpdateOne);
router.delete('/blog/:id', ctrlBlog.blogDeleteOne);

module.exports = router;
