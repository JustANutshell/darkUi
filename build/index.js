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
            this.err("WRONG SITE", ["openSite", site]);
        }
    };
    DarkUi.prototype.userInput = function (input) {
        var a = this.siteSwitch(input);
        if (a === null) {
            if (this.activeSite === null)
                this.err("NO SITE SELECTED", "userinput");
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
                this.err("INTERNAL", ["notificaton was opend without starttime", a]);
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
            var a = arrFunc_1.getRealFirstArrEntry(this.allNotifications);
            if (a !== false) {
                var b = this.allNotifications[a];
                if (b === undefined) {
                    this.err("INTERNAL", ["code:1"]);
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
                this.err("NO SITE SELECTED", "displayactu");
                return null;
            }
            else
                return this.activeSite.getContent();
        }
    };
    DarkUi.prototype.openNotification = function (content, duration) {
        if (duration === void 0) { duration = 3000; }
        var a = arrFunc_1.getRealFirstArrMissEntry(this.allNotifications);
        this.allNotifications[a] = new DarkUiNotification(content, duration);
    };
    DarkUi.prototype.err = function (name, other) {
        if (other === void 0) { other = null; }
        this.onError(name, other);
    };
    return DarkUi;
}());
exports.DarkUi = DarkUi;
