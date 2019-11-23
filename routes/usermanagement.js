module.exports =  (router,usermanagementmethods) => {
    router.post('/addAccountDetails', usermanagementmethods.addAccountDetails)
    router.post('/addCustomerDetails', usermanagementmethods.addCustomerDetails)
    router.post('/addUser', usermanagementmethods.addUser)
    router.get('/getAccountDetails',usermanagementmethods.getAccountDetails)
    router.get('/getCustomerDetails',usermanagementmethods.getCustomerDetails)
    router.get('/getUserDetails',usermanagementmethods.getUserDetails)
    return router
}
