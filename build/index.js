"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrFunc_1 = require("./arrFunc");
var DarkUiSite = /** @class */ (function () {
    function DarkUiSite(name, siteOpen, siteClose, getContent, userInput) {
        this.siteCache = null;
        this.name = name;
        this.siteOpen = siteOpen;
        this.siteClose = siteClose;
        this.siteGetContent = getContent;
        this.siteUserInput = userInput;
    }
    DarkUiSite.prototype.open = function () {
        this.siteOpen(this);
    };
    DarkUiSite.prototype.close = function () {
        this.siteClose(this);
        this.siteCache = null;
    };
    DarkUiSite.prototype.getContent = function () {
        return this.siteGetContent(this);
    };
    DarkUiSite.prototype.userInput = function (input) {
        this.siteUserInput(this, input);
    };
    return DarkUiSite;
}());
exports.DarkUiSite = DarkUiSite;
var DarkUiNotification = /** @class */ (function () {
    function DarkUiNotification(content, duration) {
        if (duration === void 0) { duration = 3000; }
        this.startedDisplaying = null;
        this.duration = duration;
        this.content = content;
        this.created = new Date();
    }
    DarkUiNotification.prototype.getContent = function () {
        return typeof this.content === "function" ? this.content(this) : this.content;
    };
    return DarkUiNotification;
}());
var DarkUi = /** @class */ (function () {
    function DarkUi(siteSwitch, onError) {
        this.allSites = [];
        this.allNotifications = [];
        this.activeSite = null;
        this.activeNotification = null;
        this.activeContent = null;
        this.siteSwitch = siteSwitch;
        this.onError = onError;
    }
    DarkUi.prototype.openSite = function (site) {
        var a = this.allSites.filter(function (obj) {
            return obj === site || obj.name === site;
        });
        if (a.length >= 1) {
            if (this.activeSite !== null)
                this.activeSite.close();
            a[0].open();
            this.activeSite = a[0];
        }
        else {
            this.err("WRONG SITE", true, ["openSite", site]);
        }
    };
    DarkUi.prototype.userInput = function (input) {
        var a = this.siteSwitch(input);
        if (a === null) {
            if (this.activeSite === null)
                this.err("NO SITE SELECTED", false, "userinput");
            else
                this.activeSite.userInput(input);
        }
        else {
            this.openSite(a);
        }
    };
    DarkUi.prototype.getContent = function () {
        if (this.activeNotification !== null) { // test for outdated notification
            if (this.activeNotification.startedDisplaying === null) { // error
                var a = this.activeNotification;
                this.activeNotification = null;
                for (var b = 0; b < this.allNotifications.length; b++) {
                    if (this.allNotifications[b] === a)
                        this.allNotifications[b] = undefined;
                }
                this.err("INTERNAL", false, ["notificaton was opend without starttime", a]);
            }
            else {
                if (this.activeNotification.startedDisplaying.getTime() + this.activeNotification.duration < (new Date()).getTime()) {
                    var a = this.activeNotification;
                    this.activeNotification = null;
                    for (var b = 0; b < this.allNotifications.length; b++) {
                        if (this.allNotifications[b] === a)
                            this.allNotifications[b] = undefined;
                    }
                }
            }
        }
        if (this.activeNotification === null) { // search for new notification
            /*let a=getRealFirstArrEntry(this.allNotifications);
            if(a!==false){
                let b=this.allNotifications[a];
                if(b===undefined){
                    this.err("INTERNAL",["code:1"]);
                }else{
                    this.activeNotification=b;
                    this.activeNotification.startedDisplaying=new Date();
                }
            }*/
            var x_1 = this;
            var a = this.allNotifications.filter(function (a) { return a !== undefined; }).sort(function (a, b) {
                if (a === undefined || b === undefined) {
                    x_1.err("INTERNAL", false, ["code:2"]);
                    if (a === undefined && b === undefined) {
                        return 0;
                    }
                    else if (a === undefined) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
                else {
                    if (a.created > b.created) {
                        return 1;
                    }
                    else if (a.created < b.created) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            });
            if (a.length >= 1) {
                var b = a[0];
                if (b === undefined) {
                    this.err("INTERNAL", false, ["code:1"]);
                }
                else {
                    this.activeNotification = b;
                    this.activeNotification.startedDisplaying = new Date();
                }
            }
        }
        if (this.activeNotification !== null) { // display
            return this.activeNotification.getContent();
        }
        else {
            if (this.activeSite === null) {
                this.err("NO SITE SELECTED", false, "displayactu");
                return null;
            }
            else
                return this.activeSite.getContent();
        }
    };
    DarkUi.prototype.createNotification = function (content, duration) {
        if (duration === void 0) { duration = 3000; }
        var a = arrFunc_1.getRealFirstArrMissEntry(this.allNotifications);
        this.allNotifications[a] = new DarkUiNotification(content, duration);
    };
    DarkUi.prototype.err = function (name, fatal, other) {
        if (fatal === void 0) { fatal = false; }
        if (other === void 0) { other = null; }
        this.onError(name, other);
        if (fatal) {
            throw { name: name, other: other };
        }
    };
    return DarkUi;
}());
exports.DarkUi = DarkUi;
