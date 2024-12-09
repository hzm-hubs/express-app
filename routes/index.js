var express = require("express");
var router = express.Router();
const moduleDns = require("../module/dns");

/* GET home page. */
router.get(
	"/",
	function (req, res, next) {
		// next() 是一个中间件函数中的参数，用于将控制权传递给下一个中间件函数或路由处理程序，使它们按照定义的顺序依次执行。
		// console.log("1");
		next();
	},
	function (req, res, next) {
		// console.log("2");
		next();
	},
	function (req, res) {
		// console.log("3");
		res.render("index", { title: "Express" });
	}
);

// 注册 dns 接口 domainname 如：domainname
router.get("/module/dns/:domainname", async (context) => {
	// console.log("context", context.params);
	let pageText = "domainname is null";
	if (context.params.domainname) {
		pageText = await moduleDns.resolveDomain(context.params.domainname);
	}
	// context.res.send("32");
	context.res.render("template", {
		pageText: context.params.domainname + ": " + JSON.stringify(pageText),
	});
});

// 模拟 sse
router.get("/api/eventsource", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
	let id = -1;
	// let str = "豫章故郡，洪都新府。";
	const str = "豫章故郡，洪都新府。";
	const opiton = `{"type": "SELECT", "optionList": [{"id": 6, "name": "直连领券活动", "imageUrl": "https://activitygenerate.oss-rg-china-mainland.aliyuncs.com/12.png"}, {"id": 1, "name": "单业务类型", "imageUrl": "https://activitygenerate.oss-rg-china-mainland.aliyuncs.com/12.png"}, {"id": 3, "name": "宣传类型活动", "imageUrl": "https://activitygenerate.oss-rg-china-mainland.aliyuncs.com/12.png"}]}`;
	const interval = setInterval(() => {
		let backData = JSON.stringify({
			content: id == -1 ? opiton : `${str[id]}`,
			botChatId: id == -1 ? "002" : "001",
		});
		res.write(`data:${backData}\n\n`); // 最后一个必须是 \n\n 必要
		++id;
		// 停止发送示例
		if (id >= 10) {
			clearInterval(interval);
			res.end();
		}
	}, 200);

	// 在客户端断开连接时清理
	req.on("close", () => {
		clearInterval(interval);
	});
});

module.exports = router;
