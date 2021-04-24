// const Joi = require('@hapi/joi');
import Joi from '@hapi/joi'

//validation for a user registering

export const registerValidation = (data) =>{
    const schema = Joi.object({
        uname: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        psw: Joi.string().min(6).required(),
        fname: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

export const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        psw: Joi.string().min(6).required(),
    });

    return schema.validate(data);
}

export const updateValidation = (data) =>{
    const schema = Joi.object({
        _id: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(6).required(),
        fullName: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

export const passwordValidation = (data) =>{
    const schema = Joi.object({
        _id: Joi.string().min(5).required(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

export const DeleteValidation = (data) =>{
    const schema = Joi.object({
        _id: Joi.string().min(5).required(),
        userID: Joi.string().min(6).required(),
        username: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;
    



