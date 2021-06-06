import bodyParser from 'body-parser';
import express, { Express, RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { DemoRoutes } from './routes/DemoRoutes';
import { CounterRoutes } from './routes/CounterRoutes';


const app: Express = express();
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);


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
