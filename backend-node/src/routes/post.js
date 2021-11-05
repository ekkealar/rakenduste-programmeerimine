const router = require("express").Router();
const postController = require("../controllers/post");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/create", postController.createPost);

module.exports = router;
