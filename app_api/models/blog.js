var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    author: String,
    email: String,
    blogTitle: String,
    blogText: String,
    createdOn: String
});


mongoose.model('Blog', blogSchema);
