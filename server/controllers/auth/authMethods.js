const jsonwebtoken = require('jsonwebtoken');

exports.generateToken = async (payload, jwtSecret, jwtExpiresIn) => {
  return jsonwebtoken.sign({ payload }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

exports.decodeToken = async (token, secretKey) => {
  try {
    return jsonwebtoken.verify(token, secretKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};
