CREATE DATABASE IF NOT EXISTS `mgp` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `mgp`;

CREATE TABLE IF NOT EXISTS `users` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `username` varchar(50) DEFAULT '0',

  `password` varchar(50) DEFAULT '0',

  `acctype` varchar(50) DEFAULT '0',

  PRIMARY KEY (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;