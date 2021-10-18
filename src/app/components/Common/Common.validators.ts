import * as Joi from 'joi'

export const PostWorkInfoSchema = Joi.object({
  homePage: Joi.string().required(),
  socialAccount: Joi.string().required(),
})
