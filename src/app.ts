import { Request as ExpressRequest, Response } from 'express';
import zipcodes from 'zipcodes';
import path from 'path';

const express = require('express');
const expressIp = require('express-ip');
const dotenv = require('dotenv');

dotenv.config();

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
  const location = zipcodes.lookup(req.params.zip);
  const {latitude, longitude} = location!;

  res.render('location', {
    zipcode: req.params.zip,
    latitude,
    longitude
  });
});

app.listen(3000);