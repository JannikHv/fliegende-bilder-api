DROP TABLE IF EXISTS `sights`;
DROP TABLE IF EXISTS `images`;

CREATE TABLE `sights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `description` TEXT,
  `lat` FLOAT,
  `long` FLOAT,

  PRIMARY KEY (`id`)
);

CREATE TABLE `images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255),
  `description` TEXT,
  `date` DATETIME,
  `sight_id` INT,

  PRIMARY KEY (`id`)
);