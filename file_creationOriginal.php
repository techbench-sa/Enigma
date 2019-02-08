<?php

function doExec(){


    $user = $_REQUEST['playerID'];
    //create folder
    $dir = "users";

    $questionName = $_REQUEST['questionName'];
    $questionNo = $_REQUEST['qNo'];

    //$file_to_write =  $questionName . '.java';
    $lang = $_REQUEST['l'];


    if($lang == "j"){
        //java code
        $file_to_write =  $questionName . '.java';

        $content_to_write = getContent($user, $questionName);

    }else{
        // C code
        $file_to_write =  $questionName . '.c';
        $content_to_write = getContentForC($user, $questionName);

    }


    if( is_dir($dir) === false )
    {
        mkdir($dir);
    }
    if( is_dir($dir.'/'.$user) === false )
    {
        mkdir($dir.'/'.$user);
    }

    $file = fopen($dir . '/' . $user . '/' . $file_to_write,"w");

    // a different way to write content into
    // fwrite($file,"Hello World.");

    fwrite($file, $content_to_write);

    // closes the file
    fclose($file);




    $r_output= array();
    $compiled = "";

    $c_var = 1;
    $r_var = 1;

    // compile
    if($lang == "j"){
        //$c_output = array();
        $compiled =  (exec('javac ./'.$dir . '/' . $user . '/' . $file_to_write. ' 2> ./'.$dir . '/' . $user . '/' .$questionName.'.txt',
                           $c_output,
                           $c_var ));


        if($c_var == 0 ){
            // compiled!

            //execute
            //$result =
            $str =  'java -cp ./'.$dir . '/' . $user . ' ' . $questionName;
            //echo $str;
            $result =  (exec($str, 
                             $r_output,
                             $r_var));

            //print_r($r_output);
            if($r_var == 0){
                //echo "Your score ".$result;
                //                echo '<pre>'; print_r($r_output); echo '</pre>';

                //print_r($r_output);
                //storeResult($user, $questionID,$result );

            }else{
                // echo ' RUNTIME Error<br>';
                //  print_r($r_output);
                $result = 0;
                // echo ' \nReturnStatus '. $r_var ;
            }

        }else{
            $myfile = fopen('./'.$dir . '/' . $user . '/' .$questionName.'.txt', "r");// or die("Unable to open file!");
            // Output one line until end-of-file
            while(!feof($myfile)) {
                $compiled .= fgets($myfile) . "<br>";
            }
            fclose($myfile);

            //echo 'compiler error<br>';
            //print("- ".$compiled." -");
            //print_r($c_output);

            $result = 0;
        }
    }else{
        //compile in C
        $compiled = (exec( 'gcc ./'.$dir . '/' . $user . '/' . $file_to_write . ' -o ./'.$dir . '/' . $user . '/'. $questionName.".out". 
                          ' 2> ./'.$dir . '/' . $user . '/' .$questionName.'.txt'
                          ,
                          $c_output,
                          $c_var ));


        if($c_var == 0 ){
            // compiled!

            //execute
            //CHECK THIS !!
            $cmd =  './'.$dir . '/' . $user . '/' . $questionName.".out";
            //echo $cmd;
            $result =(exec($cmd, 
                           $r_output,
                           $r_var) );

            //print_r($r_output);
            if($r_var == 0){
                //echo "Your score ".$result;
                //print_r($r_output);

                //storeResult($user, $questionID,$result );

            }else{
                //echo ' RUNTIME Error<br>';
                //print_r($r_output);
                $result = 0;
                //echo ' \nReturnStatus '. $r_var ;
            }

        }else{
            $myfile = fopen('./'.$dir . '/' . $user . '/' .$questionName.'.txt', "r");// or die("Unable to open file!");
            // Output one line until end-of-file
            while(!feof($myfile)) {
                $compiled .= fgets($myfile) . "<br>";
            }
            fclose($myfile);

            //echo 'compiler error<br>';
            //print("- ".$compiled." -");
            $result = 0;
        }


    }



    $msg="";
    $score=0;
    $error=1;

    if($c_var != 0){
        //compile error
        $msg = $compiled;

    }else if($r_var != 0){
        //runtime error
        $msg = implode("\n",$r_output);

    }else {
        //everything seams fine
        $error=0;
        $scoreLine = array_pop($r_output);
        $out = implode("\n",$r_output);

        preg_match("|\d+|", $scoreLine, $m);

        $score= $m[0];
        if($m[0] > 0){
            storeResult($user, $questionNo, $m[0] );
        }
    }

    $solve=array(
        'score'=>$score,
        'error'=> $error,
        'msg'=>$msg,
        'result'=>$r_output

    );


    //storeResult($user, $questionNo, $solve['score'] );

    return $solve;
}



