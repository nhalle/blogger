var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({   // Lab 6
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlBlog = require('../controllers/blog');
var ctrlAuth = require('../controllers/authentication'); //lab 6

/* Sets up routes to API URLs */
router.post('/blog', auth, ctrlBlog.blogCreate);
router.get('/blog/:blogid', ctrlBlog.blogReadOne);
router.get('/blog', ctrlBlog.blogList);
router.put('/blog/:blogid', auth, ctrlBlog.blogUpdateOne);
router.delete('/blog/:blogid', auth, ctrlBlog.blogDeleteOne);
router.post('/register', ctrlAuth.register);  // Lab 6
router.post('/login', ctrlAuth.login);  // Lab 6

module.exports = router;
