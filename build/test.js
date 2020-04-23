"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
var test = new index_1.DarkUi(function (input) { return null; }, function (name, other) {
    if (other === void 0) { other = null; }
    console.error(name, other);
});
test.allSites.push(new index_1.DarkUiSite("index", function (self) { }, function (self) { }, function (self) { return "index!"; }, function (self, input) { }));
test.allSites.push(new index_1.DarkUiSite("sec", function (self) { }, function (self) { }, function (self) { return Date.now().toLocaleString(); }, function (self, input) { }));
test.openSite("index");
setInterval(function () {
    console.log(test.getContent());
}, 100);
setInterval(function () {
    var _a;
    if (((_a = test.activeSite) === null || _a === void 0 ? void 0 : _a.name) === "index")
        test.openSite("sec");
    else
        test.openSite("index");
}, 1000);
standard_input.on('data', function (data_) {
    var data = String(data_).replace(/(^[\s\n\r]*|[\s\n\r]*$)/g, "").split('#');
    test.createNotification(data[0], Number(data[1] === undefined ? 10000 : data[1]));
    console.log(data);
});
