<?php include("session.php"); ?><!DOCTYPE html>
<html>
    <head>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="css/materialize.min.css" />
        <!--        <link rel="stylesheet" type="text/css" href="css/index.css" />-->
    </head>
    <body class="blue-grey darken-3">

        <div class="container" style="margin-top:90px;">
            <?php if(isset($_REQUEST['qNo']) 
                     && isset($_REQUEST['l'])
                     && isset($_SESSION['pid'])

                    ){ 
    include_once("db.php");
    $con = connect();

    $sql= "Select * from questions where questionNum ='". $_REQUEST["qNo"]."';";
    $result = $con->query($sql);

    $sql= "Select * from submissions where playerID='". $_SESSION['pid'] ."' and questionNum='".$_REQUEST['qNo'] ."'";
    // $sql= "Select * from submissions where playerID='". $_SESSION['pid'] ."' and questionNum='".$_REQUEST['qNo'] ."'";

    $ans = $con->query($sql);

    if($result){
        $row = $result->fetch_assoc();

        if($row['hidden']){
            echo "The question is closed";
        }else{

            ?>
            <div class="card-panel blue-grey z-depth-5" >
                <div class="row">
                    <div class=" col s12 m12" style="margin-bottom: -30px;">
                        <h4 class="center white-text"><b> <?php echo $row['questionName']  ?></b> </h4>	 
                        <p class="center blue-grey-text text-lighten-4" style="font-size: large;">
                            <?php 
                echo  nl2br($row['problem_description']); ?>
                        </p>
                        <br>
                        <h3 id="jswarning" style="red">Javascript must be enabled</h3>
                        <br>

                        <div class="row" style="margin:20px;">

                            <form id="idForm" class="col s12 m12" action="upload.php" method="post" enctype="multipart/form-data">
                                <input type="hidden" name="l" value="<?php echo $_REQUEST['l'] ?>"/>
                                <input type="hidden"  name="playerID" value="<?php echo $_SESSION['pid']; ?>">
                                <input type="hidden" name="qNo" value="<?php echo $_REQUEST['qNo'] ?>">
                                <input type="hidden" name="questionName" value="<?php echo $row['questionName'] ?>">

                                <div class="row">
                                    <h5 class="grey-text text-darken-4" style="font-family: 'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace; ">
                                        <?php echo( $_REQUEST['l']=='j'?$row['method_signature']:$row['method_signature_c']); ?>
                                        <br>
                                        <br>

                                        <div class="col s12">

                                            <textarea placeholder="Type your solution here (<?php echo( $_REQUEST['l']=='j'?'Java':'Python'); ?> code):" id="code" name="code" rows='3' data-min-rows='3' class="white" style="min-height:300px; font-family: 'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace;  border:#fff 10px solid; border-radius:3px; font-size: large;"><?php 
        if ($ans){
            $ansR = $ans->fetch_assoc();
            if($ansR['language']==$_REQUEST['l'])
                echo $ansR['code'];
        }
                                                ?></textarea>
                                            <br>
                                            <br>
                                            

                                        </div>
                                    </h5>

                                </div>

                                <div class="row">					
                                    <div class="green-text text-darken-2" id="output" style="border-radius: 5px; padding: 10px; margin-bottom: 30px; font-size: large; font-weight:600;">

                                    </div>

                                    <div class="right-align">

                                        <a id="return" href="index.php" class="btn-large waves-effect waves-light red lighten-1 btn">Back </a>
                                        --
                                        <button id="go" class="btn-large waves-effect waves-light blue lighten-1" type="submit" name="action">Submit
                                            
                                        </button>


                                    </div>
                                </div>
                            </form>

                        </div><!--row-->
                    </div><!--col-->
                </div><!--row-->
            </div><!--card-->
            <?php }
    
    }
    $con->close();
} ?>
            <br>
            <div class="divider blue-grey darken-2"></div>

            <div class="row">
                <div class="col l6 m12 s12 blue-grey-text text-lighten-2">
                    <ul>
                        
                        <li>     You are not allowed to visit any other page
                        </li>

                    </ul>
                </div>

            </div>
        </div>

        <script type="text/javascript" src="js/jquery-2.2.0.min.js"></script>
        <script type="text/javascript" src="js/materialize.min.js"></script>
        <script>

            $(document).ready(function() {
                $("#jswarning").hide();
                //                $('body')
                //        .attr('unselectable', 'on')
                //        .css({
                //            'user-select': 'none',
                //            'MozUserSelect': 'none'
                //        })
                //        .on('selectstart', false)
                //        .on('mousedown', false);
                $("body").css("-webkit-user-select","none");
                $("body").css("-moz-user-select","none");
                $("body").css("-ms-user-select","none");
                $("body").css("-o-user-select","none");
                $("body").css("user-select","none");
            });

            //$("#go").click(function(){

            $("#idForm").submit(function(e) {
                var url = "upload.php"; // the script where you handle the form input.
                $("#go").attr('disabled','disabled').addClass('disabled').text('Compiling...');
                $("#scoreHolder").html("");
                $("#errorHolder").html("");

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $("#idForm").serialize(), // serializes the form's elements.
                    dataType: 'json',
                    success: function(data)
                    {
                        // document.getElementById("errorHolder").innerHTML = data.com;

                        $("#go").removeAttr('disabled').removeClass('disabled').text('Save & Go!');
                        $("#output").addClass('blue-grey lighten-3');
                        if(data.error == 1){
                            //console.log(data);
                            $("#output").removeClass('green-text');
                            $("#output").addClass('deep-orange-text text-darken-2');
                            $("#output").html(""+data.msg);

                        }else if (data.error == 0){
                            //No errors 
                            var tableOutput = "";

                            for(var i = 0; i < data.result.length ; i++){
                                if(data.result[i].indexOf("-false") >= 0 || data.result[i].indexOf("-0") >= 0){
                                    tableOutput += "<p class='collection-item red lighten-1 grey-text text-darken-3'>"+data.result[i]+"</p>";
                                }
                                else{
                                    tableOutput += "<p class='collection-item green lighten-1 white-text'>"+data.result[i]+"</p>";
                                }
                            }

                            $("#output").removeClass('deep-orange-text');
                            $("#output").addClass('green-text ');
                            $("#output").html("YourScore is "+data.score+"<div class='collection'>"+tableOutput+"</div> ");
                        }

                    },error:function (data){
                        $("#go").removeAttr('disabled').removeClass('disabled').text('Save & Go!');
                        alert("Connection error: pleae check your connection and try again");
                    }
                });

                e.preventDefault(); // avoid to execute the actual submit of the form.
            });

            // });



            $("textarea").keyup(function(e) {
                while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
                    $(this).height($(this).height()+1);
                };
            });

            $(document).delegate('#code', 'keydown', function(e) {
                var keyCode = e.keyCode || e.which;

                if (keyCode == 9) {
                    e.preventDefault();
                    var start = $(this).get(0).selectionStart;
                    var end = $(this).get(0).selectionEnd;

                    // set textarea value to: text before caret + tab + text after caret
                    $(this).val($(this).val().substring(0, start)
                                + "\t"
                                + $(this).val().substring(end));

                    // put caret at right position again
                    $(this).get(0).selectionStart =
                        $(this).get(0).selectionEnd = start + 1;
                }
            });
        </script>
        <footer>
    <br>
    <h6 class="center blue-grey-text text-lighten-1">Managed by <a class="blue-text text-lighten-2" href="http://www.samizhioua.com">Dr. Sami Zhioua</a></h6>
</footer>
    </body>
</html>
