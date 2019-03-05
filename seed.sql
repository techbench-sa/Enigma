--
-- Seed
-- For
-- Hackathon
-- Database
--
-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET AUTOCOMMIT = 0;
-- START TRANSACTION;
-- SET time_zone = "+00:00";
-- <init>

DROP DATABASE hackathon;

DROP ROLE admin;

CREATE ROLE admin WITH CREATEDB LOGIN PASSWORD 'hadi';

\c postgres admin
CREATE DATABASE hackathon;

\c hackathon;
-- </init>
--
-- Table structure for table "users"
--

CREATE TABLE "user" (
    "id" SERIAL,
    "name" VARCHAR(40) NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,
    PRIMARY KEY (id)
);

--
-- Dumping data for table "users"
--

INSERT INTO "user" ("name", "username", "password")
        VALUES ('Mohammed Alobaidi', 'mohalobaidi', '123456'), ('Hadi Albinsaad', 'hadi', 'hadi'), ('Admin', 'admin', 'hadi');
--
-- Table structure for table "challenge"
--

CREATE TABLE "challenge" (
    "id" SERIAL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "method_name" VARCHAR(40) NOT NULL,
    "method_type" VARCHAR(20) NOT NULL,
    "parameters" TEXT NOT NULL,
    "tests" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 10,
    "hidden" SMALLINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

--
-- Dumping data for table "challenges"
--

INSERT INTO "challenge" ("name", "description", "method_name", "method_type", "tests", "parameters", "points", "hidden")
        VALUES ('Reverse a String', 'Reverse the provided string. Your result must be a string. Write your own code.', 'reverseString', 'String', '{"inputs":[["hello","kfupm","racecar","Howdy","Greetings from Earth"]],"outputs":["olleh","mpufk","racecar","ydwoH","htraE morf sgniteerG"]}', '[{"name":"str","type":"String"}]', 5, 0), ('Factorial', 'Return the factorial of the provided integer.\n\nOnly integers greater than or equal to zero will be supplied to the function.', 'factorialize', 'Integer', '{"inputs":[["5", "10", "4", "0"]],"outputs": ["120", "3628800", "24", "1"]}', '[{"name":"num","type":"Integer"}]', 4, 0), ('Longest word', 'Return the length of the longest word in the provided sentence.\n\nYour response should be a number.', 'findLongestWordLength', 'Integer', '{"inputs":[["The quick brown fox jumped over the lazy dog","May the force be with you","Google do a barrel roll","What is the average airspeed velocity of an unladen swallow","What if we try a super-long word such as otorhinolaryngology"]],"outputs:["6","5","6","8","19"]}', '[{"name":"str","type":"String"}]', 5, 0), ('Repeat String', 'Repeat a given string str (first argument) for num times (second argument). Return an empty string if num is not a positive number.', 'repeatString', 'String', '{"inputs":[["*","abc","abc","*","abc"],["3","3","1","8","-2"]],"outputs":["***","abcabcabc","abc","********",""]}', '[{"name":"str","type":"String"},{"name":"num","type":"Integer"}]', 5, 0), ('Truncate String', 'Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a ... ending.', 'truncateString', 'String', '{"inputs":[["A-tisket a-tasket A green and yellow basket","Peter Piper picked a peck of pickled peppers","A-","Absolutely Longer"],["8","11","1","2"]],"outputs":["A-tisket...","Peter Piper...","A...","Ab..."]}', '[{"name":"str","type":"String"},{"name":"num","type":"Integer"}]', 4, 0), ('Palindrome', 'Return true if the given string is a palindrome. Otherwise, return false.', 'palindrome', 'Boolean', '{"inputs":[["eye","_eye","race car","not a palindrome","nope","almostomla","My age is 0, 0 si ega ym.","1 eye for of 1 eye.","0_0 (: /-\\ :) 0-0"]],"outputs":["true","true","true","false","false","true","false","true"]}', '[{"name":"str","type":"String"}]', 9, 0), ('Roman Numeral', 'Convert the given number into a roman numeral.\n\nAll roman numerals answers should be provided in upper-case.\n\n', 'convertToRoman', 'String', '{"inputs":[["2","4","12","16","68","99","649","3999"]],"outputs":["II","IV","XII","XVI","LXVIII","XCIX","DCXLIX","MMMCMXCIX"]}', '[{"name":"num","type":"Integer"}]', 8, 0), ('Caesars Cipher', 'Write a function which takes a ROT13 encoded string as input and returns a decoded string.', 'rot13', 'String', '{"inputs":[["SERR PBQR PNZC","SERR CVMMN!","SERR YBIR?","GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."]],"outputs":["FREE CODE CAMP","FREE PIZZA!","FREE LOVE?","THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."]}', '[{"name":"str","type":"String"}]', 4, 0), ('Sum All Primes', 'Sum all the prime numbers up to and including the provided number.', 'sumPrimes', 'Integer', '{"inputs":[["10","15","20","25","977"]],"outputs":["17","41","77","100","73156"]}', '[{"name":"num","type":"Integer"}]', 5, 0), ('Missing letters', 'Find the missing letter in the passed letter range and return it.\n\nIf all letters are present in the range, return empty string.', 'fearNotLetter', 'String', '{"inputs":[["abce","abcdefghjklmno","stvwx","bcdf","abcdefghijklnopqrstuvwxyz"]],"outputs":["d","i","u","e","m"]}', '[{"name":"str","type":"String"}]', 5, 0), ('Spinal Tap Case', 'Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.', 'spinalCase', 'String', '{"inputs":[["This Is Spinal Tap","thisIsSpinalTap","The_Andy_Griffith_Show","Teletubbies say Eh-oh","AllThe-small Things"]],"outputs":["this-is-spinal-tap","this-is-spinal-tap","the-andy-griffith-show","teletubbies-say-eh-oh","all-the-small-things"]}', '[{"name":"str","type":"String"}]', 5, 0), ('Pig Latin', 'Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay". If a word begins with a vowel you just add "way" to the end.', 'translatePigLatin', 'String', '{"inputs":[["california","paragraphs","glove","algorithm","eight"]],"outputs":["aliforniacay","aragraphspay","oveglay","algorithmway","eightway"]}', '[{"name":"str","type":"String"}]', 5, 0);
--
-- Table structure for table "submissions"
--

CREATE TABLE "submission" (
    "id" SERIAL,
    "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "player_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    FOREIGN KEY (player_id) REFERENCES "user" (id),
    FOREIGN KEY (challenge_id) REFERENCES "challenge" (id),
    PRIMARY KEY (id)
);

-- provided the field is named the same thing in
-- all tables that use this, you can use a centralized function

CREATE FUNCTION update_submission_timestamp ()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.timestamp = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER submission_time_modtime
    BEFORE UPDATE ON submission
    FOR EACH ROW
    EXECUTE PROCEDURE update_submission_timestamp ();

