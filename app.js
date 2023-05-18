const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/content", require("./routes/content.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB);
		console.log("Successful DB connection");

		app.listen(PORT, () => {
			console.log(`App started on port ${PORT}`);
		});
	} catch (err) {
		console.log(`Server error ${err.message}`);
		process.exit(1);
	}
};

start();
