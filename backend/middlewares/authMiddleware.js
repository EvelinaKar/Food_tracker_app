const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No token provided or token malformed.' });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Token is invalid.', details: err.message });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authToken,
};
