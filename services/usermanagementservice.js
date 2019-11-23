var usermanagementDAO=require("../dao/usermanagementDAO");
module.exports =  {
    addAccountDetails: addAccountDetails,
    addCustomerDetails : addCustomerDetails,
    addUser : addUser
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
                                "data" : "Account created successfully",
                                "accountId" : response.insertId
                            }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "data" : "Error occured while creating account"
                        }
                    }
                    res.send(finalResult);
                })
            }else{
                finalResult={
                    "status" : "Failure",
                    "data" : "Account Details already exists"
                }
                res.send(finalResult);
            }
        });
    }else{
        var finalResult={
            "status" : "Failure",
            "data" : "Invalid parameters passed"
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
                            "data" : "CustomerDetails created successfully",
                            "accountId" : req.body.accountId,
                            "customerId" : response.insertId
                        }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "data" : "Error occured while creating customer details"
                        }
                    }
                    res.send(finalResult);
                });
            }else{
                finalResult={
                    "status" : "Failure",
                    "data" : "Customer Details already exists"
                }
                res.send(finalResult);
            }
        });
    }else{
        finalResult={
            "status" : "Failure",
            "data" : "Error occured while creating account"
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
                            "data" : "User created successfully",
                            "accountId" : req.body.accountId,
                            "customerId" : req.body.customerId,
                            "userId" : response.insertId
                        }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "data" : "Error occured while creating users"
                        }
                    }
                    res.send(finalResult);
                });
            }else{
                finalResult={
                    "status" : "Failure",
                    "data" : "User Details already exists"
                }
                res.send(finalResult);
            }
        });
    }else{
        finalResult={
            "status" : "Failure",
            "data" : "Error occured while creating users"
        }
        res.send(finalResult);
    }
}