const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res) {
    randomAdvice(res);
});

app.post("/", function(req, res) {
    randomAdvice(res);
});

function randomAdvice (res) {
    const url = "https://api.adviceslip.com/advice";
    https.get(url, function(response) {
        response.on("data", function(data) {
            const adviceData = JSON.parse(data);
            const adviceId = adviceData.slip.id;
            const adviceMessage = adviceData.slip.advice;
            console.log(adviceId);
            console.log(adviceMessage);
            res.render("index", {adviceId: adviceId, adviceMessage : adviceMessage});
        })
    });
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(req, res) {
    console.log(`Server is running on port ${port}`);
});