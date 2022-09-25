// Helper
const ResponseBulider = require('../helpers/responseBuilder');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // If Auth Header is not exist
    if (!authHeader) {
        return ResponseBulider.error(res, 401, 'Anda Belum Terautentikasi'); 
    }

    var auth = new Buffer.from(authHeader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
 
    // If Authorized user
    if (user == 'admin' && pass == 'password') {
        next();
    } else {
        // If username or password is not the same
        return ResponseBulider.error(res, 422, 'Username atau Password Salah'); 
    }
  }
  
  // Exporting modules
module.exports = {
    auth,
  }