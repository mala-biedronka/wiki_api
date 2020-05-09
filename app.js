const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost: 27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

//Create a chained route handlers for a /articles route
app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, results) {
            if (!err) {
                res.send(results);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article!")
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles!");
            } else {
                res.send(err);
            }
        });
    });





// //GET request to the /articles route
// app.get("/articles", function (req, res) {
//     Article.find(function (err, results) {
//         if(!err) {
//             res.send(results);
//         } else {
//             res.send(err);
//         }
//     });
// });
//
// //POST request of creating a new article
// app.post("/articles", function (req, res) {
//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });
//     newArticle.save(function (err) {
//         if(!err) {
//             res.send("Successfully added a new article!")
//         } else {
//             res.send(err);
//         }
//     });
// });
//
//
// //DELETE all the articles
// app.delete("/articles", function (req, res) {
//     Article.deleteMany(function (err) {
//         if (!err) {
//             res.send("Successfully deleted all articles!");
//         } else {
//             res.send(err);
//         }
//     });
// });


//Create a chained route handlers for a /articles/bootstrap route

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({title: req.params.articleTitle},function (err, result) {
            if (result) {
                res.send(result);
            } else {
                res.send("No articles matching the title were found!");
            }
        })
    })
    .put(function (req, res) {
        Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            function (err) {
                if (!err) {
                    res.send("The article was successfully updated!");
                } else {
                    res.send(err);
                }
            })
    });


app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});