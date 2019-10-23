"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
exports.geocoder = new /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.search = function (query) {
        return node_fetch_1.default("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(query) + "&key=" + process.env.GOOGLE_KEY)
            .then(function (response) { return response.json(); });
    };
    class_1.prototype.details = function (placeId) {
        return node_fetch_1.default("https://maps.googleapis.com/maps/api/place/details/json?key=" + process.env.GOOGLE_KEY + "&place_id=" + placeId)
            .then(function (response) { return response.json(); });
    };
    return class_1;
}());
exports.default = exports.geocoder;
