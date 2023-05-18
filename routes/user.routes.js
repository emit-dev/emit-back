const { Router } = require("express");
const router = Router();
const Users = require("../models/Users");

// api/user/info
router.get("/info", async (req, res) => {
	try {
		const { userId } = req.query;

		const user = await Users.findOne({ _id: userId });

		res.send(user);
	} catch (err) {
		res.json({ error: err.message });
	}
});

module.exports = router;
