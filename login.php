<?php  
session_start([
    'cookie_lifetime' => 86400
]);
$msg = "";
if(isset($_SESSION['pid'])){
    header("Location: index.php");
    exit();
}else if(isset($_REQUEST['pid']) && isset($_REQUEST['pass'])){


    // check db
    include_once("db.php");
    $con = connect();
    $p = mysqli_real_escape_string($con,$_REQUEST['pid']);
    $s = mysqli_real_escape_string($con,$_REQUEST['pass']);

    $sql= "Select * from players where id='".$p."' and pass='".$s ."'";
    $ans = $con->query($sql);

    if($ans!== false && $ans->num_rows == 1){
        $r = $ans->fetch_assoc();
        $_SESSION['pid'] = $p;
        $_SESSION['uname'] = $r['name'];

        header("Location: index.php");
        exit();
    }else{
        $msg = "player ID and/or pass does not match";
    }

$con->close();
}


?>
<!DOCTYPE html>
<html>
    <head>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="css/materialize.min.css" />
        <!--        <link rel="stylesheet" type="text/css" href="css/index.css" />-->
    </head>
    <body class="blue-grey darken-3">
<nav class="blue-grey darken-4">
                <a href="http://www.techbench.org" target="_blank" class="left hide-on-sma-and-down"> <img style="height: 70px" src="profile.png"></img></a>
            <a class="brand-logo center" ><span class=" text-lighten">ICS 202 Challenge</span></a>
                <a class="brand-logo right"> <img style="height: 70px" src="csrg.png"></img></a>

    </nav>


<br>
<div class="container " style="">
    <div class="row">
        <div class="col s6 m10 offset-m1">
            <div class="card-panel blue-grey lighten-4= z-depth-5">

                <h4 class="center white-text"><b>Login</b></h4>	 

                <form action="login.php" method="post">
                    <div class="row white-text">
                        <div class="input-field col s12">
                            <i class="material-icons prefix"></i>
                            <input class="white-text" type="text" autofocus name="pid" >
                            <label class="white-text" for="pid">Enter your player ID: </label>
                        </div>

                        <div class="input-field col s12">
                            <i class="material-icons prefix"></i>
                            <!--input class="white-text" type="text"  name="playerID"-->
                            <!--label  for="playerID">Enter your password: </label-->
                            <input type="text"  name="pass">
                            <label class="white-text" for="pass">Enter your passcode: </label>
                        </div>
                    </div>

                    <div class="row">					
                        <div class="center-align">
                            <span><?php echo $msg; $msg=""; ?></span><br/>
                            <button class="btn-large waves-effect waves-light blue lighten-1" type="submit" name="action">Login
                            </button>
                        </div>
                    </div>
                </form>

            </div><!--col-->
        </div><!--row-->
    </div><!--card-->
    <br>
    <div class="divider blue-grey darken-2"></div>

    <div class="row">
        <div class="col l12 m12 s12   blue-grey-text text-lighten-2">
            
        </div>

    </div>
</div>
</div>

<script type="text/javascript" src="js/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>
<script>

    $(document).ready(function() {
        $('select').material_select();
        $(".button-collapse").sideNav();
    });

</script>
</body>
</html>
