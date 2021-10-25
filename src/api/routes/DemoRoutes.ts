import * as path from 'path';
import * as express from 'express';
import { getIntInRange } from '@vuesion/utils/dist/randomGenerator';
import $axios from 'axios';

const isProd: boolean = process.env.NODE_ENV === 'production';
const strapiURL = process.env.strapiURL;
const getErrorWithProbability = (probability: number) => getIntInRange(0, 100) <= probability;
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
  let user: {
    // actual active user - bad practice , find how to fix it
    username: string;
    lastname: string;
    name: string;
    email: string;
    _id: number;
    avatar: object;
    wallet: object;
  };

  app.post('/auth/local', (_: express.Request, res: express.Response) => {
    const login = async (formData: any, $axios: any) => {
      console.log(formData);
      try {
        const response = await $axios.post(strapiURL + '/auth/local', {
          identifier: formData.username.split('@')[0],
          password: formData.password,
        });
        if (response.status === 200) {
          user = response.data.user;
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

  app.post('/auth/local/register', (_: express.Request, res: express.Response) => {
    const register = async (formData: any, $axios: any) => {
      try {
        const response = $axios.post(strapiURL + '/auth/local/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        console.log(response);
        if (response.status === 200) {
          res.status(200).json({ status: '200', des: 'succeed' });
        }
      } catch (e) {
        res.status(500).json({});
      }
    };
    register(_.body, $axios);
  });

  app.post('/auth/forgot-password', (_: express.Request, res: express.Response) => {
    const register = async (formData: any, $axios: any) => {
      try {
        const response = await $axios.post(strapiURL + '/auth/forgot-password', {
          email: formData.email,
        });
        if (response.status === 200) {
          res.status(200).json({ status: '200', des: 'succeed' });
        }
      } catch (e) {
        res.status(500).json({});
      }
    };
    register(_.body, $axios);
  });

  app.post('/auth/forgot-password', (_: express.Request, res: express.Response) => {
    const register = async (formData: any, $axios: any) => {
      try {
        const response = await $axios.post(strapiURL + '/auth/forgot-password', {
          email: formData.email,
        });
        if (response.status === 200) {
          res.status(200).json({ status: '200', des: 'succeed' });
        }
      } catch (e) {
        res.status(500).json({});
      }
    };
    register(_.body, $axios);
  });

  app.post('/auth/refresh', (_: express.Request, res: express.Response) => {
    res.status(200).json({ access_token: 'accessToken2', refresh_token: 'refreshToken2' });
  });

  app.post('/auth/logout', (_: express.Request, res: express.Response) => {
    res.status(200).json({});
  });

  app.get('/auth/user', (_: express.Request, res: express.Response) => {
    console.log('here');
    res.status(200).json({
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        id: user._id,
        avatar: user.avatar,
        lastname: user.lastname,
        wallet: user.wallet,
      },
    });
  });

  app.get('/protected', (_: express.Request, res: express.Response) => {
    if (getErrorWithProbability(40)) {
      res.status(401).json({ message: 'access token invalid' });
    } else {
      res.status(200).json({ message: 'Hey! it seems that you try out vuesion, I hope you like it. Cheers, Johannes' });
    }
  });
};
