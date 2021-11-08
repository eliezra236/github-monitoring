require("dotenv").config();
const express = require("express");
const db = require("./database");
const capture_website = import('capture-website');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("App started on port " + 3000);
});


app.get("/", async (req, res) => {
    const dbResults = await db.pullRequestModel.find();
    console.log(dbResults);
    res.render("main", {pullRequests: dbResults});
})

app.post("/update", async (req, res) => {
    console.log("here");
    const pullRequest = new db.pullRequestModel({_id: req.header("X-GitHub-Delivery"), request: req.body});
    const capture = await capture_website;
    const screenshotBuffer = await capture.default.buffer(req.body.pull_request.html_url);
    console.log(screenshotBuffer);
    pullRequest.set("screenshotBuffer", screenshotBuffer);
    await pullRequest.save();
    res.send(true);
})

app.get("/", (req, res) => {

})