import passport from 'passport';

export const isAuthenticated = passport.authenticate('jwt', { session: false });

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
    });
};