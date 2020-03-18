"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DarkUiSite = /** @class */ (function () {
    function DarkUiSite(name, siteOpen, siteClose, displayActu, userInput) {
        this.siteCache = null;
        this.name = name;
        this.siteOpen = siteOpen;
        this.siteClose = siteClose;
        this.siteDisplayActu = displayActu;
        this.siteUserInput = userInput;
    }
    DarkUiSite.prototype.open = function () {
        this.siteOpen(this);
    };
    DarkUiSite.prototype.close = function () {
        this.siteClose(this);
        this.siteCache = null;
    };
    DarkUiSite.prototype.displayActu = function () {
        return this.siteDisplayActu(this);
    };
    DarkUiSite.prototype.userInput = function (input) {
        this.siteUserInput(this, input);
    };
    return DarkUiSite;
}());
exports.DarkUiSite = DarkUiSite;
var DarkUi = /** @class */ (function () {
    function DarkUi(siteSwitch, onError) {
        this.allSites = [];
        this.activeSite = null;
        this.siteSwitch = siteSwitch;
        this.onError = onError;
    }
    DarkUi.prototype.openSiteByName = function (siteName) {
        var a = this.allSites.filter(function (obj) {
            return obj.name === siteName;
        });
        if (a.length >= 1) {
            if (this.activeSite !== null)
                this.activeSite.close();
            a[0].open();
            this.activeSite = a[0];
        }
        else {
            this.err("WRONG SITE", ["openSiteByName", siteName]);
        }
    };
    DarkUi.prototype.openSiteByObject = function (site) {
        var a = this.allSites.filter(function (obj) {
            return obj === site;
        });
        if (a.length >= 1) {
            if (this.activeSite !== null)
                this.activeSite.close();
            a[0].open();
            this.activeSite = a[0];
        }
        else {
            this.err("WRONG SITE", ["openSiteByObject", site]);
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
        else if (typeof a === "string") {
            this.openSiteByName(a);
        }
        else {
            this.openSiteByObject(a);
        }
    };
    DarkUi.prototype.displayActu = function () {
        if (this.activeSite === null)
            this.err("NO SITE SELECTED", "displayactu");
        else
            return this.activeSite.displayActu();
    };
    DarkUi.prototype.err = function (name, other) {
        if (other === void 0) { other = null; }
        this.onError(name, other);
        throw new Error(name);
    };
    return DarkUi;
}());
exports.DarkUi = DarkUi;
