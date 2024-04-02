const jwt = require('jsonwebtoken');

const secretKey = 'Dani1994'

exports.verifyAndDecodeToken(token, secretKey) = function(){
    try {
      const decodedToken = jwt.verify(token, secretKey);
      return decodedToken;
    } catch (error) {
        throw new Error(error.message)
    }
  }

