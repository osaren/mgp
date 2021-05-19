CREATE TABLE `forums` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL DEFAULT '0',
	`message` VARCHAR(255) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci';

INSERT INTO `mgp`.`forums` (`id`, `name`, `message`) VALUES ('1', 'Premier League', 'test');
SELECT `id`, `name`, `message` FROM `mgp`.`forums` WHERE  `id`=1;
INSERT INTO `mgp`.`forums` (`id`, `name`, `message`) VALUES ('2', 'La Liga', 'test');
SELECT `id`, `name`, `message` FROM `mgp`.`forums` WHERE  `id`=2;
INSERT INTO `mgp`.`forums` (`id`, `name`, `message`) VALUES ('3', 'Serie A', 'test');