

var Admin = require("./lib/Admin.js");

require = null;
global.require = null;
Object.defineProperty(global,"Admin", {
	get : function() { return Admin; }
});

var fs = Admin({cmd:"load"},"fs","fs");
var http = Admin({cmd:"load"},"http","http");
var https = Admin({cmd:"load"},"https","https");
var path = Admin({cmd:"load"},"path","path");






