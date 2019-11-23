module.exports =  (router,usermanagementmethods) => {
    router.post('/addAccountDetails', usermanagementmethods.addAccountDetails)
    router.post('/addCustomerDetails', usermanagementmethods.addCustomerDetails)
    router.post('/addUser', usermanagementmethods.addUser)
    return router
}
