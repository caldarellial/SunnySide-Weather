"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geoip_lite_1 = __importDefault(require("geoip-lite"));
// Extracted and modified from express-ip package due to issues with google cloud proxy
function ipLookup(ip) {
    // IPV6 addresses can include IPV4 addresses
    // So req.ip can be '::ffff:86.3.182.58'
    // However geoip-lite returns null for these
    if (ip.includes('::ffff:')) {
        ip = ip.split(':').reverse()[0];
    }
    var lookedUpIP = geoip_lite_1.default.lookup(ip);
    if ((ip === '127.0.0.1')) {
        return { error: "This won't work on localhost" };
    }
    if (!lookedUpIP) {
        return { error: "Error occured while trying to process the information" };
    }
    return lookedUpIP;
}
exports.ipLookup = ipLookup;
function ipLookupMiddleware(req, res, next) {
    var xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
    var ip = xForwardedFor ? xForwardedFor.split(',')[0] : req.ip;
    req.ipInfo = ipLookup(ip);
    next();
}
exports.ipLookupMiddleware = ipLookupMiddleware;
