<?php
if(isset($_REQUEST['code'])){
    $solved = null;
    include_once('db.php');
    $conn = connect();

    $java = $_POST["code"];
    $playerID = $_POST["playerID"];
    $ques = $_POST["qNo"];
    $lan = $_POST["l"];
    

    $java = mysqli_real_escape_string($conn,$java);

    $sql= "INSERT INTO submissions (playerID, questionNum,code, language) VALUES 
        ('".$playerID."', '".$ques."', '". $java ."', '".$lan ."')
        ON DUPLICATE KEY UPDATE 
        code = '". $java ."',
        language = '".$lan ."'
        ;";
    //echo $sql;
    if($conn->query($sql) === TRUE){
        // print '\n true'; 

        include_once("file_creation.php");

        $solved = doExec();
    }else{
        $msg= "Error Submitting your answer to database: " . $conn->error;
    }
    
    header('Content-Type: application/json');
    if($solved != null){
         echo json_encode( $solved);
        
    }else
    {   $a =array("error"=> $msg);
        echo json_encode( $a);
    }
}


?>