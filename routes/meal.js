const express = require('express');
const router = express.Router();
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var nutrients = 0;
router.get("/", function(req, res) {
    res.render("meal", {
        nutrients: nutrients
    });
});

router.post("/", function(req, res) {
    //API part
    var food = req.body.food;
    var API_KEY = process.env.API_KEY;
    const url1 =
        "https://api.spoonacular.com/recipes/complexSearch?query=" +
        food +
        "&apiKey=" +
        API_KEY +
        "&number=1&addRecipeNutrition=true";

    //HTTPS get
    https.get(url1, function(response) {
        console.log(response.statusCode);
        var chunks = [];
        response.on("data", function(chunk) {
            chunks.push(chunk);
        });
        response.on("end", function(chunk) {
            var body = Buffer.concat(chunks);
            var data = JSON.parse(body);
            var result2 = Math.floor(data.results[0].nutrition.nutrients[0].amount);
            nutrients = result2;
        });
    });

    res.redirect("/meal");
});
module.exports = router;
