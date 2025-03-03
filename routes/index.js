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
	const opiton = [
		{
			event: "message",
			conversation_id: "28540cfa-6788-4523-9794-b5dc1c550026",
			message_id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			created_at: 1739945501,
			task_id: "752ecc2a-e030-48c6-814c-34b04b6d6b4f",
			id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			answer: "你好啊",
		},
		{
			event: "message",
			conversation_id: "28540cfa-6788-4523-9794-b5dc1c550026",
			message_id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			created_at: 1739945501,
			task_id: "752ecc2a-e030-48c6-814c-34b04b6d6b4f",
			id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			answer:
				'APPEND_CHAT{"code":200, "msg":null,"data":{ "type":"DEBUG_ANSWER","debugContent":"调试信息为:活动参数如下:活动模板ID:35 活动开始时间:活动结束时间:活动区域省:市:活动用户群体:活动奖品:活动名称:","content":"正式内容为;请说明活动结束时间。(活动开始时间默认为当前时间，如有需要清说明活动开始时间)"},"success":true}',
			from_variable_selector: ["17349452868440", "answer"],
		},
		{
			event: "message",
			conversation_id: "28540cfa-6788-4523-9794-b5dc1c550026",
			message_id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			created_at: 1739945501,
			task_id: "752ecc2a-e030-48c6-814c-34b04b6d6b4f",
			id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			answer:
				'APPEND_CHAT{"code":200, "msg":null,"data":{ "type":"QUESTIONNAIRE_RECOMMEND","content":"编辑问卷调查", "questionnaireList":[{"question":"123","type":"单选","optionList":"1,2,3","required":true}]},"success":true}',
			from_variable_selector: ["17349452868440", "answer"],
		},
		{
			event: "workflow_finished",
			conversation_id: "28540cfa-6788-4523-9794-b5dc1c550026",
			message_id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			created_at: 1739945501,
			task_id: "752ecc2a-e030-48c6-814c-34b04b6d6b4f",
			workflow_run_id: "b11cf31c-a3ab-4335-9140-6094711a0c08",
			data: {
				id: "b11cf31c-a3ab-4335-9140-6094711a0c08",
				workflow_id: "e635ba0a-3d98-4cea-beb8-13c9374d06d6",
				sequence_number: 2780,
				status: "succeeded",
				outputs: {
					answer:
						'\u6d3b\u52a8\u53c2\u6570\u5982\u4e0b\uff1a\n\u6d3b\u52a8\u6a21\u677fID\uff1a3\n\u6d3b\u52a8\u5f00\u59cb\u65f6\u95f4\uff1a\n\u6d3b\u52a8\u7ed3\u675f\u65f6\u95f4\uff1a2025-03-31\n\u6d3b\u52a8\u5956\u54c1\uff1a03202411260849\n\u6d3b\u52a8\u540d\u79f0\uff1a\u6d41\u91cf\u7ffb\u7ffb\u4e50,\u597d\u793c\u7b49\u4f60\u62bd\n\u6d3b\u52a8\u533a\u57df\n\u7701\uff1a\n\u5e02\uff1a\n\u6d3b\u52a8\u7528\u6237\u7fa4\u4f53\uff1a\n\n\nAPPEND_CHAT{"code": 200, "msg": null, "data": {"type": "GENERATE_ACTIVITY", "data": {"msg": "\u64cd\u4f5c\u6210\u529f", "traceId": "521f4806d8ff4c038eabe79aadacec39", "data": {"id": 1739945702506, "previewH5Url": "https://yxai.zsc.189.cn/bloc-uni/pages/card/general?actNo=IACT2025021903509&temp=luckyflop&pcode=bj&state=draft"}, "detectMsg": null, "type": "GENERATE_ACTIVITY", "url": null, "status": 200}}, "success": true}APPEND_CHAT\n\n\u6d3b\u52a8\u9002\u7528\u7701\u4efd\u5982\u4e0b\uff1a["\u5317\u4eac", "\u5929\u6d25", "\u91cd\u5e86", "\u6d77\u5357", "\u6cb3\u5317", "\u5c71\u897f", "\u5185\u8499\u53e4", "\u8fbd\u5b81", "\u5409\u6797", "\u9ed1\u9f99\u6c5f", "\u4e0a\u6d77\u5e02", "\u6c5f\u82cf", "\u6d59\u6c5f", "\u5b89\u5fbd", "\u798f\u5efa", "\u6c5f\u897f", "\u5c71\u4e1c", "\u6cb3\u5357", "\u6e56\u5317", "\u6e56\u5357", "\u5e7f\u4e1c", "\u5e7f\u897f", "\u56db\u5ddd", "\u8d35\u5dde", "\u4e91\u5357", "\u897f\u85cf", "\u9655\u897f", "\u7518\u8083", "\u9752\u6d77", "\u5b81\u590f", "\u65b0\u7586", "\u96c6\u56e2"]\n\u8bf7\u8bf4\u660e"\u6d3b\u52a8\u9002\u7528\u7701\u4efd"\u3002\uff08\u53ea\u80fd\u9009\u62e9\u4e00\u4e2a\u7701\uff09',
				},
				error: null,
				elapsed_time: 18.07733631299925,
				total_tokens: 24993,
				total_steps: 32,
				created_by: {
					id: "673e980b-9727-4b52-82a8-4b73d23ce976",
					user: "abc-123",
				},
				created_at: 1739945501,
				finished_at: 1739945518,
				files: [],
			},
		},
		{
			event: "message_end",
			conversation_id: "28540cfa-6788-4523-9794-b5dc1c550026",
			message_id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			created_at: 1739945501,
			task_id: "752ecc2a-e030-48c6-814c-34b04b6d6b4f",
			id: "97a66c1e-609a-443c-b58b-230ddfad394b",
			metadata: {
				usage: {
					prompt_tokens: 24715,
					prompt_unit_price: "0.0",
					prompt_price_unit: "0.0",
					prompt_price: "0.0",
					completion_tokens: 278,
					completion_unit_price: "0.0",
					completion_price_unit: "0.0",
					completion_price: "0.0",
					total_tokens: 24993,
					total_price: "0.0",
					currency: "USD",
					latency: 64.59043355895847,
				},
			},
			files: [],
		},
	];
	const interval = setInterval(() => {
		let backData = JSON.stringify({
			content: id == -1 ? opiton : `${str[id]}`,
			botChatId: id == -1 ? "002" : "001",
		});
		++id;
		res.write(`data:${JSON.stringify(opiton[id])}\n\n`); // 最后一个必须是 \n\n 必要
		// 停止发送示例
		if (id >= opiton.length) {
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
