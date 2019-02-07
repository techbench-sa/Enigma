-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 01, 2016 at 06:19 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `hackathon_v3`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(6) NOT NULL,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `ics103` tinyint(1) DEFAULT '0',
  `pass` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `players`
--


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

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `subID` int(6) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `playerID` int(6) NOT NULL,
  `questionNum` int(10) NOT NULL,
  `code` text NOT NULL,
  `score` int(5) DEFAULT '0',
  `language` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `submissions`
--


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
  ADD KEY `playerID` (`playerID`),
  ADD KEY `questionNum` (`questionNum`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `questionNum` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `subID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`questionNum`) REFERENCES `questions` (`questionNum`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`playerID`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
