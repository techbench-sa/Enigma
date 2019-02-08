<html>
    <head>
<?php 
    include('db.php');
    $con = connect();

	if(isset($_REQUEST['d'])){
		$sql= "DELETE FROM questions where questionNum =". $_REQUEST['d']. ";";
		$result = $con->query($sql);
		unset($_REQUEST['d']);
	}
	if(isset($_REQUEST['show'])){
		$sql= "UPDATE questions SET hidden = '0' WHERE questionNum =" . $_REQUEST['show']. ";";
		$result = $con->query($sql);
		unset($_REQUEST['show']);
	}
	if(isset($_REQUEST['hide'])){
		$sql= "UPDATE questions SET hidden = '1' WHERE questionNum =" . $_REQUEST['hide']. ";";
		$result = $con->query($sql);
		unset($_REQUEST['show']);
	}
	
?>
    </head>
    <body>
        <table border="1px">
            <thead><td>Name</td><td>Description</td><td>points</td><td>signature (JAVA)</td><td>options</td><td>Visibility</td></thead>
            <tbody>
<?php
//    include('db.php');
// $con = connect();

    $sql= "SELECT * FROM questions";
    $result = $con->query($sql);

    while($row = $result->fetch_assoc()){
        
         echo '<tr><td>'. $row['questionName'] . '</td><td>'. $row['problem_description'] . '</td><td>'.$row['points'].'</td><td>'. $row['method_signature'].'</td>
         <td> Edit - 
         <a href="?d='.$row['questionNum'].'">Delete</a></td><td>';
		 if($row['hidden']){
		 	echo '<a style="color: red;" href="?show='.$row['questionNum'].'">Show</a>';
		 }else{
	 	echo '<a style="color: green;" href="?hide='.$row['questionNum'].'">Hide</a>';
		 }
        echo '</td></tr>';
        
    }
    
?>      

            </tbody>
        </table>
			<a href="addQuestion.php">Add Question</a>
    </body>
</html>