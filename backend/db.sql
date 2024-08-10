CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `last_login_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);



CREATE TABLE `society` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
); 


CREATE TABLE `secretary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `society_id` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `society_id_idx` (`society_id`),
  CONSTRAINT `fk_society_id` FOREIGN KEY (`society_id`) REFERENCES `society` (`id`)
);



CREATE TABLE `owner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `secretary_id` int DEFAULT NULL,
  `flat_no` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
      KEY `secretary_id_idx` (`secretary_id`),
  CONSTRAINT `secretary_id` FOREIGN KEY (`secretary_id`) REFERENCES `secretary` (`id`)
);


CREATE TABLE `announcement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `secretary_id` int DEFAULT NULL,
  `announcement` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `secretary_id_idx` (`secretary_id`),
  CONSTRAINT `secretary_id` FOREIGN KEY (`secretary_id`) REFERENCES `secretary` (`id`)
);


CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `service_person` varchar(45) DEFAULT NULL,
  `secretary_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `secretary_id_idx` (`secretary_id`),
  CONSTRAINT `fk_secretary_id_services` FOREIGN KEY (`secretary_id`) REFERENCES `secretary` (`id`)
);


CREATE TABLE `amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
     `secretary_id` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
    KEY `secretary_id_idx` (`secretary_id`),
  CONSTRAINT `secretary_id` FOREIGN KEY (`secretary_id`) REFERENCES `secretary` (`id`)
  PRIMARY KEY (`id`)
);
