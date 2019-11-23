var connection=require('../sqlconfig/config')
module.exports =  {
  checkCredentials:checkCredentials,
  updateActivationFlag:updateActivationFlag,
  checkActivationDetails:checkActivationDetails,
  }
  function checkCredentials(data){
    try{
      var query="Select * from user_details where login_id='"+data.loginId+"' and password='"+data.password+"'";
      return new Promise((resolve, reject) => {
        connection.query(query).then((result)=> {
            resolve(result);
          });
      });	
    }catch(err){
      throw err;
  }
}
function updateActivationFlag(data){
  try{
    var query="update user_details set activation_flag=1 where login_id='"+data.loginId+"'";
    return new Promise((resolve, reject) => {
      connection.query(query).then((result)=> {
          resolve(result);
        });
    });	
  }catch(err){
    throw err;
  }
}
function checkActivationDetails(data){
    try{
        var query="SELECT count(*) as total FROM user_details where login_id = '"+data.loginId+"' and activation_flag=0"
        console.log(query)
        return new Promise((resolve, reject) => {
            connection.query(query).then((result)=> {
                resolve(result);
              });
        });	
    }catch(err){
        throw err;
    }
}
 