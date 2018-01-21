module.exports = {
    getComments(req, res) {
      var commentData = req.store.posts[req.params.postId].comments;
      res.status(200).send(commentData);
    }, 
    addComment(req, res) {
      let comments = req.store.posts[req.params.postId].comments;
      if(comments === undefined){
        req.store.posts[req.params.postId]["comments"] = [];
      }
      req.store.posts[req.params.postId].comments.push(req.body.comments);
      res.status(200).send("Comment is added.");
    },
    updateComment(req, res) {
      req.store.posts[req.params.postId].comments[req.params.commentId] = req.body.comments;
      res.status(200).send("Comment is updated.");
    },
    removeComment(req, res) {
      req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1);
      res.status(200).send("Comment is deleted.");
    }  
  };