import jwt from 'jsonwebtoken';

function authenticate(req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.stats(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch(e){
        res.status(400).send('INVALIDE TOKEN');
    }

}