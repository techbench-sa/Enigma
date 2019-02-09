<?php

if(isset($_REQUEST["name"])){
    include_once('db.php');
    $conn = connect();
    
    $pname = $_REQUEST["name"];
    
    $sql= "INSERT INTO players (name) VALUES ('$pname')";
    
    if($conn->query($sql) === TRUE){
           //include_once('getPlayers.php');
    }else{
        //echo "Error inserting player to database: " . $conn->error;
    }
    $conn->close();
}
include_once('getPlayers.php');