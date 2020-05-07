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

app.get("/articles", function (req, res) {
    Article.find(function (err, results) {
        if(!err) {
            res.send(results);
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});