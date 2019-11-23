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
					finalResult={
						"status" : "Success",
						"message" : "Valid loginId",
						"data" : response[0]
					}
				
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "Invalid Credentials"
				}
			}
			res.send(finalResult);
		});
	}else{
		finalResult={
			"status" : "Failure",
			"message" : "Invalid Request"
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
                            "message" : "Account activated successfully",
                        }
                    }else{
                        finalResult={
                            "status" : "Failure",
                            "message" : "Error occured while activating account"
                        }
                    }
                    res.send(finalResult);
				});
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "This account has been already activated."
				}
			}
			res.send(finalResult);
		});
	}else{
        finalResult={
            "status" : "Failure",
            "message" : "Error occured while creating account"
        }
        res.send(finalResult);
    }
}
