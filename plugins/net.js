// net 网络模块
const consola = require("consola");
const net = require("net");

// 检查传入的port是否已经在使用
function tryConnectPort({ port, host }) {
	// consola.info("传入的端口号", port);
	const theServer = net.createServer();
	// consola.log("theServer", theServer);
	return new Promise((resolve, reject) => {
		// 启动监听连接的服务器
		// 当服务器开始监听时，将触发 'listening' 事件。 最后一个参数 callback 将被添加为 'listening' 事件的监听器。
		theServer.on("listening", function () {
			setTimeout(() => {
				// 没有监听到使用就主动关闭
				theServer.close();
				resolve({
					port,
					nouse: true,
					from: "listening",
				});
			}, 2000);
		});

		theServer.on("error", (e) => {
			//   consola.log("监听出发error", e);
			if (e?.code === "EADDRINUSE") {
				// consola.log("port正在使用", e);
				resolve({
					port,
					nouse: false,
					from: "error-EADDRINUSE",
				});
			} else {
				resolve({
					port,
					nouse: true,
					from: "error-common",
				});
			}
		});

		// 需要传入host才能成功监听是否有在使用
		theServer.listen({
			port,
			host,
		});
	});
}

function createPort({ port, host }, callback = function () {}) {
	return tryConnectPort({ port, host }).then((backData) => {
		// consola.info("backData", port, backData);
		if (backData?.nouse) {
			// 成功找到port后的回调
			if (callback) {
				callback({ port, host, ...arguments });
			}
			return port;
		} else {
			createPort({ port: port + 1, host }, callback);
		}
	});
}

module.exports = {
	createPort,
};
