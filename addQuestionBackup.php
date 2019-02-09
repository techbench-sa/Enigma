
<html>
    <head>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/materialize.min.css" />
<script type="text/javascript" src="js/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>

    </head>
    <body>
        <form action="" method="POST">

            <div class="">
                <!-- Page Content goes here -->
                <div class="row">

                    <div class="col s9 offset-s3">
                        <h3 style="color: blue;">
                            <?php

                            if(isset($_REQUEST['q'])){
                                include_once('db.php');
                                $conn = connect();

                                $name = $_REQUEST["q"];
                                $desc = $_REQUEST['problem_description'];

                                $main = $conn->real_escape_string($_REQUEST['main']);
                                $sign = $conn->real_escape_string($_REQUEST["method_signature"]);
                                $main_c = $conn->real_escape_string($_REQUEST['main_c']);
                                $sign_c = $conn->real_escape_string($_REQUEST["method_signature_c"]);
                                $p = $conn->real_escape_string($_REQUEST["p"]);

                                if($name && $main && $sign && $desc ){
                                    $sql= "insert into questions (questionName, main_body,method_signature,main_body_c,method_signature_c,problem_description, points) values ('$name', '$main', '$sign','$main_c', '$sign_c', '$desc', '$p')";
                                    //$sql = $conn->real_escape_string($sql);
                                    if($conn->query($sql) === TRUE){
                                        echo 'The problem "'.$name.'" is added';

                                        unset($_REQUEST);
                                    }else{
                                        echo "Couldn't add the problem $name";
                                    }
                                    $conn->close();
                                }else{
                                    echo "All fields are required";

                                }

                            }
                            ?>
                        </h3>
                    </div>
                </div>
                <div class="row">

                    <div class="col s10 offset-s1">
                        <!-- Teal page content  -->
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">The problem description:</span>
                                <textarea id="main" name="problem_description" rows="10" cols="100"  class="materialize-textarea" placeholder='What do they need to solve'><?php echo isset($_REQUEST['problem_description'])? $_REQUEST['problem_description']:"" ?></textarea>
                                <input type="text" placeholder="Points" name="p" <?php echo isset($_REQUEST['p'])? 'value="'.$_REQUEST['p'] .'"':"" ?> >
                            </div>

                        </div>
                    </div>

                </div>
                <div class="divider"></div>

                <div class="row">

                    <div class="col s6">
                        <!-- JAVA -->
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">JAVA</span>
                                <p>
                                    public class <input type="text" placeholder="Problem_Name" name="q" <?php echo isset($_REQUEST['q'])? 'value="'.$_REQUEST['q'] .'"':"" ?> > {<br/>
                                    public static void main (String args[]){	<br>		
                                    <textarea id="main" name="main" rows="10" cols="100"  class="materialize-textarea" placeholder='the body of the main method. It should only print the score'><?php echo isset($_REQUEST['main'])? $_REQUEST['main']:"" ?></textarea>
                                    <br>}
                                    <br><br><br>
                                <h6>//method signature which should be called in the main method</h6>
                                <input type="text" name="method_signature" <?php echo isset($_REQUEST['method_signature'])? 'value="'.$_REQUEST['method_signature'] .'"':"" ?> placeholder="public static boolean method(int i)" > {<br>
                                <em>//contestants' code will be here;</em><br>
                                }<br>
                                }<br><br>
                                </p>
                        </div>
                    </div>

                </div>

                <div class="col s6">
                    <!-- C  -->
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">C</span>
                            <p>
                                <br/>
                                int main (){	<br>		
                                <textarea id="main" name="main_c" rows="10" cols="100"  class="materialize-textarea" placeholder='the body of the main method. It should only print the score'><?php echo isset($_REQUEST['main_c'])? $_REQUEST['main_c']:"" ?></textarea>
                                <br>}
                                <br><br><br>
                            <h6>//method signature which should be called in the main method</h6>
                            <input type="text" name="method_signature_c" <?php echo isset($_REQUEST['method_signature_c'])? 'value="'.$_REQUEST['method_signature_c'] .'"':"" ?> placeholder="int method_name(int i)" > {<br>
                            <em class="center-align">//contestants' code will be here;</em><br>
                            }<br>
                            }<br><br>
                            </p>
                    </div>
                </div>

            </div>

            </div>
        <div class="divider"></div>

        <div class="row">

            <div class="col s10 offset-s1 l10 offset-l1 m10 offset-m1 center-align">
                <!-- BOTH  -->
                <br>
                <button class="btn-large waves-effect waves-light" type="submit" name="action">Add 
                    <i class="material-icons right">done</i>
                </button>  ||  <a class="waves-effect waves-light btn-large red" href="questions.php">Cancel
                <i class="material-icons right">delete</i>
                </a>
            </div>

        </div>
        </div>

    </form>
</body>
</html>

<?
    unset($_REQUEST);
?>