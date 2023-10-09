// 域名服务器
const dns = require("dns");

function resolveDomain(domainName, rrType = "A") {
	const msg = `域名 ${domainName} 解析失败`;
	try {
		return new Promise((resolve, reject) => {
			dns.resolve(domainName, rrType, (err, addresses) => {
				resolve({
					err,
					addresses,
				});
			});
		});
	} catch {
		return msg;
	}
}

module.exports = {
	resolveDomain,
};
