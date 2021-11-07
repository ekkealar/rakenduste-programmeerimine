const Item = require("../models/Item");

exports.getItems = async (req, res) => {
	const items = await Item.find({});

	res.status(200).send(items);
};

exports.createItem = async (req, res) => {
	var quality = req.body.quality;
	if (req.body.quality > 101) {
		quality = 101;
	}

	const newItem = { name: "Table", quality: quality, unused: true, color: "blue" };
	const createdItem = new Item(newItem);
	const savedItem = await createdItem.save();

	res.status(200).send(`done ${savedItem._id}`);
};

exports.updateItem = async (req, res) => {
	const { id } = req.params;
	const item = await Item.findOneAndUpdate({ _id: id }, { $inc: { quality: 1 } });

	if (!item) res.status(404).send("No item with that id found");

	res.status(200).send("updated the following item: \n ${item}");
};

exports.deleteItem = async (req, res) => {
	const { id } = req.params;
	const item = await Item.findOneAndDelete({ _id: id });

	if (!item) res.status(404).send("No item with that id found");

	res.status(200).send("deleted the following item: \n ${item}");
};
