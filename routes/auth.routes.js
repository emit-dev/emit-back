const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const Users = require("../models/Users");
const router = Router();

// api/auth/register
router.post(
	"/register",
	[
		check("login", "Некорректный логин").isEmail(),
		check("password", "Минимальная длина пароля 6 символов").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Некорректные данные при регистрации",
				});
			}

			const { name, login, password } = req.body;

			const candidate = await Users.findOne({ login });

			if (candidate) {
				return res.status(400).json({ message: "Такой пользователь уже существует" });
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new Users({
				name,
				login,
				password: hashedPassword,
			});

			const data = await user.save();

			// console.log(data.id)

			const token = jwt.sign(
				{
					userId: data.id,
					easterEgg: "ты пидор",
				},
				process.env.JWT_SECRET,
				{ expiresIn: "1h" }
			);

			res.status(201).json({
				message: "Пользователь создан",
				token: token,
				userId: data.id,
			});
		} catch (e) {
			res.json({ message: e.message });
		}
	}
);

router.post(
	"/login",
	[
		check("login", "Введен некорректный логин").normalizeEmail({ gmail_remove_dots: false }).isEmail(),
		check("password", "Введите пароль").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Некорректные данные при входе в систему",
				});
			}

			const { login, password } = req.body;

			const user = await Users.findOne({ login: login });

			// console.log(user)

			if (!user) {
				return res.status(400).json({ message: "Пользователь не найден" });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: "Введен неверный пароль" });
			}

			const token = jwt.sign(
				{
					userId: user.id,
					easterEgg: "ты пидор",
				},
				process.env.JWT_SECRET,
				{ expiresIn: "1h" }
			);

			res.json({
				token,
				userId: user.id,
			});
		} catch (e) {
			res.json({ message: e.message });
		}
	}
);

module.exports = router;
