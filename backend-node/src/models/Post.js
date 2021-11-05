const { Schema, model } = require("mongoose");

const postSchema = new Schema({
	_id: { type: Number, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	post: { type: String, required: true },
	userEmail: { type: String, required: true },
});

const Post = model("Post", postSchema);

module.exports = Post;
