var authDAO=require("../dao/authDAO");
module.exports =  {
	login:login,
	updateActivationFlag : updateActivationFlag
}


function login(req,res){
	if(req.body.loginId!=null&&req.body.loginId!=""){
		var finalResult;
		return authDAO.checkCredentials(req.body).then(function (response){
			console.log(response[0])
			if(response[0]!=null){
				if(response[0].activation_flag!=0){
					finalResult={
						"status" : "Success",
						"data" : "Logged in Successfully",
						"result" : response[0]
					}
				}else{
					finalResult={
						"status" : "Failure",
						"data" : "Account not activated",
					}
				}
			}else{
				finalResult={
					"status" : "Failure",
					"data" : "Invalid Credentials"
				}
			}
			res.send(finalResult);
		});
	}else{
		finalResult={
			"status" : "Failure",
			"data" : "Invalid Request"
		}
		res.send(finalResult);
	}
}
function updateActivationFlag(req,res){
	var finalResult;
	if(req.body.loginId!=null){
		return  authDAO.checkActivationDetails(req.body).then(async function(response){
			console.log(response)
			if(response[0].total!=0){
				return  authDAO.updateActivationFlag(req.body).then(function(accountResponse){
					var finalResult;
					if(accountResponse.affectedRows>0){
                        finalResult={
                            "status" : "Success",
                            "data" : "Account activated successfully",
                        }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "data" : "Error occured while activating account"
                        }
                    }
                    res.send(finalResult);
				});
			}else{
				finalResult={
					"status" : "Failure",
					"data" : "This account has been already activated."
				}
			}
			res.send(finalResult);
		});
	}else{
        finalResult={
            "status" : "Failure",
            "data" : "Error occured while creating account"
        }
        res.send(finalResult);
    }
}
