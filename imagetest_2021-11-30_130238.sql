-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: imagetest
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `analyze_painting`
--

DROP TABLE IF EXISTS `analyze_painting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analyze_painting` (
  `painting_id` int NOT NULL,
  `artist_id_1` int NOT NULL,
  `score1` float NOT NULL,
  PRIMARY KEY (`artist_id_1`,`painting_id`),
  KEY `fk_analyze_painting_painting1_idx` (`painting_id`),
  CONSTRAINT `fk_analyze_painting_artist1` FOREIGN KEY (`artist_id_1`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_analyze_painting_painting1` FOREIGN KEY (`painting_id`) REFERENCES `painting` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analyze_painting`
--

/*!40000 ALTER TABLE `analyze_painting` DISABLE KEYS */;
/*!40000 ALTER TABLE `analyze_painting` ENABLE KEYS */;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `artist_name` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `nation` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'picasso','abstraction','1900','genius','2021-11-25 19:55:39'),(2,'picasso','abstraction','1900','genius','2021-11-25 19:56:18'),(3,'1','1','1','1','2021-11-27 02:31:27'),(4,'1','1','1','1','2021-11-27 02:34:07'),(10,'1','1','1','1','1'),(11,'1','1','1','1','1'),(12,'kiwon','1','1','korea','backend');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;

--
-- Table structure for table `artwork`
--

DROP TABLE IF EXISTS `artwork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artwork` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `artist_id` int NOT NULL,
  `title` varchar(256) DEFAULT NULL,
  `create_at` date DEFAULT NULL COMMENT 'Create Time',
  `img_url` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `artisd_id` (`artist_id`),
  CONSTRAINT `artwork_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
/*!40000 ALTER TABLE `artwork` ENABLE KEYS */;

--
-- Table structure for table `painting`
--

DROP TABLE IF EXISTS `painting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `painting` (
  `id` int NOT NULL,
  `image_name` varchar(45) DEFAULT NULL,
  `ima_url` varchar(45) NOT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `painting`
--

/*!40000 ALTER TABLE `painting` DISABLE KEYS */;
/*!40000 ALTER TABLE `painting` ENABLE KEYS */;

--
-- Table structure for table `transfer_painting`
--

DROP TABLE IF EXISTS `transfer_painting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer_painting` (
  `id` int NOT NULL,
  `painting_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_new_painting_painting1_idx` (`painting_id`),
  KEY `fk_new_painting_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_new_painting_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_new_painting_painting1` FOREIGN KEY (`painting_id`) REFERENCES `painting` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer_painting`
--

/*!40000 ALTER TABLE `transfer_painting` DISABLE KEYS */;
/*!40000 ALTER TABLE `transfer_painting` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-30 13:03:00
