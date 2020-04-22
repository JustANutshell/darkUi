"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRealFirstArrEntry(arr) {
    for (var a = 0; a < arr.length; a++) {
        if (arr[a] !== undefined)
            return a;
    }
    return false;
}
exports.getRealFirstArrEntry = getRealFirstArrEntry;
function getRealFirstArrMissEntry(arr) {
    for (var a = 0; a < arr.length; a++) {
        if (arr[a] === undefined || arr[a] === null)
            return a;
    }
    return 0;
}
exports.getRealFirstArrMissEntry = getRealFirstArrMissEntry;
