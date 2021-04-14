/** (WIP) 
 * Middlewares
 * Middleware functions are functions that have access to the request object (req), the response object (res),
 * and the next middleware function in the application’s request-response cycle. The next middleware function 
 * is commonly denoted by a variable named next
 * 
 * This will verify info for post
 * 
 */

import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
// const secret = process.env.TOKEN_SECRET

const auth = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, process.env.TOKEN_SECRET);

      req.userID = decodedData?.id;

    } else {
      decodedData = jwt.decode(token);

      req.userID = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;