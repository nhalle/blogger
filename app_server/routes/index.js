var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* home pages*/
router.get('/', ctrlHome.home);

/* Blog pages */
router.get('/blog',ctrlBlog.blogList);
router.get('/blog/add', ctrlBlog.add);
router.post('/blog/add',ctrlBlog.addBlog);
router.get('/blog/edit/:id', ctrlBlog.edit);
router.post('/blog/edit/:id', ctrlBlog.blogPost);
router.get('/blog/delete/:id', ctrlBlog.del);
router.post('/blog/delete/:id', ctrlBlog.deletePost);

module.exports = router;
