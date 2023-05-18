const { Schema, model } = require("mongoose");

const schema = new Schema({
	title: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	location: { type: String, required: true },
});

module.exports = model("Occasions", schema);
