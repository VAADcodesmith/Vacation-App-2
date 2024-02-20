const cookieController = {};

// Create a new cookie
cookieController.setCookie = (req, res, next) => {
  try {
    res.cookie('cookieId', res.locals.user_id, { maxAge: 1000000, httpOnly: true });
    console.log('New cookie created!');
    return next();
  } catch (err) {
    console.log('Error in setCookie:', err);
    return next(err);
  }
};

// Check if a cookie exists
cookieController.checkCookie = (req, res, next) => {
  if (!req.cookies.cookieId) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  console.log('Cookie exists!');
  return next();
};

// Delete a cookie
cookieController.deleteCookie = (req, res, next) => {
  try {
    res.clearCookie('cookieId');
    console.log('Cookie deleted!');
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = cookieController;