/* GET 'bloglist' page */
module.exports.blogList= function(req, res){
    res.render('blog-list', { title: 'Blog List' });
};

/* GET 'Blog Add' page */
module.exports.blogAdd = function(req, res){
    res.render('blog-add', { title: 'Blog Add' });
};
