import Joi from 'joi';

interface SteamAuthCallbackReqQuery {
  'openid.ns': string;
  'openid.mode': string;
  'openid.op_endpoint': string;
  'openid.claimed_id': string;
  'openid.identity': string;
  'openid.return_to': string;
  'openid.response_nonce': string;
  'openid.assoc_handle': string;
  'openid.signed': string;
  'openid.sig': string;
}

export const validateSteamAuthCallbackReqQuery = async (
  reqQuery: any
): Promise<SteamAuthCallbackReqQuery> => {
  const schema = Joi.object({
    'openid.ns': Joi.string()
      .valid('http://specs.openid.net/auth/2.0')
      .required(),
    'openid.mode': Joi.string().valid('id_res').required(),
    'openid.op_endpoint': Joi.string()
      .valid('https://steamcommunity.com/openid/login')
      .required(),
    'openid.claimed_id': Joi.string()
      .regex(/^https:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/)
      .required(),
    'openid.identity': Joi.string()
      .regex(/^https:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/)
      .required(),
    'openid.return_to': Joi.string()
      .valid(`${process.env.APPLICATION_ADDRESS}/auth/steam/callback`)
      .required(),
    'openid.response_nonce': Joi.string().required(),
    'openid.assoc_handle': Joi.string().valid('1234567890').required(),
    'openid.signed': Joi.string()
      .valid(
        'signed,op_endpoint,claimed_id,identity,return_to,response_nonce,assoc_handle'
      )
      .required(),
    'openid.sig': Joi.string().required(),
  }).required();

  return schema.validateAsync(reqQuery, {
    abortEarly: false,
    allowUnknown: false,
  });
};
