import bodyParser from 'body-parser';
import express, { Express, RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { DemoRoutes } from './routes/DemoRoutes';
import { CounterRoutes } from './routes/CounterRoutes';

const app: Express = express();
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cookieParser());
app.use(compression({ threshold: 0 }));

/**
 * TODO: routes to demonstrate the possibilities of vuesion
 * can be removed if you don't need them in your application
 */
CounterRoutes(app);
DemoRoutes(app);

module.exports = {
  path: '/',
  handler: app,
};
