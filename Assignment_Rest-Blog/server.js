var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var blogApi = require("./routes");

let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        'Cruel…..var { house, mouse} = No type optimization at all',
        'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
        '(p1,p2)=>{ … } ,i understand this ,thank you !'      
      ]
      }
    ]
  }
  

let app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    req.store = store;
    next();
});

app.get("/posts", blogApi.post.getPosts);
app.post("/posts", blogApi.post.addPost);
app.put("/posts/:postId/", blogApi.post.updatePost);
app.delete("/posts/:postId/", blogApi.post.removePost);

app.get("/posts/:postId/comments", blogApi.comment.getComments);
app.post("/posts/:postId/comments", blogApi.comment.addComment);
app.put("/posts/:postId/comments/:commentId", blogApi.comment.updateComment);
app.delete("/posts/:postId/comments/:commentId", blogApi.comment.removeComment);

app.listen(3000, function(){
    console.info("Server is running at 3000");
})