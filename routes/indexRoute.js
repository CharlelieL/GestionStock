router.use((req, res, next) => {
    if (req.isAuthenticated()) res.locals.loggedIn = true;

    return next();
});
