const { Router } = require("express");
const router = Router();
const News = require("../models/News");
const Occasions = require("../models/Occasions");

// /api/content/news
router.get("/news", async (req, res) => {
	try {
		const news = await News.find();
		res.send(news);
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
});

// /api/content/news
router.post("/news", async (req, res) => {
	try {
		console.log(req.body);

		const { title, hashtag, image } = req.body;

		const news = new News({
			title: title,
			hashtag: hashtag,
			image: image,
		});

		await news.save();

		res.json({
			message: "new posted",
		});
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
});

// /api/content/occasions
router.get("/occasions", async (req, res) => {
	try {
		const occasion = await Occasions.find();
		res.send(occasion);
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
});

// /api/content/occasions
router.post("/occasions", async (req, res) => {
	try {
		console.log(req.body);

		const { title, date, time, location } = req.body;

		const occasion = new Occasions({
			title: title,
			date: date,
			time: time,
			location: location,
		});

		await occasion.save();

		res.json({
			message: "occasion posted",
		});
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
});

module.exports = router;
