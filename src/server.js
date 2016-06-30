/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth, analytics } from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
app.use(passport.initialize());

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);
// Movie API
var TITLES = [{"TitleId":610,"TitleName":"Casablanca","TitleNameSortable":"Casablanca","ReleaseYear":1942,"ProcessedDateTimeUTC":"2013-06-15T02:01:55.153"},{"TitleId":2761,"TitleName":"Ben-Hur (Part 1)","TitleNameSortable":"Ben-Hur (Part 1)","ReleaseYear":1959,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":12708,"TitleName":"A Man for All Seasons","TitleNameSortable":"Man for All Seasons, A","ReleaseYear":1966,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":14798,"TitleName":"Cimarron","TitleNameSortable":"Cimarron","ReleaseYear":1931,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":16636,"TitleName":"Annie Hall","TitleNameSortable":"Annie Hall","ReleaseYear":1977,"ProcessedDateTimeUTC":"2013-06-22T02:00:57.283"},{"TitleId":23093,"TitleName":"Amadeus (Part 1)","TitleNameSortable":"Amadeus (Part 1)","ReleaseYear":1984,"ProcessedDateTimeUTC":"2013-07-06T02:00:48.510"},{"TitleId":27628,"TitleName":"All the King's Men","TitleNameSortable":"All the King's Men","ReleaseYear":1949,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67044,"TitleName":"All About Eve","TitleNameSortable":"All About Eve","ReleaseYear":1950,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67079,"TitleName":"All Quiet On The Western Front","TitleNameSortable":"All Quiet On The Western Front","ReleaseYear":1930,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67241,"TitleName":"An American in Paris","TitleNameSortable":"American in Paris, An","ReleaseYear":1951,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67646,"TitleName":"Around The World In 80 Days","TitleNameSortable":"Around The World In 80 Days","ReleaseYear":1956,"ProcessedDateTimeUTC":"2013-07-06T02:00:48.510"},{"TitleId":69593,"TitleName":"Braveheart","TitleNameSortable":"Braveheart","ReleaseYear":1995,"ProcessedDateTimeUTC":"2013-06-22T02:00:57.283"},{"TitleId":70523,"TitleName":"Cavalcade","TitleNameSortable":"Cavalcade","ReleaseYear":1933,"ProcessedDateTimeUTC":"2013-06-15T02:01:55.153"},{"TitleId":70646,"TitleName":"Chariots Of Fire","TitleNameSortable":"Chariots Of Fire","ReleaseYear":1981,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":72152,"TitleName":"Dances With Wolves","TitleNameSortable":"Dances With Wolves","ReleaseYear":1990,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":72723,"TitleName":"Deer Hunter, The (Part 1)","TitleNameSortable":"Deer Hunter, The (Part 1)","ReleaseYear":1978,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":73676,"TitleName":"Driving Miss Daisy","TitleNameSortable":"Driving Miss Daisy","ReleaseYear":1989,"ProcessedDateTimeUTC":"2013-06-08T02:01:41.823"},{"TitleId":75434,"TitleName":"Forrest Gump","TitleNameSortable":"Forrest Gump","ReleaseYear":1994,"ProcessedDateTimeUTC":"2013-06-15T02:01:55.153"},{"TitleId":308675,"TitleName":"Amadeus (Part 2)","TitleNameSortable":"Amadeus (Part 2)","ReleaseYear":1984,"ProcessedDateTimeUTC":"2013-07-06T02:00:48.510"},{"TitleId":341476,"TitleName":"American Beauty","TitleNameSortable":"American Beauty","ReleaseYear":1999,"ProcessedDateTimeUTC":"2013-06-15T02:02:38.233"},{"TitleId":415095,"TitleName":"Ben-Hur","TitleNameSortable":"Ben-Hur","ReleaseYear":1959,"ProcessedDateTimeUTC":"2013-07-02T19:00:04.327"},{"TitleId":446310,"TitleName":"2 Fast 2 Furious","TitleNameSortable":"2 Fast 2 Furious","ReleaseYear":2003,"ProcessedDateTimeUTC":"2013-06-08T02:03:05.027"},{"TitleId":612695,"TitleName":"Four Brothers","TitleNameSortable":"Four Brothers","ReleaseYear":2005,"ProcessedDateTimeUTC":"2013-06-15T02:03:39.377"},{"TitleId":641735,"TitleName":"Disturbia","TitleNameSortable":"Disturbia","ReleaseYear":2007,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":729224,"TitleName":"Angels & Demons","TitleNameSortable":"Angels & Demons","ReleaseYear":2009,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"}];

app.get('/api', function(req, res) {
    res.json(TITLES);
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };

    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }

    await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      context: {
        insertCss: (...styles) => {
          styles.forEach(style => css.push(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
        },
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
