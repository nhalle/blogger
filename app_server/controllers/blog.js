var request = require('request');
var apiOptions = {
    server : "http://localhost"
};

var requestOptions = {
    url : "http://3.89.110.213/api/", method : "GET",
    json : {},
    qs: {}
};

request( requestOptions,
	 function(err, response, body) {
	     if (err) {
		 console.log(err);
	     } else if (response.statusCode === 200) {
		 console.log(body);
	     } else {
		 console.log(response.statusCode);
	     }
	 }
       );



var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
	title = "404, page not found";
	content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
	title = "500, internal server error";
	content = "How embarrassing. There's a problem with our server.";
    } else {
	title = status + ", something's gone wrong";
	content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
	title : title,
	content : content
    });
};


/* GET blog lists */
module.exports.blogList = function(req, res){
    var requestOptions, path;
    path = '/api/blog';
    requestOptions = {
	url : apiOptions.server + path,
	method : "GET",
	json : {},
	qs : {}
    };
    request(
	requestOptions,
	function(err, response, body) {
	    renderListPage(req, res, body);
	}
    );
};

/* Render the Blog list page */
var renderListPage = function(req, res, responseBody){
    res.render('blog-list', {
	title: 'Blog List',
	pageHeader: {
	    title: 'Blog List'
	},
	blog: responseBody
    });
};

/*exres.render('blog-list', {
    title: 'Blog List',
    blog: [{
        author: 'Admin',
        blogTitle: 'Why?',
        blogText: 'Why is the sky blue?'
    }
*/

/* Blog Add */
module.exports.add = function(req, res) {
    res.render('blog-add', { title: 'Blog Add' });
};

/* Blog Add Post */
module.exports.addBlog = function(req, res){
    var requestOptions, path, postdata;
    path = '/api/blog/';

    postdata = {
	author: req.body.author,
	blogTitle: req.body.blogTitle,
	blogText:req.body.blogText
    };

    requestOptions = {
	url : apiOptions.server + path,
	method : "POST",
	json : postdata
    };

    request(
	requestOptions,
	function(err, response, body) {
	    if (response.statusCode === 201) {
		res.redirect('/blog');
	    } else {
		_showError(req, res, response.statusCode);
	    }
	}
    );
};

/* Blog Edit */
module.exports.edit = function(req, res) {
    var requestOptions, path;
    path = "/api/blog/" + req.params.id;
    requestOptions = {
	url : apiOptions.server + path,
	method : "GET",
	json : {}
    };
    request(
	requestOptions,
	function(err, response, body) {
	    renderEditPage(req, res, body);
	}
    );
};


/* Render the Blog edit page */
var renderEditPage = function(req, res, responseBody){
    res.render('edit', {
	title: 'Blog Edit',
	pageHeader: {
	    title: 'Blog Edit'
	},
	blog: responseBody
    });
};


/* Blog Edit Post */
module.exports.blogPost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blog/' + id;

    postdata = {
	author: req.body.author,
	blogTitle: req.body.blogTitle,
	blogText:req.body.blogText
    };

    requestOptions = {
	url : apiOptions.server + path,
	method : "PUT",
	json : postdata
    };

    request(
	requestOptions,
	function(err, response, body) {
	    if (response.statusCode === 201) {
		res.redirect('/blog');
	    } else {
		_showError(req, res, response.statusCode);
	    }
	}
    );
};

/* Blog Delete */
module.exports.del = function(req, res) {
    var requestOptions, path;
    path = "/api/blog/" + req.params.id;
    requestOptions = {
	url : apiOptions.server + path,
	method : "GET",
	json : {}
    };
    request(
	requestOptions,
	function(err, response, body) {
	    renderDeletePage(req, res, body);
	}
    );
};

/* Render the blog delete page */
var renderDeletePage = function(req, res, responseBody){
    res.render('delete', {
	title: 'Blog Delete',
	pageHeader: {
	    title: 'Blog Delete'
	},
	blog: responseBody
    });
};

/* Blog Delete Post */
module.exports.deletePost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blog/' + id;

    requestOptions = {
	url : apiOptions.server + path,
	method : "DELETE",
	json : {}
    };

    request(
	requestOptions,
	function(err, response, body) {
	    if (response.statusCode === 204) {
		res.redirect('/blog');
	    } else {
		_showError(req, res, response.statusCode);
	    }
	}
    );
};
