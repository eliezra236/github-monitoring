require("dotenv").config();
const crypto = require('crypto');
const express = require("express");
const db = require("./database");
const capture_website = import('capture-website');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.listen(process.env.WEBHOOK_PORT, () => {
    console.log("App started on port " + process.env.WEBHOOK_PORT);
});


app.get("/", async (req, res) => {
    let dbResults = await db.pullRequestModel.find();
    // convert images buffers to images
    dbResults = dbResults.map(e => {
        return {...e['_doc'], screenshotBuffer: e["screenshotBuffer"].toString('base64')}
    })
    res.render("main", {pullRequests: dbResults, repoName: process.env.MONITORED_APP_NAME});
})

app.post("/pullRequest", async (req, res) => {
    // validate the signature
    const expectedSig = "sha256=" + crypto.createHmac('sha256', process.env.WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');
    if(expectedSig !== req.header('x-hub-signature-256')) {
        res.status(403).send("Verification failed!")
    }
    const pullRequest = new db.pullRequestModel({_id: req.header("X-GitHub-Delivery"), request: req.body});
    const capture = await capture_website;
    const screenshotBuffer = await capture.default.buffer(req.body.pull_request.html_url);
    pullRequest.set("screenshotBuffer", screenshotBuffer);
    await pullRequest.save();
    res.send(true);
})