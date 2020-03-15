"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var test = new index_1.DarkUi(function (input) { return null; }, function (name, other) {
    if (other === void 0) { other = null; }
    console.error(name, other);
});
test.allSites.push(new index_1.DarkUiSite("index", function (self) { }, function (self) { }, function (self) { return "index!"; }, function (self, input) { }));
test.allSites.push(new index_1.DarkUiSite("sec", function (self) { }, function (self) { }, function (self) { return Date.now().toLocaleString(); }, function (self, input) { }));
test.openSiteByName("index");
setInterval(function () {
    console.log(test.displayActu());
}, 100);
setInterval(function () {
    test.openSiteByName("sec");
}, 1000);
