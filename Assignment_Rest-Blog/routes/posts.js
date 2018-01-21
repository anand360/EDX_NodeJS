module.exports = {
    getPosts(req, res) {
        res.status(200).json(req.store.posts);
    },
    addPost(req, res) {
        req.store.posts.push(req.body);
        res.status(200).send("New post saved.");
    },
    updatePost(req, res) {
        req.store.posts[req.params.postId] = Object.assign(req.store.posts[req.params.postId], req.body);
        res.status(200).send("Post is updated.");
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postId, 1);
        res.status(200).send("Post is deleted.");
    }
  };