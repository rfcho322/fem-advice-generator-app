const express = require("express");
const path = require("path");
const https = require("https");
const ejs = require("ejs");

const app = express();

// SET VIEW ENGINE
app.set('view engine', 'ejs');
// SET THE STATIC FILES
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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