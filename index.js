

var shell = require("./lib/Shell.js");
var fp = new shell.ForkPacker();
fp.from("./lib/Shell.js",0,41);
console.log( "A",shell.Number( shell.String( fp.build("\r\n") ) ) );


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


// shelljs fork


// asm writer -> as, ml




