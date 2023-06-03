// net 网络模块
const consola = require("consola");
const net = require("net");

// 检查传入的port是否已经在使用
function tryConnectPort(port) {
	consola.info("传入的端口号", port);
	const theServer = net.createServer();
	// return new Promise((resolve, reject) => {
	// 启动监听连接的服务器
	// consola.log("theServer", theServer);
	// 当服务器开始监听时，将触发 'listening' 事件。 最后一个参数 callback 将被添加为 'listening' 事件的监听器。
	theServer.on("listening", function () {
		setTimeout(() => {
			if (theServer) {
				theServer.close();
			}
		}, 3000);
	});

	theServer.on("error", (e) => {
		consola.log("监听出发error", e);
		if (e?.code === "EADDRINUSE") {
			consola.log("port正在使用", e);
			resolve({
				port,
				nouse: false,
				from: "EADDRINUSE",
			});
		} else {
			resolve({
				port,
				nouse: true,
				from: "else",
			});
		}
	});

	theServer.listen(3000);
	// });
}
function createPort(port, sucBack = function () {}) {
	tryConnectPort(port);
	// tryConnectPort(port).then((backData) => {
	// 	consola.info("backData", backData);
	// 	if (backData?.nouse) {
	// 		sucBack({ port, ...arguments });
	// 		return port;
	// 	} else {
	// 		// createPort(port + 1, sucBack);
	// 	}
	// });
}

module.exports = {
	createPort,
};
