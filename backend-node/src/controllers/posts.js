const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
	const post = await Post.find({});
	res.status(200).send(post);
};

exports.createPost = async (req, res) => {
	const newPost = req.body;
	const createdPost = new Post(newPost);
	const savedPost = createdPost.save();

	res.status(200).send("created!");
};

exports.getPost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findOne({ _id: id });
		if (!post) throw Error("!");

		res.status(200).json(post);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};
