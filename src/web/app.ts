import path from 'path';
import express from 'express';
import helmet from 'helmet';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import * as errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import authRouter from './routers/authRouter';

export const app = express();

app.use(helmet.expectCt());
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);
app.use(helmet.hsts());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
// TODO add Content Security Policy (CSP)

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'njk');

nunjucks
  .configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
  })
  .addGlobal('PACKAGE_VERSION', process.env.npm_package_version);

app.use('/', authRouter);

app.all('*', (req, res) => {
  return res.sendStatus(404);
});

app.use(errorHandlerMiddleware.handleUnhandledError);
