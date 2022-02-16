CREATE DATABASE  IF NOT EXISTS `sp_it` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_it`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_it
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `description` longtext,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Laptops','Light and high performance laptops for school','2021-12-03 13:59:28'),(2,'phones','good and useful','2021-12-21 20:42:53'),(4,'tablets','useful for projects','2021-12-21 20:44:18'),(5,'watch','to look at time when needed','2021-12-21 20:51:04'),(7,'mobile','useful','2021-12-21 20:52:18'),(9,'clock','good','2022-01-02 12:48:56');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `categoryid` int(11) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `catagoryname` varchar(255) NOT NULL,
  PRIMARY KEY (`productid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `product_categoryid_idx` (`categoryid`),
  CONSTRAINT `product_categoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'SP AMD Ryzen 3600 Laptop','Best Laptop',1,'SP IT!',1855.5,'2021-12-03 14:07:11','Laptop'),(5,'SP AMD Ryzen 3600 phone','Best phone',2,'SP IT!',855,'2021-12-31 19:07:23','phone'),(7,'SP apple watch','Best watch',5,'SP IT!',1234.5,'2021-12-31 19:14:04','watch'),(10,'Iphone','Best phone',2,'apple',1123,'2022-01-02 13:28:58','phone'),(11,'applie ipad','Best tablet',4,'apple',1456,'2022-01-02 13:28:58','tablet');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `review` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `reviews_userid_idx` (`userid`),
  KEY `reviews_productid_idx` (`productid`),
  CONSTRAINT `reviews_productid` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,'5','Good laptop','2021-12-31 16:46:07'),(2,2,1,'5','Best','2022-01-01 13:02:47'),(5,2,5,'4','Nice','2022-01-01 13:03:57'),(9,1,1,'3','ok','2022-01-01 13:05:15'),(10,1,5,'5','Good','2022-01-01 13:06:22'),(11,1,1,'2','not good','2022-01-01 16:06:42'),(13,2,1,'3','good','2022-01-01 16:24:02'),(14,2,1,'3','not good','2022-01-01 23:18:38'),(15,2,1,'3','not good','2022-01-01 23:18:44'),(16,2,1,'3','not good','2022-01-01 23:19:03'),(17,2,1,'3','not good','2022-01-01 23:19:30'),(24,2,1,'3','good','2022-01-01 23:54:31'),(25,2,1,'3','good','2022-01-01 23:54:54'),(26,2,1,'3','good','2022-01-01 23:57:00'),(27,2,1,'3','good','2022-01-01 23:57:22'),(28,2,1,'4','good best useful','2022-01-02 13:06:14'),(29,2,1,'4','Good Laptop, love gaming in school','2022-01-02 13:07:20'),(30,2,1,'4','Good Laptop, love gaming in school','2022-01-02 13:09:35'),(31,2,1,'4','Good Laptop, love gaming in school','2022-01-02 13:10:04'),(32,2,1,'4','Good Laptop, love gaming in school','2022-01-02 13:12:06'),(33,2,1,'4','Good Laptop, love gaming in school','2022-01-02 13:13:24');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Terry','Terry@hmail.com','92861234','Terry1234','Admin','https://www.abc.com/Terry.jpg','2021-12-03 13:53:42'),(2,'Harry','harry@hmail.com','92861234','harry1234','Admin','https://www.abc.com/harry.jpg','2021-12-03 14:37:41'),(5,'July','July@hmail.com','92861234','July1234','Admin','https://www.abc.com/July.jpg','2021-12-18 13:46:25'),(11,'Nivi','Nivi@hmail.com','92861234','Nivi1234','Admin','https://www.abc.com/Nivi.jpg','2021-12-18 13:53:00'),(13,'suba','suba123456@gmail.com','91234567','abc123456','Customer','https://www.abc.com/terry.jpg','2021-12-18 13:54:28'),(15,'subathra','subathra123456@gmail.com','91234567','abc123456','Customer','https://www.abc.com/terry.jpg','2021-12-18 13:56:56'),(17,'jon','jon@gmail.com','91234567','abc123456','Customer','https://www.abc.com/terry.jpg','2021-12-18 13:58:53'),(19,'Jimmy','Jimmy@gmail.com','91234567','abc123456','Customer','https://www.abc.com/Jimmy.jpg','2021-12-21 19:27:30'),(21,'Jim','Jim@gmail.com','91234567','abc123456','Customer','https://www.abc.com/Jimmy.jpg','2021-12-21 19:28:41'),(23,'John','John@gmail.com','91234567','abc123456','Customer','https://www.abc.com/Jimmy.jpg','2021-12-21 19:30:15'),(25,'Tom','Tom@gmail.com','91234567','abc123456','Customer','https://www.abc.com/Tom.jpg','2021-12-21 19:35:04'),(29,'Tommy','Tommy@hmail.com','92861234','Tommy1234','Admin','https://www.abc.com/Tommy.jpg','2021-12-22 12:43:34'),(30,'emma','emma@gmail.com','98574348','Emma1234','customer','https://www.abc.com/Terry.jpg','2022-01-02 12:41:14');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interest`
--

DROP TABLE IF EXISTS `user_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_interest` (
  `userid` int(11) NOT NULL,
  `categoryid` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`,`categoryid`),
  KEY `user_interest_categoryid_idx` (`categoryid`),
  CONSTRAINT `user_interest_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interest`
--

LOCK TABLES `user_interest` WRITE;
/*!40000 ALTER TABLE `user_interest` DISABLE KEYS */;
INSERT INTO `user_interest` VALUES (1,'1'),(2,'1'),(2,'1,2,4'),(2,'1,3,4'),(2,'2'),(2,'2,2,3');
/*!40000 ALTER TABLE `user_interest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-02 13:36:49
