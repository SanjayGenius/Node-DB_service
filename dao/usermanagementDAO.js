var connection=require('../sqlconfig/config')
module.exports =  {
    addAccountDetails: addAccountDetails,
    addCustomerDetails : addCustomerDetails,
    addUsers : addUsers,
    checkCount : checkCount,
    checkCustomerCount : checkCustomerCount,
    getAccountDetails:getAccountDetails,
    getCustomerDetails:getCustomerDetails,
    getUserDetails:getUserDetails,
    updatePassword:updatePassword
}

function addAccountDetails(data){
        var fields=[
            data.accountName,data.emailId,data.contactNumber,data.assignedservices
        ];
        var query="INSERT INTO account_details (account_name, email_address, contact_number,services) VALUES ?"
        return new Promise((resolve, reject) => {
            connection.query(query,[fields]).then((result)=> {

                resolve(result);
              })
              .catch(err => { 
                 reject(err);
              });
        });	
}
function addCustomerDetails(data){
    try{
        var fields=[
            data.customerName,data.customerAddress,data.contactNumber,data.accountId
        ];
        var query="INSERT INTO customer_details (name, address, contact_number,account_id) VALUES ?"
        console.log(query)
        return new Promise((resolve, reject) => {
            connection.query(query,[fields]).then((result)=> {
                resolve(result);
              });
        });	
    }catch(err){
        throw err;
    }
}
function addUsers(data){
    try{
        var fields=[
            data.loginId,data.password,data.accountId,data.customerId
        ];
        var query="INSERT INTO user_details (login_id, password, account_id,customer_id) VALUES ?"
        return new Promise((resolve, reject) => {
            connection.query(query,[fields]).then((result)=> {
                resolve(result);
              });
        });	
    }catch(err){
        throw err;
    }
}
function updatePassword(data){
    try{
        var query="update user_details set activation_flag=0,password='"+data.password+"' where login_id='"+data.loginId+"'";
        return new Promise((resolve, reject) => {
          connection.query(query).then((result)=> {
              resolve(result);
            });
        });	
      }catch(err){
        throw err;
      }
}
function checkCount(tableName,data){
    try{
        var columnName= (tableName=='user_details'?'login_id':tableName=='customer_details'?"name":"account_name")
        var query="SELECT count(*) as total FROM "+tableName+" where "+columnName+" = '"+data+"'"
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
function checkCustomerCount(data){
    try{
        var query="SELECT count(*) as total FROM customer_details where name = '"+data.customerName+"' and account_id='"+data.accountId+"'"
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
function getAccountDetails(accountId){
    try{
        var query="SELECT * FROM account_details where account_id ="+ accountId
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
function getCustomerDetails(accountId,customerId){
    try{
        var query="SELECT * FROM customer_details where account_id ="+ accountId+" and customer_id="+customerId
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
function getUserDetails(accountId,customerId,userId){
    try{
        var query="SELECT * FROM user_details where account_id ="+ accountId+" and customer_id="+customerId+" and user_id="+userId
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
