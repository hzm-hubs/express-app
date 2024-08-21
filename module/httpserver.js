const http = require("http");

const methods = require("methods");

function route(req, res) {
	route.apply(methods, null);
}

function resTemplate(data = "", type = '"application/json"') {
	return;
}

const server = http
	.createServer((req, res) => {
		res.writeHead(200, { "Content-Type": "application/json" });
		let { host, port, method, url } = req;
		// "application/json"
		let result = JSON.stringify({
			host,
			port,
			method,
			url,
		});
		// 返回请求的url，method
		res.end(result);
	})
	.on("connect", () => {
		console.log("connect");
	});

server.listen("7901");

console.log("server start on: http://localhost:7901");
