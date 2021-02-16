import Joi from 'joi'

export default {
  test: Joi.object().keys({
    test: Joi.string().equal('ok').required()
  })
}
