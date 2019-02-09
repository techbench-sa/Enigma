<?php
    
define ('_servername' , "localhost");
define ('_username' , "root");
define ('_password' , "");

define ('_dbName' , "202db");

 
function connect(){


// Create connection
$conn = new mysqli(_servername, _username, _password, _dbName);

// Check connection
if ($conn->connect_error) {

	if(strpos($conn->connect_error,'Unknown database') !== false){
		echo "\n\nCATCHED !!\n\n";
		
		include('dbCreate.php');
		
	}else{
    	die("Connection failed: " . $conn->connect_error);
    }
} 
	
	
    return $conn;
}



