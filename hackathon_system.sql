-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 14, 2019 at 11:38 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackathon_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `number` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `method_name` text COLLATE utf8_unicode_ci NOT NULL,
  `method_type` set('String','Integer','Double','Boolean','Cbar') COLLATE utf8_unicode_ci NOT NULL,
  `tests` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `parameters` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `points` int(5) NOT NULL DEFAULT '10',
  `hidden` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`number`, `name`, `description`, `method_name`, `method_type`, `tests`, `parameters`, `points`, `hidden`) VALUES
(54, 'Reverse a String', 'Reverse the provided string. Your result must be a string. Write your own code.', 'reverseString', 'String', '{\"inputs\":[[\"hello\",\"kfupm\",\"racecar\",\"Howdy\",\"Greetings from Earth\"]],\"outputs\":[\"olleh\",\"mpufk\",\"racecar\",\"ydwoH\",\"htraE morf sgniteerG\"]}', '[{\"name\":\"str\",\"type\":\"String\"}]', 5, 0),
(55, 'Factorial', 'Return the factorial of the provided integer.\n\nOnly integers greater than or equal to zero will be supplied to the function.', 'factorialize', 'Integer', '{\"inputs\":[[\"5\",\"10\",\"20\",\"0\"]],\"outputs\":[\"120\",\"3628800\",\"2432902008176640000\",\"1\"]}', '[{\"name\":\"num\",\"type\":\"Integer\"}]', 4, 0),
(56, 'Longest word', 'Return the length of the longest word in the provided sentence.\n\nYour response should be a number.', 'findLongestWordLength', 'Integer', '{\"inputs\":[[\"The quick brown fox jumped over the lazy dog\",\"May the force be with yo\",\"Google do a barrel roll\",\"What is the average airspeed velocity of an unladen swallow\",\"What if we try a super-lo', '[{\"name\":\"str\",\"type\":\"String\"}]', 5, 0),
(57, 'Repeat String', 'Repeat a given string str (first argument) for num times (second argument). Return an empty string if num is not a positive number.', 'repeatString', 'String', '{\"inputs\":[[\"*\",\"abc\",\"abc\",\"*\",\"abc\"],[\"3\",\"3\",\"1\",\"8\",\"-2\"]],\"outputs\":[\"***\",\"abcabcabc\",\"abc\",\"********\",\"\"]}', '[{\"name\":\"str\",\"type\":\"String\"},{\"name\":\"num\",\"type\":\"Integer\"}]', 5, 0),
(58, 'Truncate String', 'Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a ... ending.', 'truncateString', 'String', '{\"inputs\":[[\"A-tisket a-tasket A green and yellow basket\",\"Peter Piper picked a peck of pickled peppers\",\"A-\",\"Absolutely Longer\"],[\"8\",\"11\",\"1\",\"2\"]],\"outputs\":[\"A-tisket...\",\"Peter Piper...\",\"A...\",', '[{\"name\":\"str\",\"type\":\"String\"},{\"name\":\"num\",\"type\":\"Integer\"}]', 4, 0),
(59, 'Palindrome', 'Return true if the given string is a palindrome. Otherwise, return false.', 'palindrome', 'Boolean', '{\"inputs\":[[\"eye\",\"_eye\",\"race car\",\"not a palindrome\",\"nope\",\"almostomla\",\"My age is 0, 0 si ega ym.\",\"1 eye for of 1 eye.\",\"0_0 (: /-\\ :) 0-0\"]],\"outputs\":[\"true\",\"true\",\"true\",\"false\",\"false\",\"true', '[{\"name\":\"str\",\"type\":\"String\"}]', 9, 0),
(60, 'Roman Numeral', 'Convert the given number into a roman numeral.\n\nAll roman numerals answers should be provided in upper-case.\n\n', 'convertToRoman', 'String', '{\"inputs\":[[\"2\",\"4\",\"12\",\"16\",\"68\",\"99\",\"649\",\"3999\"]],\"outputs\":[\"II\",\"IV\",\"XII\",\"XVI\",\"LXVIII\",\"XCIX\",\"DCXLIX\",\"MMMCMXCIX\"]}', '[{\"name\":\"num\",\"type\":\"Integer\"}]', 8, 0),
(61, 'Caesars Cipher', 'Write a function which takes a ROT13 encoded string as input and returns a decoded string.', 'rot13', 'String', '{\"inputs\":[[\"SERR PBQR PNZC\",\"SERR CVMMN!\",\"SERR YBIR?\",\"GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.\"]],\"outputs\":[\"FREE CODE CAMP\",\"FREE PIZZA!\",\"FREE LOVE?\",\"THE QUICK BROWN FOX JUMPS OVER THE LAZY', '[{\"name\":\"str\",\"type\":\"String\"}]', 4, 0),
(62, 'Sum All Primes', 'Sum all the prime numbers up to and including the provided number.', 'sumPrimes', 'Integer', '{\"inputs\":[[\"10\",\"15\",\"20\",\"25\",\"977\"]],\"outputs\":[\"17\",\"41\",\"77\",\"100\",\"73156\"]}', '[{\"name\":\"num\",\"type\":\"Integer\"}]', 5, 0),
(63, 'Missing letters', 'Find the missing letter in the passed letter range and return it.\n\nIf all letters are present in the range, return empty string.', 'fearNotLetter', 'String', '{\"inputs\":[[\"abce\",\"abcdefghjklmno\",\"stvwx\",\"bcdf\",\"abcdefghijklnopqrstuvwxyz\"]],\"outputs\":[\"d\",\"i\",\"u\",\"e\",\"m\"]}', '[{\"name\":\"str\",\"type\":\"String\"}]', 5, 0),
(64, 'Spinal Tap Case', 'Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.', 'spinalCase', 'String', '{\"inputs\":[[\"This Is Spinal Tap\",\"thisIsSpinalTap\",\"The_Andy_Griffith_Show\",\"Teletubbies say Eh-oh\",\"AllThe-small Things\"]],\"outputs\":[\"this-is-spinal-tap\",\"this-is-spinal-tap\",\"the-andy-griffith-show', '[{\"name\":\"str\",\"type\":\"String\"}]', 5, 0),
(65, 'Pig Latin', 'Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an \"ay\". If a word begins with a vowel you just add \"way\" to the end.', 'translatePigLatin', 'String', '{\"inputs\":[[\"california\",\"paragraphs\",\"glove\",\"algorithm\",\"eight\"]],\"outputs\":[\"aliforniacay\",\"aragraphspay\",\"oveglay\",\"algorithmway\",\"eightway\"]}', '[{\"name\":\"str\",\"type\":\"String\"}]', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `subID` int(6) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `playerID` int(6) NOT NULL,
  `challengeNumber` int(6) NOT NULL,
  `code` text NOT NULL,
  `score` decimal(6,3) DEFAULT '0.000',
  `language` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(6) NOT NULL,
  `username` varchar(100) CHARACTER SET latin1 NOT NULL,
  `points` int(11) DEFAULT '0',
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `points`, `password`) VALUES
(17, 'mohalobaidi', 0, 'qwertyqwerty'),
(24, 'test', 0, 'test'),
(25, 'admin', 0, 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`number`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`subID`),
  ADD UNIQUE KEY `time` (`time`,`playerID`),
  ADD UNIQUE KEY `playerID_2` (`playerID`,`challengeNumber`),
  ADD KEY `playerID` (`playerID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `number` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `subID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
