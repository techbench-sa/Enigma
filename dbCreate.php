<?php
//$dbName = "haDb1";


$conn = new mysqli(_servername, _username, _password);


$sql = "CREATE DATABASE "._dbName." DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully\n";
   $conn->select_db(_dbName);
    
    
    $sql = "CREATE TABLE players (
  id int(6) NOT NULL,
  name varchar(100) CHARACTER SET latin1 NOT NULL,
  points int(11) DEFAULT 0,
  pass int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

		";
    if ($result = $conn->query($sql)) {
        
        print "Table 1 created successfully\n";
        
        $sql = "CREATE TABLE submissions (
  subID int(6) NOT NULL,
  time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  playerID int(6) NOT NULL,
  questionNum int(6) NOT NULL,
  code text NOT NULL,
  score decimal(6,3) DEFAULT 0.000,
  language varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
			";
        
        if($result = $conn->query($sql)){
        	print "Table 2 created successfully\n";
        	
        	print "ALTERing \n";
        	$sql = "
            CREATE TABLE questions (
  questionNum int(10) NOT NULL,
  questionName varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  main_body varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  method_signature varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  main_body_c varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  method_signature_c varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  points int(5) NOT NULL DEFAULT 10,
  problem_description varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  hidden tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
            
            
            ALTER TABLE players
  ADD PRIMARY KEY (id);


ALTER TABLE questions
  ADD PRIMARY KEY (questionNum);

ALTER TABLE submissions
  ADD PRIMARY KEY (subID),
  ADD UNIQUE KEY time (time,playerID),
  ADD UNIQUE KEY playerID_2 (playerID,questionNum),
  ADD KEY playerID (playerID);

ALTER TABLE players
  MODIFY id int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE questions
  MODIFY questionNum int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE submissions
  MODIFY subID int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;
				";
        	$conn->multi_query($sql);
        	
        	if( $conn->connect_errno){
        		print "\n\n Error altering tables  \n".$conn->connect_error;
        		
        	}else{
        		echo "\n\n SUCCESS  \n";
        		
        	}
        }
        
    }

    
    
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();