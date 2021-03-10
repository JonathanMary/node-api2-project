// implement your server here
// require your posts router and connect it here
const express = require("express");
const postRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
    res.send("GET request to '/'");
})

module.exports = server;