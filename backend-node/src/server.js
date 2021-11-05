const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const PORT = process.env.PORT || 3000;
const jwtAuth = require("./middleware/jwtAuth");
require("dotenv").config();

const itemRoutes = require("./routes/item");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/item", itemRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/secret", jwtAuth, (req, res) => {
	res.send("Secret!");
});

app.get("*", (req, res) => {
	res.send("404");
});

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
