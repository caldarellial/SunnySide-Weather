import { Request as ExpressRequest, Response } from 'express';
import path from 'path';

const express = require('express');
const expressIp = require('express-ip');
const dotenv = require('dotenv');

import { 
  geocoder,
  darksky
} from './services';

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
    geocoder.search(`${req.ipInfo.city} ${req.ipInfo.region} ${req.ipInfo.country}`)
      .then((data) => {
        return res.render('index', {
          detectedLocation: JSON.stringify(data.results[0])
        });
      })
  } else {
    res.render('index');
  }
});

app.get('/location/:placeId?', (req: Request, res: Response) => {
  const { placeId } = req.params;

  if (!placeId) {
    return res.redirect('/');
  }

  geocoder.details(placeId)
    .then((data) => {
      const location = data.result;

      res.render('location', {
        zipcode: req.params.zip,
        location: JSON.stringify(location)
      });
    })
    .catch(() => res.render('index'));
});

app.get('/search/:query?', (req: Request, res: Response) => {
  const { query } = req.params;

  if (!query) {
    return res.status(400).send('Query must be submitted');
  }

  geocoder.search(query)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err.toString()));
});

app.get('/weather/:lat?/:lon?', (req: Request, res: Response) => {
  const { lat, lon } = req.params;
  const { currentOnly } = req.query;

  darksky.fetch(lat, lon, !!currentOnly)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err));
})

app.listen(3000);