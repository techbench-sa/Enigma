<?php
require_once("db.php");
$conn = connect();
$sql= "Select playerID id, sum(score) points,count(questionNum) qs, name  from submissions inner join players on players.id = submissions.playerID
GROUP BY playerID";
$result = $conn->query($sql) or die(mysqli_error($conn));

$list = array();

if ($result->num_rows > 0) {
    // output data of each row
    
     while ($obj=mysqli_fetch_object($result))
    {
    
         $obj->points = intval($obj->points);
         array_push($list,$obj);

    }
  // Free result set
    
    
} 
$conn->close();
echo json_encode($list);
