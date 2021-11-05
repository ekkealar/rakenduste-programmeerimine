const router = require("express").Router();
const authController = require("../controllers/auth");
const validation = require("../middleware/validation");
const { check } = require("express-validator");

router.post("/login", [check("email").isEmail().withMessage("not a true e-mail"), check("password").isLength({ min: 6 }).withMessage("min 6 characters")], validationMiddleware, authController.login);

router.get("/:email", authController.getUser);

router.post(
	"/signup",
	[
		check("firstName")
			.isLength({ min: 2 })
			.withMessage("min 3 characters")
			.trim()
			.exists()
			.matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
			.withMessage("invalid characters"),
		check("lastName")
			.isLength({ min: 2 })
			.withMessage("min 3 characters")
			.trim()
			.exists()
			.matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
			.withMessage("invalid characters"),
		check("email").isEmail().normalizeEmail().withMessage("not a real e-mail"),
		check("passwordConf")
			.escape()
			.custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error("password does not match");
				}
				return true;
			}),
	],
	validation,
	authController.signup
);
module.exports = router;
