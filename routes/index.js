var express = require("express");
var router = express.Router();

/* GET home page. */
router.get(
	"/",
	function (req, res, next) {
		// next() 是一个中间件函数中的参数，用于将控制权传递给下一个中间件函数或路由处理程序，使它们按照定义的顺序依次执行。
		console.log("1");
		next();
	},
	function (req, res, next) {
		console.log("2");
		next();
	},
	function (req, res) {
		console.log("3");
		res.render("index", { title: "Express" });
	}
);

module.exports = router;
