DROP SCHEMA IF EXISTS do;
CREATE DATABASE IF NOT EXISTS do;

DROP TABLE IF EXISTS services;
CREATE TABLE services(                                 
            `service_id` int(11) NOT NULL auto_increment,              
            `service_name` varchar(50) NOT NULL,                        
            `status_flag` varchar(50) NOT NULL,                   
            PRIMARY KEY  (`service_id`)                                 
          )ENGINE=InnoDB; 

DROP TABLE IF EXISTS account_details;
CREATE TABLE account_details(                                 
            `account_id` int(11) NOT NULL auto_increment,              
            `account_name` varchar(50) NOT NULL,                        
            `email_address` varchar(50) NOT NULL, 
            `contact_number` varchar(50) NOT NULL,
            `services` varchar(50) NOT NULL,                  
            PRIMARY KEY  (`account_id`) 
          )ENGINE=InnoDB; 

DROP TABLE IF EXISTS customer_details;
CREATE TABLE customer_details(                                 
            `customer_id` int(11) NOT NULL auto_increment,              
            `name` varchar(50) NOT NULL,                        
            `address` varchar(50) NULL, 
            `contact_number` varchar(50)NULL,
            `account_id` int(11) NOT NULL,                  
            PRIMARY KEY  (`customer_id`),
          FOREIGN KEY (account_id) REFERENCES account_details(account_id)
          )ENGINE=InnoDB; 

DROP TABLE IF EXISTS user_details;
CREATE TABLE user_details(                                 
            `user_id` int(11) NOT NULL auto_increment,              
            `functional_flag` varchar(50) NOT NULL,                        
            `login_id` varchar(50) NULL, 
            `password` varchar(50)NULL,
            `account_id` int(11) NOT NULL,   
            `customer_id` int(11) NOT NULL,                
            PRIMARY KEY  (`user_id`)
          )ENGINE=InnoDB;
          
insert into user_details (functional_flag,login_id,password,account_id,customer_id)
values (1,'root','root',0,0);