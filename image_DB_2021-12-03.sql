-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: image
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
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `nation` varchar(45) DEFAULT NULL,
  `description` text,
  `year` varchar(25) DEFAULT '-',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Amedeo_Modigliani','Expressionism','Italian',NULL,'1884 - 1920'),(2,'Wassily_Kandinsky','Expressionism,Abstractionism','Russian',NULL,'1866 - 1944'),(3,'Diego_Rivera','Social Realism,Muralism','Mexican',NULL,'1886 - 1957'),(4,'Claude_Monet','Impressionism','French',NULL,'1840 - 1926'),(5,'Rene_Magritte','Surrealism,Impressionism','Belgian',NULL,'1898 - 1967'),(6,'Salvador_Dali','Surrealism','Spanish',NULL,'1904 - 1989'),(7,'Edouard_Manet','Realism,Impressionism','French',NULL,'1832 - 1883'),(8,'Andrei_Rublev','Byzantine Art','Russian',NULL,'1360 - 1430'),(9,'Vincent_van_Gogh','Post-Impressionism','Dutch',NULL,'1853  1890'),(10,'Gustav_Klimt','Symbolism,Art Nouveau','Austrian',NULL,'1862 - 1918'),(11,'Hieronymus_Bosch','Northern Renaissance','Dutch',NULL,'1450 - 1516'),(12,'Kazimir_Malevich','Suprematism','Russian',NULL,'1879 - 1935'),(13,'Mikhail_Vrubel','Symbolism','Russian',NULL,'1856 - 1910'),(14,'Pablo_Picasso','Cubism','Spanish',NULL,'1881 - 1973'),(15,'Peter_Paul_Rubens','Baroque','Flemish',NULL,'1577 - 1640'),(16,'Pierre-Auguste_Renoir','Impressionism','French',NULL,'1841 - 1919'),(17,'Francisco_Goya','Romanticism','Spanish',NULL,'1746 - 1828'),(18,'Frida_Kahlo','Primitivism,Surrealism','Mexican',NULL,'1907 - 1954'),(19,'El_Greco','Mannerism','Spanish,Greek',NULL,'1541 - 1614'),(20,'Albrecht_Durer','Northern Renaissance','German',NULL,'1471 - 1528'),(21,'Alfred_Sisley','Impressionism','French,British',NULL,'1839 - 1899'),(22,'Pieter_Bruegel_the_Elder','Northern Renaissance','Flemish',NULL,'1525 - 1569'),(23,'Marc_Chagall','Primitivism','French,Jewish,Belarusian',NULL,'1887 - 1985'),(24,'Giotto_di_Bondone','Proto Renaissance','Italian',NULL,'1266 - 1337'),(25,'Sandro_Botticelli','Early Renaissance','Italian',NULL,'1445 - 1510'),(26,'Caravaggio','Baroque','Italian',NULL,'1571 - 1610'),(27,'Leonardo_da_Vinci','High Renaissance','Italian',NULL,'1452 - 1519'),(28,'Diego_Velazquez','Baroque','Spanish',NULL,'1599 - 1660'),(29,'Henri_Matisse','Impressionism,Post-Impressionism','French',NULL,'1869 - 1954'),(30,'Jan_van_Eyck','Northern Renaissance','Flemish',NULL,'1395 - 1441'),(31,'Edgar_Degas','Impressionism','French',NULL,'1834 - 1917'),(32,'Rembrandt','Baroque','Dutch',NULL,'1606 - 1669'),(33,'Titian','High Renaissance,Mannerism','Italian',NULL,'1488 - 1576'),(34,'Henri_de_Toulouse-Lautrec','Post-Impressionism','French',NULL,'1864  1901'),(35,'Gustave_Courbet','Realism','French',NULL,'1819 - 1877'),(36,'Camille_Pissarro','Impressionism,Post-Impressionism','French',NULL,'1830 - 1903'),(37,'J_M_W_Turner','Romanticism','British',NULL,'1775 - 1851'),(38,'Edvard_Munch','Symbolism,Expressionism','Norwegian',NULL,'1863 - 1944'),(39,'Paul_Cezanne','Post-Impressionism','French',NULL,'1839  1906'),(40,'Eugene_Delacroix','Romanticism','French',NULL,'1798  1863'),(41,'Henri_Rousseau','Primitivism','French',NULL,'1844  1910'),(42,'Georges_Seurat','Post-Impressionism','French',NULL,'1859  1891'),(43,'Paul_Klee','Expressionism,Abstractionism,Surrealism','German,Swiss',NULL,'1879  1940'),(44,'Piet_Mondrian','Neoplasticism','Dutch',NULL,'1872  1944'),(45,'Joan_Miro','Surrealism','Spanish',NULL,'1893  1983'),(46,'Andy_Warhol','Pop Art','American',NULL,'1928  1987'),(47,'Paul_Gauguin','Symbolism,Post-Impressionism','French',NULL,'1848  1903'),(48,'Raphael','High Renaissance','Italian',NULL,'1483  1520'),(49,'Michelangelo','High Renaissance','Italian',NULL,'1475  1564'),(50,'Jackson_Pollock','Abstract Expressionism','American',NULL,'1912  1956'),(155,NULL,NULL,NULL,'Amedeo Clemente Modigliani (Italian pronunciation: [amedo modiani]; 12 July 1884  24 January 1920) was an Italian Jewish painter and sculptor who worked mainly in France. He is known for portraits and nudes in a modern style characterized by elongation of faces, necks, and figures that were not received well during his lifetime but later found acceptance. Modigliani spent his youth in Italy, where he studied the art of antiquity and the Renaissance. In 1906 he moved to Paris, where he came into contact with such artists as Pablo Picasso and Constantin Br창ncui. By 1912 Modigliani was exhibiting highly stylized sculptures with Cubists of the Section d\'Or group at the Salon d\'Automne.','-'),(156,NULL,NULL,NULL,'Wassily Wassilyevich Kandinsky(/_væs_likæn_d_nski/; Russian:Василий Васильевич Кандинский,tr.Vasiliy Vasilyevich Kandinskiy,IPA:[v__s_il__j v__s_il_j_v__t_ k_n__d_insk__j]; 16 December[O.S.4 December]1866­ 13 December 1944) was a Russian painter and art theorist. Kandinsky is generally credited as the pioneer ofabstract art.[1]Born in Moscow, he spent his childhood inOdessa(today Ukraine), where he graduated atGrekov Odessa Art school. He enrolled at theUniversity of Moscow, studying law and economics. Successful in his profession―he was offered a professorship (chair ofRoman Law) at theUniversity of Dorpat(today Tartu, Estonia)―Kandinsky began painting studies (life-drawing, sketching and anatomy) at the age of30.','-'),(157,NULL,NULL,NULL,'Diego Mar_a de la Concepci_n Juan Nepomuceno Estanislao de la Rivera y Barrientos Acosta y Rodr_guez,[1]known asDiego Rivera(Spanish pronunciation:[_dje_o ri_βe_a]; December 8, 1886 ­ November 24, 1957), was a prominent Mexican painter. His largefrescoeshelped establish themural movementinMexicanand international art.','-');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;

