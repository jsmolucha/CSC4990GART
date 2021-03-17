// const Joi = require('@hapi/joi');
import Joi from '@hapi/joi'

//validation for a user registering

export const registerValidation = (data) =>{
    const schema = Joi.object({
        uname: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        psw: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

export const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        psw: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;
    



