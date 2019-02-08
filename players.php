<?php
require_once("db.php");
$conn = connect();
$sql= "Select id,ics103 ics, name, pass  from players";
$result = $conn->query($sql) or die(mysqli_error($conn));

//$list = array();

if ($result->num_rows > 0) {
    // output data of each row
    echo '<html>    <body>
        <table border="1px">
            <thead><td>Name</td><td>ID</td><td>Pacccode</td></thead>
            <tbody>
            
            ';
     while ($obj=mysqli_fetch_object($result))
    {
    
        echo '<tr><td>'.$obj->name.'</td><td>'.$obj->id.'</td><td>'.$obj->pass.'</td></tr>';
        
    }
  // Free result set
    echo '            </tbody>
        </table>
			
    </body>
</html>';
    
} 
$conn->close();

