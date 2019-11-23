module.exports =  (router, expressApp,authMethods) => {
    router.post('/login',authMethods.login)
    router.post('/updateActivationFlag',authMethods.updateActivationFlag)
    return router
}


