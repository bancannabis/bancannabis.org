import * as path from 'path';
import * as express from 'express';
import $axios from 'axios';

const isProd: boolean = process.env.NODE_ENV === 'production';
const strapiURL = process.env.strapiURL;
const resolve = (file: string): string => path.resolve(__dirname, file);
const serve = (servePath: string, cache = true): express.Handler =>
  express.static(resolve(servePath), {
    maxAge: cache && isProd ? '4w' : 0,
  });

export const DemoRoutes = (app: express.Application) => {
  /**
   * http -> https redirect for heroku
   */
  app.get('*', (req: express.Request, res: express.Response, next: any) => {
    const host: string = req.headers.host || 'localhost:3000';
    const redirect: string = `https://${host}` + req.url;
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(redirect);
    } else {
      next();
    }
  });

  app.use('/storybook', serve('../../../storybook-static'));
  app.use('/docs', (_: express.Request, res: express.Response) => {
    res.status(301).redirect('https://vuesion.github.io/docs/en/');
  });

  /**
   * Auth-Methods
   */
  app.post('/auth/local', (_: express.Request, res: express.Response) => {
    const login = async (formData: any, $axios: any) => {
      try {
        const response = await $axios.post(strapiURL + '/auth/local', {
          identifier: formData.username.split('@')[0],
          password: formData.password,
        });
        if (response.status === 200) {
          res.status(200).json({
            access_token: response.data.jwt,
            refresh_token: response.data.jwt + 'refresh',
            status: '200',
            des: 'succeed',
            user: response.data.user,
          });
        }
      } catch (e) {
        if (e.message === 'Request failed with status code 400') {
          res.status(400).json({ e });
        } else {
          res.status(500).json({ e });
        }
      }
    };
    login(_.body, $axios);
  });

  app.get('/users/me', (_: express.Request, res: express.Response) => {
    const user = async (formData: any, $axios: any) => {
      try {
        const response = await $axios.get(strapiURL + '/users/me', { headers: {
          "Authorization": _.headers.authorization
          }
        });
        if (response.status === 200) {
          res.status(200).json({
            user: response.data
          });
        }
      } catch (e) {
        if (e.message === 'Request failed with status code 400') {
          res.status(400).json({ e });
        } else {
          res.status(500).json({ e });
        }
      }
    };
    user(_.body, $axios);
  });

};
