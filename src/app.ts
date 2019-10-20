import { Request as ExpressRequest, Response } from 'express';
import geocoder from 'node-geocoder';
import path from 'path';

const express = require('express');
const expressIp = require('express-ip');
const dotenv = require('dotenv');

dotenv.config();

const geocoderInstance = geocoder({
  provider: 'google',
  apiKey: process.env.GOOGLE_KEY
});

const app = express();

interface Request extends ExpressRequest {
  ipInfo: any;
}

// Configuration//
app.set('views', `${__dirname}/views`);
app.set('view engine', 'twig');

// Middleware //
app.use(expressIp().getIpInfoMiddleware); // Fails when IP is localhost
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/react', express.static(path.join(__dirname, 'react')));

// Endpoints //
app.get('/', (req: Request, res: Response) => {
  if (req.ipInfo.zipcode) {
    res.redirect(`/location/${req.ipInfo.zipcode}`);
  }

  res.render('index');
});

app.get('/location/:zip?', (req: Request, res: Response) => {
  geocoderInstance.geocode({zipcode: req.params.zip}).then((result) => {
    const {latitude, longitude} = result[0];

    res.render('location', {
      zipcode: req.params.zip,
      latitude,
      longitude
    });
  }).catch(() => {
    res.render('index');
  });
});

app.get('/search/:query?', (req: Request, res: Response) => {
  geocoderInstance.geocode(req.params.query).then((result) => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(400).send('Error searching');
  })
})

app.listen(3000);