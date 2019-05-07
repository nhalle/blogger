var mongoose = require('mongoose');

var cmtSchema = new mongoose.Schema({
    author: String,
    email: String,
    cmtText: {type: String, required: true},
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    createdOn: String
});

var blogSchema = new mongoose.Schema({
    author: String,
    email: String,
    blogTitle: String,
    blogText: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    createdOn: String,
    cmts: [cmtSchema]
});

mongoose.model('Blog', blogSchema);
