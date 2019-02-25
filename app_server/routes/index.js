var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* home pages*/
router.get('/', ctrlHome.home);

/* Blog pages */
router.get('/blog',ctrlBlog.blogList);
router.get('/blog/add', ctrlBlog.blogAdd);
router.get('/blog/edit', ctrlBlog.blogEdit);
router.get('/blog/delete', ctrlBlog.blogDelete);

module.exports = router;
