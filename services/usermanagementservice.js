var usermanagementDAO=require("../dao/usermanagementDAO");
module.exports =  {
    addAccountDetails: addAccountDetails,
    addCustomerDetails : addCustomerDetails,
    addUser : addUser,
    getAccountDetails:getAccountDetails,
    getCustomerDetails:getCustomerDetails,
    getUserDetails:getUserDetails
}
function addAccountDetails(req,res){
    if(req.body.accountName!=''&&req.body.accountName!=null){
        return  usermanagementDAO.checkCount("account_details",req.body.accountName).then(async function(accountResponse){
            console.log(accountResponse[0].total);
            if(accountResponse[0].total==0){
                return usermanagementDAO.addAccountDetails(req.body).then(function (response){
                    var finalResult;
                    if(response.affectedRows>0){
                            finalResult={
                                "status" : "Success",
                                "message" : "Account created successfully",
                                "accountId" : response.insertId
                            }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "message" : "Error occured while creating account"
                        }
                    }
                    res.send(finalResult);
                })
            }else{
                finalResult={
                    "status" : "Failure",
                    "message" : "Account Details already exists"
                }
                res.send(finalResult);
            }
        });
    }else{
        var finalResult={
            "status" : "Failure",
            "message" : "Invalid parameters passed"
        }
        res.send(finalResult);
    }
}
function addCustomerDetails(req,res){
    if(req.body.accountId!=''&&req.body.accountId!=null&&req.body.customerName!=''&&req.body.customerName!=null){
        return  usermanagementDAO.checkCustomerCount(req.body).then(async function(customerResponse){
            if(customerResponse[0].total==0){
                return usermanagementDAO.addCustomerDetails(req.body).then(function (response){
                    var finalResult;
                    if(response.affectedRows>0){
                        finalResult={
                            "status" : "Success",
                            "message" : "CustomerDetails created successfully",
                            "accountId" : req.body.accountId,
                            "customerId" : response.insertId
                        }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "message" : "Error occured while creating customer details"
                        }
                    }
                    res.send(finalResult);
                });
            }else{
                finalResult={
                    "status" : "Failure",
                    "message" : "Customer Details already exists"
                }
                res.send(finalResult);
            }
        });
    }else{
        finalResult={
            "status" : "Failure",
            "message" : "Error occured while creating account"
        }
        res.send(finalResult);
    }
}
function addUser(req,res){
    if(req.body.loginId!=''&&req.body.loginId!=null){
        return  usermanagementDAO.checkCount("user_details",req.body.loginId).then(async function(userResponse){
            if(userResponse[0].total==0){
                return usermanagementDAO.addUsers(req.body).then(function (response){
                    var finalResult;
                    if(response.affectedRows>0){
                        finalResult={
                            "status" : "Success",
                            "message" : "User created successfully",
                            "accountId" : req.body.accountId,
                            "customerId" : req.body.customerId,
                            "userId" : response.insertId
                        }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "message" : "Error occured while creating users"
                        }
                    }
                    res.send(finalResult);
                });
            }else{
                finalResult={
                    "status" : "Failure",
                    "message" : "User Details already exists"
                }
                res.send(finalResult);
            }
        });
    }else{
        finalResult={
            "status" : "Failure",
            "message" : "Error occured while creating users"
        }
        res.send(finalResult);
    }
}
function getAccountDetails(req,res){
    var finalResult={
        "status" : "Failure",
        "message" : "Invalid account Id"
    }
    if(req.query.accountId!=null&&req.query.accountId!=0){
        return usermanagementDAO.getAccountDetails(req.query.accountId).then(function(response){
            if(response[0]!=null){
            res.send(response);
            }else{
                res.send(finalResult);
            }
        })
    }else{
        res.send(finalResult);
    }
}
function getCustomerDetails(req,res){
    var finalResult={
        "status" : "Failure",
        "message" : "Invalid accountId/customerId"
    }
    if(req.query.accountId!=null&&req.query.accountId!=0&&req.query.customerId!=null&&req.query.customerId!=0){
        return usermanagementDAO.getCustomerDetails(req.query.accountId,req.query.customerId).then(function(response){
            if(response[0]!=null){
            res.send(response);
            }else{
                res.send(finalResult);
            }
        })
    }else{
        res.send(finalResult);
    }
}
function getUserDetails(req,res){
    var finalResult={
        "status" : "Failure",
        "message" : "No details available"
    }
    if(req.query.accountId!=null&&req.query.accountId!=0&&req.query.userId!=null&&req.query.userId!=0){
        return usermanagementDAO.getUserDetails(req.query.accountId,req.query.customerId,req.query.userId).then(function(response){
            if(response[0]!=null){
            res.send(response);
            }else{
                res.send(finalResult);
            }
        })
    }else{
        res.send(finalResult);
    }
}