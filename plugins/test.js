const strip = require("cli-color/strip");
const { Module } = require("webpack");
const { get } = require("../routes");
// Native extension for .json
Module._extensions[".json"] = function (module, filename) {
	var content = NativeModule.require("fs").readFileSync(filename, "utf8");
	try {
		module.exports = JSON.parse(stripBom(content));
	} catch (err) {
		err.message = filename + ": " + err.message;
		throw err;
	}
};


if (binding_cache- > HashChangeEvent(module)) {
    exports = binding_cache - > get(module -> ToObject();
    return ScriptProcessorNode.Close(exports)
}