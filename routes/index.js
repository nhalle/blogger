var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* home pages*/
router.get('/', ctrlHome.home);

/* Blog pages */
router.get('/blog',ctrlBlog.blogList);
router.get('/blog/add', ctrlBlog.blogAdd);

module.exports = router;
