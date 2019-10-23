"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
exports.darksky = new /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.fetch = function (lat, lon, currentOnly) {
        var reqUrl = "https://api.darksky.net/forecast/" + process.env.API_KEY + "/" + lat + "," + lon;
        if (currentOnly) {
            reqUrl = reqUrl + "?exclude=" + ['minutely', 'hourly', 'daily'].join(',');
        }
        return node_fetch_1.default(reqUrl)
            .then(function (response) { return response.json(); });
    };
    return class_1;
}());
exports.default = exports.darksky;