--
-- Table structure for table `painting`
--

DROP TABLE IF EXISTS `painting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `painting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_url` varchar(45) DEFAULT NULL,
  `painting_type` int DEFAULT NULL,
  `download` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `painting`
--

/*!40000 ALTER TABLE `painting` DISABLE KEYS */;
/*!40000 ALTER TABLE `painting` ENABLE KEYS */;

--
-- Table structure for table `style`
--

DROP TABLE IF EXISTS `style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `style` (
  `id` int NOT NULL,
  `painting_id` int NOT NULL,
  `artist_id0` int NOT NULL,
  `artist_id1` int NOT NULL,
  `artist_id2` int NOT NULL,
  `artist_id3` int NOT NULL,
  `artist_id4` int NOT NULL,
  `score0` float DEFAULT NULL,
  `score1` float DEFAULT NULL,
  `score2` float DEFAULT NULL,
  `score3` float DEFAULT NULL,
  `score4` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_style_painting_idx` (`painting_id`),
  KEY `fk_style_artist1_idx` (`artist_id0`),
  KEY `fk_style_artist2_idx` (`artist_id4`),
  KEY `fk_style_artist3_idx` (`artist_id1`),
  KEY `fk_style_artist4_idx` (`artist_id2`),
  KEY `fk_style_artist5_idx` (`artist_id3`),
  CONSTRAINT `fk_style_artist1` FOREIGN KEY (`artist_id0`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_style_artist2` FOREIGN KEY (`artist_id4`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_style_artist3` FOREIGN KEY (`artist_id1`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_style_artist4` FOREIGN KEY (`artist_id2`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_style_artist5` FOREIGN KEY (`artist_id3`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_style_painting` FOREIGN KEY (`painting_id`) REFERENCES `painting` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `style`
--

/*!40000 ALTER TABLE `style` DISABLE KEYS */;
/*!40000 ALTER TABLE `style` ENABLE KEYS */;

--
-- Table structure for table `tranfer`
--

DROP TABLE IF EXISTS `tranfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tranfer` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `content_id` int NOT NULL,
  `style_id` int NOT NULL,
  `result_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tranfer_painting1_idx` (`content_id`),
  KEY `fk_tranfer_painting2_idx` (`style_id`),
  KEY `fk_tranfer_painting3_idx` (`result_id`),
  CONSTRAINT `fk_tranfer_painting1` FOREIGN KEY (`content_id`) REFERENCES `painting` (`id`),
  CONSTRAINT `fk_tranfer_painting2` FOREIGN KEY (`style_id`) REFERENCES `painting` (`id`),
  CONSTRAINT `fk_tranfer_painting3` FOREIGN KEY (`result_id`) REFERENCES `painting` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tranfer`
--

/*!40000 ALTER TABLE `tranfer` DISABLE KEYS */;
/*!40000 ALTER TABLE `tranfer` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-03 15:24:02
