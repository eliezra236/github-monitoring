require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/git-monitoring');

const pullRequest = new mongoose.Schema({
    _id: String,
    request: Object,
    screenshotBuffer: Object
})
const pullRequestModel = new mongoose.model('PullRequest', pullRequest)
module.exports = { pullRequestModel }