export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res
    .status(401)
    .json({
      message: 'Please login first'
    });
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res
        .status(401)
        .json({
          message: 'Please login first'
        });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message:
            'You are not authorized for this action'
        });
    }

    next();
  };
};