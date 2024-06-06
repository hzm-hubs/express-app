// 操作系统
const { networkInterfaces, cpus } = require("os");

var consola = require("consola");

// 获取本地IP
function getIP(typeList = ["lo0", "lo", "en0", "eth0"]) {
	const ipObj = networkInterfaces();
	//   consola.log("ipObj", ipObj);
	if (typeList?.length) {
		const results = {};
		typeList.forEach((item) => {
			results[item] = {};
			ipObj[item]?.forEach((it) => {
				results[item][it.family] = it.address;
			});
			//   consola.info("results", results);
		});
		return results; 
	} else {
		return ipObj;
	}
}

// 获取CPU
function getCPU(type = "en0") {
	return cpus();
}

module.exports = {
	getIP,
	getCPU,
};
