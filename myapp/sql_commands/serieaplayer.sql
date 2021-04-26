-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.18-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mgp
CREATE DATABASE IF NOT EXISTS `mgp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mgp`;

-- Dumping structure for table mgp.serieaplayer
CREATE TABLE IF NOT EXISTS `serieaplayer` (
  `Rank` varchar(50) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `GoalsGl` varchar(50) DEFAULT NULL,
  `AssistA` varchar(50) DEFAULT NULL,
  `PlayedP` varchar(50) DEFAULT NULL,
  `Goalsper90` varchar(50) DEFAULT NULL,
  `MinsperGoalMPG` varchar(50) DEFAULT NULL,
  `TotalShots` varchar(50) DEFAULT NULL,
  `GoalConversion` varchar(50) DEFAULT NULL,
  `ShotAccuracy` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
