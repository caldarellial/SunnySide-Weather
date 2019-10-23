"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express = require('express');
var dotenv = require('dotenv');
var services_1 = require("./services");
dotenv.config();
var app = express();
// Configuration//
app.set('views', __dirname + "/views");
app.set('view engine', 'twig');
app.set('trust proxy', true);
// Middleware //
app.use(services_1.ipLookupMiddleware); // Fails when IP is localhost
app.use('/styles', express.static(path_1.default.join(__dirname, 'styles')));
app.use('/react', express.static(path_1.default.join(__dirname, 'react')));
// Endpoints //
app.get('/', function (req, res) {
    if (req.ipInfo && !req.ipInfo.error) {
        services_1.geocoder.search(req.ipInfo.city + " " + req.ipInfo.region + " " + req.ipInfo.country)
            .then(function (data) {
            return res.render('index', {
                detectedLocation: JSON.stringify(data.results[0]).replace(/'/g, "&#39;")
            });
        });
    }
    else {
        res.render('index');
    }
});
app.get('/location/:placeId?', function (req, res) {
    var placeId = req.params.placeId;
    if (!placeId) {
        return res.redirect('/');
    }
    services_1.geocoder.details(placeId)
        .then(function (data) {
        var location = data.result;
        res.render('location', {
            zipcode: req.params.zip,
            location: JSON.stringify(location).replace(/'/g, "&#39;")
        });
    })
        .catch(function () { return res.render('index'); });
});
app.get('/search/:query?', function (req, res) {
    var query = req.params.query;
    if (!query) {
        return res.status(400).send('Query must be submitted');
    }
    services_1.geocoder.search(query)
        .then(function (data) { return res.status(200).json(data); })
        .catch(function (err) { return res.status(400).send(err.toString()); });
});
app.get('/weather/:lat?/:lon?', function (req, res) {
    var _a = req.params, lat = _a.lat, lon = _a.lon;
    var currentOnly = req.query.currentOnly;
    services_1.darksky.fetch(lat, lon, !!currentOnly)
        .then(function (data) { return res.status(200).json(data); })
        .catch(function (err) { return res.status(400).send(err); });
});
app.listen(8080);
