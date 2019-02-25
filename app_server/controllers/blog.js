/* GET 'bloglist' page */
module.exports.blogList= function(req, res){
    res.render('blog-list', {
	title: 'Blog List',
	blog: [{
	    author: 'Admin',
	    blogTitle: 'Why?',
	    blogText: 'Why is the sky blue?'
	}, {
	    author: 'Admin',
	    blogTitle: 'Why?',
	    blogText: 'Why is the grass green'
	}, {
	    author: 'Admin',
	    blogTitle: 'Future',
	    blogText: 'What sort of things would you like to blog about?'
	}]
    });
};

/* GET 'Blog Add' page */
module.exports.blogAdd = function(req, res){
    res.render('blog-add', { title: 'Blog Add' });
};

/* GET 'Blog Edit' page */
module.exports.blogEdit = function(req,res){
    res.render('edit', { title: 'Blog Edit' });
};

/* GET 'Blog Delete' page */
module.exports.blogDelete = function(req,res){
    res.render('delete',{ title: 'Blog Delete' });
};
