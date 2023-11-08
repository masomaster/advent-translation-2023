const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.get('Authorization') || req.query.token;
    if (token) {
        token = token.replace('Bearer ', '');
        // Check if token is valid and not expired
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            // If valid token, decoded will be the token's entire payload
            // If invalid token, err will be set
            req.user = err ? null : decoded.user;
            // optional
            req.exp = err ? null : new Date(decoded.exp * 1000);
            return next();
        })
    } else {
        req.user = null;
        return next();
    }
}