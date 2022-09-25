const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // If Auth Header is not exist
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

  }
  
  // Exporting modules
module.exports = {
    auth,
  }