router.use(DayLogController.isUserLoggedIn);

isUserLoggedIn: (request, response, next) => {
    if (!request.isAuthenticated()) {
        response.redirect('/user/login');
    } else {
        return next();
    }
}
