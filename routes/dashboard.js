module.exports =  (router, expressApp, dashboardMethods) => {

    //route for registering new users
    //router.post('/registerUser', authRoutesMethods.registerUser)

    //route for allowing existing users to login
    //router.post('/login', expressApp.oauth.grant(), authRoutesMethods.login)
    router.get('/getmessage', dashboardMethods.getMessage)

    return router
}