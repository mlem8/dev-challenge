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
import sql from 'mssql';
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
//
// Movie API
// -----------------------------------------------------------------------------
var config = {
  server: 'localhost',
  user:     'turner',
  password: 'devchallenge',
  port: 6442
};

var sqlConnection = new sql.Connection(config, function(err) {
  if (err) console.log(err);
});

sqlConnection.on('error', function(err) {
  console.log(err);
});

app.get('/api/movies', function(req, res) {
  var request = sqlConnection.request();
  var query =
    'SELECT Title.TitleId, TitleName, TitleNameSortable, MIN(ReleaseYear) as ReleaseYear, ' +
    // only grab one description per parent
    'MAX(cast(Description as VARCHAR(MAX))) as Description ' +
    'FROM Title ' +
    'INNER JOIN StoryLine on Title.TitleId = StoryLine.TitleId ' +
    'GROUP BY Title.TitleId, TitleName, TitleNameSortable ' +
    'ORDER BY TitleNameSortable';

  request.query(query, function(err, recordset) {
    if (err) console.log(err);

    res.json(recordset);
  });
}
);
app.get('/api/movies/:id/awards', function(req, res) {
  var request = sqlConnection.request();
  var query =
    'SELECT TitleName, AwardCompany, Award, AwardYear, AwardWon ' +
    'FROM Title ' +
    'INNER JOIN Award on Title.TitleId = Award.TitleId ' +
    'WHERE Title.TitleId = ' + req.params.id;

  request.query(query, function(err, recordset) {
    if (err) console.log(err);

    res.json(recordset);
    });
  }
);
app.get('/api/movies/:id/cast', function(req, res) {
    var request = sqlConnection.request();
    // TODO Fix 'Amadeus' use case
    var query =
      'SELECT Title.TitleName, ReleaseYear, RoleType, IsKey, IsOnScreen, Participant.Name ' +
      'FROM Title ' +
      'INNER JOIN TitleParticipant on Title.TitleId = TitleParticipant.TitleId ' +
      'INNER JOIN Participant on TitleParticipant.ParticipantId = Participant.Id ' +
      'WHERE RoleType = \'Actor\' AND IsKey = 1 AND Title.TitleId = ' + req.params.id;

    request.query(query, function(err, recordset) {
      if (err) console.log(err);

      res.json(recordset);
    });
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