//unset($_REQUEST);
//echo $result;

//storeResult($user, $questionID,$result );

//return the result

//store in DB

function storeResult($user, $questionID,$result ){
    include_once('db.php');
    $conn = connect();

    $sql = "select count(*) m, p from submissions s
                join (
                    Select points p, questionNum qn  from questions where questionNum = '$questionID'
                ) q
                on q.qn = s.questionNum
                where questionNum = '$questionID'
                and s.score >= q.p";
    $query = $conn->query($sql);

    if($query->num_rows > 0){
        $row = $query->fetch_assoc();

        if($result >= $row['p']){
            $result += $row['m'] > 10 ? 0 : (10 - ($row['m']));
        }

    }else{
        $count = 0;
    }


    $sql = "update submissions set score = '$result' where playerID= '$user' and questionNum = '$questionID'";
    //print $sql;
    $resultSet = $conn->query($sql);

}


function getContent($user, $questionName){


    include_once('db.php');
    $conn = connect();

    $sql= "Select * from questions where questionName='".$questionName."'";
    //222echo $sql;
    $result = $conn->query($sql);
    $sql2="";
    //echo "1";
    if( $result->num_rows > 0){
        //echo "2";

        $row = $result->fetch_assoc();

        $content = '
        import java.util.*;
        public class '. $questionName . ' { 
			public static void main (String args[]){
			';


        $content .= $row["main_body"];

        //main method closing
        $content .= ' 
			}
			';

        //metod to be called in the main.
        $content .= $row["method_signature"];
        //method opening 
        $content .= ' {
			';
        $sql2= "Select code from submissions where playerID='$user' and questionNum='".$row["questionNum"]."'";

    }



    $result = $conn->query($sql2);
    if( $result->num_rows > 0){
        $row = $result->fetch_assoc();

        //user code
        $content .= $row["code"];


    }	
    //method closing
    $content .= ' 
		}';

    //class closing
    $content .= ' 
		}';

    return $content;
}

function getContentForC($user, $questionName){


    include_once('db.php');
    $conn = connect();

    $sql= "Select * from questions where questionName='".$questionName."'";
    //222echo $sql;
    $result = $conn->query($sql);
    $sql2="";
    //echo "1";
    if( $result->num_rows > 0){
        //echo "2";

        $row = $result->fetch_assoc();

        $content = '
#include<stdio.h>
#include <stdlib.h>
#include <string.h> 

';



        $main_content ='int main()
{
        ';
        $main_content .= $row["main_body_c"];

        //main method closing
        $main_content .= ' 
			}
			';

        //metod to be called in the main.
        $content .= $row["method_signature_c"];
        //method opening 
        $content .= '{
			';
        $sql2= "Select code from submissions where playerID='$user' and questionNum='".$row["questionNum"]."'";

    }



    $result = $conn->query($sql2);
    if( $result->num_rows > 0){
        $row = $result->fetch_assoc();

        //user code
        $content .= $row["code"];


    }	
    //method closing
    $content .= ' 
		}';



    return $content . $main_content;
}



?>