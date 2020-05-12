const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Working with wiki database
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


//Create a chained route handlers for a /articles/bootstrap route
app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({title: req.params.articleTitle}, function (err, result) {
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
            function (err) {
                if (!err) {
                    res.send("The article was successfully updated!");
                } else {
                    res.send(err);
                }
            })
    })
    .patch(function (req, res) {
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body},
            function (err) {
                if (!err) {
                    res.send("The article was successfully updated!");
                } else {
                    res.send(err);
                }
            })
    })
    .delete(function (req, res) {
        Article.findOneAndDelete(
            {title: req.params.articleTitle},
            function (err) {
                if (!err) {
                    res.send("The article was successfully deleted!");
                } else {
                    res.send(err);
                }
            })
    });

//GET request to the /articles route
app.get("/articles", function (req, res) {
    Article.find(function (err, results) {
        if(!err) {
            res.send(results);
        } else {
            res.send(err);
        }
    });
});

//POST request of creating a new article
app.post("/articles", function (req, res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function (err) {
        if(!err) {
            res.send("Successfully added a new article!")
        } else {
            res.send(err);
        }
    });
});


//DELETE all the articles
app.delete("/articles", function (req, res) {
    Article.deleteMany(function (err) {
        if (!err) {
            res.send("Successfully deleted all articles!");
        } else {
            res.send(err);
        }
    });
});


//Working with the Fruits database
// mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});
//
// //Fruits collection
// const fruitSchema = new mongoose.Schema ({
//         name: String,
//         rating: {
//             type: Number,
//             min: 1,
//             max: 10
//         },
//         review: String
//     });
//
// const Fruit = mongoose.model("Fruit", fruitSchema);
//
// const peach = new Fruit ({
//     name: "Peach",
//     rating: 10,
//     review: "Peaches are yummy!."
// });
//
// const cherry = new Fruit({
//     name: "Cherry",
//     rating: 10,
//     review: "Such sweet fruit!"
// });
//
// const apple = new Fruit ({
//     name: "Apple",
//     rating: 10,
//     review: "A very healthy fruit!"
// });
// apple.save();
//
//
// //People collection
// const personSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     favouriteFruit: fruitSchema
//     });
//
// const People = mongoose.model("People", personSchema);
//
// const robert = new People ( {
//         name: "Robert",
//         age: 31
//     }
// );
//
// People.updateOne({_id: "5eb954e8b62093072856689d"}, {favouriteFruit: apple}, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("A new field was successfully added!");
//     }
// });
//
// const anna = new People({
//     name: "Anna",
//     age: 27,
//     favouriteFruit: cherry
// });
//
// anna.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("A new person was successfully added!");
//     }
// });

//Updates a particular document
// Fruit.updateOne({_id: "5eb941250cecda2b00625ffa"}, {name: "Peach"}, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated document!");
//     }
// });

//Deletes the first document that matches conditions
// Fruit.deleteOne({name: "Peach"}, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted document!");
//     }
// });

//Deletes all the documents
// Fruit.deleteMany({review: "Pretty solid as a fruit."}, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Successfully deleted all the documents!');
//     }
// });


// const apple = new Fruit ({
//     name: "Apple",
//     rating: 10,
//     review: "Pretty solid as a fruit."
// });
//
// const banana = new Fruit ({
//     name: "Banana",
//     rating: 9,
//     review: "Pretty solid as a fruit."
// });

// let fruits = [kiwi, apple, banana];
// Fruit.insertMany(fruits, function (err) {
//     if(!err) {
//         console.log("Added successfully!");
//     } else {
//         console.log(err);
//     }
// });

// fruit.save();


// //Find documents in the fruits collection with a for loop
// Fruit.find(function (err, fruitDocs) {
//     if (err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close();
//
//         for (let i = 0; i < fruitDocs.length; i++) {
//             console.log(fruitDocs[i].name);
//         }
//     }
// });
//Find documents in the fruits collection with a for each loop
// Fruit.find(function (err, fruitDocs) {
//     if (err) {
//         console.log(err);
//     } else {
//         fruitDocs.forEach(function (element) {
//             console.log(element.name);
//         })
//     }
// });



app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});