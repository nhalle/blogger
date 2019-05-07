var mongoose = require('mongoose');
var blogModel = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};



/* POST a new review, providing a blogid */
/* /api/blog/:blogid/cmt */
module.exports.cmtCreate = function(req, res) {
  console.log("Reviewing");
  console.log('Finding a single blog', req.params);
  console.log(req.params.blogid);
  blogModel
    .findbyID(req.params.blogid)
    .exec(
      function(err, blog){
        if(err){
          console.log("err");
          sendJSONresponse(res,400, err);
        }
        else{
          console.log("okay");
          doAddReview(req,res,blog);
        }
      }

    );

};

/* POST a new review, providing a blogid
module.exports.cmtList= function(req, res) {
  console.log("Reviewing");
  blogModel
    .findbyId(req.params.blogid)
    .select('cmts')
    .exec(
      function(err, blog){
        if(err){
          sendJSONresponse(res,400, err);
        }
        else{
          doAddReview(req,res,blog);
        }
      }

    );

};
*/

var doAddReview = function(req, res, blog) {
  console.log("doAddReview");
  if (!blog) {
    sendJSONresponse(res, 404, "blogid not found");
  } else {
    blog.cmts.push({
      author: req.body.author,
      email: req.body.email,
      cmtText: req.body.cmtText,
      rating: req.body.rating
    });
    blog.save(function(err, blog) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(blog._id);
        thisReview = blog.cmts[blog.cmts.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(blogid) {
  console.log("Update rating average for", blogid);
  blogModel
    .findById(blogid)
    .select('cmts')
    .exec(
      function(err, blog) {
        if (!err) {
          doSetAverageRating(blog);
        }
      });
};

var doSetAverageRating = function(blog) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (blog.cmts && blog.cmts.length > 0) {
    reviewCount = blog.cmts.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + blog.cmts[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    blog.rating = ratingAverage;
    blog.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

/*
module.exports.cmtReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.blogid && req.params.cmtid) {
    blogModel
      .findById(req.params.blogid)
      .exec(
        function(err, blog) {
          console.log(blog);
          var response, cmt;
          if (!blog) {
            sendJSONresponse(res, 404, {
              "message": "blogid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }

          if (blog.cmts && blog.cmts.length > 0) {
            cmt = blog.cmts.id(req.params.cmtid);
            if (!cmt) {
              sendJSONresponse(res, 404, {
                "message": "cmtid not found"
              });
            } else {
              response = {
                blog: {
                  id: req.params.blogid
                },
                cmts: cmt
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No comments found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, blogid and cmtid are both required"
    });
  }
};
*/

// app.delete('/api/blog/:blogid/cmts/:cmtid'
module.exports.cmtDeleteOne = function(req, res) {
  if (!req.params.blogid || !req.params.cmtid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, blogid and cmtid are both required"
    });
    return;
  }
  blogModel
    .findById(req.params.blogid)
    .select('cmt')
    .exec(
      function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (blog.cmts && blog.cmts.length > 0) {
          if (!blog.cmts.id(req.params.cmtid)) {
            sendJSONresponse(res, 404, {
              "message": "cmtid not found"
            });
          } else {
            blog.cmts.id(req.params.cmtid).remove();
            blog.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(blog._id);
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No comment to delete"
          });
        }
      }
  );
};
