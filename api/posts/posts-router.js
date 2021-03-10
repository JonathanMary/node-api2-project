// implement your posts router here
const express = require("express");
const router = express.Router();

const Post = require("./posts-model");

// | 1 | GET    | /api/posts              | Returns **an array of all the post objects** contained in the database                                                                   |
router.get("/", (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved" });
        })
})
// | 2 | GET    | /api/posts/:id          | Returns **the post object with the specified id**                                                                                        |
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const getById = await Post.findById(id);
        if(!getById){
            res.status(404).json({ message:"The post with the specified ID does not exist" });
        }
        else {
            res.json(getById);
        }
    } catch (error) {
        res.status(500).json({ message: "The post information could not be retrieved" });
    }
})
// | 3 | POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**                          |
router.post("/", async (req, res) => {
    const newPost = req.body;
    try {
        if (!newPost.title || !newPost.contents){
            res.status(400).json({ message: "Please provide title and contents for the post" });
        }
        else {
            const insert = await Post.insert(newPost);
            res.status(201).json({ ...insert, ...newPost });
        }
    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
    }
})
// | 4 | PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original          |
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if(!body.title || !body.contents){
            res.status(400).json({ message: "Please provide title and contents for the post" });
        }
        else {
            const update = await Post.update(id, body);
            if(!update){
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }else {
                res.status(200).json({ id: update, ...body })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "The post information could not be modified" });
    }
})
// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**                                                           |
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Post.remove(id)
        .then(post => {
            if(post === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
            else{
                res.status(200).json("Post Removed");
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post could not be removed" });
        })
})
// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id                                           |
router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    Post.findCommentById(id)
        .then(comments => {
            console.log(comments)
            if(!comments){
                console.log("no Id")
            }
            else {
                console.log("yes id")
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The comments information could not be retrieved" });
        })
})

module.exports = router;
