

var fs = require("fs");
var hash = require("./SimpleHash.js");
function _String(str,code) {
	var base = [0];
	var i = 0;
	for(var x = 0; x < str.length;x++) {
		if(x>0 && x %32==0) {
			i += 1;
			base.push(0);
		}
		base[i] ^= str.charCodeAt(x);
		base[i] <<= 1;
		base[i] ^= code;
	}
	for(var x = 0; x < base.length;x++) base[x] = base[x] >>> 0;
	return base;
}
function _Number(arr,code) {
	var base = [0];
	var i = 0;
	for(var x = 0; x < arr.length;x++) {
		if(x>0 && x % 32 == 0) {
			i += 1;
			base.push(0);
		}
		base[i] ^= arr[x];
		base[i] <<= 1;
		base[i] ^= code;
	}
	for(var x = 0; x < base.length;x++) base[x] = base[x] >>> 0;
	return base;
}
function ForkPacker() {
	this.data = [];
}
ForkPacker.prototype.build = function(sep) {
	return this.data.join(sep);
}
ForkPacker.prototype.from = function(file,startLine,endLine) {
	var data = fs.readFileSync(file,"utf-8");
	var lines = data.split("\r").join("").split("\n");
	for(var x = startLine; x < endLine;x++) {
		this.data.push( lines[x] );
	}
}

var fp = new ForkPacker();
fp.from("../shelljs/src/common.js",132,181);
fp.from("../shelljs/src/common.js",187,203);


var data = fp.build("\r\n");
fs.writeFileSync( "./_Shell.js", data );
console.log(data);
console.log( hash.Number( hash.String( data,122), 131).toString(16) );

function Shell() {

}

module.exports = {
	String : _String,
	Number : _Number,
	ForkPacker : ForkPacker,
	Shell : Shell
}



