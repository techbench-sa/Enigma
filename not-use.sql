-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Feb 14, 2016 at 07:48 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackathon_v2`
--
CREATE DATABASE IF NOT EXISTS `hackathon_v2` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `hackathon_v2`;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(6) NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `points` int(11) DEFAULT '0',
  `pic` varchar(100) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `points`, `pic`) VALUES
(10, 'qq', 0, NULL),
(11, 'abdulsamad', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `questionNum` int(10) NOT NULL,
  `questionName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `main_body` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `method_signature` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `main_body_c` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `method_signature_c` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `points` int(5) NOT NULL DEFAULT '10',
  `problem_description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `hidden` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`questionNum`, `questionName`, `main_body`, `method_signature`, `main_body_c`, `method_signature_c`, `points`, `problem_description`, `hidden`) VALUES
(2, 'test', 'if(method1(4)){\r\nSystem.out.println(""+12);\r\n}else{\r\n\r\nSystem.out.println(""+23);\r\n}', 'public static boolean method1(int i)', 'c', '0', 10, 'dd', 0),
(3, 'second', 'if(method2(4)){\nSystem.out.println("asana");\n}else{\n\nSystem.out.println(""+25);\n\n}', 'public static boolean method2(int i)', '', 'as', 10, 'dd', 0),
(12, 'hah', 'if(ghazi() == 2){\n   System.out.println("SAIF");\n}', 'public static int ghazi()', '', '0', 10, 'hhasasdasd', 1),
(13, 'challenge1', '\r\nString [] parameter1 = {"Chocolate","Chocolate","Ice Cream","Ice Cream","Ice Cream","xyz","","Java","Java"};\r\nint [] parameter2 = {4,3,2,1,0,3,0,4,1};\r\nString [] correctOutput = {"ChocChoChC","ChoChC","IcI","I","","xyzxyx","","JavaJavJaJ","J"};\r\nboolean [] testResult = new boolean[parameter1.length];\r\n\r\nfor (int i = 0; i<testResult.length; i++)\r\n{\r\n   String testR = duplicateHeader(parameter1[i],parameter2[i]);\r\n   testResult[i] = (testR.equals(correctOutput[i]));\r\n}\r\n\r\nSystem.out.println(Arrays.toString(testResult));\r\n\r\nint validTests = 0;\r\nfor (int i = 0; i<testResult.length; i++)\r\n{\r\n   if (testResult[i])\r\n      validTests++;\r\n}\r\n// Score Counting: 1pts for every valid test \r\n// Doubling the score if all test cases are valid\r\nint score = validTests;\r\nif (validTests == testResult.length)\r\n     score += validTests;\r\n\r\nSystem.out.println("Score is: " + score);\r\n', 'public static String duplicateHeader(String str, int n) ', '\nchar parameter1[9][20] = {"Chocolate","Chocolate","Ice Cream","Ice Cream","Ice Cream","xyz","","Java","Java"};\nint parameter2[9] = {4,3,2,1,0,3,0,4,1};\nchar correctOutput[9][20] = {"ChocChoChC","ChoChC","IcI","I","","xyzxyx","","JavaJavJaJ","J"};\nint testResult[9];\nint i = 0;\nfor (i = 0; i<9; i++)\n{\n   char* testR = duplicateHeader(parameter1[i],parameter2[i]);\n   testResult[i] = (strcmp(testR,correctOutput[i]));\n}\n\nint validTests = 0;\n\nfor (i=0; i<9; i++)\n{\nprintf("%d",testResult[i]);\nif (testResult[i]==0)\n  { validTests++;}\n}\n\nint score = validTests;\nif (validTests == 9)\n{score+= validTests;}\n\nprintf("The score is: %d",score);\n', 'char* duplicateHeader(char* str, int n)', 10, 'Test from Dr. Sami', 0);

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `subID` int(6) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `playerID` int(6) NOT NULL,
  `questionNum` int(6) NOT NULL,
  `code` text NOT NULL,
  `score` decimal(6,3) DEFAULT '0.000',
  `language` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`subID`, `time`, `playerID`, `questionNum`, `code`, `score`, `language`) VALUES
(1, '2016-02-11 17:26:49', 10, 3, 'return false;', NULL, 'java'),
(4, '2016-02-11 17:26:53', 10, 12, 'return 2;', NULL, 'java'),
(7, '2016-02-11 17:39:44', 10, 13, 'return 2;', NULL, 'java'),
(8, '2016-02-14 00:41:27', 0, 0, '    \r\nscalded\r\nasda\r\n', '0.000', 'java'),
(35, '2016-02-14 18:35:55', 11, 3, 'return truae;', '0.000', 'j'),
(36, '2016-02-14 17:49:51', 11, 2, 'return true;', '0.000', 'j'),
(92, '2016-02-14 18:08:07', 11, 13, '\r\nint l = strlen(str);\r\nif (l == 0)\r\n   return "";\r\n\r\n\r\nchar* res = malloc(sizeof(char) * 40);\r\nint i = 0;\r\n\r\nfor (i = n; i>0; i--){\r\n  char temp[i+1];\r\n  strncpy(temp,str,i);\r\n  temp[i] = (char)0;\r\n\r\n  strcat(res,temp);\r\n}\r\n\r\nreturn res; \r\n', '0.000', 'c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questionNum`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`subID`),
  ADD UNIQUE KEY `time` (`time`,`playerID`),
  ADD UNIQUE KEY `playerID_2` (`playerID`,`questionNum`),
  ADD KEY `playerID` (`playerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `questionNum` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `subID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
