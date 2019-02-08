<?php include("session.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


        <link rel="stylesheet" type="text/css" href="css/materialize.min.css" />
        <!--        <link rel="stylesheet" type="text/css" href="css/index.css" />-->
    </head>
    <body class="blue-grey darken-3">
        <nav class="blue-grey darken-4">
                <a href="http://www.techbench.org" target="_blank" class="left hide-on-sma-and-down"> <img style="height: 70px" src="profile.png"></img> <img style="height: 70px" src="csrg.png"></img></a>
        <a class="brand-logo center" >ICS 202 Challenge</img></a>
    <ul id="nav-mobile" class="right">
        <li ><b style="font-size: large"><?php echo $_SESSION['uname']; ?></b></li>
        <li><a href="logout.php">Logout</a></li>
    </ul>

</nav>

<br>
<div class="container" style="">

    <div class="row">
        <?php 
        include("db.php");
        $con = connect();
        $sql = "SELECT questionNum,questionName,points,hidden,playerID, qno, score,method_signature_c, language FROM questions q \n"
            . "LEFT JOIN (\n"
            . "	SELECT playerID, questionNum as qno, score, language\n"
            . " FROM submissions s \n"
            . " WHERE s.playerID = '".$_SESSION['pid']."'\n"
            . ") a ON q.questionNum = a.qno where hidden = false  ORDER BY q.questionNum ASC";

        //$sql= "Select * from questions where hidden = false;";
        $result = $con->query($sql);
        $sum=0;

        while( $row = $result->fetch_assoc() ){
            $sum += $row['score'];

        ?>
        <div class="col s12 m6 l4 left">
            <?php
            if ($row['score'] >= $row['points']){
                echo'<div class="card green darken-1">';
            }
            else{
                echo'<div class="card hoverable blue-grey lighten-4=">';
            }
            ?>

            <div class="card-content white-text">
                <span class="card-title white-text"><b><?php echo 'C'.$row['questionNum'] .' - '. $row['questionName'];?></b></span>
                <p class="blue-grey-text text-lighten-3 center"><?php 
            echo ($row['score']!=null?
                  " ".$row['score']." out of ".$row['points']
                  :"Unsolved")  
                ;?></p>
            </div>
            <div class="card-action center">
                <?php if($row['score'] < $row['points'] ){ ?>
                <a href="solve.php?l=j&qNo=<?php echo $row['questionNum'];?>">Solve in Java</a>
                 <?php if( isset($row['method_signature_c'] ) ){ ?>
                <a href="solve.php?l=c&qNo=<?php echo $row['questionNum'];?>">Solve in Python</a>
                <?php 
                                                          }
                                                         }else{
                echo '<span>Solved</span>';
            } ?>
            </div>
        </div>
    </div>
    <?php  } $con->close();  ?>
</div>

<div class="divider blue-grey darken-2"></div>

<div class="row">
    <div class="col l12 m12 s12 center  blue-grey-text text-lighten-2">
        <h5><?php echo "Your total score ".$sum ; ?></h5>
        <ul>
            <li>  You are not allowed to visit any other page
            </li>

        </ul>
    </div>

</div>
</div>

<footer>
    <br>
    <h6 class="center blue-grey-text text-lighten-1">ICS 202 Challenge <a class="blue-text text-lighten-2" href="http://www.samizhioua.com">Dr. Sami Zhioua</a></h6>
</footer>

<script type="text/javascript" src="js/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>
<script>

    $(document).ready(function() {
        //        $('select').material_select();

        $(".button-collapse").sideNav();
    });

</script>
</body>
</html>
