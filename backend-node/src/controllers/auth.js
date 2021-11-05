const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) throw Error("does not exist");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw Error("password does not match");

		const userTemplate = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email,
		};

		const token = jwt.sign(userTemplate, process.env.JWT_SECRET);
		if (!token) throw Error("!");

		res.status(200).json({
			token,
			...userTemplate,
		});
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) throw Error("e-mail is invalid");

		const salt = await bcrypt.genSalt(10);
		if (!salt) throw Error("!");

		const hash = await bcrypt.hash(password, salt);
		if (!hash) throw Error("!");

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hash,
			passwordConfirmation: hash,
		});

		const savedUser = await newUser.save();
		if (!savedUser) throw Error("!");

		res.status(200).json({ message: "user was created" });
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.getUser = async (req, res) => {
	const { email } = req.params;
	try {
		const user = await User.findOne({ email: email });
		if (!user) throw Error("!");

		res.status(200).json(user);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};
