var mongoose = require('mongoose');
var blogModel = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

/* POST a new blog */
/* /api/blog */
module.exports.blogCreate = function(req, res) {
    console.log(req.body);
    blogModel
	.create({
	    author: req.body.author,
      email: req.body.email,
	    blogTitle: req.body.blogTitle,
	    blogText: req.body.blogText,
      createdOn: req.body.createdOn
	}, function(err, blog) {
	    if (err) {
		console.log(err);
		sendJSONresponse(res, 400, err);
	    } else {
		console.log(blog);
		sendJSONresponse(res, 201, blog);
	    }
	});
};

/* GET a blog by the id */
module.exports.blogReadOne = function(req,res) {
    console.log('Finding a single blog', req.params);
    if (req.params && req.params.blogid) {
	blogModel
	    .findById(req.params.blogid)
	    .exec(function(err, blog) {
		if (!blog) {
		    sendJSONresponse(res, 404, {
			"message": "id not found"
		    });
		    return;
		} else if (err) {
		    console.log(err);
		    sendJSONresponse(res, 404, err);
		    return;
		}
		console.log(blog);
		sendJSONresponse(res, 200, blog);
	    });
    } else {
	console.log('No id specified');
	sendJSONresponse(res, 404, {
	    "message": "No id in request"
	});
    }
};

/* GET a list of all Blogs */
module.exports.blogList = function(req, res) {
    console.log('Getting blogs list');
    blogModel
        .find()
        .exec(function(err, results) {
	    if (!results) {
		sendJSONresponse(res, 404, {
		    "message": "no blogs found"
		});
		return;
	    } else if (err) {
		console.log(err);
		sendJSONresponse(res, 404, err);
		return;
	    }
	    console.log(results);
	    sendJSONresponse(res, 200, buildBlogList(req, res, results));
	});
};

var buildBlogList = function(req, res, results){
    var blogs = [];
    results.forEach(function(obj) {
	blogs.push({
	    author: obj.author,
      email: obj.email,
	    blogTitle: obj.blogTitle,
	    blogText: obj.blogText,
      createdOn: obj.createdOn,
	    _id: obj._id
	});
    });
    return blogs;
};

/* Update one Blog entry */
module.exports.blogUpdateOne = function(req, res) {
    console.log("Updating a blog entry with id of " + req.params.blogid);
    console.log(req.body);
    blogModel
	.findOneAndUpdate(
	    { _id: req.params.blogid },
	    { $set: {"blogTitle": req.body.blogTitle, "blogText": req.body.blogText, "createdOn": req.body.createdOn}}
	)
	.exec(
	    function(err, response) {
		if (err) {
		    sendJSONresponse(res, 400, err);
		} else {
		    sendJSONresponse(res, 201, response);
		}
	    }
	);
};

/* Delete blog entry */
module.exports.blogDeleteOne = function(req, res) {
    console.log("Deleting blog entry with id of " + req.params.blogid);
    console.log(req.body);
    blogModel
        .findByIdAndRemove(req.params.blogid)
        .exec (
	    function(err, response) {
		if (err) {
		    sendJSONresponse(res, 404, err);
		} else {
		    sendJSONresponse(res, 204, null);
		}
	    }
	);
};
