var connection=require('../sqlconfig/config')
module.exports =  {
    addAccountDetails: addAccountDetails,
    addCustomerDetails : addCustomerDetails,
    addUsers : addUsers,
    checkCount : checkCount,
    checkCustomerCount : checkCustomerCount
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
