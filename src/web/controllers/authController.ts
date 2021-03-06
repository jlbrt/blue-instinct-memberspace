import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import { dbConnection } from '../../db';
import * as authValidator from '../validators/authValidator';

export const handleGetLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('auth/index');
  } catch (err) {
    return next(err);
  }
};

export const handleSteamAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = {
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.mode': 'checkid_setup',
      'openid.return_to': `${process.env.APPLICATION_ADDRESS}/auth/steam/callback`,
      'openid.realm': process.env.APPLICATION_ADDRESS,
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    };

    let pairs = [];
    for (const [key, val] of Object.entries(params)) {
      pairs.push(`${key}=${val}`);
    }
    const query = pairs.join('&');

    const url = `https://steamcommunity.com/openid/login?${query}`;

    res.redirect(url);
  } catch (err) {
    return next(err);
  }
};

export const handleSteamAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let reqQuery;
    try {
      reqQuery = await authValidator.validateSteamAuthCallbackReqQuery(
        req.query
      );
    } catch (err) {
      return res.redirect('/');
    }

    const params = {
      ...reqQuery,
      'openid.mode': 'check_authentication',
    };

    let pairs = [];
    for (const [key, val] of Object.entries(params)) {
      pairs.push(`${key}=${encodeURIComponent(val)}`);
    }
    const data = pairs.join('&');

    const response = await fetch('https://steamcommunity.com/openid/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });

    const responseData = await response.text();

    if (!responseData.includes('is_valid:true\n')) {
      // authentication failed
      return res.redirect('/');
    }

    const steamId64 = parseInt(
      reqQuery['openid.claimed_id'].replace(
        'https://steamcommunity.com/openid/id/',
        ''
      ),
      10
    ).toString();

    console.log('Success! SteamId', steamId64);

    let user = await dbConnection('users')
      .select(['id'])
      .where({ steamId64 })
      .first();

    if (!user) {
      // TODO create user
    }

    // TODO start session for user

    // TODO redirect to app

    return res.send('STEAM AUTH');
  } catch (err) {
    return next(err);
  }
};
