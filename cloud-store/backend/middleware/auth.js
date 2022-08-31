

const jwt = require('jsonwebtoken');
function authenticateToken (req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      // set the user to req.user to use in the next middleware
      req.user = user;
      
      // req.user = user;
      next();
    }
    );
  }
module.exports = authenticateToken;