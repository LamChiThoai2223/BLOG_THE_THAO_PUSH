-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 25, 2024 lúc 12:09 PM
-- Phiên bản máy phục vụ: 8.0.39
-- Phiên bản PHP: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `blog_the_thao`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blocked_users`
--

CREATE TABLE `blocked_users` (
  `id` int NOT NULL,
  `blocker_id` int NOT NULL,
  `blocked_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blocked_users`
--

INSERT INTO `blocked_users` (`id`, `blocker_id`, `blocked_id`, `created_at`) VALUES
(3, 18, 55, '2024-11-19 07:29:17'),
(6, 18, 38, '2024-11-19 07:29:52'),
(9, 18, 37, '2024-11-19 07:30:03'),
(10, 18, 25, '2024-11-19 07:30:14'),
(11, 18, 36, '2024-11-19 07:30:14'),
(13, 18, 42, '2024-11-19 07:30:27'),
(16, 18, 39, '2024-11-19 07:30:46'),
(22, 18, 56, '2024-11-19 08:09:20'),
(100, 18, 28, '2024-11-21 13:25:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `author_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `sport_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0',
  `why_delete` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `context` text COLLATE utf8mb4_general_ci,
  `short_description` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blogs`
--

INSERT INTO `blogs` (`blog_id`, `title`, `content`, `author_id`, `category_id`, `sport_id`, `created_at`, `updated_at`, `is_delete`, `why_delete`, `status`, `image`, `context`, `short_description`) VALUES
(35, 'Female \'amateur\' runner represents Vietnam twice', '{\"blocks\":[{\"key\":\"epr9g\",\"text\":\"Female \'amateur\' runner represents Vietnam twice\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":48,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":48,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":48,\"style\":\"fontsize-30pt\"},{\"offset\":0,\"length\":48,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":0,\"length\":48,\"style\":\"BOLD\"},{\"offset\":0,\"length\":48,\"style\":\"fontsize-24\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"boal3\",\"text\":\"Distraught over a DNF in her first time representing Vietnam at the Asian trail running competition, Luong Thi Loi turned that into determination to conquer the next competition.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":178,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":178,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":178,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":178,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fptak\",\"text\":\"Amidst the majestic scenery of the Malaysian mountains and forests, Luong Thi Loi is making every effort on the 78km course of the 2024 Asian Trail Running Championship.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":169,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":169,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":169,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":169,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"6k0iq\",\"text\":\"She was alone for almost half the journey, in a completely strange place, fighting the darkness and cold at an altitude of 1,500 m above sea level.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":147,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":147,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":147,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":147,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e17v1\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"lldi\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"fpikj\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5i5i2\",\"text\":\"Luong Thi Loi on the running track in Bontoc, Philippines at the Southeast Asia Trail Running Cup. Photo: NVCC\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":110,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":110,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":110,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":110,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":106,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8bud6\",\"text\":\"It is a dangerous, yet extremely joyful journey that trail running enthusiasts like Loi pursue. Having fallen in love with running more than two years ago, this small office worker never expected that one day this sport would give her the opportunity to raise the Vietnamese flag in front of her friends in the region.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":318,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":318,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":318,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":318,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cfi3t\",\"text\":\"Loi\'s trail running journey began in 2021, when she turned to running as a way to relieve stress after office hours. The girl from the countryside of Ninh Hoa, Khanh Hoa province did not choose the noisy, bustling streets but was attracted by the immersion in nature and the challenge of trail running.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":302,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":302,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":302,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":302,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"t9s2\",\"text\":\"Every night, after traveling more than 40 km from the factory in Dong Nai to Ho Chi Minh City, Loi puts on her shoes, rushes to the deserted streets through the Sala area, runs up and down the Thu Thiem and Ba Son bridges to practice the slopes. Some days she runs 5-10 km, some days she runs 21 km alone, helping her dispel fatigue and recharge her energy.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":357,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":357,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":357,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":357,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cuj3c\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"a07ko\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"4c2t2\",\"text\":\"Luong Thi Loi competes in the Vietnam Trail Marathon in Moc Chau in January 2024. Photo: VTM\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":92,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":92,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":92,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":92,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":89,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8vbr8\",\"text\":\"In March 2022, Loi boldly signed up for her first trail race - Dalat Ultra Trail 45km. With no experience, she texted Ha Thi Hau, the \\\"queen\\\" of trail running at that time, to ask for advice on choosing shoes. Not only did Hau answer enthusiastically, she also recorded a video introducing each pair of shoes she had to help her fellow runners choose. That enthusiasm gave Loi a lot of motivation.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":397,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":397,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":397,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":397,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"52mqv\",\"text\":\"On the day of the race, Loi finished third, an unexpected result for an \\\"amateur\\\" like her. \\\"Until now, it is still the tournament that left the most impression on me,\\\" Loi recalled the feeling of running, learning how to climb and descend from an athlete before her, then unexpectedly surpassing her without realizing it. Explaining why she stood on the podium the first time she raced, she humorously said that perhaps because when she was young, her mother forced her to push a bicycle carrying rice for kilometers to deliver to customers, her muscles were stronger than others.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":581,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":581,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":581,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":581,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fjsk0\",\"text\":\"The first success gave Loi the confidence to continue trying longer, more difficult distances. VMM 70km, Lam Dong Trail 70km, La An Ultra Trail 75km... seemed unable to stop the running of this small but determined girl. In 2023, she completed the 100km distance at VMM and won third place overall for women.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":308,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":308,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":308,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":308,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4sfrn\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"34mrr\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":2}],\"data\":{}},{\"key\":\"77tm8\",\"text\":\"Loi won the women\'s 75km race at Lam Dong trail in November 2023. Photo: Lam Dong trail\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":87,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":87,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":87,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":87,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":73,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2bfgg\",\"text\":\"In June 2024, Loi was invited to represent Vietnam at the Southeast Asia Trail Running Cup in the Philippines. Having run in Thailand and Malaysia as an individual, this was the first time Loi fought for the Vietnamese flag with 11 other runners.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":246,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":246,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":246,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":246,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1r29m\",\"text\":\"But reality was harsher than she had imagined. The 80km race was bumpy and difficult, coupled with poor preparation, leaving Loi exhausted and forced to stop halfway.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":166,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":166,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":166,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":166,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2cm6a\",\"text\":\"The first DNF left her extremely disappointed and tormented for not achieving what she wanted and failing everyone\'s help.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":122,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":122,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":122,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":122,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f6lqv\",\"text\":\"\\\"I can\'t explain why I gave up. I just know that at that moment, standing in front of the river and the peaceful village in Bontoc, I no longer had the energy to continue,\\\" Loi sighed. \\\"During the 300 km journey from Bontoc to Manila to fly back to Vietnam, I couldn\'t sleep, I kept blaming myself for being weak.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":314,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":314,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":314,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":314,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2k8kv\",\"text\":\"However, that painful failure became the motivation for Loi to strive. Three months later, she was more confident when she went to Malaysia to participate in the Asian Trail Running Championship and won 4th place for women.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":223,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":223,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":223,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":223,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b3s6m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"baivu\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":3}],\"data\":{}},{\"key\":\"5oi3a\",\"text\":\"Loi (fourth from left) with female athletes from many Asian countries participating in the Asian Trail Running Championship in September. Photo: NVCC\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":149,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":149,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":149,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":149,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":145,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"49rk9\",\"text\":\"Two international competitions have helped Loi understand many things about the position of Vietnamese trail running compared to other countries in the region. \\\"Foreign athletes receive more support from federations, and their training regimes are also more systematic. This year, we are participating under the name of competing for the country but we have to be self-sufficient, taking care of everything from visas, plane tickets...\\\", she said.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":447,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":447,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":447,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":447,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e2n9t\",\"text\":\"Currently, Vietnam does not have a trail running federation or competent authority to manage this sport.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":104,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":104,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":104,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":104,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d4nl8\",\"text\":\"Despite her successes, Loi still worries about the road ahead. \\\"Sometimes I wonder how long I can run, whether running can support myself,\\\" she shared, and said she has thought about becoming a coach in the future, to pass on her passion to the next generation of runners.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":272,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":272,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":272,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":272,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"bgclf\",\"text\":\"Currently, running is still a joy and a source of positive energy in Loi\'s life. She hopes that the running movement, especially trail running, will continue to grow in Vietnam, creating opportunities for many people, especially young people in rural areas, to access this sport and feel the positive values ​​it brings.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":320,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":320,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":320,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":320,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fcb1.jpg?alt=media&token=882b3664-78a4-407e-ba7a-8e5f36af6049\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"cb1\"}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXeqVSkL37gN07iF3lacZDIlT2ssTU90TwyjD3Miu-pDSgOiT5LxWhTQmmcodM7dQ3Jv8-JdqGla8FrS3fomO3XJ72xlN_8Clbz350EAlYQ-U92hHxPv1ILmj5ivW3gmvlh5do6mDjEgzUInw0tAPOqmv735l_bT3Z-xZbfziT-sQFuxwz5Y2A?key=lmBX-xzjEgd1rdY6PohCJw\",\"alt\":\"Luong Thi Loi competes in the Vietnam Trail Marathon in Moc Chau in January 2024. Photo: VTM\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXeqVSkL37gN07iF3lacZDIlT2ssTU90TwyjD3Miu-pDSgOiT5LxWhTQmmcodM7dQ3Jv8-JdqGla8FrS3fomO3XJ72xlN_8Clbz350EAlYQ-U92hHxPv1ILmj5ivW3gmvlh5do6mDjEgzUInw0tAPOqmv735l_bT3Z-xZbfziT-sQFuxwz5Y2A?key=lmBX-xzjEgd1rdY6PohCJw\",\"alt\":\"Luong Thi Loi competes in the Vietnam Trail Marathon in Moc Chau in January 2024. Photo: VTM\",\"height\":\"\",\"width\":\"\"}}}},\"2\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXc5j4GtVbqqX-xPVxbpnrdbz1nrXWjXA4Y0CxXg0AM9y3Ckl4HkReLzhRbc__DejH83by0SjF-RFG0zdtWSqLJVnHkv-1HKBMbL7pMSmorz4WgosqTfuY6-puLf9LL_EbTGLH0JDiMrNN7Vqa92Pg_VdkSaYedQgVDShsr_lonaYcGgQ52jOA?key=lmBX-xzjEgd1rdY6PohCJw\",\"alt\":\"Loi won the women\'s 75km race at Lam Dong trail in January 2023. Photo: Lam Dong trail\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXc5j4GtVbqqX-xPVxbpnrdbz1nrXWjXA4Y0CxXg0AM9y3Ckl4HkReLzhRbc__DejH83by0SjF-RFG0zdtWSqLJVnHkv-1HKBMbL7pMSmorz4WgosqTfuY6-puLf9LL_EbTGLH0JDiMrNN7Vqa92Pg_VdkSaYedQgVDShsr_lonaYcGgQ52jOA?key=lmBX-xzjEgd1rdY6PohCJw\",\"alt\":\"Loi won the women\'s 75km race at Lam Dong trail in January 2023. Photo: Lam Dong trail\",\"height\":\"\",\"width\":\"\"}}}},\"3\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXd1k4ZfsWVb0HOtqNII8c5gqccROCGpJXJd0TRHX3HKkmSYkcPc5x72062RQH3oG_mCp5YH12f5-vTFYHuOWtel87KdRMTF93xWLu8mf2VI7kvDrzgEsGSqtaMvZMDKjpzrBTIjoWMsl_O3f3XmWdgD1Wc3utUmUWPjGHW4Uh1p9dZUZYj6eA?key=lmBX-xzjEgd1rdY6PohCJw\",\"alt\":\"Loi (fourth from left) with female athletes from many Asian countries participating in the Asian Trail Running Championship in September. Photo: NVCC\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXd1k4ZfsWVb0HOtqNII8c5gqccROCGpJXJd0TRHX3HKkmSYkcPc5x72062RQH3oG_mCp5YH12f5-vTFYHuOWtel87KdRMTF93xWLu8mf2VI7kvDrzgEsGSqtaMvZMDKjpzrBTIjoWMsl_O3f3XmWdgD1Wc3utUmUWPjGHW4Uh1p9dZUZYj6eA?key=lmBX-xzjEgd1rdY6PohCJw\",\"alt\":\"Loi (fourth from left) with female athletes from many Asian countries participating in the Asian Trail Running Championship in September. Photo: NVCC\",\"height\":\"\",\"width\":\"\"}}}}}}', 32, 4, 12, '2024-06-04 16:24:07', '2024-11-22 04:30:28', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fcb1.jpg?alt=media&token=48146f31-07aa-4c63-9a36-a84e7777e9bd', 'Female \'amateur\' runner represents Vietnam twice Distraught DNF first time representing Vietnam Asian trail running competition, Luong Thi Loi turned determination conquer next competition. Amidst majestic scenery Malaysian mountains forests, Luong Thi Loi making every effort 78km course 2024 Asian Trail Running Championship. She alone almost half journey, completely strange place, fighting darkness cold altitude 1,500 m above sea level.     Luong Thi Loi running track Bontoc, Philippines Southeast Asia Trail Running Cup. Photo: NVCC dangerous, yet extremely joyful journey trail running enthusiasts Loi pursue. Having fallen love running two years ago, small office worker expected one day sport give opportunity raise Vietnamese flag front friends region. Loi\'s trail running journey began 2021, when she turned running relieve stress office hours. girl countryside Ninh Hoa, Khanh Hoa province not choose noisy, bustling streets attracted immersion nature challenge trail running. Every night, traveling 40 km factory Dong Nai Ho Chi Minh City, Loi puts shoes, rushes deserted streets Sala area, runs down Thu Thiem Ba Son bridges practice slopes. days she runs 5-10 km, days she runs 21 km alone, helping dispel fatigue recharge energy.    Luong Thi Loi competes Vietnam Trail Marathon Moc Chau January 2024. Photo: VTM March 2022, Loi boldly signed first trail race - Dalat Ultra Trail 45km. no experience, she texted Ha Thi Hau, \"queen\" trail running time, ask advice choosing shoes. Not Hau answer enthusiastically, she recorded video introducing pair shoes she help fellow runners choose. enthusiasm gave Loi lot motivation. day race, Loi finished third, unexpected result \"amateur\" her. \"Until now, tournament left impression me,\" Loi recalled feeling running, learning climb descend athlete her, unexpectedly surpassing without realizing it. Explaining why she stood podium first time she raced, she humorously perhaps when she young, mother forced push bicycle carrying rice kilometers deliver customers, muscles stronger others. first success gave Loi confidence continue trying longer, difficult distances. VMM 70km, Lam Dong Trail 70km, La Ultra Trail 75km... seemed unable stop running small determined girl. 2023, she completed 100km distance VMM won third place overall women.    Loi won women\'s 75km race Lam Dong trail November 2023. Photo: Lam Dong trail June 2024, Loi invited represent Vietnam Southeast Asia Trail Running Cup Philippines. Having run Thailand Malaysia individual, first time Loi fought Vietnamese flag 11 runners. reality harsher she imagined. 80km race bumpy difficult, coupled poor preparation, leaving Loi exhausted forced stop halfway. first DNF left extremely disappointed tormented not achieving she wanted failing everyone\'s help. \"I can\'t explain why gave up. just know moment, standing front river peaceful village Bontoc, no longer energy continue,\" Loi sighed. \"During 300 km journey Bontoc Manila fly back Vietnam, couldn\'t sleep, kept blaming myself weak.\" However, painful failure became motivation Loi strive. Three months later, she confident when she went Malaysia participate Asian Trail Running Championship won 4th place women.    Loi (fourth left) female athletes Asian countries participating Asian Trail Running Championship September. Photo: NVCC Two international competitions helped Loi understand things position Vietnamese trail running compared countries region. \"Foreign athletes receive support federations, training regimes systematic. year, participating name competing country self-sufficient, taking care everything visas, plane tickets...\", she said. Currently, Vietnam does not trail running federation competent authority manage sport. Despite successes, Loi worries road ahead. \"Sometimes wonder long run, whether running support myself,\" she shared, she thought becoming coach future, pass passion next generation runners. Currently, running joy source positive energy Loi\'s life. She hopes running movement, especially trail running, will continue grow Vietnam, creating opportunities people, especially young people rural areas, access sport feel positive values ​​it brings.\n ', 'Distraught over a DNF in her first time representing Vietnam at the Asian trail running competition, Luong Thi Loi turned that into determination to conquer the next competition.'),
(36, 'New recruits help Brazil overcome Chile', '{\"blocks\":[{\"key\":\"4vuin\",\"text\":\"New recruits help Brazil overcome Chile\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":39,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":39,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":39,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":39,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":39,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":39,\"style\":\"BOLD\"},{\"offset\":0,\"length\":39,\"style\":\"fontsize-24\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b739g\",\"text\":\"CHILE Missing many key players, Brazil still beat Chile 2-1 thanks to the shining rookies in the ninth round of the 2026 World Cup qualifiers on the evening of October 10.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":171,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":171,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":171,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":5,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":171,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":5,\"length\":166,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"55mri\",\"text\":\"*Goals: Vargas 2\' - Jesus 45\'+1, Henrique 89\'.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":46,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":46,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":46,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":46,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":46,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8lj0g\",\"text\":\"At the National Stadium in the capital Santiago, Chile quickly dominated the game. They continuously coordinated short combinations in the middle of the field, stretched the wings, then crossed high inside or changed the direction of attack to the center. In the second minute, Brazil had to pay the price for their marking mistake. Eduardo Vargas comfortably received a cross from the right wing, then headed it into the far corner, defeating goalkeeper Ederson.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":463,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":463,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":463,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":463,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dupje\",\"text\":\"In this match, Ederson started because Alisson Becker was injured. In addition, Brazil was also weakened because they lost their main striker Vinicius and mainstay center-back Bremer for the same reason.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":203,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":203,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":203,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":203,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5lqfj\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dmb4o\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"7c6p6\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6fljs\",\"text\":\"Vargas celebrates the opening goal in the match between Chile 1-2 Brazil on the morning of October 11. Photo: AFP.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":114,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":114,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":114,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":114,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":110,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"24al8\",\"text\":\"Brazil\'s midfield also failed to keep the ball. The trio of Andre, Lucas Paqueta and Raphinha lacked a common voice in coordinating interceptions and attacks. In the 13th minute, Chile almost doubled the gap, but Dario Osorio\'s long-range shot went wide past three Brazilian midfielders.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":287,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":287,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":287,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":287,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"efiho\",\"text\":\"Brazil only played better from the end of the first half. They equalized 1-1 in a counterattack from the penalty area in the 45+1 minute. Receiving a cross from the right wing, Igor Jesus headed it into the far corner of the Chilean goal.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":238,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":238,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":238,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":238,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"aqnt8\",\"text\":\"Jesus scored in his first match for the national team. The 23-year-old striker recently returned to Brazil to play for Botafogo, after four years with Shabab Al Ahli in the UAE. Coach Dorival has more faith in Jesus than Endrick - the 18-year-old star who plays for Real Madrid.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":278,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":278,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":278,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":278,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9s5d\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ae96m\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"c0h12\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5ifcs\",\"text\":\"Jesus celebrates scoring in the Chile 1-2 Brazil match on the morning of October 11. Photo: AFP\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":95,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":95,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":95,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":95,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":92,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"el1j7\",\"text\":\"Jesus\' equaliser was the turning point of the match. After the break, Brazil stepped up their ball control and organised attacks. Raphinha and Rodrygo took turns passing short passes and breaking through from the flanks into the middle.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":236,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":236,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":236,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":236,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"6fsmm\",\"text\":\"Coach Dorival then brought on another Botafogo player, Luiz Henrique. It was this winger who sealed the 2-1 victory in the 89th minute. After getting past the Chilean defender, Henrique took another step forward and curled the ball into the far corner with his left foot. Like Jesus, Henrique also scored his first goal for the team.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":333,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":333,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":333,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":333,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2tusb\",\"text\":\"Brazil moved up to fourth in the South American qualifying group thanks to the comeback win over Chile . They now have 13 points from nine games, one more than Ecuador and Bolivia. Chile remains second to last with five points. The top six teams in the South American qualifying group go straight to the finals, while the seventh-placed team has to play a play-off against another continent.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":6,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":391,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":391,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":391,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":6,\"length\":385,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":6,\"key\":2}],\"data\":{}},{\"key\":\"20db4\",\"text\":\"Argentina still leads with 19 points despite just drawing 1-1 with Venezuela . Colombia missed the chance to level the gap with Argentina when losing 0-1 to Bolivia, and is now on 16 points.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":9,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":50,\"length\":26,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":190,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":190,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":190,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":9,\"length\":41,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":76,\"length\":114,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":9,\"key\":3},{\"offset\":50,\"length\":26,\"key\":4}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd5.jpg?alt=media&token=9c78ac62-81d5-4304-aa16-7c9ca644ad5d\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"bd5\"}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd5_5.jpg?alt=media&token=8d915a4f-9799-4e2e-b9e0-67b3641d9000\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"db5\"}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/doi-tuyen-bong-da-brazil-538\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Brazil</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/doi-tuyen-bong-da-brazil-538\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Brazil</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/doi-tuyen-bong-da-argentina-534\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Argentina</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/doi-tuyen-bong-da-argentina-534\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Argentina</span>\",\"targetOption\":\"\"}}}},\"4\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/argentina-hoa-doi-dung-thu-40-the-gioi-4802721.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">drawing 1-1 with Venezuela</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/argentina-hoa-doi-dung-thu-40-the-gioi-4802721.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">drawing 1-1 with Venezuela</span>\",\"targetOption\":\"\"}}}}}}', 18, 9, 6, '2023-03-01 03:02:05', '2024-11-22 04:14:58', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd5.jpg?alt=media&token=a0b4bdf1-e3f0-48ec-87a9-afa7262e4cb9', 'New recruits help Brazil overcome Chile CHILE Missing key players, Brazil beat Chile 2-1 thanks shining rookies ninth round 2026 World Cup qualifiers evening October 10. *Goals: Vargas 2\' - Jesus 45\'+1, Henrique 89\'. National Stadium capital Santiago, Chile quickly dominated game. continuously coordinated short combinations middle field, stretched wings, crossed high inside changed direction attack center. second minute, Brazil pay price marking mistake. Eduardo Vargas comfortably received cross right wing, headed far corner, defeating goalkeeper Ederson. match, Ederson started Alisson Becker injured. addition, Brazil weakened lost main striker Vinicius mainstay center-back Bremer reason.     Vargas celebrates opening goal match Chile 1-2 Brazil morning October 11. Photo: AFP. Brazil\'s midfield failed keep ball. trio Andre, Lucas Paqueta Raphinha lacked common voice coordinating interceptions attacks. 13th minute, Chile almost doubled gap, Dario Osorio\'s long-range shot went wide past three Brazilian midfielders. Brazil played better end first half. equalized 1-1 counterattack penalty area 45+1 minute. Receiving cross right wing, Igor Jesus headed far corner Chilean goal. Jesus scored first match national team. 23-year-old striker recently returned Brazil play Botafogo, four years Shabab Al Ahli UAE. Coach Dorival faith Jesus Endrick - 18-year-old star plays Real Madrid.     Jesus celebrates scoring Chile 1-2 Brazil match morning October 11. Photo: AFP Jesus\' equaliser turning point match. break, Brazil stepped ball control organised attacks. Raphinha Rodrygo took turns passing short passes breaking flanks middle. Coach Dorival brought Botafogo player, Luiz Henrique. winger sealed 2-1 victory 89th minute. getting past Chilean defender, Henrique took step forward curled ball far corner left foot. Jesus, Henrique scored first goal team. Brazil moved fourth South American qualifying group thanks comeback win Chile . 13 points nine games, one Ecuador Bolivia. Chile remains second last five points. top six teams South American qualifying group go straight finals, seventh-placed team play play-off against continent. Argentina still leads 19 points despite just drawing 1-1 Venezuela . Colombia missed chance level gap Argentina when losing 0-1 Bolivia, 16 points.\n ', 'CHILE Missing many key players, Brazil still beat Chile 2-1 thanks to the shining rookies in the ninth round of the 2026 World Cup qualifiers on the evening of October 10.');
INSERT INTO `blogs` (`blog_id`, `title`, `content`, `author_id`, `category_id`, `sport_id`, `created_at`, `updated_at`, `is_delete`, `why_delete`, `status`, `image`, `context`, `short_description`) VALUES
(37, 'Djokovic is expected to hang up his racket after his 25th Grand Slam.', '{\"blocks\":[{\"key\":\"8ko0u\",\"text\":\"Djokovic is expected to hang up his racket after his 25th Grand Slam.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":69,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":69,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":69,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":69,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e7gtm\",\"text\":\"ACCORDING TO LEGEND Chris Evert, Novak Djokovic is likely to announce his retirement if he reaches the record of 25 Grand Slam singles titles.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":142,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":142,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":142,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":19,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":142,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":19,\"length\":123,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"g99a\",\"text\":\"Djokovic has yet to win an ATP Tour title this season, but is considered a leading contender to win the US Open after winning Olympic gold. He has several records to chase, including five US Open titles, eight Wimbledons and 25 Grand Slam singles titles. He currently shares the record of 24 majors with women\'s legend Margaret Court.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":334,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":334,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":334,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":334,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2kppb\",\"text\":\"According to 18-time Grand Slam champion Chris Evert, Djokovic is likely to retire if he completes his goal of 25 Grand Slams. She said: \\\"I think Djokovic will retire if he wins one more Grand Slam. He\'s playing mainly for the Olympic gold medal. After he gets that, he\'ll only have 25 Grand Slams.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":299,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":299,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":299,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":299,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4u48\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5kl0g\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"8958c\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ddvlt\",\"text\":\"Djokovic practices in preparation for the US Open, at Arthur Ashe Stadium, New York on August 22. Photo: Reuters\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":112,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":112,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":112,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":112,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":105,\"length\":7,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"a1ia5\",\"text\":\"According to Evert, Djokovic is capable of winning more major titles, especially at the Grand Slams. But he also lacks inspiration and motivation, especially in the context of a lack of competition from former rivals Roger Federer and Rafael Nadal.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":217,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":230,\"length\":18,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":248,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":248,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":248,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":217,\"length\":13,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":217,\"length\":13,\"key\":1}],\"data\":{}},{\"key\":\"72vrn\",\"text\":\"Federer has hung up his racket for two years, Nadal is almost certain to retire after this season. Djokovic said last month that he no longer has much motivation , playing mainly for the passion of tennis and the love of competing with his juniors. His 24 Grand Slams is a record that is unlikely to be broken for at least the next decade. It may even last longer, as the younger generation has very few players approaching the level of the \\\"Big 3\\\".\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":132,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":161,\"length\":288,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":449,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":449,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":449,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":132,\"length\":29,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":132,\"length\":29,\"key\":2}],\"data\":{}},{\"key\":\"bls1g\",\"text\":\"\\\"The problem of maintaining the same energy and desire as when playing in the Paris Olympics will be difficult for Djokovic to solve,\\\" Evert added in an interview with ESPN on August 21. \\\"Maybe all the fans have allowed and are ready to accept their idol leaving the stage. I heard about Djokovic\'s parents wanting him to retire a few years ago. I\'m also quite sure he is a family man.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":386,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":386,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":386,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":386,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":168,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1gcr7\",\"text\":\"Djokovic is currently ranked number two in the world and will enter his 18th US Open next week. This is the Grand Slam final Djokovic has lost the most, with six. He won four times in 2011, 2015, 2018 and 2023. Nole will face Radu Albot in the opening match on August 26.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":271,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":271,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":271,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":8,\"length\":263,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":8,\"key\":3}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft3.jpg?alt=media&token=b7e5f8b0-5ac6-4d15-a75e-991cfd8b9a60\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"t3\"}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/roger-federer-378\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Roger Federer</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/roger-federer-378\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Roger Federer</span>\",\"targetOption\":\"\"}}}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/djokovic-thua-nhan-khong-con-muc-tieu-phan-dau-4780762.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">no longer has much motivation</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/djokovic-thua-nhan-khong-con-muc-tieu-phan-dau-4780762.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">no longer has much motivation</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/novak-djokovic-352\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Djokovic</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/novak-djokovic-352\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Djokovic</span>\",\"targetOption\":\"\"}}}}}}', 18, 9, 13, '2024-08-02 03:26:16', '2024-11-22 04:01:03', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft3.jpg?alt=media&token=759274a0-66a0-4a26-ba12-e7a31ffb3233', 'Djokovic expected hang racket 25th Grand Slam. ACCORDING LEGEND Chris Evert, Novak Djokovic likely announce retirement reaches record 25 Grand Slam singles titles. Djokovic yet win ATP Tour title season, considered leading contender win US Open winning Olympic gold. several records chase, including five US Open titles, eight Wimbledons 25 Grand Slam singles titles. currently shares record 24 majors women\'s legend Margaret Court. According 18-time Grand Slam champion Chris Evert, Djokovic likely retire completes goal 25 Grand Slams. She said: \"I think Djokovic will retire wins one Grand Slam. He\'s playing mainly Olympic gold medal. gets that, he\'ll 25 Grand Slams.\"     Djokovic practices preparation US Open, Arthur Ashe Stadium, New York August 22. Photo: Reuters According Evert, Djokovic capable winning major titles, especially Grand Slams. lacks inspiration motivation, especially context lack competition former rivals Roger Federer and Rafael Nadal. Federer hung racket two years, Nadal almost certain retire season. Djokovic last month he no longer motivation , playing mainly passion tennis love competing juniors. 24 Grand Slams record unlikely broken least next decade. may even last longer, younger generation few players approaching level \"Big 3\". \"The problem maintaining energy desire when playing Paris Olympics will difficult Djokovic solve,\" Evert added interview with ESPN on August 21. \"Maybe fans allowed ready accept idol leaving stage. heard Djokovic\'s parents wanting retire few years ago. I\'m quite sure family man.\" Djokovic is currently ranked number two world will enter 18th US Open next week. Grand Slam final Djokovic lost most, six. won four times 2011, 2015, 2018 2023. Nole will face Radu Albot opening match August 26.\n ', 'ACCORDING TO LEGEND Chris Evert, Novak Djokovic is likely to announce his retirement if he reaches the record of 25 Grand Slam singles titles.'),
(38, 'Nadal to attend Davis Cup finals', '{\"blocks\":[{\"key\":\"6jt3n\",\"text\":\"Nadal to attend Davis Cup finals\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":32,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":32,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":32,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":32,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":32,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":32,\"style\":\"BOLD\"},{\"offset\":0,\"length\":32,\"style\":\"fontsize-24\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"an0bs\",\"text\":\"SPAIN\'S Rafael Nadal will play in the Davis Cup finals with the Spanish team, according to the list announced by captain David Ferrer on September 23.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":150,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":150,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":150,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":7,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":150,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":7,\"length\":143,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fifao\",\"text\":\"According to Sky Sports , this could be Nadal\'s last event before retiring completely in 2025. Nadal has not played since representing Spain at the Paris Olympics. He has withdrawn from two recent major events, the US Open and the Laver Cup, despite not being injured.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":268,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":268,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":268,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":268,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":13,\"length\":10,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3flss\",\"text\":\"\\\"Nadal has shared his desire to play Davis Cup in Malaga with me,\\\" said captain David Ferrer. \\\"It\'s easy because Nadal wanted to play there from the beginning. We have two months to prepare. Each player\'s ability to play singles and doubles will be evaluated, depending on their physical condition and the match progress.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":322,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":322,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":322,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":322,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1v3ee\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4gn04\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"bhjmk\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"a5v85\",\"text\":\"Nadal celebrates his victory at the 2019 Davis Cup, the tournament Spain won at the Caja Magica stadium, Madrid. Photo: Reuters\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":127,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":127,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":127,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":127,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":120,\"length\":7,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"74fku\",\"text\":\"Besides Nadal , the Spanish team also has Carlos Alcaraz, Roberto Bautista Agut, Pablo Carreno Busta and Marcel Granollers. Of these, Bautista Agut and Alcaraz were the two who shone in the group stage, helping Spain reach the championship round for the second consecutive year.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":13,\"length\":265,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":278,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":278,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":278,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":8,\"length\":5,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":8,\"length\":5,\"key\":2}],\"data\":{}},{\"key\":\"5irdl\",\"text\":\"The top eight teams will compete in the finals from November 19-24. Spain will face the Netherlands in the quarter-finals, and if they advance they could face either Germany or Canada in the semi-finals. In the other bracket, defending champions Italy will play Argentina, while the US will face Australia. Spain will have the advantage of playing in front of a home crowd in Malaga, but indoor hard courts are not the forte of Nadal or Alcaraz , or Spanish players in general.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":437,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":444,\"length\":33,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":477,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":477,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":477,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":437,\"length\":7,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":437,\"length\":7,\"key\":3}],\"data\":{}},{\"key\":\"d1o2t\",\"text\":\"\\\"We are not too worried about the surface because we have performed well in the group stage,\\\" captain Ferrer added. \\\"Nadal has a friendly event coming up against strong opponents and it is a good opportunity for him to restart everything.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":239,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":239,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":239,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":239,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"30j07\",\"text\":\"Nadal has no official schedule for the rest of 2024, but will play the Kings Slam exhibition tournament in Saudi Arabia next month, which will feature six top players, including Alcaraz, Jannik Sinner and Novak Djokovic .\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":205,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":219,\"length\":2,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":221,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":221,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":221,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":205,\"length\":14,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":205,\"length\":14,\"key\":4}],\"data\":{}},{\"key\":\"40pol\",\"text\":\"Nadal has helped Spain win the Davis Cup four times, most recently in 2019. He won 29 of his 30 singles matches in the team event – ​​a Spanish record.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":151,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":151,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":151,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":151,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft2.jpg?alt=media&token=8711cafe-62fa-47a5-9527-3dcb9f5a331e\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"t2\"}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXer2rraaeec1OZy-btRaJ0wHrxXhcKxPdJYjc-LNj2Kmcd3AA_rTV5-oLCBQ6OVxVnPJE-2aszaavQdR3hKfcP51k1vyRQcN2yyNPalVSdb_d-CrPhSOebMjrAFgzGHT0ry1CI9Aukt4W0ol7Dl9mZUTN9-jzEFu6WbVtIKCZStD1svmHKr0us?key=mYeUS0XjruAT7x7qQ6uaSA\",\"alt\":\"Nadal celebrates his victory at the 2019 Davis Cup, the tournament Spain won at the Caja Magica stadium, Madrid. Photo: Reuters\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXer2rraaeec1OZy-btRaJ0wHrxXhcKxPdJYjc-LNj2Kmcd3AA_rTV5-oLCBQ6OVxVnPJE-2aszaavQdR3hKfcP51k1vyRQcN2yyNPalVSdb_d-CrPhSOebMjrAFgzGHT0ry1CI9Aukt4W0ol7Dl9mZUTN9-jzEFu6WbVtIKCZStD1svmHKr0us?key=mYeUS0XjruAT7x7qQ6uaSA\",\"alt\":\"Nadal celebrates his victory at the 2019 Davis Cup, the tournament Spain won at the Caja Magica stadium, Madrid. Photo: Reuters\",\"height\":\"\",\"width\":\"\"}}}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/rafael-nadal-370\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Nadal</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/rafael-nadal-370\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Nadal</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/carlos-alcaraz-4663\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Alcaraz</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/carlos-alcaraz-4663\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Alcaraz</span>\",\"targetOption\":\"\"}}}},\"4\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/novak-djokovic-352\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Novak Djokovic</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/novak-djokovic-352\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Novak Djokovic</span>\",\"targetOption\":\"\"}}}}}}', 32, 9, 13, '2024-08-02 13:32:25', '2024-11-22 04:30:36', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft2.jpg?alt=media&token=9ba8fa3f-b765-4a9e-afe5-de20cad25bb1', 'Nadal attend Davis Cup finals SPAIN\'S Rafael Nadal will play Davis Cup finals Spanish team, according list announced captain David Ferrer September 23. According to Sky Sports , Nadal\'s last event retiring completely 2025. Nadal not played representing Spain Paris Olympics. withdrawn two recent major events, US Open Laver Cup, despite not injured. \"Nadal shared desire play Davis Cup Malaga me,\" captain David Ferrer. \"It\'s easy Nadal wanted play beginning. two months prepare. player\'s ability play singles doubles will evaluated, depending physical condition match progress.\"      Nadal celebrates victory 2019 Davis Cup, tournament Spain won Caja Magica stadium, Madrid. Photo: Reuters Besides Nadal , Spanish team Carlos Alcaraz, Roberto Bautista Agut, Pablo Carreno Busta Marcel Granollers. these, Bautista Agut Alcaraz two shone group stage, helping Spain reach championship round second consecutive year. top eight teams will compete finals November 19-24. Spain will face Netherlands quarter-finals, advance face either Germany Canada semi-finals. bracket, defending champions Italy will play Argentina, US will face Australia. Spain will advantage playing front home crowd Malaga, indoor hard courts not forte Nadal or Alcaraz , Spanish players general. \"We not worried surface performed group stage,\" captain Ferrer added. \"Nadal friendly event coming against strong opponents good opportunity restart everything.\" Nadal no official schedule rest 2024, will play Kings Slam exhibition tournament Saudi Arabia next month, will feature six top players, including Alcaraz, Jannik Sinner and Novak Djokovic . Nadal helped Spain win Davis Cup four times, recently 2019. won 29 30 singles matches team event – ​​a Spanish record.\n ', 'SPAIN\'S Rafael Nadal will play in the Davis Cup finals with the Spanish team, according to the list announced by captain David Ferrer on September 23.'),
(44, 'Nadal\'s records that may never be broken', '{\"blocks\":[{\"key\":\"3v992\",\"text\":\"Nadal\'s records that may never be broken\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":40,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":40,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":40,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":40,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":40,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":40,\"style\":\"BOLD\"},{\"offset\":0,\"length\":40,\"style\":\"fontsize-24\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3ua64\",\"text\":\"Besides his record 14 Roland Garros titles, Rafael Nadal is also the most consistent tennis player in history, having been in the world\'s top 10 for more than 17 years.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":168,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":168,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":168,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":168,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":168,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"egi93\",\"text\":\"Nadal\'s record of 14 Roland Garros titles is unlikely to be broken for many years to come, with the most successful player still playing, Novak Djokovic, having won three. The second most successful player at Roland Garros after Nadal is the legendary Bjorn Borg, who has lifted the trophy six times.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":300,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":300,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":300,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":300,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"75csb\",\"text\":\"In the women\'s singles at Roland Garros, legend Margaret Court is three titles behind Nadal. Behind her are Chris Evert (7 titles) and Steffi Graf (6). \\\"No one in history has come close to Nadal\'s numbers and the future probably won\'t either,\\\" said legend John McEnroe.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":269,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":269,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":269,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":269,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"c7em9\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dtfsm\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"bjo0m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2k8v1\",\"text\":\"Nadal celebrates winning the 2019 Roland Garros championship, at Philippe Chatrier Stadium, Paris, France. Photo: ATP\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":117,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":117,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":117,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":117,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":114,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"68qkc\",\"text\":\"Even when it comes to the most Grand Slam titles, Nadal is unrivalled. Djokovic currently has 10 Australian Open titles, but it would be hard to believe the Serb will win four more in Melbourne.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":31,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":41,\"length\":153,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":194,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":194,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":194,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":31,\"length\":10,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":31,\"length\":10,\"key\":1}],\"data\":{}},{\"key\":\"6v8dr\",\"text\":\"Nadal also holds the record for the most appearances in a Grand Slam final, having won all 14 of his Roland Garros finals . He won in 2005 (just after turning 19), 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2017, 2018, 2019, 2020 and 2022. In total, Nadal has won 112 matches and lost four on the red dust courts of Paris – another record.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":101,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":114,\"length\":230,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":344,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":344,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":344,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":101,\"length\":13,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":101,\"length\":13,\"key\":2}],\"data\":{}},{\"key\":\"epfej\",\"text\":\"Nadal has won at least one title every year from 2004 to 2022, which has seen him spend a total of 912 consecutive weeks in the ATP Top 10. The \\\"King of Clay\\\" first entered the Top 10 in 2005 and only dropped out of the group in March 2023 after a long injury layoff. The legendary Jimmy Connors is second with 788 weeks in the Top 10, while Roger Federer is third with 734 weeks.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":380,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":380,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":380,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":5,\"length\":375,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":5,\"key\":3}],\"data\":{}},{\"key\":\"b29gi\",\"text\":\"Nadal has won 63 of his 92 ATP Tour titles on clay, the most in history, far surpassing the second-placed Guillermo Vilas (49). Nadal has also won 90.5% of his 535 clay matches. Another notable record is that 90 of Nadal\'s 92 titles have been on outdoor courts.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":261,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":261,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":261,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":261,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"egl35\",\"text\":\"Nadal\'s other incredible record is winning 81 consecutive matches on clay, from 2005 to 2007. He then set an unbelievable record of winning 50 consecutive sets on his favorite surface, from 2017 to 2018.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":203,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":203,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":203,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":203,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"aanom\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5qd3v\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":4}],\"data\":{}},{\"key\":\"ed874\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"etim\",\"text\":\"Nadal saves the ball on Philippe Chatrier court, Paris, at Roland Garros 2019. Photo: Reuters\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":93,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":93,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":93,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":93,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":86,\"length\":7,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"977b1\",\"text\":\"In addition to Grand Slams, Nadal also holds the record for most championships at a Masters 1000 tournament (11 Monte Carlo Cups) and ATP 500 (12 Barcelona Cups).\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":162,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":162,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":162,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":162,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9d0eo\",\"text\":\"Finally, a very remarkable record is that Nadal is the tennis player who has defeated the world number one the most times, a total of 23 matches. His only two losers in this record are Federer (13 matches) and Djokovic (10).\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":210,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":218,\"length\":6,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":224,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":224,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":224,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":210,\"length\":8,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":210,\"length\":8,\"key\":5}],\"data\":{}},{\"key\":\"1ngsq\",\"text\":\"Nadal was born in 1986 and started playing professionally in 2001. He is known as the \\\"King of Clay\\\" with his tenacious defense and famous forehand spin. In addition to 92 major and minor ATP titles, including 22 Grand Slams and 36 Masters 1000s, Nadal also owns Olympic gold medals in men\'s singles and men\'s doubles. The only major title that the 38-year-old tennis player has not been able to reach in his career is the ATP Finals.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":434,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":434,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":434,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":434,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5s0u3\",\"text\":\"Nadal announced his retirement via social network X early in the afternoon of October 10 (Spanish time). He said he had spent two years struggling with injuries, leading to his inability to compete at the highest level. However, the 38-year-old tennis player affirmed that he had no regrets because he had achieved success beyond his imagination. He believes that everything in life has a cycle, a beginning and an end.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":16,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":30,\"length\":389,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":419,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":419,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":419,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":16,\"length\":14,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":16,\"length\":14,\"key\":6}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft1.1.jpg?alt=media&token=4149edc8-d7bc-4763-974c-49bd08c7b4bf\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"t1\"}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/grand-slam-944\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Grand Slam</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/grand-slam-944\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Grand Slam</span>\",\"targetOption\":\"\"}}}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/roland-garros-659\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Roland Garros</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/roland-garros-659\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Roland Garros</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/rafael-nadal-370\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Nadal</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/rafael-nadal-370\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Nadal</span>\",\"targetOption\":\"\"}}}},\"4\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft1.jpg?alt=media&token=0e6d1a69-2baf-41fe-bbc3-e99306cf8fe0\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"t1_1\"}},\"5\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/novak-djokovic-352\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Djokovic</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/novak-djokovic-352\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Djokovic</span>\",\"targetOption\":\"\"}}}},\"6\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/nadal-thong-bao-giai-nghe-4802640.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">his retirement</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/nadal-thong-bao-giai-nghe-4802640.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">his retirement</span>\",\"targetOption\":\"\"}}}}}}', 38, 9, 13, '2024-08-02 14:43:33', '2024-11-22 04:30:41', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Ft1.jpg?alt=media&token=416c1da3-4ace-4622-b345-0f756c031a0e', 'Nadal\'s records may broken Besides record 14 Roland Garros titles, Rafael Nadal consistent tennis player history, having world\'s top 10 17 years. Nadal\'s record 14 Roland Garros titles unlikely broken years come, successful player playing, Novak Djokovic, having won three. second successful player Roland Garros Nadal legendary Bjorn Borg, lifted trophy six times. women\'s singles Roland Garros, legend Margaret Court three titles behind Nadal. Behind Chris Evert (7 titles) Steffi Graf (6). \"No one history close Nadal\'s numbers future probably won\'t either,\" legend John McEnroe.     Nadal celebrates winning 2019 Roland Garros championship, Philippe Chatrier Stadium, Paris, France. Photo: ATP Even when comes most Grand Slam titles, Nadal unrivalled. Djokovic currently 10 Australian Open titles, hard believe Serb will win four Melbourne. Nadal holds record appearances Grand Slam final, having won 14 his Roland Garros finals . won 2005 (just turning 19), 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2017, 2018, 2019, 2020 2022. total, Nadal won 112 matches lost four red dust courts Paris – record. Nadal has won least one title every year 2004 2022, seen spend total 912 consecutive weeks ATP Top 10. \"King Clay\" first entered Top 10 2005 dropped group March 2023 long injury layoff. legendary Jimmy Connors second 788 weeks Top 10, Roger Federer third 734 weeks. Nadal won 63 92 ATP Tour titles clay, history, far surpassing second-placed Guillermo Vilas (49). Nadal won 90.5% 535 clay matches. notable record 90 Nadal\'s 92 titles outdoor courts. Nadal\'s incredible record winning 81 consecutive matches clay, 2005 2007. set unbelievable record winning 50 consecutive sets favorite surface, 2017 2018.     Nadal saves ball Philippe Chatrier court, Paris, Roland Garros 2019. Photo: Reuters addition Grand Slams, Nadal holds record championships Masters 1000 tournament (11 Monte Carlo Cups) ATP 500 (12 Barcelona Cups). Finally, remarkable record Nadal tennis player defeated world number one times, total 23 matches. two losers record Federer (13 matches) and Djokovic (10). Nadal born 1986 started playing professionally 2001. known \"King Clay\" tenacious defense famous forehand spin. addition 92 major minor ATP titles, including 22 Grand Slams 36 Masters 1000s, Nadal owns Olympic gold medals men\'s singles men\'s doubles. major title 38-year-old tennis player not able reach career ATP Finals. Nadal announced his retirement via social network X early afternoon October 10 (Spanish time). spent two years struggling injuries, leading inability compete highest level. However, 38-year-old tennis player affirmed no regrets achieved success beyond imagination. believes everything life cycle, beginning end.\n ', 'Besides his record 14 Roland Garros titles, Rafael Nadal is also the most consistent tennis player in history, having been in the world\'s top 10 for more than 17 years.');
INSERT INTO `blogs` (`blog_id`, `title`, `content`, `author_id`, `category_id`, `sport_id`, `created_at`, `updated_at`, `is_delete`, `why_delete`, `status`, `image`, `context`, `short_description`) VALUES
(51, 'Indian coach: \'Not coming to Vietnam for tourism\'', '{\"blocks\":[{\"key\":\"98p33\",\"text\":\"Indian coach: \'Not coming to Vietnam for tourism\'\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":49,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":49,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":49,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":49,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":49,\"style\":\"BOLD\"},{\"offset\":0,\"length\":49,\"style\":\"fontsize-24\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ep75k\",\"text\":\"NAM DINH coach Manolo Marquez aims to defeat Vietnam in a friendly match at Thien Truong Stadium on October 12.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":111,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":111,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":8,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":111,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":8,\"length\":103,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d73ij\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"d9ddh\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"f3936\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1ef3l\",\"text\":\"Coach Manolo Marquez and the Indian team practice in Nam Dinh on the evening of October 7. Photo: Indian Football Federation\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":124,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":124,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":124,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":124,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":98,\"length\":26,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"82p9c\",\"text\":\"*Vietnam - India: 6pm Saturday, October 12.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":43,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":43,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":43,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":43,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":43,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":0,\"length\":43,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fip2m\",\"text\":\"According to the original plan, India had two friendly matches with Lebanon and Vietnam during the FIFA Days in October. However, Lebanon could not come, so Coach Marquez\'s team only had one friendly match with the host Vietnam. The match was changed from October 9 to October 12, but India kept the schedule to go to Vietnam on October 7 because they could not change their flight tickets.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":390,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":390,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":390,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":390,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":390,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fh55n\",\"text\":\"\\\"I like it here,\\\" Coach Marquez said after the first training session on the field at Nam Dinh Sports Palace on the evening of October 7. \\\"But, India doesn\'t have much time to travel. We are fully focused on the match against Vietnam. The team came here to win.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":262,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":262,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":262,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":262,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":262,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"67g08\",\"text\":\"India is ranked 126th in FIFA, 10 places below Vietnam. This time, Coach Marquez brought 23 players, all of whom play domestically. Rahul Bheke, 34, is the most experienced player, while the youngest is midfielder Lalrinliana Hnamte, only 21 years old.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":252,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":252,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":252,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":252,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":252,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"aidhm\",\"text\":\"In their squad, there are eight players who faced Vietnam two years ago, including goalkeeper Sandhu, defenders Chinglensana Konsham, Naorem Roshan, Anwar Ali, midfielders Brandon Fernandes, Jaekson Thounaojam, and two strikers Lallianzuala Changte and Vikram Partap.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":267,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":267,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":267,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":267,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":267,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cjdmc\",\"text\":\"\\\"I called these players because they are among the best, ready to face Vietnam,\\\" added Marquez. \\\"Clearly, physically, we are much better than before the season. Vietnam is similar to India, their national championship has gone through four rounds. The team that wins will prove that they are stronger than the other team, at least within the scope of the upcoming match.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":371,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":371,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":371,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":371,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":371,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"56r44\",\"text\":\"The home page of the Indian Football Federation also recalls the beautiful memories in Vietnam in 2002, when their U23 team came back from two goals down to defeat the hosts 3-2, winning the LG Cup held in Ho Chi Minh City. One of the goalscorers for India in that match was Abhishek Yadav Mahesh Gawali. He has since retired and is now the assistant coach of the national team.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":378,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":378,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":378,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":378,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":378,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8134a\",\"text\":\"Tickets for this match come in three denominations: 100,000 VND, 200,000 VND and 300,000 VND, and will be sold in front of the A stand of Thien Truong Stadium from October 8.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":174,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":174,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":174,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":174,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":174,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog4.jpg?alt=media&token=f28ab704-4703-43fe-a1cd-abc6dea71bfe\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"anhf4\"}}}}', 18, 4, 6, '2024-08-08 08:02:58', '2024-11-22 03:46:20', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Funnamed%201.jpg?alt=media&token=b90a5c0a-dcad-4ced-aa16-6aff3b9a34b7', 'Indian coach: \'Not coming Vietnam tourism\' NAM DINH coach Manolo Marquez aims defeat Vietnam friendly match Thien Truong Stadium October 12.     Coach Manolo Marquez Indian team practice Nam Dinh evening October 7. Photo: Indian Football Federation *Vietnam - India: 6pm Saturday, October 12. According original plan, India two friendly matches Lebanon Vietnam during FIFA Days October. However, Lebanon not come, so Coach Marquez\'s team one friendly match host Vietnam. match changed October 9 October 12, India kept schedule go Vietnam October 7 not change flight tickets. \"I here,\" Coach Marquez first training session field Nam Dinh Sports Palace evening October 7. \"But, India doesn\'t time travel. fully focused match against Vietnam. team win.\" India ranked 126th FIFA, 10 places below Vietnam. time, Coach Marquez brought 23 players, whom play domestically. Rahul Bheke, 34, experienced player, youngest midfielder Lalrinliana Hnamte, 21 years old. squad, eight players faced Vietnam two years ago, including goalkeeper Sandhu, defenders Chinglensana Konsham, Naorem Roshan, Anwar Ali, midfielders Brandon Fernandes, Jaekson Thounaojam, two strikers Lallianzuala Changte Vikram Partap. \"I called players among best, ready face Vietnam,\" added Marquez. \"Clearly, physically, better season. Vietnam similar India, national championship gone four rounds. team wins will prove stronger team, least within scope upcoming match.\" home page Indian Football Federation recalls beautiful memories Vietnam 2002, when U23 team back two goals down defeat hosts 3-2, winning LG Cup held Ho Chi Minh City. One goalscorers India match Abhishek Yadav Mahesh Gawali. retired assistant coach national team. Tickets match three denominations: 100,000 VND, 200,000 VND 300,000 VND, will sold front stand Thien Truong Stadium October 8.\n ', 'NAM DINH coach Manolo Marquez aims to defeat Vietnam in a friendly match at Thien Truong Stadium on October 12.'),
(53, 'Vietnam team beat Nam Dinh', '{\"blocks\":[{\"key\":\"csh9r\",\"text\":\"Vietnam team beat Nam Dinh\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2op3d\",\"text\":\"HANOI Bui Vi Hao\'s double and Nguyen Thai Son\'s opening goal helped the Vietnamese team beat Nam Dinh Club 3-2 in a practice match on the afternoon of October 9.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":161,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":161,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":161,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":5,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":161,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":5,\"length\":156,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fb2o5\",\"text\":\"Lebanon could not come to play a friendly match, so coach Kim Sang-sik invited V-League defending champion Nam Dinh to play at the Vietnam Youth Football Training Center.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":25,\"length\":145,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":170,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":170,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":170,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":8,\"length\":17,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":8,\"length\":17,\"key\":0}],\"data\":{}},{\"key\":\"fumhm\",\"text\":\"In the first half, the Korean coach used goalkeeper Dang Van Lam, the central defender duo Giap Tuan Duong and Pham Xuan Manh, the two fullbacks Vu Van Thanh and Khuat Van Khang, the midfielder quartet Do Hung Dung, Nguyen Quang Hai, Nguyen Thai Son, Nguyen Van Quyet and the striker duo Nguyen Dinh Bac and Nguyen Quoc Viet.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":325,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":325,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":325,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":325,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"64qu9\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"30ckc\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"cbm4k\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2sqev\",\"text\":\"Naturalized striker Nguyen Xuan Son (Rafaelson) disputes with goalkeeper Dang Van Lam in a friendly match on the afternoon of October 9. Photo: Quang Duong.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":156,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":156,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":156,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":156,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":144,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"80r37\",\"text\":\"Vietnam opened the scoring with a long-range shot from Nguyen Thai Son, but then gradually lost control of the game due to Nam Dinh\'s fast pressing style. While Hendrio and Lucas Silva missed a good chance, the central defender duo Lucas and Mota joined the attack to score, helping Nam Dinh take a 2-1 lead after the first 45 minutes.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":7,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":335,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":335,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":335,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":7,\"length\":328,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":7,\"key\":2}],\"data\":{}},{\"key\":\"cfc52\",\"text\":\"Before the second half, coach Vu Hong Viet replaced five foreign players Lucas, Hendrio, Caio, Lucas Silva, Mpande and Mota. Nam Dinh then withdrew naturalized players Nguyen Xuan Son and Moses to play with all domestic players, including young faces like Nguyen Dinh Son, Tran Liem Dieu or Ngo Duc Huy...\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":125,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":133,\"length\":172,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":305,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":305,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":305,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":125,\"length\":8,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":125,\"length\":8,\"key\":3}],\"data\":{}},{\"key\":\"8lj6t\",\"text\":\"Coach Kim Sang-sik also changed the entire squad, using goalkeeper Filip Nguyen, center back Que Ngoc Hai, midfielder Nguyen Hoang Duc, Le Pham Thanh Long, striker Bui Vi Hao, and three players summoned from Nam Dinh: Nguyen Van Toan, Nguyen Phong Hong Duy and To Van Vu.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":6,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":18,\"length\":253,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":271,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":271,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":271,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":6,\"length\":12,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":6,\"length\":12,\"key\":4}],\"data\":{}},{\"key\":\"624to\",\"text\":\"Bui Vi Hao was the focal point in the second half. He shot wide when the opposing goal was empty after a cross from his teammate. But then, the striker born in 2003 scored a double to help his team win 3-2.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":206,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":206,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":206,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":206,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8d8fg\",\"text\":\"After today\'s match, Kim and his team will play a friendly match with India on October 12 at Thien Truong Stadium in Nam Dinh.  \\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":128,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":128,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":128,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":128,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/lich-giao-huu-thang-10-cua-tuyen-viet-nam-bi-anh-huong-4799929.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">could not come to</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/lich-giao-huu-thang-10-cua-tuyen-viet-nam-bi-anh-huong-4799929.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">could not come to</span>\",\"targetOption\":\"\"}}}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog3.jpg?alt=media&token=f0f79622-e440-44bf-8044-cebc891be5c1\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"anhf3\"}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/doi-tuyen-bong-da-viet-nam-443\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Vietnam</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/doi-tuyen-bong-da-viet-nam-443\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Vietnam</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/clb-nam-dinh-149\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Nam Dinh</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/clb-nam-dinh-149\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Nam Dinh</span>\",\"targetOption\":\"\"}}}},\"4\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/hlv-kim-sang-sik-7333\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Kim Sang-sik</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/hlv-kim-sang-sik-7333\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Kim Sang-sik</span>\",\"targetOption\":\"\"}}}}}}', 18, 4, 6, '2024-08-11 16:36:23', '2024-11-22 04:33:41', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog3.jpg?alt=media&token=a833db63-1262-4b3c-93f8-94d846fb408a', 'Vietnam team beat Nam Dinh HANOI Bui Vi Hao\'s double Nguyen Thai Son\'s opening goal helped Vietnamese team beat Nam Dinh Club 3-2 practice match afternoon October 9. Lebanon could not to play friendly match, so coach Kim Sang-sik invited V-League defending champion Nam Dinh play Vietnam Youth Football Training Center. first half, Korean coach used goalkeeper Dang Van Lam, central defender duo Giap Tuan Duong Pham Xuan Manh, two fullbacks Vu Van Thanh Khuat Van Khang, midfielder quartet Hung Dung, Nguyen Quang Hai, Nguyen Thai Son, Nguyen Van Quyet striker duo Nguyen Dinh Bac Nguyen Quoc Viet.     Naturalized striker Nguyen Xuan Son (Rafaelson) disputes goalkeeper Dang Van Lam friendly match afternoon October 9. Photo: Quang Duong. Vietnam opened scoring long-range shot Nguyen Thai Son, gradually lost control game due Nam Dinh\'s fast pressing style. Hendrio Lucas Silva missed good chance, central defender duo Lucas Mota joined attack score, helping Nam Dinh 2-1 lead first 45 minutes. second half, coach Vu Hong Viet replaced five foreign players Lucas, Hendrio, Caio, Lucas Silva, Mpande Mota. Nam Dinh then withdrew naturalized players Nguyen Xuan Son Moses play domestic players, including young faces Nguyen Dinh Son, Tran Liem Dieu Ngo Duc Huy... Coach Kim Sang-sik also changed entire squad, using goalkeeper Filip Nguyen, center back Que Ngoc Hai, midfielder Nguyen Hoang Duc, Le Pham Thanh Long, striker Bui Vi Hao, three players summoned Nam Dinh: Nguyen Van Toan, Nguyen Phong Hong Duy Van Vu. Bui Vi Hao focal point second half. shot wide when opposing goal empty cross teammate. then, striker born 2003 scored double help team win 3-2. today\'s match, Kim team will play friendly match India October 12 Thien Truong Stadium Nam Dinh.  \n ', 'HANOI Bui Vi Hao\'s double and Nguyen Thai Son\'s opening goal helped the Vietnamese team beat Nam Dinh Club 3-2 in a practice match on the afternoon of October 9.'),
(54, 'World media satirizes referee of Indonesia-Bahrain match', '{\"blocks\":[{\"key\":\"e2dhe\",\"text\":\"World media satirizes referee of Indonesia-Bahrain match\",\"type\":\"header-one\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":56,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":56,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":56,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":56,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":56,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2sur5\",\"text\":\"The world\'s media and fans criticized referee Ahmed Al Kaf, when he added extra minutes to help Bahrain draw 2-2 with Indonesia in the third qualifying round of the 2026 World Cup.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":180,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":180,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":180,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":180,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":180,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2dkgv\",\"text\":\"There were six minutes of stoppage time in the second half of the Bahrain National match, but referee Ahmed Al Kaf called for overtime with Indonesia leading 2-1. At 98 minutes and 40 seconds, Mohamed Marhoon scored the equalizer for Bahrain, 2-2.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":247,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":247,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":247,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":247,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":247,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cus6j\",\"text\":\"The match ended with a violent reaction from the Indonesian coaching staff and players. Team leader Sumardji even received a straight red card, while defender Shayne Pattynama almost got into a fight with a Bahraini player. The referee team was surrounded by security forces and escorted off the field.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":302,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":302,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":302,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":302,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":302,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9vat\",\"text\":\"The incident then became a controversial topic that was hotly discussed on social networks and world media.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":107,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":107,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":107,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":107,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":107,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"bbcpc\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"49bs5\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"e1098\",\"text\":\"Instagram page 433 satirized the extra time in the match between Bahrain and Indonesia, 2-2, in the third round of Group C, 2026 World Cup third qualifying round - Asia region.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":176,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":176,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":176,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":176,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":0,\"length\":9,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"despm\",\"text\":\"Instagram page 433, which has 75 million followers, posted a composite photo, with Lukaku number 90 at AS Roma and Xavi number 6 at Barcelona, ​​but the result was Ronaldo\'s number 99 at AC Milan. The football page captioned it \\\"quick calculation\\\" with the Indonesian flag. After nine hours, the post attracted more than 1.3 million likes and about 60,000 comments, mostly from Indonesia.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":388,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":388,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":388,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":388,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":388,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":0,\"length\":9,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"a77mh\",\"text\":\"Referee Al Kaf was accused of blowing the whistle in favor of the country of the Asian Football Confederation (AFC) President Sheikh Salman bin Ibrahim Al Khalifa, while the AFC was branded a \\\"corrupt organization\\\". Commentary attacks also flooded the AFC\'s social media pages on Facebook, Instagram and X. The Bahrain Football Association was in the same situation, but quickly turned off comments. In addition, dozens of fake accounts impersonating referee Ahmed Al Kaf were created to attract angry crowds.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":509,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":509,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":509,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":509,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":509,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":280,\"length\":19,\"style\":\"ITALIC\"},{\"offset\":304,\"length\":2,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"36s5u\",\"text\":\"Indonesia\'s largest football website Bola headlined \\\"Drama when Bahrain faces Indonesia: Collapsed when leading, extra time until equalizer\\\".\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":141,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":141,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":141,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":141,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":141,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":37,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8pt9g\",\"text\":\"Meanwhile, CNN Indonesia listed three controversial decisions by the Omani referee, including extra time and often giving Bahrain favorable calls in contested situations. In the second half, Rafael Struick was fouled near the Bahrain penalty area, then the ball was cleared off the referee, causing a pause. However, Mr. Al Kaf did not award a free kick to Indonesia and continued to let Bahrain control the ball.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":413,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":413,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":413,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":413,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":413,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":11,\"length\":13,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d6dee\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"vrpb\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"a4p8l\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"a5dqh\",\"text\":\"Referee Ahmed Al Kaf officiated the match between Bahrain and Indonesia, 2-2, in the third round of Group C, 2026 World Cup qualifiers - Asia. Photo: Reuters.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":158,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":158,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":158,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":158,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":150,\"length\":8,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fqmhn\",\"text\":\"\\\"Indonesia robbed of a win,\\\" headlined the Korean newspaper Isplus . Meanwhile, the American newspaper ESPN commented: \\\"A draw with Bahrain is not a bad result, but dropping the first victory in the third round of World Cup qualifiers has left Indonesia disappointed, even angry.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":280,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":280,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":280,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":280,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":280,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":60,\"length\":6,\"style\":\"ITALIC\"},{\"offset\":103,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f20bj\",\"text\":\"FIFA\'s Laws of the Game stipulate that the time of play is determined by the fourth official. Article 7.3 stipulates that the fourth official shall record the added time decided by the referee at the end of each half. The referee may increase the added time but may not reduce it . The referee is not allowed to compensate for an error in the calculation of the first half\'s added time by changing it in the second half.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":420,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":420,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":420,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":420,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":420,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"751eu\",\"text\":\"Eight factors determine the amount of added time, including substitutions, injuries, time-wasting, yellow cards, VAR involvement, goal celebrations, medical stoppages such as cooling-breaks and other disruptions to the game.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":224,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":224,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":224,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":224,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":224,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"eimbe\",\"text\":\"Fans also questioned why the AFC appointed an Omani referee - in the same West Asia region as Bahrain - to officiate. However, in reality, there is no requirement that the referee be from a different region, only a different country. Also in this round, Korean referee Kim Jong-hyeok officiated the match between Saudi Arabia and Japan in Group C, while Japanese referee Hiroyuki Kimura officiated the match between Jordan and South Korea in Group B. In Group A, Jordanian referee Adham Makhadmeh officiated the match between UAE and North Korea in a 1-1 draw.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":560,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":560,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":560,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":560,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":560,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"34u9h\",\"text\":\"The controversial draw saw Indonesia miss out on a chance to move up to second in Group C, dropping to fifth instead. They have three points from three draws, one behind Bahrain, Australia and Saudi Arabia. Japan leads with nine points, while China is bottom with no points.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":274,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":274,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":274,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":274,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":274,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8voms\",\"text\":\"In the fourth round on October 15, Indonesia will visit China.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":62,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":62,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":62,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":62,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":62,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXeSrTgodKr8C_e44-Sn3nXj-DXXCvg4CLMwj_AICRV-xph57q2JemO5lb7ntTRhMO56a_DvvjZ8OMyQmdsLJaw8sKOmL3uk3fKJ8anYG9JQFTi3TE8aaGxLolU-unz7OZgNnVOHDEtnbxZtmjUA0NOVrgv24lhNviya1TyRXCrTZOv4wr9t7g?key=pHtCDUrqyKlXhUGvuiXbfw\",\"alt\":\"Instagram page 433 satirized the extra time in the match between Bahrain and Indonesia, 2-2, in the third round of Group C, 2026 World Cup third qualifying round - Asia region.\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXeSrTgodKr8C_e44-Sn3nXj-DXXCvg4CLMwj_AICRV-xph57q2JemO5lb7ntTRhMO56a_DvvjZ8OMyQmdsLJaw8sKOmL3uk3fKJ8anYG9JQFTi3TE8aaGxLolU-unz7OZgNnVOHDEtnbxZtmjUA0NOVrgv24lhNviya1TyRXCrTZOv4wr9t7g?key=pHtCDUrqyKlXhUGvuiXbfw\",\"alt\":\"Instagram page 433 satirized the extra time in the match between Bahrain and Indonesia, 2-2, in the third round of Group C, 2026 World Cup third qualifying round - Asia region.\",\"height\":\"\",\"width\":\"\"}}}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog2.jpg?alt=media&token=c6b16ea0-466a-4a11-a45d-2f0e1852bbb5\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"anhf2\"}}}}', 38, 4, 6, '2024-08-12 07:57:40', '2024-11-22 04:31:02', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog2.jpg?alt=media&token=88782e6d-efa6-4137-892e-a19fd9cc6be2', 'World media satirizes referee Indonesia-Bahrain match world\'s media fans criticized referee Ahmed Al Kaf, when added extra minutes help Bahrain draw 2-2 Indonesia third qualifying round 2026 World Cup. six minutes stoppage time second half Bahrain National match, referee Ahmed Al Kaf called overtime Indonesia leading 2-1. 98 minutes 40 seconds, Mohamed Marhoon scored equalizer Bahrain, 2-2. match ended violent reaction Indonesian coaching staff players. Team leader Sumardji even received straight red card, defender Shayne Pattynama almost fight Bahraini player. referee team surrounded security forces escorted off field. incident became controversial topic hotly discussed social networks world media.    Instagram page 433 satirized extra time match Bahrain Indonesia, 2-2, third round Group C, 2026 World Cup third qualifying round - Asia region. Instagram page 433, 75 million followers, posted composite photo, Lukaku number 90 Roma Xavi number 6 Barcelona, ​​but result Ronaldo\'s number 99 AC Milan. football page captioned \"quick calculation\" Indonesian flag. nine hours, post attracted 1.3 million likes 60,000 comments, mostly Indonesia. Referee Al Kaf accused blowing whistle favor country Asian Football Confederation (AFC) President Sheikh Salman bin Ibrahim Al Khalifa, AFC branded \"corrupt organization\". Commentary attacks flooded AFC\'s social media pages on Facebook, Instagram and X. The Bahrain Football Association situation, quickly turned off comments. addition, dozens fake accounts impersonating referee Ahmed Al Kaf created attract angry crowds. Indonesia\'s largest football website Bola headlined \"Drama when Bahrain faces Indonesia: Collapsed when leading, extra time until equalizer\". Meanwhile, CNN Indonesia listed three controversial decisions Omani referee, including extra time often giving Bahrain favorable calls contested situations. second half, Rafael Struick fouled near Bahrain penalty area, ball cleared off referee, causing pause. However, Mr. Al Kaf not award free kick Indonesia continued let Bahrain control ball.     Referee Ahmed Al Kaf officiated match Bahrain Indonesia, 2-2, third round Group C, 2026 World Cup qualifiers - Asia. Photo: Reuters. \"Indonesia robbed win,\" headlined Korean newspaper Isplus . Meanwhile, American newspaper ESPN commented: \"A draw Bahrain not bad result, dropping first victory third round World Cup qualifiers left Indonesia disappointed, even angry.\" FIFA\'s Laws Game stipulate time play determined fourth official. Article 7.3 stipulates fourth official shall record added time decided referee end half. The referee may increase added time may not reduce it . referee not allowed compensate error calculation first half\'s added time changing second half. Eight factors determine amount added time, including substitutions, injuries, time-wasting, yellow cards, VAR involvement, goal celebrations, medical stoppages cooling-breaks disruptions game. Fans questioned why AFC appointed Omani referee - West Asia region Bahrain - officiate. However, reality, no requirement referee different region, different country. round, Korean referee Kim Jong-hyeok officiated match Saudi Arabia Japan Group C, Japanese referee Hiroyuki Kimura officiated match Jordan South Korea Group B. Group A, Jordanian referee Adham Makhadmeh officiated match UAE North Korea 1-1 draw. controversial draw saw Indonesia miss chance move second Group C, dropping fifth instead. three points three draws, one behind Bahrain, Australia Saudi Arabia. Japan leads nine points, China bottom no points. fourth round October 15, Indonesia will visit China.\n ', 'The world\'s media and fans criticized referee Ahmed Al Kaf, when he added extra minutes to help Bahrain draw 2-2 with Indonesia in the third qualifying round of the 2026 World Cup.');
INSERT INTO `blogs` (`blog_id`, `title`, `content`, `author_id`, `category_id`, `sport_id`, `created_at`, `updated_at`, `is_delete`, `why_delete`, `status`, `image`, `context`, `short_description`) VALUES
(62, 'Vietnam\'s biggest trail race postponed due to storm Yagi', '{\"blocks\":[{\"key\":\"epr9g\",\"text\":\"Vietnam\'s biggest trail race postponed due to storm Yagi\",\"type\":\"header-one\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":56,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":56,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":56,\"style\":\"fontsize-30pt\"},{\"offset\":0,\"length\":56,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"a2723\",\"text\":\"The Vietnam Mountain Marathon (VMM) Organizing Committee announced the postponement of the 2024 race due to the impact of Typhoon Yagi.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":135,\"style\":\"color-rgb(58,69,79)\"},{\"offset\":0,\"length\":135,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":135,\"style\":\"fontsize-15pt\"},{\"offset\":0,\"length\":135,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"76aq\",\"text\":\"\\\"Over the past few days, we have been closely monitoring the storm situation in Sa Pa. Although the local authorities and the organizing committee hope that VMM can still take place safely on schedule, after the storm has passed, the actual situation is still complicated. Lao Cai province is still in a state of emergency to deal with storms and floods, making it impossible to organize VMM on the weekend of September 20-22,\\\" the organizing committee announced on the Vietnam Mountain Marathon Facebook page as well as an email to athletes.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":542,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":542,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":542,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":542,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":496,\"length\":8,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4iqp1\",\"text\":\"VMM, a trail running tournament founded in 2013, is usually held in September every year in Sa Pa. So far, only 2020 is an exception when the tournament is held in November due to the impact of Covid-19. The tournament is considered the most prestigious in the industry, attracting the largest number of athletes and receiving the most attention from the Vietnamese trail running community.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":390,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":390,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":390,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":390,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7g2vm\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8o8qk\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"dffkp\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ap171\",\"text\":\"A runner on the VMM 2023 competition route. Photo: Vietnam Mountain Marathon\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":76,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":76,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":76,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":76,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":51,\"length\":25,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9vggk\",\"text\":\"However, after Typhoon Yagi made landfall on September 7, the northern provinces suffered heavy damage. On the morning of September 9, the Chairman of the Lao Cai Provincial People\'s Committee declared a natural disaster emergency to deal with flash floods, landslides and flooding in the area. Rain map data in Lao Cai showed a red alert for almost the entire province.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":370,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":370,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":370,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":370,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"306ta\",\"text\":\"To date, Lao Cai is the province that has suffered the most human damage caused by Typhoon Yagi with 53 dead, 102 missing, and 61 injured. On the morning of September 11, a flash flood buried 37 households in Phuc Khanh commune, Bao Yen district, killing 30 people and leaving 65 missing. By the afternoon, the VMM organizing committee announced the postponement of the competition date.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":185,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":205,\"length\":182,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":387,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":387,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":387,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":185,\"length\":20,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":185,\"length\":20,\"style\":\"UNDERLINE\"}],\"entityRanges\":[{\"offset\":185,\"length\":20,\"key\":1}],\"data\":{}},{\"key\":\"2ppmf\",\"text\":\"Whether or not VMM will adjust the race date has been a hot topic in the trail running community for nearly a week now. Many athletes, especially in the southern region, have called on the organizing committee to make a decision soon so they can adjust their plans, change their airfares and accommodations. Some elite runners also said that the country is suffering heavy damage from natural disasters, which has made them lose motivation to compete.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":451,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":451,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":451,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":451,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cs0sj\",\"text\":\"After the postponement announcement was made, most runners in the Vietnamese trail community supported the organizers\' decision. Runner Hung Hai, the 100km champion of VMM 2023, said: \\\"Awesome. I\'ve been waiting for the organizers to announce it. It\'s the right decision at the right time.\\\" Runner Lanh Le, who conquered the Rinjani 100 trail race in Indonesia in May, said he supported the organizers\' decision. Le Hang, who just returned from the UTMB Series Finals in France, wrote: \\\"Thank you very much to the organizers.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":526,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":526,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":526,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":526,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3na7p\",\"text\":\"\\\"We also want to share that Lao Cai is the hometown of many VMM team members and where we started in Vietnam. Many of our team members, families and friends have been directly affected by the storm,\\\" the organizers announced, adding that the entire VMM charity fund this year will be donated to Lao Cai province to support post-storm reconstruction.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":349,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":349,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":349,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":349,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fk6ug\",\"text\":\"The VMM Organizing Committee also said that a new race date has not been determined and will notify athletes as soon as possible after working with partners and local authorities.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":179,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":179,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":179,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":179,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2bg9\",\"text\":\"\\\"We support the organizers\' decision and look forward to the new race date. Because running the race at this time, runners are not in a good mood,\\\" said 100-mile VMM 2024 runner Trinh Hieu about the decision to postpone the race date. Similarly, runner Nguyen Thanh Long of the same distance supported the organizers\' decision, although he felt a bit regretful because he had trained thoroughly for the race day with the peak week on September 2, and had also arranged his already busy work schedule to prepare for the race.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":524,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":524,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":524,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":524,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fcb2.jpg?alt=media&token=82755ad5-9a0c-411e-bd3e-855e3e4047f9\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"cb2\"}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/lu-quet-o-lao-cai-30-nguoi-chet-65-nguoi-mat-tich-4791536.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">buried 37 households</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/lu-quet-o-lao-cai-30-nguoi-chet-65-nguoi-mat-tich-4791536.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">buried 37 households</span>\",\"targetOption\":\"\"}}}}}}', 32, 4, 12, '2024-06-04 16:24:07', '2024-11-22 04:31:06', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fcb2.jpg?alt=media&token=c98b900f-1ee7-412e-bffb-6f02f1773a24', 'Vietnam\'s biggest trail race postponed due storm Yagi Vietnam Mountain Marathon (VMM) Organizing Committee announced postponement 2024 race due impact Typhoon Yagi. \"Over past few days, closely monitoring storm situation Sa Pa. Although local authorities organizing committee hope VMM place safely schedule, storm passed, actual situation complicated. Lao Cai province state emergency deal storms floods, making impossible organize VMM weekend September 20-22,\" organizing committee announced Vietnam Mountain Marathon Facebook page email athletes. VMM, trail running tournament founded 2013, usually held September every year Sa Pa. So far, 2020 exception when tournament held November due impact Covid-19. tournament considered prestigious industry, attracting largest number athletes receiving attention Vietnamese trail running community.     runner VMM 2023 competition route. Photo: Vietnam Mountain Marathon However, Typhoon Yagi made landfall September 7, northern provinces suffered heavy damage. morning September 9, Chairman Lao Cai Provincial People\'s Committee declared natural disaster emergency deal flash floods, landslides flooding area. Rain map data Lao Cai showed red alert almost entire province. date, Lao Cai province suffered human damage caused Typhoon Yagi 53 dead, 102 missing, 61 injured. morning September 11, flash flood buried 37 households in Phuc Khanh commune, Bao Yen district, killing 30 people leaving 65 missing. afternoon, VMM organizing committee announced postponement competition date. Whether not VMM will adjust race date hot topic trail running community nearly week now. athletes, especially southern region, called organizing committee decision soon so adjust plans, change airfares accommodations. elite runners country suffering heavy damage natural disasters, made lose motivation compete. postponement announcement made, runners Vietnamese trail community supported organizers\' decision. Runner Hung Hai, 100km champion VMM 2023, said: \"Awesome. I\'ve waiting organizers announce it. It\'s right decision right time.\" Runner Lanh Le, conquered Rinjani 100 trail race Indonesia May, supported organizers\' decision. Le Hang, just returned UTMB Series Finals France, wrote: \"Thank organizers.\" \"We want share Lao Cai hometown VMM team members started Vietnam. team members, families friends directly affected storm,\" organizers announced, adding entire VMM charity fund year will donated Lao Cai province support post-storm reconstruction. VMM Organizing Committee new race date not determined will notify athletes soon possible working partners local authorities. \"We support organizers\' decision look forward new race date. running race time, runners not good mood,\" 100-mile VMM 2024 runner Trinh Hieu decision postpone race date. Similarly, runner Nguyen Thanh Long distance supported organizers\' decision, although felt bit regretful trained thoroughly race day peak week September 2, arranged already busy work schedule prepare race.\n ', 'The Vietnam Mountain Marathon (VMM) Organizing Committee announced the postponement of the 2024 race due to the impact of Typhoon Yagi.'),
(66, 'Di Canio wants to jail Man Utd leaders for selling McTominay', '{\"blocks\":[{\"key\":\"7f8k8\",\"text\":\"Di Canio wants to jail Man Utd leaders for selling McTominay\",\"type\":\"header-one\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":60,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":60,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":60,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":60,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":60,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"clt01\",\"text\":\"ACCORDING to former player Di Canio, Man Utd\'s leadership made a big mistake when selling Scott McTominay to Napoli.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":116,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":116,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":116,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":9,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":116,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":9,\"length\":107,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"544b6\",\"text\":\"\\\"I will go to Man Utd to jail all the directors. How can they sell McTominay?\\\", Paolo Di Canio, the former player who won the title of the most beautiful goal in English football in the 1999-2000 season, told Il Mattino newspaper on October 10.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":244,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":244,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":244,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":244,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":209,\"length\":10,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dj2vq\",\"text\":\"In the summer, Man Utd sold McTominay to Napoli for $33 million, even though the Scottish midfielder\'s contract was until June 2025. Initially, coach Erik ten Hag refused to sell, but the final say belonged to Man Utd\'s Board of Directors and co-owner Jim Ratcliffe.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":23,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":37,\"length\":229,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":266,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":266,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":266,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":23,\"length\":14,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":23,\"length\":14,\"style\":\"UNDERLINE\"}],\"entityRanges\":[{\"offset\":23,\"length\":14,\"key\":0}],\"data\":{}},{\"key\":\"2p0hp\",\"text\":\"McTominay celebrates scoring in the first minute of Napoli\'s 3-1 Como Serie A match on October 4. Photo: AP\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":107,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":107,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":107,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":107,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":105,\"length\":2,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4fol0\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1pb2l\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"23bb1\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3en4v\",\"text\":\"At the time, Ten Hag said he was happy for McTominay, but regretted not being able to keep an important player who embodied Man Utd in every aspect. The Dutch coach also affirmed that the deal satisfied all parties, including Man Utd, Napoli and McTominay.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":256,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":256,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":256,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":256,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cje6r\",\"text\":\"McTominay came through the Man Utd academy, before making 255 appearances and scoring 29 goals for the first team. After joining Napoli, the 27-year-old midfielder immediately scored two goals in five games. Many fans are sad that the \\\"Red Devils\\\" lost a player with a high scoring rate, in the context of the team\'s decline.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":325,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":325,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":325,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":325,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"a8uc0\",\"text\":\"Under the direction of co-owner Ratcliffe, Man Utd has recruited a series of famous leaders since the beginning of the year, including CEO Omar Berrada, Sporting Director Dan Ashworth and Technical Director Jason Wilcox. According to the Sun , Man Utd\'s Board of Directors is mainly responsible for transfer activities. Coach Ten Hag can give advice on players to buy or sell, but does not have the final say.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":409,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":409,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":409,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":409,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":242,\"length\":1,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5bej0\",\"text\":\"Last summer, in addition to McTominay, Man Utd also said goodbye to Anthony Martial, Mason Greenwood, Aaron Wan Bissaka and Brandon Williams. In the opposite direction, Joshua Zirkzee, Leny Yoro, De Ligt, Noussair Mazraoui and Manuel Ugarte joined for a total price of more than 250 million.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":291,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":291,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":291,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":291,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e3qde\",\"text\":\"Man Utd have made their worst start to a Premier League campaign in club history, sitting 14th with eight points from seven games. They have also drawn their opening two Europa League games against Twente and Porto, as well as thrashing Barnsley 7-0 in the League Cup. McTominay \'s Napoli, on the other hand, are top of Serie A with 16 points from seven games.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":7,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":269,\"length\":9,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":360,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":360,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":360,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":7,\"style\":\"UNDERLINE\"},{\"offset\":269,\"length\":9,\"style\":\"UNDERLINE\"},{\"offset\":7,\"length\":262,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":278,\"length\":82,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":7,\"key\":2},{\"offset\":269,\"length\":9,\"key\":3}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/man-utd-ban-mctominay-sang-serie-a-4785609.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">sold McTominay</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/man-utd-ban-mctominay-sang-serie-a-4785609.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">sold McTominay</span>\",\"targetOption\":\"\"}}}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog1.jpg?alt=media&token=ad7e4eb9-45b2-4e55-849c-13153ccb8d16\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"anhf1\"}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/manchester-united-116\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Man Utd</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/manchester-united-116\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Man Utd</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/scott-mctominay-3948\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">McTominay</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/scott-mctominay-3948\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">McTominay</span>\",\"targetOption\":\"\"}}}}}}', 18, 5, 6, '2024-11-07 06:34:23', '2024-12-22 12:23:01', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fblog1.jpg?alt=media&token=39462993-ff9c-4cba-998d-a55f4f5b3120', 'Di Canio wants jail Man Utd leaders selling McTominay ACCORDING to former player Di Canio, Man Utd\'s leadership made big mistake when selling Scott McTominay Napoli. \"I will go Man Utd jail directors. sell McTominay?\", Paolo Di Canio, former player won title beautiful goal English football 1999-2000 season, told Il Mattino newspaper October 10. summer, Man Utd sold McTominay to Napoli $33 million, even though Scottish midfielder\'s contract until June 2025. Initially, coach Erik ten Hag refused sell, final say belonged Man Utd\'s Board Directors co-owner Jim Ratcliffe. McTominay celebrates scoring first minute Napoli\'s 3-1 Como Serie match October 4. Photo: AP     time, Ten Hag happy McTominay, regretted not able keep important player embodied Man Utd every aspect. Dutch coach affirmed deal satisfied parties, including Man Utd, Napoli McTominay. McTominay Man Utd academy, making 255 appearances scoring 29 goals first team. joining Napoli, 27-year-old midfielder immediately scored two goals five games. fans sad \"Red Devils\" lost player high scoring rate, context team\'s decline. direction co-owner Ratcliffe, Man Utd recruited series famous leaders beginning year, including CEO Omar Berrada, Sporting Director Dan Ashworth Technical Director Jason Wilcox. According Sun , Man Utd\'s Board Directors mainly responsible transfer activities. Coach Ten Hag give advice players buy sell, does not final say. Last summer, addition McTominay, Man Utd goodbye Anthony Martial, Mason Greenwood, Aaron Wan Bissaka Brandon Williams. opposite direction, Joshua Zirkzee, Leny Yoro, De Ligt, Noussair Mazraoui Manuel Ugarte joined total price 250 million. Man Utd have made worst start Premier League campaign club history, sitting 14th eight points seven games. drawn opening two Europa League games against Twente Porto, thrashing Barnsley 7-0 League Cup. McTominay \'s Napoli, hand, top Serie 16 points seven games.\n ', '\"I will go to Man Utd to jail all the directors. How can they sell McTominay?\", Paolo Di Canio, the former player who won the title of the most beautiful goal in English football in the 1999-2000 season, told Il Mattino newsp'),
(67, 'Di Canio wants to jail Man Utd leaders for selling McTominay', '{\"blocks\":[{\"key\":\"a6ege\",\"text\":\"Di Canio wants to jail Man Utd leaders for selling McTominay\",\"type\":\"header-one\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":60,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":60,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":60,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":60,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":60,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"459t4\",\"text\":\"ACCORDING to former player Di Canio, Man Utd\'s leadership made a big mistake when selling Scott McTominay to Napoli.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":116,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":116,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":116,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":9,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":116,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":9,\"length\":107,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"6d6kp\",\"text\":\"\\\"I will go to Man Utd to jail all the directors. How can they sell McTominay?\\\", Paolo Di Canio, the former player who won the title of the most beautiful goal in English football in the 1999-2000 season, told Il Mattino newspaper on October 10.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":244,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":244,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":244,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":244,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":209,\"length\":10,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"asoqt\",\"text\":\"In the summer, Man Utd sold McTominay to Napoli for $33 million, even though the Scottish midfielder\'s contract was until June 2025. Initially, coach Erik ten Hag refused to sell, but the final say belonged to Man Utd\'s Board of Directors and co-owner Jim Ratcliffe.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":23,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":37,\"length\":229,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":266,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":266,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":266,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":23,\"length\":14,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":23,\"length\":14,\"style\":\"UNDERLINE\"}],\"entityRanges\":[{\"offset\":23,\"length\":14,\"key\":0}],\"data\":{}},{\"key\":\"batoh\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2vofm\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"7tfc1\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1fl8v\",\"text\":\"McTominay celebrates scoring in the first minute of Napoli\'s 3-1 Como Serie A match on October 4. Photo: AP\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":107,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":107,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":107,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":107,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":105,\"length\":2,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4m7gi\",\"text\":\"At the time, Ten Hag said he was happy for McTominay, but regretted not being able to keep an important player who embodied Man Utd in every aspect. The Dutch coach also affirmed that the deal satisfied all parties, including Man Utd, Napoli and McTominay.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":256,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":256,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":256,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":256,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"95i97\",\"text\":\"McTominay came through the Man Utd academy, before making 255 appearances and scoring 29 goals for the first team. After joining Napoli, the 27-year-old midfielder immediately scored two goals in five games. Many fans are sad that the \\\"Red Devils\\\" lost a player with a high scoring rate, in the context of the team\'s decline.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":325,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":325,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":325,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":325,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dhkh\",\"text\":\"Under the direction of co-owner Ratcliffe, Man Utd has recruited a series of famous leaders since the beginning of the year, including CEO Omar Berrada, Sporting Director Dan Ashworth and Technical Director Jason Wilcox. According to the Sun , Man Utd\'s Board of Directors is mainly responsible for transfer activities. Coach Ten Hag can give advice on players to buy or sell, but does not have the final say.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":409,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":409,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":409,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":409,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":242,\"length\":1,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4tpkf\",\"text\":\"Last summer, in addition to McTominay, Man Utd also said goodbye to Anthony Martial, Mason Greenwood, Aaron Wan Bissaka and Brandon Williams. In the opposite direction, Joshua Zirkzee, Leny Yoro, De Ligt, Noussair Mazraoui and Manuel Ugarte joined for a total price of more than 250 million.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":291,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":291,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":291,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":291,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3nh6i\",\"text\":\"Man Utd have made their worst start to a Premier League campaign in club history, sitting 14th with eight points from seven games. They have also drawn their opening two Europa League games against Twente and Porto, as well as thrashing Barnsley 7-0 in the League Cup. McTominay \'s Napoli, on the other hand, are top of Serie A with 16 points from seven games.\\n  \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":7,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":269,\"length\":9,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":360,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":360,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":360,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":7,\"style\":\"UNDERLINE\"},{\"offset\":269,\"length\":9,\"style\":\"UNDERLINE\"},{\"offset\":7,\"length\":262,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":278,\"length\":82,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":7,\"key\":2},{\"offset\":269,\"length\":9,\"key\":3}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/man-utd-ban-mctominay-sang-serie-a-4785609.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">sold McTominay</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/man-utd-ban-mctominay-sang-serie-a-4785609.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">sold McTominay</span>\",\"targetOption\":\"\"}}}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbongda2.jpg?alt=media&token=84cadd84-7f1a-45d5-944b-806309931325\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"abdsf\"}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/manchester-united-116\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Man Utd</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/manchester-united-116\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Man Utd</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/scott-mctominay-3948\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">McTominay</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/scott-mctominay-3948\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">McTominay</span>\",\"targetOption\":\"\"}}}}}}', 18, 5, 6, '2024-11-07 06:46:40', '2024-11-24 13:44:15', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbongda2.jpg?alt=media&token=f7a4cc14-fd68-444a-be46-5b3d3d804e37', 'Di Canio wants jail Man Utd leaders selling McTominay ACCORDING to former player Di Canio, Man Utd\'s leadership made big mistake when selling Scott McTominay Napoli. \"I will go Man Utd jail directors. sell McTominay?\", Paolo Di Canio, former player won title beautiful goal English football 1999-2000 season, told Il Mattino newspaper October 10. summer, Man Utd sold McTominay to Napoli $33 million, even though Scottish midfielder\'s contract until June 2025. Initially, coach Erik ten Hag refused sell, final say belonged Man Utd\'s Board Directors co-owner Jim Ratcliffe.     McTominay celebrates scoring first minute Napoli\'s 3-1 Como Serie match October 4. Photo: AP time, Ten Hag happy McTominay, regretted not able keep important player embodied Man Utd every aspect. Dutch coach affirmed deal satisfied parties, including Man Utd, Napoli McTominay. McTominay Man Utd academy, making 255 appearances scoring 29 goals first team. joining Napoli, 27-year-old midfielder immediately scored two goals five games. fans sad \"Red Devils\" lost player high scoring rate, context team\'s decline. direction co-owner Ratcliffe, Man Utd recruited series famous leaders beginning year, including CEO Omar Berrada, Sporting Director Dan Ashworth Technical Director Jason Wilcox. According Sun , Man Utd\'s Board Directors mainly responsible transfer activities. Coach Ten Hag give advice players buy sell, does not final say. Last summer, addition McTominay, Man Utd goodbye Anthony Martial, Mason Greenwood, Aaron Wan Bissaka Brandon Williams. opposite direction, Joshua Zirkzee, Leny Yoro, De Ligt, Noussair Mazraoui Manuel Ugarte joined total price 250 million. Man Utd have made worst start Premier League campaign club history, sitting 14th eight points seven games. drawn opening two Europa League games against Twente Porto, thrashing Barnsley 7-0 League Cup. McTominay \'s Napoli, hand, top Serie 16 points seven games.\n  ', 'ACCORDING to former player Di Canio, Man Utd\'s leadership made a big mistake when selling Scott McTominay to Napoli.');
INSERT INTO `blogs` (`blog_id`, `title`, `content`, `author_id`, `category_id`, `sport_id`, `created_at`, `updated_at`, `is_delete`, `why_delete`, `status`, `image`, `context`, `short_description`) VALUES
(68, 'Haaland has no regrets about throwing the ball at the Arsenal midfielder\'s head', '{\"blocks\":[{\"key\":\"1ocdl\",\"text\":\"Haaland has no regrets about throwing the ball at the Arsenal midfielder\'s head\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":79,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":79,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":79,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":79,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":79,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":79,\"style\":\"BOLD\"},{\"offset\":0,\"length\":79,\"style\":\"fontsize-24\"},{\"offset\":0,\"length\":79,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8n9lk\",\"text\":\"MIDFIELDER Erling Haaland has no regrets about throwing the ball at defender Gabriel\'s head at the end of Man City\'s 2-2 draw with Arsenal in round 5 of the Premier League.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":172,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":172,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":172,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":10,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":172,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":10,\"length\":162,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e0i8o\",\"text\":\"\\\"I don\'t have regrets in life,\\\" Haaland said at a press conference on October 9 while training with the Norwegian national team. \\\"It was a stressful time and a lot of things happened in that game. What happens on the pitch stays there, always.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":244,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":244,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":244,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":244,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8p32t\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"999hh\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"eegj3\",\"text\":\"Haaland picked up the ball and threw it at Gabriel\'s head after Man City equalized 2-2 in the match against Arsenal at Etihad Stadium on September 22. Screenshot\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":161,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":161,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":161,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":161,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":151,\"length\":10,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f5psn\",\"text\":\"Haaland had a series of controversial actions at the end of the match at Etihad Stadium on September 22. After John Stones equalized 2-2, the Norwegian striker went into the net to pick up the ball and threw it at Gabriel\'s head . At this time, the Brazilian center-back was disappointed with the loss, covered his face with his shirt and did not know Haaland\'s provocation.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":7,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":202,\"length\":26,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":374,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":374,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":374,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":7,\"length\":195,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":228,\"length\":146,\"style\":\"color-rgb(0,0,0)\"}],\"entityRanges\":[{\"offset\":0,\"length\":7,\"key\":1},{\"offset\":202,\"length\":26,\"key\":2}],\"data\":{}},{\"key\":\"aas9n\",\"text\":\"After Arsenal kicked off, Haaland shoulder-butted Thomas Partey, in retaliation for Kai Havertz\'s headbutt on Rodri earlier in the game, sparking a brawl between players from both teams. Haaland clashed with Ben White, Jakub Kiwior and Gabriel, before the referee intervened. He reportedly told Kiwior to \\\"fuck off\\\", before turning to taunt 17-year-old Myles Anthony Lewis-Skelly, asking \\\"Who the hell is this?\\\".\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":412,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":412,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":412,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":412,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"rjbo\",\"text\":\"After the match, the 24-year-old striker also patted his shoulder and mocked coach Mikel Arteta for being humble . Striker Gabriel Jesus, standing right next to him, immediately reacted, but Haaland continued to provoke him and asked, \\\"What the hell are you talking about? Go away.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":106,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":112,\"length\":170,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":282,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":282,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":282,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":106,\"length\":6,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":106,\"length\":6,\"key\":3}],\"data\":{}},{\"key\":\"ff8im\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3b33o\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":4}],\"data\":{}},{\"key\":\"83vmt\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"43pgd\",\"text\":\"Forward Erling Haaland shoots during Norway\'s 3-1 win over Cyprus at Ullevaal Stadium, Oslo, in a Euro 2024 qualifier on June 20, 2023. Photo: Reuters.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":151,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":151,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":151,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":151,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":143,\"length\":8,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dccaj\",\"text\":\"With Martin Odegaard absent due to injury, Haaland will captain Norway against Slovenia on October 10 and Austria on October 13 in the UEFA Nations League. Haaland has scored 32 goals and could break Jorgen Juve\'s record of 33 goals for the national team in the coming days.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":274,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":274,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":274,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":274,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"62hu7\",\"text\":\"\\\"It would be great to break that record,\\\" Haaland said. \\\"I haven\'t thought about retiring from international football. Many people think I don\'t want to play for the national team, but that\'s wrong. I always enjoy playing for Norway.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":234,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":234,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":234,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":234,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"aj3ak\",\"text\":\"Haaland also backed his Man City teammate Rodri, who suggested the players could go on strike over the overloaded fixture list. He believes there are too many games at club and international level, and he feels he has benefited from a free summer as Norway failed to qualify for Euro 2024. Haaland has scored ten goals in City\'s first seven Premier League games, topping the scoring charts.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":390,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":390,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":390,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":390,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3eqsn\",\"text\":\"\\\"I have more energy on and off the pitch. My mind is more rested,\\\" the Man City striker said. \\\"It\'s important to take a break from work, no matter what you do, especially when you\'re under physical stress. The number of games has increased dramatically in recent years, not least because of the new format of the Champions League. It\'s not a new problem, but there are too many games.\\\"\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":385,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":385,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":385,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":385,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXfkw_UKQh7c2xsaZEkO9kkdAUdzHfjd7RbcGFVaMsU-Hq3PF254nckrphgUrpNpOidz4A5Dy39A3RFc7Fbi_gUXjk1-W9TgW7gdKpN2SO-JB93OV1yplSsF2_hIAIg7ErjfOluvU8Gia0tGi2E4wKREQHKsrrJhYMGt-wt6NBLbKUCU69vae6s?key=KebK7_uuKj5tgNvTYF83Tg\",\"alt\":\"Haaland picked up the ball and threw it at Gabriel\'s head after Man City equalized 2-2 in the match against Arsenal at Etihad Stadium on September 22. Screenshot\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXfkw_UKQh7c2xsaZEkO9kkdAUdzHfjd7RbcGFVaMsU-Hq3PF254nckrphgUrpNpOidz4A5Dy39A3RFc7Fbi_gUXjk1-W9TgW7gdKpN2SO-JB93OV1yplSsF2_hIAIg7ErjfOluvU8Gia0tGi2E4wKREQHKsrrJhYMGt-wt6NBLbKUCU69vae6s?key=KebK7_uuKj5tgNvTYF83Tg\",\"alt\":\"Haaland picked up the ball and threw it at Gabriel\'s head after Man City equalized 2-2 in the match against Arsenal at Etihad Stadium on September 22. Screenshot\",\"height\":\"\",\"width\":\"\"}}}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/erling-haaland-979\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Haaland</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/erling-haaland-979\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Haaland</span>\",\"targetOption\":\"\"}}}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/haaland-thoat-an-phat-nguoi-vu-nem-bong-vao-dau-gabriel-4796201.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">threw it at Gabriel\'s head</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/haaland-thoat-an-phat-nguoi-vu-nem-bong-vao-dau-gabriel-4796201.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">threw it at Gabriel\'s head</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/haaland-yeu-cau-hlv-arteta-khiem-ton-4796227.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">humble</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/haaland-yeu-cau-hlv-arteta-khiem-ton-4796227.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">humble</span>\",\"targetOption\":\"\"}}}},\"4\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd7.jpg?alt=media&token=5ebc62e3-acd8-45e2-9049-2414f2700ecf\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"bd7\"}}}}', 32, 4, 6, '2024-11-07 06:52:17', '2024-11-22 04:31:24', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd7.jpg?alt=media&token=000a43d0-301a-4db9-b1c2-db462dfcaefd', 'Haaland no regrets throwing ball Arsenal midfielder\'s head MIDFIELDER Erling Haaland no regrets throwing ball defender Gabriel\'s head end Man City\'s 2-2 draw Arsenal round 5 Premier League. \"I don\'t regrets life,\" Haaland press conference October 9 training Norwegian national team. \"It stressful time lot things happened game. happens pitch stays there, always.\"    Haaland picked ball threw Gabriel\'s head Man City equalized 2-2 match against Arsenal Etihad Stadium September 22. Screenshot Haaland had series controversial actions end match Etihad Stadium September 22. John Stones equalized 2-2, Norwegian striker went net pick ball and threw Gabriel\'s head . time, Brazilian center-back disappointed loss, covered face shirt not know Haaland\'s provocation. Arsenal kicked off, Haaland shoulder-butted Thomas Partey, retaliation Kai Havertz\'s headbutt Rodri earlier game, sparking brawl players teams. Haaland clashed Ben White, Jakub Kiwior Gabriel, referee intervened. reportedly told Kiwior \"fuck off\", turning taunt 17-year-old Myles Anthony Lewis-Skelly, asking \"Who hell this?\". match, 24-year-old striker patted shoulder mocked coach Mikel Arteta being humble . Striker Gabriel Jesus, standing right next him, immediately reacted, Haaland continued provoke asked, \"What hell talking about? Go away.\"     Forward Erling Haaland shoots during Norway\'s 3-1 win Cyprus Ullevaal Stadium, Oslo, Euro 2024 qualifier June 20, 2023. Photo: Reuters. Martin Odegaard absent due injury, Haaland will captain Norway against Slovenia October 10 Austria October 13 UEFA Nations League. Haaland scored 32 goals break Jorgen Juve\'s record 33 goals national team coming days. \"It great break record,\" Haaland said. \"I haven\'t thought retiring international football. people think don\'t want play national team, that\'s wrong. always enjoy playing Norway.\" Haaland backed Man City teammate Rodri, suggested players go strike overloaded fixture list. believes games club international level, feels benefited free summer Norway failed qualify Euro 2024. Haaland scored ten goals City\'s first seven Premier League games, topping scoring charts. \"I energy off pitch. mind rested,\" Man City striker said. \"It\'s important break work, no matter do, especially when you\'re physical stress. number games increased dramatically recent years, not least new format Champions League. It\'s not new problem, games.\"\n ', 'MIDFIELDER Erling Haaland has no regrets about throwing the ball at defender Gabriel\'s head at the end of Man City\'s 2-2 draw with Arsenal in round 5 of the Premier League.'),
(69, 'Al Nassr CEO: \'Ronaldo does not control the club\'', '{\"blocks\":[{\"key\":\"1s6b2\",\"text\":\"Al Nassr CEO: \'Ronaldo does not control the club\'\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":49,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":49,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":49,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":49,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":49,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"j72\",\"text\":\"CEO Guido Fienga says 39-year-old striker Cristiano Ronaldo has an important role, but does not control Al Nassr.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":113,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":113,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":113,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":113,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":113,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"17t9g\",\"text\":\"\\\"Ronaldo is the captain and the best player in the world, not only technically but also in his behaviour,\\\" Fienga said at a club event on September 18. \\\"Ronaldo does not control the club. But as the best player in the world, he gives us direction and goals that we have to achieve.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":282,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":282,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":282,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":282,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b86id\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"ake10\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"dl6d5\",\"text\":\"Ronaldo looks at himself in the mirror while working out at the Al Nassr headquarters. Photo: Al Nassr FC\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":105,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":105,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":105,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":105,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":94,\"length\":11,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"cdbht\",\"text\":\"In December 2022, Ronaldo joined Al Nassr with the world\'s highest salary of 75 million USD per year, which can increase to 200 million USD if advertising and sponsorship are added.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":18,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":25,\"length\":156,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":181,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":181,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":181,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":18,\"length\":7,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":18,\"length\":7,\"key\":1}],\"data\":{}},{\"key\":\"f6cb5\",\"text\":\"The Portuguese striker has scored 62 goals, but has yet to win any official titles in Saudi Arabia. In the 2022-2023 season, Al Nassr finished second in the Saudi Pro League, and were eliminated in the semi-finals of the King\'s Cup and the semi-finals of the Saudi Super Cup. Last season, Ronaldo\'s team continued to finish second in the Saudi Pro League, lost in the final of the King\'s Cup, and were eliminated in the semi-finals of the Saudi Super Cup and the quarter-finals of the AFC Champions League.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":125,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":133,\"length\":373,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":506,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":506,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":506,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":125,\"length\":8,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":125,\"length\":8,\"key\":2}],\"data\":{}},{\"key\":\"a7rid\",\"text\":\"The only title Ronaldo won was the 2023 Arab Club Champions Cup , a friendly tournament, when he beat Al Hilal 2-1 in the final. This year, the tournament was not held.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":31,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":63,\"length\":105,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":168,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":168,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":168,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":31,\"length\":32,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":31,\"length\":32,\"key\":3}],\"data\":{}},{\"key\":\"5848o\",\"text\":\"\\\"Ronaldo is a champion and we want him to lead us to victory,\\\" Fienga added of the former Real Madrid and Man Utd star. \\\"We want to win the title and achieve the best possible goals this season. We are very happy that Ronaldo is part of the club.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":247,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":247,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":247,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":247,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"bur9\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"b0ojd\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":4}],\"data\":{}},{\"key\":\"e1ch\",\"text\":\"Director Fienga (middle) at the ceremony to honor Ronaldo and former coach Luis Castro at the end of 2023. Photo: Al Nassr\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":122,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":122,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":122,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":122,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":114,\"length\":8,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"10qlb\",\"text\":\"Al Nassr got off to a poor start, losing 1-4 to Al Hilal in the Saudi Super Cup final, then drew two and won one in the first three rounds, dropping to seventh in the Saudi Pro League. A 1-1 draw at Iraq\'s Al Shorta Stadium in the opening match of the AFC Champions League Elite on September 16 was the \\\"last straw\\\" that led the Al Nassr board to fire coach Luis Castro .\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":344,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":369,\"length\":2,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":371,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":371,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":371,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":344,\"length\":25,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":344,\"length\":25,\"key\":5}],\"data\":{}},{\"key\":\"8fec1\",\"text\":\"Fienga believes Al Nassr have strengthened their squad in the summer transfer window with the signings of Mohamed Simakan (from RB Leipzig), Angelo Gabriel (Chelsea), Wesley (Corinthians), Salem Al-Najdi (Al-Fateh), Bento (Athletico Paranaense) and will improve step by step. \\\"We need to work, bring stability and create value, not destroy value every six months,\\\" he stressed.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":377,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":377,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":377,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":377,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dl4m4\",\"text\":\"On September 19, Al Nassr announced the appointment of Stefano Pioli - the team\'s fourth coach since Ronaldo joined in January 2023. Pioli has led 12 Italian teams, including Inter, Lazio, Fiorentina and Milan, culminating in the 2021-2022 Serie A championship with Milan.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":36,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":68,\"length\":204,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":272,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":272,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":272,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":36,\"length\":32,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":36,\"length\":32,\"key\":6}],\"data\":{}},{\"key\":\"5qj90\",\"text\":\"In a press conference ahead of the Saudi Pro League match against Al Ettifaq, Pioli said he had watched Al Nassr\'s games this season and believed they had the potential to achieve good results. The Italian coach wants to develop the whole team and build an identity, rather than passively waiting for the opponent\'s tactics. \\\"The upcoming matches will tell me more about the team\'s strengths, weaknesses and capabilities. We hope to get a positive result,\\\" he said.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":465,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":465,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":465,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":465,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7r77l\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"center\"}},{\"key\":\"1ml2\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":7}],\"data\":{}},{\"key\":\"8k3qd\",\"text\":\"Coach Pioli (center) instructs Al Nassr players on the training ground on September 19. Photo: Al Nassr\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":103,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":103,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":103,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":103,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":95,\"length\":8,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"60vfp\",\"text\":\"Pioli revealed that he had received many offers, but was attracted by the Al Nassr project. He considered leading the Saudi Pro League club as a new beginning, an interesting experience after 25 years working in Italy, and thanked the team\'s management for this opportunity.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":274,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":274,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":274,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":274,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXdXA4JeuTVvWoM6lFva6gFAFApsWYPpg4DOVVnT2hYxE23JZVefF-jU0k7Z7-BVey5ozDrQcLOshCGUCXy69b3UVXuKRacfHim1IvBDYYeU1KRgQOPDCPrRs0ypTeT8rlzkzPRu1aNkojQji7Qu4DIduXx4nSpvKsWfIY3zA88ReV3vDwwHKik?key=R8bT3QJyck3tELt6WhpgmA\",\"alt\":\"Ronaldo looks at himself in the mirror while working out at the Al Nassr headquarters. Photo: Al Nassr FC\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXdXA4JeuTVvWoM6lFva6gFAFApsWYPpg4DOVVnT2hYxE23JZVefF-jU0k7Z7-BVey5ozDrQcLOshCGUCXy69b3UVXuKRacfHim1IvBDYYeU1KRgQOPDCPrRs0ypTeT8rlzkzPRu1aNkojQji7Qu4DIduXx4nSpvKsWfIY3zA88ReV3vDwwHKik?key=R8bT3QJyck3tELt6WhpgmA\",\"alt\":\"Ronaldo looks at himself in the mirror while working out at the Al Nassr headquarters. Photo: Al Nassr FC\",\"height\":\"\",\"width\":\"\"}}}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/cristiano-ronaldo-194\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Ronaldo</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/cristiano-ronaldo-194\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Ronaldo</span>\",\"targetOption\":\"\"}}}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/al-nassr-5918\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Al Nassr</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/al-nassr-5918\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Al Nassr</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/ronaldo-lap-cu-dup-al-nassr-vo-dich-arab-champions-cup-4641100.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">the 2023 Arab Club Champions Cup</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/ronaldo-lap-cu-dup-al-nassr-vo-dich-arab-champions-cup-4641100.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">the 2023 Arab Club Champions Cup</span>\",\"targetOption\":\"\"}}}},\"4\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXcrw2AQVXDLvlW5rc6OwFZlGeJUa26NbU5WCEejt9TIB3xhodqRXPyqV6y2GcsS1_1FApjJXsptysk8fDdp1Y-RZNLwURPOLNrw3OqoLpfu1WALgnEghSSbRUKyMKoo5SgKF18WKqLEqLB6vu0Hy89Vgky6-X_fIcoI0xoAuSwd1JpD9F7fPgU?key=R8bT3QJyck3tELt6WhpgmA\",\"alt\":\"Director Fienga (middle) at the ceremony to honor Ronaldo and former coach Luis Castro at the end of 2023. Photo: Al Nassr\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXcrw2AQVXDLvlW5rc6OwFZlGeJUa26NbU5WCEejt9TIB3xhodqRXPyqV6y2GcsS1_1FApjJXsptysk8fDdp1Y-RZNLwURPOLNrw3OqoLpfu1WALgnEghSSbRUKyMKoo5SgKF18WKqLEqLB6vu0Hy89Vgky6-X_fIcoI0xoAuSwd1JpD9F7fPgU?key=R8bT3QJyck3tELt6WhpgmA\",\"alt\":\"Director Fienga (middle) at the ceremony to honor Ronaldo and former coach Luis Castro at the end of 2023. Photo: Al Nassr\",\"height\":\"\",\"width\":\"\"}}}},\"5\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/al-nassr-lan-thu-ba-thay-hlv-tu-khi-co-ronaldo-4794017.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">to fire coach Luis Castro</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/al-nassr-lan-thu-ba-thay-hlv-tu-khi-co-ronaldo-4794017.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">to fire coach Luis Castro</span>\",\"targetOption\":\"\"}}}},\"6\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/hlv-vo-dich-serie-a-2022-lam-thay-moi-cua-ronaldo-4794318.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">the appointment of Stefano Pioli</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/hlv-vo-dich-serie-a-2022-lam-thay-moi-cua-ronaldo-4794318.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">the appointment of Stefano Pioli</span>\",\"targetOption\":\"\"}}}},\"7\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXeNkzXfEKAbhMYhX8WGeYqMtvwwXTdoz0mvemYeJ2ydKUG0bIS9hHGkcHDP2nX6szWI82VfV2qvikrBXB7O-G7-Hduqu8TsjbAk1BCRwtdzVtoYa4hBHl0bq7-u03kHpssfRHxytY1sUyMYtIb4HQGdfML7O0pUgnuJ8afwkiM87NKwyF7Q_lg?key=R8bT3QJyck3tELt6WhpgmA\",\"alt\":\"Coach Pioli (center) instructs Al Nassr players on the training ground on September 19. Photo: Al Nassr\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://lh7-rt.googleusercontent.com/docsz/AD_4nXeNkzXfEKAbhMYhX8WGeYqMtvwwXTdoz0mvemYeJ2ydKUG0bIS9hHGkcHDP2nX6szWI82VfV2qvikrBXB7O-G7-Hduqu8TsjbAk1BCRwtdzVtoYa4hBHl0bq7-u03kHpssfRHxytY1sUyMYtIb4HQGdfML7O0pUgnuJ8afwkiM87NKwyF7Q_lg?key=R8bT3QJyck3tELt6WhpgmA\",\"alt\":\"Coach Pioli (center) instructs Al Nassr players on the training ground on September 19. Photo: Al Nassr\",\"height\":\"\",\"width\":\"\"}}}}}}', 18, 5, 6, '2024-11-08 12:57:27', '2024-11-22 04:22:41', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbongda1.jpg?alt=media&token=a8b56cc7-4a1d-45aa-9bc5-11954f7f9591', 'Al Nassr CEO: \'Ronaldo does not control club\' CEO Guido Fienga says 39-year-old striker Cristiano Ronaldo important role, does not control Al Nassr. \"Ronaldo captain best player world, not technically behaviour,\" Fienga club event September 18. \"Ronaldo does not control club. best player world, gives us direction goals achieve.\"    Ronaldo looks mirror working Al Nassr headquarters. Photo: Al Nassr FC December 2022, Ronaldo joined Al Nassr world\'s highest salary 75 million USD per year, increase 200 million USD advertising sponsorship added. Portuguese striker scored 62 goals, yet win official titles Saudi Arabia. 2022-2023 season, Al Nassr finished second Saudi Pro League, eliminated semi-finals King\'s Cup semi-finals Saudi Super Cup. Last season, Ronaldo\'s team continued finish second Saudi Pro League, lost final King\'s Cup, eliminated semi-finals Saudi Super Cup quarter-finals AFC Champions League. title Ronaldo won was the 2023 Arab Club Champions Cup , friendly tournament, when beat Al Hilal 2-1 final. year, tournament not held. \"Ronaldo champion want lead us victory,\" Fienga added former Real Madrid Man Utd star. \"We want win title achieve best possible goals season. happy Ronaldo part club.\"    Director Fienga (middle) ceremony honor Ronaldo former coach Luis Castro end 2023. Photo: Al Nassr Al Nassr off poor start, losing 1-4 Al Hilal Saudi Super Cup final, drew two won one first three rounds, dropping seventh Saudi Pro League. 1-1 draw Iraq\'s Al Shorta Stadium opening match AFC Champions League Elite September 16 \"last straw\" led Al Nassr board to fire coach Luis Castro . Fienga believes Al Nassr strengthened squad summer transfer window signings Mohamed Simakan (from RB Leipzig), Angelo Gabriel (Chelsea), Wesley (Corinthians), Salem Al-Najdi (Al-Fateh), Bento (Athletico Paranaense) will improve step step. \"We need work, bring stability create value, not destroy value every six months,\" stressed. September 19, Al Nassr announced the appointment Stefano Pioli - team\'s fourth coach Ronaldo joined January 2023. Pioli led 12 Italian teams, including Inter, Lazio, Fiorentina Milan, culminating 2021-2022 Serie championship Milan. press conference ahead Saudi Pro League match against Al Ettifaq, Pioli watched Al Nassr\'s games season believed potential achieve good results. Italian coach wants develop whole team build identity, rather passively waiting opponent\'s tactics. \"The upcoming matches will tell team\'s strengths, weaknesses capabilities. hope positive result,\" said.    Coach Pioli (center) instructs Al Nassr players training ground September 19. Photo: Al Nassr Pioli revealed received offers, attracted Al Nassr project. considered leading Saudi Pro League club new beginning, interesting experience 25 years working Italy, thanked team\'s management opportunity.\n ', '\"Ronaldo is the captain and the best player in the world, not only technically but also in his behaviour,\" Fienga said at a club event on September 18. \"Ronaldo does not control the club. But as the best player in the world, ');
INSERT INTO `blogs` (`blog_id`, `title`, `content`, `author_id`, `category_id`, `sport_id`, `created_at`, `updated_at`, `is_delete`, `why_delete`, `status`, `image`, `context`, `short_description`) VALUES
(70, 'Lewandowski: \'Millions of players want to follow Ronaldo\'s example\'', '{\"blocks\":[{\"key\":\"6u23g\",\"text\":\"Lewandowski: \'Millions of players want to follow Ronaldo\'s example\'\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":67,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":67,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":67,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":67,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":67,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fekhj\",\"text\":\"Polish striker Robert Lewandowski praised Cristiano Ronaldo for still maintaining his passion and desire to play at the age of 39 and being an inspiration to many players.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":171,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":171,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":171,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":171,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7dc3n\",\"text\":\"\\\"Ronaldo makes history, always raises the bar for those around him and this is something that cannot be taken lightly,\\\" Lewandowski said when joining the Polish national team. \\\"Despite winning most of the titles, at 39 and about to turn 40, Ronaldo is still very ambitious. His anger or anxiety shows his great ambition.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":321,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":321,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":321,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":321,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":321,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f2pu6\",\"text\":\"On October 12, Lewandowski will join Poland to host Ronaldo\'s Portugal at Warsaw in the third round of Group A1 Nations League. According to the Polish striker, if Ronaldo no longer shows anger or passion on the field, he would have said goodbye to top football. \\\"But it is clear that Ronaldo is still hungry and in very good physical condition,\\\" Lewandowski added. \\\"Regardless of age, Ronaldo\'s goal tally continues to increase. His journey and career will be an inspiration for many young players around the world. I am sure that millions of players dream of following Ronaldo\'s example, although it is not easy.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":615,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":347,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":358,\"length\":257,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":615,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":615,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":615,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":347,\"length\":11,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":347,\"length\":11,\"key\":0}],\"data\":{}},{\"key\":\"dpvjs\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7434b\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":1}],\"data\":{}},{\"key\":\"9lr0t\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3tnvl\",\"text\":\"Lewandowski and Ronaldo at a press conference at the 2021 Global Soccer Awards. Photo: EPA\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":90,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":90,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":90,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":90,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":87,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"a2f51\",\"text\":\"Ronaldo is one of the greatest players in history. He won Euro 2016, Nations League 2019, five Champions Leagues, five Ballon d\'Ors, holds the record of 905 career goals and 140 goals in the Champions League. He has ambitions to reach 1,000 goals before he retires.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":265,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":7,\"style\":\"color-rgb(7,109,182)\"},{\"offset\":0,\"length\":265,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":265,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":265,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":7,\"length\":258,\"style\":\"color-rgb(34,34,34)\"}],\"entityRanges\":[{\"offset\":0,\"length\":7,\"key\":2}],\"data\":{}},{\"key\":\"b95q1\",\"text\":\"This season, Ronaldo has maintained his high form with eight goals and three assists in nine matches for Al Nassr in all competitions. He has increased his record to 72 goals since moving to Saudi Arabia, winning a title, the 2023 Arab Club Champions Cup.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":255,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":255,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":255,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":255,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":255,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"n16\",\"text\":\"Lewandowski, 36, has also been in fine form since the start of the season. He has contributed 12 goals and two assists in 11 games for Barca in all competitions, including a 25-minute hat-trick in the 3-0 win over Alaves last weekend. The Polish striker leads the La Liga scoring charts with 10 goals, four ahead of Villarreal\'s Ayoze Perez.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":341,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":341,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":341,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":341,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":341,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"c72q1\",\"text\":\"But Lewandowski values ​​collective play, not considering his or Ronaldo\'s form to decide Poland\'s match against Portugal. \\\"We have to play as a team against Portugal. They have many excellent players that I have played against, so I know the challenges Poland face,\\\" the 36-year-old striker said.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":297,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":297,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":297,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":297,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":297,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3e97d\",\"text\":\"Meanwhile, coach Carlos Queiroz was not surprised when Ronaldo set a target of 1,000 goals. Queiroz coached Ronaldo when he was assistant coach to Sir Alex Ferguson at Man Utd and coached the Portuguese national team from 2008 to 2010. \\\"That is a typical characteristic of top players,\\\" Queiroz told Spanish newspaper AS . \\\"These players, in every sport, set big goals. That is what keeps them motivated. Not money, not titles, but themselves. For Ronaldo, it is goals.\\\"\\n   \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":470,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":470,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":470,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":470,\"style\":\"fontsize-13.5pt\"},{\"offset\":0,\"length\":470,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":318,\"length\":2,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/robert-lewandowski-374\",\"title\":\"<span style=\\\"font-size:13.5pt;font-family:Arial,sans-serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Lewandowski</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/robert-lewandowski-374\",\"title\":\"<span style=\\\"font-size:13.5pt;font-family:Arial,sans-serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Lewandowski</span>\",\"targetOption\":\"\"}}}},\"1\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Funnamed%20(2).jpg?alt=media&token=e6122108-1e56-4945-acd4-4825f377a642\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"bd6\"}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/cristiano-ronaldo-194\",\"title\":\"<span style=\\\"font-size:13.5pt;font-family:Arial,sans-serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Ronaldo</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/cristiano-ronaldo-194\",\"title\":\"<span style=\\\"font-size:13.5pt;font-family:Arial,sans-serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Ronaldo</span>\",\"targetOption\":\"\"}}}}}}', 18, 4, 6, '2024-11-19 10:50:45', '2024-11-22 04:35:54', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Funnamed%20(2).jpg?alt=media&token=fbee8bca-875e-485f-895f-a1263a9a2f6e', 'Lewandowski: \'Millions players want follow Ronaldo\'s example\' Polish striker Robert Lewandowski praised Cristiano Ronaldo maintaining passion desire play age 39 inspiration players. \"Ronaldo makes history, always raises bar around something cannot taken lightly,\" Lewandowski when joining Polish national team. \"Despite winning titles, 39 turn 40, Ronaldo ambitious. anger anxiety shows great ambition.\" October 12, Lewandowski will join Poland host Ronaldo\'s Portugal Warsaw third round Group A1 Nations League. According Polish striker, Ronaldo no longer shows anger passion field, goodbye top football. \"But clear Ronaldo hungry good physical condition,\" Lewandowski added. \"Regardless age, Ronaldo\'s goal tally continues increase. journey career will inspiration young players around world. sure millions players dream following Ronaldo\'s example, although not easy.\"     Lewandowski Ronaldo press conference 2021 Global Soccer Awards. Photo: EPA Ronaldo is one greatest players history. won Euro 2016, Nations League 2019, five Champions Leagues, five Ballon d\'Ors, holds record 905 career goals 140 goals Champions League. ambitions reach 1,000 goals retires. season, Ronaldo maintained high form eight goals three assists nine matches Al Nassr competitions. increased record 72 goals moving Saudi Arabia, winning title, 2023 Arab Club Champions Cup. Lewandowski, 36, fine form start season. contributed 12 goals two assists 11 games Barca competitions, including 25-minute hat-trick 3-0 win Alaves last weekend. Polish striker leads La Liga scoring charts 10 goals, four ahead Villarreal\'s Ayoze Perez. Lewandowski values ​​collective play, not considering Ronaldo\'s form decide Poland\'s match against Portugal. \"We play team against Portugal. excellent players played against, so know challenges Poland face,\" 36-year-old striker said. Meanwhile, coach Carlos Queiroz not surprised when Ronaldo set target 1,000 goals. Queiroz coached Ronaldo when assistant coach Sir Alex Ferguson Man Utd coached Portuguese national team 2008 2010. \"That typical characteristic top players,\" Queiroz told Spanish newspaper AS . \"These players, every sport, set big goals. keeps motivated. Not money, not titles, themselves. Ronaldo, goals.\"\n   ', 'Polish striker Robert Lewandowski praised Cristiano Ronaldo for still maintaining his passion and desire to play at the age of 39 and being an inspiration to many players.'),
(71, 'fuck fuck fuck giết giết giết ', '{\"blocks\":[{\"key\":\"sc50\",\"text\":\"fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}', 38, 4, 0, '2024-11-20 15:08:44', '2024-12-22 12:23:02', 1, 'Bài viết không liên quan đến thể thao.', 'rejected', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fnudabong.jpg?alt=media&token=a8908fe8-11f6-4904-8771-afbf67ba4655', 'fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết fuck fuck fuck giết giết giết ', 'fuck fuck fuck giết giết giết '),
(72, 'Rodrygo: \'Brazil needs Neymar to win the 2026 World Cup\'', '{\"blocks\":[{\"key\":\"bf64d\",\"text\":\"Rodrygo: \'Brazil needs Neymar to win the 2026 World Cup\' \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":57,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":57,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":57,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":57,\"style\":\"fontsize-24pt\"},{\"offset\":0,\"length\":57,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":0,\"length\":57,\"style\":\"BOLD\"},{\"offset\":0,\"length\":57,\"style\":\"fontsize-24\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dsvt4\",\"text\":\"BRAZIL Real Madrid striker Rodrygo believes Brazil needs Neymar to be in top form if they want to win the 2026 World Cup.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":121,\"style\":\"bgcolor-rgb(252,250,246)\"},{\"offset\":0,\"length\":121,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":121,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":6,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":121,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":6,\"length\":115,\"style\":\"fontsize-13.5pt\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7lmpe\",\"text\":\"\\\"Neymar is the star, the best player in the Brazilian team,\\\" Rodrygo told ESPN . \\\"Anyone can see that, how much Brazil needs Neymar. Neymar is in the final stages of recovery, and he is healthy, which is what the whole team wants. We want Neymar back as soon as possible.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":272,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":272,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":272,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":272,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":74,\"length\":4,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b0qqa\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cn0qt\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"d8foq\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"anr9c\",\"text\":\"Rodrygo (right) plays alongside Neymar for Brazil. Photo: Icon Sport.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":69,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":69,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":69,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":58,\"length\":11,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"95jmv\",\"text\":\"Neymar currently plays for Al Hilal, under a two-year contract signed in August 2023. However, the 32-year-old striker played just five matches and scored once, before tearing knee ligaments in a match for Brazil in October 2023. He has been out of action since.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":262,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":262,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":262,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":262,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9vtl9\",\"text\":\"According to British newspaper Sportmail , Neymar failed the medical examination to return to play for Al Hilal this summer, and will have to rest for at least two more months, until the end of 2024. Al Hilal\'s therapist said the former Barca and PSG striker\'s knee showed signs of weakness when landing.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":304,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":304,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":304,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":304,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":31,\"length\":9,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"db6j5\",\"text\":\"At his peak, Neymar scored 136 goals in 225 games for Santos, 105 goals in 186 games for Barca and 118 goals in 173 games for PSG. At international level, Neymar holds the record of 79 goals in 128 games, winning gold at the 2016 Rio Olympics and the 2013 Confederations Cup.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":13,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":19,\"length\":256,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":275,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":275,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":275,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":13,\"length\":6,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":13,\"length\":6,\"key\":1}],\"data\":{}},{\"key\":\"fi9vb\",\"text\":\"Rodrygo said he still keeps in touch with Neymar and considers the senior striker an idol. \\\"We always text each other. Neymar is back training with the team,\\\" said the Real striker. \\\"Neymar is a great teammate, and I am sad when someone speaks badly of him. Neymar always texts me, supports me. Besides being an idol, Neymar is a teammate and a great person.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":359,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":359,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":359,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":359,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b91ln\",\"text\":\"Rodrygo posts photo on Instagram reacting after being absent from the 30-man shortlist for the 2024 Ballon d\'Or\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":111,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":111,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":111,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":111,\"style\":\"fontfamily-Arial, sans-serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1b2ea\",\"text\":\"Last season, Rodrygo scored 17 goals and provided nine assists in 51 games in all competitions, playing a key role in Real\'s treble of La Liga, the Spanish Super Cup and the Champions League. But he was not on the 30-man shortlist for the 2024 Ballon d\'Or.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":256,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":256,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":256,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":256,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fjb3a\",\"text\":\"Regarding this, he said: \\\"I am very sad, and I think I deserved to be nominated. I don\'t want to put down the other players who were nominated, but I think I deserved to be in the top 30. It was a surprise. But I can\'t do anything, and I\'m not the one who decides these things.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":278,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":278,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":278,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":278,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"24hbj\",\"text\":\"After France Football magazine announced the 2024 Ballon d\'Or nominations , Rodrygo responded by posting a photo of himself holding three trophies with Real last season on his Instagram Story with a smiley face. The photo also showed him celebrating a goal against Man City in the quarter-finals, and winning a penalty against Bayern in the Champions League semi-finals. Neymar also supported his junior, posting on social media: \\\"Rodrygo is at least top 5 in the world\\\".\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":45,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":73,\"length\":398,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":471,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":471,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":471,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":45,\"length\":28,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":45,\"length\":28,\"key\":2}],\"data\":{}},{\"key\":\"8suom\",\"text\":\"\\\"I posted it as a joke,\\\" Rodrygo admitted. \\\"There\'s not much more to say now. Everyone knows my anger. Everyone at Real Madrid and the national team sent me messages of support.\\\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":178,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":178,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":178,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":178,\"style\":\"fontfamily-Times New Roman\\\", serif\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ae2lo\",\"text\":\"Rodrygo celebrates after scoring the only goal as Brazil beat Ecuador 1-0 in Curitiba in the 2026 World Cup South American qualifiers on September 6. Photo: CFP .\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":162,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":162,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":162,\"style\":\"fontsize-10.5pt\"},{\"offset\":0,\"length\":162,\"style\":\"fontfamily-Arial, sans-serif\"},{\"offset\":157,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4girp\",\"text\":\"Rodrygo scored the only goal as Brazil beat Ecuador 1-0, but failed to score in the next match, a 0-1 loss to Paraguay in the 2026 World Cup South American qualifiers. Now, with three wins, one draw and four losses, Brazil has dropped to fifth in the qualifiers.\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":32,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":51,\"length\":211,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":262,\"style\":\"bgcolor-transparent\"},{\"offset\":0,\"length\":262,\"style\":\"fontsize-12pt\"},{\"offset\":0,\"length\":262,\"style\":\"fontfamily-Times New Roman\\\", serif\"},{\"offset\":32,\"length\":19,\"style\":\"color-rgb(7,109,182)\"}],\"entityRanges\":[{\"offset\":32,\"length\":19,\"key\":3}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd6.jpg?alt=media&token=634efb71-c9bb-4596-a815-f38626f3c024\",\"height\":\"auto\",\"width\":\"auto\",\"alt\":\"bd5\"}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/neymar-335\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Neymar</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/chu-de/neymar-335\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Neymar</span>\",\"targetOption\":\"\"}}}},\"2\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/messi-ronaldo-khong-duoc-de-cu-qua-bong-vang-2024-4789133.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">2024 Ballon d\'Or nominations</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/messi-ronaldo-khong-duoc-de-cu-qua-bong-vang-2024-4789133.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">2024 Ballon d\'Or nominations</span>\",\"targetOption\":\"\"}}}},\"3\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/rodrygo-dua-brazil-tro-lai-top-4-vong-loai-nam-my-4790108.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Brazil beat Ecuador</span>\",\"targetOption\":\"\",\"_map\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"https://vnexpress.net/rodrygo-dua-brazil-tro-lai-top-4-vong-loai-nam-my-4790108.html\",\"title\":\"<span style=\\\"font-size:12pt;font-family:\'Times New Roman\',serif;color:#076db6;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;\\\">Brazil beat Ecuador</span>\",\"targetOption\":\"\"}}}}}}', 32, 4, 6, '2024-11-20 15:09:17', '2024-11-22 04:31:40', 0, NULL, 'approved', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fbd6.jpg?alt=media&token=f1871ec6-4a82-4ee7-b80a-d41c0caeba14', 'Rodrygo: \'Brazil needs Neymar win 2026 World Cup\'  BRAZIL Real Madrid striker Rodrygo believes Brazil needs Neymar top form want win 2026 World Cup. \"Neymar star, best player Brazilian team,\" Rodrygo told ESPN . \"Anyone see that, Brazil needs Neymar. Neymar final stages recovery, healthy, whole team wants. want Neymar back soon possible.\"     Rodrygo (right) plays alongside Neymar Brazil. Photo: Icon Sport. Neymar currently plays Al Hilal, two-year contract signed August 2023. However, 32-year-old striker played just five matches scored once, tearing knee ligaments match Brazil October 2023. action since. According British newspaper Sportmail , Neymar failed medical examination return play Al Hilal summer, will rest least two months, until end 2024. Al Hilal\'s therapist former Barca PSG striker\'s knee showed signs weakness when landing. peak, Neymar scored 136 goals 225 games Santos, 105 goals 186 games Barca 118 goals 173 games PSG. international level, Neymar holds record 79 goals 128 games, winning gold 2016 Rio Olympics 2013 Confederations Cup. Rodrygo keeps touch Neymar considers senior striker idol. \"We always text other. Neymar back training team,\" Real striker. \"Neymar great teammate, sad when someone speaks badly him. Neymar always texts me, supports me. Besides idol, Neymar teammate great person.\" Rodrygo posts photo Instagram reacting absent 30-man shortlist 2024 Ballon d\'Or Last season, Rodrygo scored 17 goals provided nine assists 51 games competitions, playing key role Real\'s treble La Liga, Spanish Super Cup Champions League. not 30-man shortlist 2024 Ballon d\'Or. Regarding this, said: \"I sad, think deserved nominated. don\'t want put down players nominated, think deserved top 30. surprise. can\'t anything, I\'m not one decides things.\" France Football magazine announced the 2024 Ballon d\'Or nominations , Rodrygo responded posting photo holding three trophies Real last season Instagram Story smiley face. photo showed celebrating goal against Man City quarter-finals, winning penalty against Bayern Champions League semi-finals. Neymar supported junior, posting social media: \"Rodrygo least top 5 world\". \"I posted joke,\" Rodrygo admitted. \"There\'s not say now. Everyone knows anger. Everyone Real Madrid national team sent messages support.\" Rodrygo celebrates scoring goal Brazil beat Ecuador 1-0 Curitiba 2026 World Cup South American qualifiers September 6. Photo: CFP . Rodrygo scored goal as Brazil beat Ecuador 1-0, failed score next match, 0-1 loss Paraguay 2026 World Cup South American qualifiers. Now, three wins, one draw four losses, Brazil dropped fifth qualifiers.\n ', 'BRAZIL Real Madrid striker Rodrygo believes Brazil needs Neymar to be in top form if they want to win the 2026 World Cup.'),
(85, 'Vietnamese teen girl, fluent in 4 languages, earns coveted spot at Harvard', '{\"blocks\":[{\"key\":\"dvu71\",\"text\":\"Fluent in English, Spanish, French, and Chinese, a Hanoi student has secured a place at Harvard University thanks to top academic scores, international awards, and outstanding leadership achievements.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":200,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":200,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":200,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":200,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"start\"}},{\"key\":\"9ger9\",\"text\":\"Phan Linh Lan, a 17-year-old student at Concordia International School in Hanoi, recently received her acceptance letter to Harvard, one of the eight Ivy League institutions and a university consistently ranked among the world\'s best.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":234,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":234,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":234,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":234,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"52ho8\",\"text\":\"The school is currently ranked third globally by Times Higher Education and has one of the lowest acceptance rates in the U.S., at just 3%.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":48,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":49,\"length\":22,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":72,\"length\":67,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":48,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":49,\"length\":22,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":72,\"length\":67,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":48,\"style\":\"fontsize-18\"},{\"offset\":49,\"length\":22,\"style\":\"fontsize-18\"},{\"offset\":72,\"length\":67,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":48,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"},{\"offset\":49,\"length\":22,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"},{\"offset\":72,\"length\":67,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"},{\"offset\":49,\"length\":22,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"5kpu1\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"51glq\",\"text\":\"Phan Linh Lan, a senior student at Concordia International School Hanoi. Photo courtesy of Phan Linh Lan\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":104,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":104,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":104,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":104,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"},{\"offset\":0,\"length\":104,\"style\":\"color-rgb(34,34,34)\"},{\"offset\":0,\"length\":104,\"style\":\"bgcolor-rgb(247,247,247)\"},{\"offset\":0,\"length\":104,\"style\":\"fontsize-15\"},{\"offset\":0,\"length\":104,\"style\":\"fontfamily-Montserrat, sans-serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"4tmve\",\"text\":\"For Lan, the news is the culmination of a dream that began in sixth grade, when she set her sights on studying in the U.S. To align with her ambitions, she transferred from a school focused on preparing students for the U.K. to Concordia International School. Among her top university choices, Harvard stood out for its prestige and status as the oldest university in the U.S.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":376,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":376,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":376,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":376,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"2c368\",\"text\":\"A well-prepared journey\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":23,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":23,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":23,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":23,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"},{\"offset\":0,\"length\":23,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"7ts5e\",\"text\":\"Lan began preparing early to craft a competitive application. During her first three years of secondary school, she focused on the ACT (American College Testing), achieving an impressive score of 35 out of 36, which she considered the minimum requirement for Harvard.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":267,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":267,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":267,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":267,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"eg9hv\",\"text\":\"At school, Lan pursued the Advanced Placement (AP) curriculum, completing 12 courses while maintaining near-perfect grades.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":123,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":123,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":123,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":123,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"g38j\",\"text\":\"Her academic advisor, Ben Compton, described her as an \\\"A-grade student\\\" with a clear passion for history and politics.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":119,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":119,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":119,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":119,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"bql4g\",\"text\":\"Lan\'s main application essay highlighted her desire to study Vietnam\'s history and its place in the global landscape, with the goal of preserving her country\'s cultural heritage. This interest extended to her extracurricular activities, including playing traditional Vietnamese instruments like the zither, alongside piano and violin.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":334,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":334,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":334,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":334,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"4l1uf\",\"text\":\"\\\"Lan is an exceptional historian and a deeply patriotic Vietnamese,\\\" said Compton, pointing to her involvement in social science research, political studies, and the school’s National History Day competition.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":208,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":208,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":208,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":208,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"9o7f8\",\"text\":\"Lan’s passion for languages has been another standout aspect of her journey. Using English as her primary language at school, she learned Spanish as part of the curriculum while teaching herself French and Chinese. She is now proficient in all four languages.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":259,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":259,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":259,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":259,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}},{\"key\":\"77bhr\",\"text\":\"Her interest in languages began at the age of 12, inspired by her family\'s restaurant business. Frequently accompanying her parents to meetings with international partners, Lan often served as an interpreter and occasionally helped negotiate deals during business trips. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":270,\"style\":\"color-rgb(0,0,0)\"},{\"offset\":0,\"length\":270,\"style\":\"bgcolor-rgb(255,255,255)\"},{\"offset\":0,\"length\":270,\"style\":\"fontsize-18\"},{\"offset\":0,\"length\":270,\"style\":\"fontfamily-Georgia, \\\"Times New Roman\\\", Times, serif\"}],\"entityRanges\":[],\"data\":{\"margin-left\":\"0px\"}}],\"entityMap\":{\"0\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://i1-english.vnecdn.net/2024/12/19/470136967-3568628023282146-921-5486-8466-1734594304.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=6dUcWyFlofw1cerzRaOfGw\",\"alt\":\"Phan Linh Lan, student at Concordia International School Hanoi. Photo courtesy of Lan\",\"height\":\"\",\"width\":\"\",\"_map\":{\"type\":\"IMAGE\",\"mutability\":\"MUTABLE\",\"data\":{\"src\":\"https://i1-english.vnecdn.net/2024/12/19/470136967-3568628023282146-921-5486-8466-1734594304.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=6dUcWyFlofw1cerzRaOfGw\",\"alt\":\"Phan Linh Lan, student at Concordia International School Hanoi. Photo courtesy of Lan\",\"height\":\"\",\"width\":\"\"}}}}}}', 18, 4, 0, '2024-12-21 08:20:35', '2024-12-22 12:23:07', 1, 'Bài viết không liên quan đến thể thao.', 'rejected', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fblogs%2Fchrisjeff.jpg?alt=media&token=e886395d-27e6-46d4-842c-a0630bed1e8c', 'Fluent English, Spanish, French, Chinese, Hanoi student secured place Harvard University thanks top academic scores, international awards, outstanding leadership achievements. Phan Linh Lan, 17-year-old student Concordia International School Hanoi, recently received acceptance letter Harvard, one eight Ivy League institutions university consistently ranked among world\'s best. school currently ranked third globally Times Higher Education one lowest acceptance rates U.S., just 3%.   Phan Linh Lan, senior student Concordia International School Hanoi. Photo courtesy Phan Linh Lan Lan, news culmination dream began sixth grade, when she set sights studying U.S. align ambitions, she transferred school focused preparing students U.K. Concordia International School. Among top university choices, Harvard stood its prestige status oldest university U.S. well-prepared journey Lan began preparing early craft competitive application. During first three years secondary school, she focused ACT (American College Testing), achieving impressive score 35 36, she considered minimum requirement Harvard. school, Lan pursued Advanced Placement (AP) curriculum, completing 12 courses maintaining near-perfect grades. academic advisor, Ben Compton, described \"A-grade student\" clear passion history politics. Lan\'s main application essay highlighted desire study Vietnam\'s history its place global landscape, goal preserving country\'s cultural heritage. interest extended extracurricular activities, including playing traditional Vietnamese instruments zither, alongside piano violin. \"Lan exceptional historian deeply patriotic Vietnamese,\" Compton, pointing involvement social science research, political studies, school’s National History Day competition. Lan’s passion languages standout aspect journey. Using English primary language school, she learned Spanish part curriculum teaching herself French Chinese. She proficient four languages. interest languages began age 12, inspired family\'s restaurant business. Frequently accompanying parents meetings international partners, Lan often served interpreter occasionally helped negotiate deals during business trips. ', 'Vietnamese teen girl, fluent in 4 languages, earns coveted spot at Harvard');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blogs_share`
--

CREATE TABLE `blogs_share` (
  `share_id` int NOT NULL,
  `blog_id` int NOT NULL,
  `user_id` int NOT NULL,
  `shared_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blogs_share`
--

INSERT INTO `blogs_share` (`share_id`, `blog_id`, `user_id`, `shared_at`, `content`) VALUES
(1, 53, 18, '2024-10-14 06:45:44', NULL),
(2, 53, 18, '2024-10-14 08:25:57', NULL),
(3, 53, 18, '2024-10-14 08:27:23', NULL),
(4, 53, 18, '2024-10-14 08:32:17', NULL),
(5, 53, 18, '2024-10-14 08:32:38', NULL),
(6, 53, 18, '2024-10-17 05:00:02', NULL),
(7, 53, 18, '2024-10-17 05:00:30', NULL),
(8, 53, 18, '2024-10-17 05:00:40', NULL),
(9, 53, 18, '2024-10-17 05:21:15', NULL),
(10, 53, 18, '2024-10-17 05:22:46', NULL),
(11, 53, 18, '2024-10-21 03:35:14', NULL),
(12, 51, 18, '2024-12-23 08:04:42', NULL),
(13, 66, 18, '2024-12-23 08:43:14', NULL),
(14, 66, 18, '2024-12-23 08:43:21', NULL),
(15, 66, 18, '2024-12-23 08:46:42', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blogs_views`
--

CREATE TABLE `blogs_views` (
  `view_id` int NOT NULL,
  `blog_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blogs_views`
--

INSERT INTO `blogs_views` (`view_id`, `blog_id`, `user_id`, `viewed_at`) VALUES
(1, 54, 18, '2024-09-19 14:47:57'),
(2, 53, 18, '2024-09-19 14:49:25'),
(3, 51, 18, '2024-09-19 14:51:25'),
(4, 38, 18, '2024-08-21 14:53:25'),
(5, 54, 18, '2024-09-21 02:19:03'),
(6, 54, 18, '2024-09-21 02:24:05'),
(7, 35, 18, '2024-09-23 04:02:27'),
(8, 54, 18, '2024-09-24 04:39:34'),
(9, 54, 18, '2024-09-24 04:39:45'),
(10, 54, 41, '2024-09-24 07:15:34'),
(11, 54, 41, '2024-09-24 07:17:25'),
(12, 54, 41, '2024-09-24 07:19:24'),
(13, 54, 41, '2024-09-24 07:19:38'),
(14, 54, 41, '2024-09-24 07:19:44'),
(15, 54, 18, '2024-09-24 07:43:38'),
(16, 54, 18, '2024-09-24 07:43:52'),
(17, 54, 18, '2024-09-24 07:46:25'),
(18, 54, 18, '2024-09-24 07:46:32'),
(19, 54, 18, '2024-09-24 07:46:34'),
(20, 54, 18, '2024-09-24 07:46:38'),
(21, 54, 18, '2024-09-25 08:42:53'),
(22, 54, 18, '2024-09-25 08:43:21'),
(23, 54, 18, '2024-09-25 08:47:22'),
(24, 53, 18, '2024-09-25 08:47:26'),
(25, 54, 18, '2024-09-25 08:48:26'),
(26, 35, 18, '2024-09-25 08:54:04'),
(27, 35, 18, '2024-09-25 08:54:08'),
(28, 35, 18, '2024-09-25 08:55:43'),
(29, 35, 18, '2024-09-25 09:06:26'),
(30, 38, 18, '2024-09-25 15:57:21'),
(31, 54, 18, '2024-09-26 06:21:45'),
(32, 38, 18, '2024-09-26 16:10:44'),
(33, 38, 18, '2024-09-26 16:10:53'),
(34, 53, 18, '2024-09-26 16:10:56'),
(35, 38, 18, '2024-09-26 16:10:58'),
(36, 35, 18, '2024-09-26 16:11:00'),
(37, 38, 18, '2024-09-26 16:11:04'),
(38, 53, 18, '2024-09-26 16:11:06'),
(39, 38, 18, '2024-09-26 16:11:07'),
(40, 54, 41, '2024-09-27 04:44:24'),
(41, 54, 18, '2024-09-27 16:13:10'),
(42, 54, 18, '2024-09-27 16:24:41'),
(43, 54, 18, '2024-09-27 18:35:50'),
(44, 54, 18, '2024-09-27 18:37:09'),
(45, 54, 18, '2024-09-27 18:37:52'),
(46, 54, 18, '2024-09-27 18:38:22'),
(47, 54, 18, '2024-09-27 18:38:29'),
(48, 54, 18, '2024-09-27 18:38:52'),
(49, 54, 18, '2024-09-27 18:39:04'),
(50, 54, 18, '2024-09-27 18:39:29'),
(51, 54, 18, '2024-09-27 18:39:33'),
(52, 54, 18, '2024-09-27 18:39:37'),
(53, 54, 18, '2024-09-27 18:39:50'),
(54, 54, 18, '2024-09-27 18:39:52'),
(55, 54, 18, '2024-09-27 18:40:00'),
(56, 54, 18, '2024-09-27 18:41:55'),
(57, 54, 18, '2024-09-27 18:42:03'),
(58, 54, 18, '2024-09-27 18:42:39'),
(59, 54, 18, '2024-09-27 18:42:42'),
(60, 54, 18, '2024-09-27 18:42:44'),
(61, 54, 18, '2024-09-27 18:42:44'),
(62, 54, 18, '2024-09-27 18:43:30'),
(63, 54, 18, '2024-09-27 18:43:38'),
(64, 54, 18, '2024-09-27 18:43:46'),
(65, 54, 18, '2024-09-27 18:44:14'),
(66, 38, 18, '2024-09-30 03:53:12'),
(67, 38, 18, '2024-09-30 04:03:57'),
(68, 44, 18, '2024-09-30 05:34:48'),
(69, 53, 18, '2024-09-30 05:57:53'),
(70, 37, 18, '2024-09-30 06:03:03'),
(71, 53, 18, '2024-09-30 06:15:48'),
(72, 35, 18, '2024-09-30 07:14:46'),
(73, 35, 18, '2024-09-30 07:15:17'),
(74, 54, 18, '2024-09-30 07:25:58'),
(75, 36, 18, '2024-09-30 07:32:42'),
(76, 36, 18, '2024-09-30 07:33:32'),
(77, 54, 18, '2024-10-03 05:05:32'),
(78, 54, 18, '2024-10-03 05:06:01'),
(79, 53, 18, '2024-10-03 05:30:16'),
(80, 54, 18, '2024-10-03 06:33:09'),
(81, 54, 18, '2024-10-03 06:39:35'),
(82, 54, 18, '2024-10-03 06:41:48'),
(83, 54, 18, '2024-10-03 06:42:08'),
(84, 54, 18, '2024-10-03 07:04:51'),
(85, 54, 18, '2024-10-03 07:20:15'),
(86, 44, 18, '2024-10-03 08:04:46'),
(87, 38, 18, '2024-10-04 04:51:41'),
(88, 36, 18, '2024-10-04 04:57:22'),
(89, 53, 18, '2024-10-04 13:55:31'),
(90, 53, 18, '2024-10-05 06:03:22'),
(91, 53, 18, '2024-10-05 06:03:44'),
(92, 54, 18, '2024-10-05 06:06:46'),
(93, 54, 18, '2024-10-05 06:07:25'),
(94, 53, 18, '2024-10-05 06:12:16'),
(95, 54, 18, '2024-10-08 02:26:06'),
(96, 54, 18, '2024-10-08 02:34:27'),
(97, 53, 18, '2024-10-08 03:12:56'),
(98, 53, 18, '2024-10-08 03:13:21'),
(99, 53, 18, '2024-10-08 03:13:50'),
(100, 53, 18, '2024-10-08 03:14:06'),
(101, 53, 18, '2024-10-08 03:14:28'),
(102, 53, 18, '2024-10-08 03:20:00'),
(103, 53, 18, '2024-10-08 03:20:12'),
(104, 53, 18, '2024-10-08 03:20:23'),
(105, 53, 18, '2024-10-08 03:24:03'),
(106, 53, 18, '2024-10-08 03:24:08'),
(107, 53, 18, '2024-10-08 03:25:40'),
(108, 53, 18, '2024-10-08 03:26:16'),
(109, 53, 18, '2024-10-08 03:26:43'),
(110, 53, 18, '2024-10-08 03:27:02'),
(111, 53, 18, '2024-10-08 03:27:56'),
(112, 53, 18, '2024-10-08 03:29:25'),
(113, 53, 18, '2024-10-08 03:29:45'),
(114, 53, 18, '2024-10-08 03:30:29'),
(115, 53, 18, '2024-10-08 03:30:38'),
(116, 53, 18, '2024-10-08 03:36:29'),
(117, 53, 18, '2024-10-08 03:36:29'),
(118, 53, 18, '2024-10-08 03:37:45'),
(119, 53, 18, '2024-10-08 03:38:31'),
(120, 53, 18, '2024-10-08 03:41:01'),
(121, 54, 18, '2024-10-08 03:41:20'),
(122, 54, 18, '2024-10-08 03:41:44'),
(123, 54, 18, '2024-10-08 03:42:47'),
(124, 54, 18, '2024-10-08 03:44:49'),
(125, 54, 18, '2024-10-08 03:45:18'),
(126, 54, 18, '2024-10-08 03:45:28'),
(127, 54, 18, '2024-10-08 03:53:05'),
(128, 54, 18, '2024-10-08 03:53:24'),
(129, 54, 18, '2024-10-08 03:53:28'),
(130, 54, 18, '2024-10-08 03:54:50'),
(131, 54, 18, '2024-10-08 03:56:03'),
(132, 54, 18, '2024-10-08 03:56:12'),
(133, 54, 18, '2024-10-08 04:27:30'),
(134, 54, 18, '2024-10-08 04:51:17'),
(135, 54, 18, '2024-10-08 04:51:20'),
(136, 54, 18, '2024-10-08 04:51:21'),
(137, 54, 18, '2024-10-08 04:51:21'),
(138, 54, 18, '2024-10-08 04:51:22'),
(139, 54, 18, '2024-10-08 04:55:41'),
(140, 54, 18, '2024-10-08 04:55:45'),
(141, 54, 18, '2024-10-08 04:55:52'),
(142, 54, 18, '2024-10-08 04:56:02'),
(143, 54, 18, '2024-10-08 04:56:24'),
(144, 54, 18, '2024-10-08 04:56:31'),
(145, 53, 18, '2024-10-08 04:56:35'),
(146, 54, 18, '2024-10-08 04:56:41'),
(147, 53, 18, '2024-10-08 04:56:48'),
(148, 54, 18, '2024-10-08 04:56:51'),
(149, 54, 18, '2024-10-08 04:58:05'),
(150, 54, 18, '2024-10-08 04:59:31'),
(151, 54, 18, '2024-10-08 04:59:55'),
(152, 54, 18, '2024-10-08 05:00:33'),
(153, 54, 18, '2024-10-08 05:03:02'),
(154, 54, 18, '2024-10-08 05:04:12'),
(155, 54, 18, '2024-10-08 05:04:36'),
(156, 54, 18, '2024-10-08 05:05:37'),
(157, 54, 18, '2024-10-08 05:06:42'),
(158, 54, 18, '2024-10-08 05:08:37'),
(159, 54, 18, '2024-10-08 05:08:52'),
(160, 54, 18, '2024-10-08 05:09:07'),
(161, 54, 18, '2024-10-08 05:09:40'),
(162, 54, 18, '2024-10-08 05:09:44'),
(163, 54, 18, '2024-10-08 05:09:54'),
(164, 54, 18, '2024-10-08 05:09:59'),
(165, 54, 18, '2024-10-08 05:10:01'),
(166, 54, 18, '2024-10-08 05:10:01'),
(167, 54, 18, '2024-10-08 05:12:53'),
(168, 54, 18, '2024-10-08 05:15:42'),
(169, 54, 18, '2024-10-08 05:17:28'),
(170, 54, 18, '2024-10-08 05:17:29'),
(171, 54, 18, '2024-10-08 05:17:50'),
(172, 54, 18, '2024-10-08 05:17:52'),
(173, 54, 18, '2024-10-08 05:17:54'),
(174, 54, 18, '2024-10-08 05:17:54'),
(175, 54, 18, '2024-10-08 05:17:55'),
(176, 54, 18, '2024-10-08 05:17:55'),
(177, 54, 18, '2024-10-08 05:17:57'),
(178, 54, 18, '2024-10-08 05:17:57'),
(179, 54, 18, '2024-10-08 05:17:59'),
(180, 54, 18, '2024-10-08 05:17:59'),
(181, 54, 18, '2024-10-08 05:17:59'),
(182, 54, 18, '2024-10-08 05:18:00'),
(183, 54, 18, '2024-10-08 05:18:34'),
(184, 54, 18, '2024-10-08 05:20:04'),
(185, 54, 18, '2024-10-08 05:23:50'),
(186, 54, 18, '2024-10-08 05:23:50'),
(187, 54, 18, '2024-10-08 05:23:50'),
(188, 54, 18, '2024-10-08 05:23:50'),
(189, 54, 18, '2024-10-08 05:23:50'),
(190, 54, 18, '2024-10-08 05:23:51'),
(191, 54, 18, '2024-10-08 05:23:51'),
(192, 54, 18, '2024-10-08 05:23:53'),
(193, 54, 18, '2024-10-08 05:23:54'),
(194, 54, 18, '2024-10-08 05:23:55'),
(195, 54, 18, '2024-10-08 05:23:56'),
(196, 54, 18, '2024-10-08 05:24:13'),
(197, 54, 18, '2024-10-08 05:24:14'),
(198, 54, 18, '2024-10-08 05:24:20'),
(199, 54, 18, '2024-10-08 05:24:21'),
(200, 54, 18, '2024-10-08 05:24:21'),
(201, 54, 18, '2024-10-08 05:24:22'),
(202, 54, 18, '2024-10-08 05:25:01'),
(203, 54, 18, '2024-10-08 05:25:03'),
(204, 54, 18, '2024-10-08 05:25:04'),
(205, 54, 18, '2024-10-08 05:25:05'),
(206, 54, 18, '2024-10-08 05:26:03'),
(207, 54, 18, '2024-10-08 05:26:15'),
(208, 54, 18, '2024-10-08 05:26:50'),
(209, 54, 18, '2024-10-08 05:26:52'),
(210, 54, 18, '2024-10-08 05:27:06'),
(211, 54, 18, '2024-10-08 05:27:16'),
(212, 54, 18, '2024-10-08 05:27:18'),
(213, 54, 18, '2024-10-08 05:27:18'),
(214, 54, 18, '2024-10-08 05:27:26'),
(215, 54, 18, '2024-10-08 05:27:31'),
(216, 54, 18, '2024-10-08 05:27:33'),
(217, 54, 18, '2024-10-08 05:27:44'),
(218, 54, 18, '2024-10-08 05:28:13'),
(219, 54, 18, '2024-10-08 05:28:16'),
(220, 54, 18, '2024-10-08 05:28:18'),
(221, 54, 18, '2024-10-08 05:28:46'),
(222, 54, 18, '2024-10-08 05:29:05'),
(223, 54, 18, '2024-10-08 05:29:07'),
(224, 54, 18, '2024-10-08 05:29:20'),
(225, 54, 18, '2024-10-08 05:31:39'),
(226, 54, 18, '2024-10-08 05:34:51'),
(227, 54, 18, '2024-10-08 05:34:52'),
(228, 54, 18, '2024-10-08 05:35:04'),
(229, 54, 18, '2024-10-08 05:35:19'),
(230, 54, 18, '2024-10-08 05:35:30'),
(231, 54, 18, '2024-10-08 05:35:30'),
(232, 54, 18, '2024-10-08 05:35:53'),
(233, 54, 18, '2024-10-08 05:35:56'),
(234, 54, 18, '2024-10-08 05:36:12'),
(235, 54, 18, '2024-10-08 05:36:15'),
(236, 54, 18, '2024-10-08 05:36:47'),
(237, 53, 18, '2024-10-08 05:37:01'),
(238, 54, 18, '2024-10-08 05:37:12'),
(239, 54, 18, '2024-10-08 05:37:30'),
(240, 54, 18, '2024-10-08 05:37:50'),
(241, 54, 18, '2024-10-08 05:37:52'),
(242, 54, 18, '2024-10-08 05:38:13'),
(243, 54, 18, '2024-10-08 05:38:15'),
(244, 54, 18, '2024-10-08 05:38:24'),
(245, 54, 18, '2024-10-08 05:57:44'),
(246, 54, 18, '2024-10-08 05:59:49'),
(247, 54, 18, '2024-10-08 06:00:54'),
(248, 54, 18, '2024-10-08 06:01:40'),
(249, 54, 18, '2024-10-08 06:10:26'),
(250, 54, 18, '2024-10-08 06:10:29'),
(251, 54, 18, '2024-10-08 06:10:31'),
(252, 54, 18, '2024-10-08 06:10:31'),
(253, 54, 18, '2024-10-08 06:10:31'),
(254, 54, 18, '2024-10-08 06:10:32'),
(255, 54, 18, '2024-10-08 06:10:32'),
(256, 54, 18, '2024-10-08 06:10:32'),
(257, 54, 18, '2024-10-08 06:10:32'),
(258, 54, 18, '2024-10-08 06:10:32'),
(259, 54, 18, '2024-10-08 06:10:32'),
(260, 54, 18, '2024-10-08 06:10:38'),
(261, 54, 18, '2024-10-08 06:13:52'),
(262, 35, 18, '2024-10-08 06:19:47'),
(263, 54, 18, '2024-10-08 06:19:56'),
(264, 54, 18, '2024-10-08 06:20:02'),
(265, 54, 18, '2024-10-08 06:20:04'),
(266, 54, 18, '2024-10-08 06:20:04'),
(267, 54, 18, '2024-10-08 06:20:04'),
(268, 54, 18, '2024-10-08 06:20:05'),
(269, 54, 18, '2024-10-08 06:21:44'),
(270, 54, 18, '2024-10-08 06:21:53'),
(271, 54, 18, '2024-10-08 06:22:01'),
(272, 54, 18, '2024-10-08 06:22:37'),
(273, 54, 18, '2024-10-08 06:22:37'),
(274, 54, 18, '2024-10-08 06:22:39'),
(275, 54, 18, '2024-10-08 06:23:31'),
(276, 54, 18, '2024-10-08 06:23:33'),
(277, 54, 18, '2024-10-08 06:25:27'),
(278, 54, 18, '2024-10-08 06:25:29'),
(279, 54, 18, '2024-10-08 06:25:34'),
(280, 54, 18, '2024-10-08 06:25:34'),
(281, 54, 18, '2024-10-08 06:25:55'),
(282, 54, 18, '2024-10-08 06:25:58'),
(283, 54, 18, '2024-10-08 06:28:41'),
(284, 54, 18, '2024-10-08 06:28:45'),
(285, 54, 18, '2024-10-11 02:22:32'),
(286, 54, 18, '2024-10-11 02:22:35'),
(287, 54, 18, '2024-10-11 02:22:37'),
(288, 54, 18, '2024-10-11 02:22:38'),
(289, 54, 18, '2024-10-11 02:22:38'),
(290, 54, 18, '2024-10-11 02:22:38'),
(291, 54, 18, '2024-10-11 02:22:39'),
(292, 54, 18, '2024-10-11 02:22:39'),
(293, 54, 18, '2024-10-11 02:22:40'),
(294, 54, 18, '2024-10-11 02:22:40'),
(295, 54, 18, '2024-10-11 02:22:40'),
(296, 54, 18, '2024-10-11 02:22:40'),
(297, 54, 18, '2024-10-11 02:22:40'),
(298, 54, 18, '2024-10-11 02:22:40'),
(299, 54, 18, '2024-10-11 02:22:40'),
(300, 54, 18, '2024-10-11 02:22:41'),
(301, 54, 18, '2024-10-11 02:22:41'),
(302, 54, 18, '2024-10-11 02:22:41'),
(303, 54, 18, '2024-10-11 02:24:35'),
(304, 54, 18, '2024-10-11 02:24:36'),
(305, 54, 18, '2024-10-11 02:24:36'),
(306, 54, 18, '2024-10-11 02:26:09'),
(307, 54, 18, '2024-10-11 02:26:11'),
(308, 54, 18, '2024-10-11 02:26:29'),
(309, 54, 18, '2024-10-11 02:26:34'),
(310, 54, 18, '2024-10-11 02:32:58'),
(311, 54, 18, '2024-10-11 02:33:01'),
(312, 54, 18, '2024-10-11 02:33:02'),
(313, 54, 18, '2024-10-11 02:33:06'),
(314, 54, 18, '2024-10-11 02:33:06'),
(315, 54, 18, '2024-10-11 02:33:06'),
(316, 54, 18, '2024-10-11 02:33:06'),
(317, 54, 18, '2024-10-11 02:33:06'),
(318, 54, 18, '2024-10-11 02:33:06'),
(319, 54, 18, '2024-10-11 02:33:07'),
(320, 54, 18, '2024-10-11 02:33:07'),
(321, 54, 18, '2024-10-11 02:33:07'),
(322, 54, 18, '2024-10-11 02:33:12'),
(323, 54, 18, '2024-10-11 02:33:18'),
(324, 54, 18, '2024-10-11 02:33:50'),
(325, 54, 18, '2024-10-11 02:34:25'),
(326, 54, 18, '2024-10-11 02:36:07'),
(327, 54, 18, '2024-10-11 02:43:37'),
(328, 54, 18, '2024-10-11 02:43:39'),
(329, 54, 18, '2024-10-11 02:43:39'),
(330, 54, 18, '2024-10-11 02:43:40'),
(331, 54, 18, '2024-10-11 02:43:52'),
(332, 54, 18, '2024-10-11 02:43:53'),
(333, 54, 18, '2024-10-11 02:43:53'),
(334, 54, 18, '2024-10-11 02:43:54'),
(335, 54, 18, '2024-10-11 02:43:54'),
(336, 54, 18, '2024-10-11 02:43:54'),
(337, 54, 18, '2024-10-11 02:43:54'),
(338, 54, 18, '2024-10-11 02:43:54'),
(339, 54, 18, '2024-10-11 02:45:56'),
(340, 54, 18, '2024-10-11 02:45:57'),
(341, 54, 18, '2024-10-11 02:45:58'),
(342, 54, 18, '2024-10-11 02:46:01'),
(343, 54, 18, '2024-10-11 02:46:01'),
(344, 54, 18, '2024-10-11 02:46:02'),
(345, 54, 18, '2024-10-11 02:46:02'),
(346, 54, 18, '2024-10-11 02:46:02'),
(347, 54, 18, '2024-10-11 02:46:19'),
(348, 54, 18, '2024-10-11 02:46:47'),
(349, 54, 18, '2024-10-11 02:47:20'),
(350, 54, 18, '2024-10-11 02:52:36'),
(351, 54, 18, '2024-10-11 02:52:39'),
(352, 54, 18, '2024-10-11 02:52:40'),
(353, 54, 18, '2024-10-11 02:52:42'),
(354, 54, 18, '2024-10-11 02:52:43'),
(355, 54, 18, '2024-10-11 02:52:45'),
(356, 54, 18, '2024-10-11 02:52:46'),
(357, 54, 18, '2024-10-11 02:53:00'),
(358, 54, 18, '2024-10-11 02:53:14'),
(359, 54, 18, '2024-10-11 02:53:48'),
(360, 54, 18, '2024-10-11 02:55:38'),
(361, 54, 18, '2024-10-11 02:56:20'),
(362, 54, 18, '2024-10-11 02:56:33'),
(363, 54, 18, '2024-10-11 02:56:42'),
(364, 54, 18, '2024-10-11 02:58:07'),
(365, 54, 18, '2024-10-11 03:01:16'),
(366, 54, 18, '2024-10-11 03:01:29'),
(367, 54, 18, '2024-10-11 03:01:36'),
(368, 54, 18, '2024-10-11 03:01:46'),
(369, 54, 18, '2024-10-11 03:01:55'),
(370, 54, 18, '2024-10-11 03:03:14'),
(371, 54, 18, '2024-10-11 03:04:20'),
(372, 54, 18, '2024-10-11 03:06:03'),
(373, 54, 18, '2024-10-11 03:07:17'),
(374, 54, 18, '2024-10-11 03:08:20'),
(375, 54, 18, '2024-10-11 03:08:33'),
(376, 54, 18, '2024-10-11 03:08:54'),
(377, 54, 18, '2024-10-11 03:08:57'),
(378, 54, 18, '2024-10-11 03:08:59'),
(379, 54, 18, '2024-10-11 03:09:16'),
(380, 54, 18, '2024-10-11 03:09:46'),
(381, 54, 18, '2024-10-11 03:10:31'),
(382, 54, 18, '2024-10-11 03:10:40'),
(383, 54, 18, '2024-10-11 03:10:42'),
(384, 54, 18, '2024-10-11 03:11:55'),
(385, 54, 18, '2024-10-11 03:11:56'),
(386, 54, 18, '2024-10-11 03:11:58'),
(387, 54, 18, '2024-10-11 03:12:00'),
(388, 54, 18, '2024-10-11 03:12:01'),
(389, 54, 18, '2024-10-11 03:12:03'),
(390, 54, 18, '2024-10-11 03:12:05'),
(391, 54, 18, '2024-10-11 03:13:13'),
(392, 54, 18, '2024-10-11 03:13:33'),
(393, 54, 18, '2024-10-11 03:14:00'),
(394, 54, 18, '2024-10-11 03:14:04'),
(395, 54, 18, '2024-10-11 03:14:11'),
(396, 54, 18, '2024-10-11 03:14:14'),
(397, 54, 18, '2024-10-11 03:14:18'),
(398, 54, 18, '2024-10-11 03:14:21'),
(399, 54, 18, '2024-10-11 03:15:15'),
(400, 54, 18, '2024-10-11 03:15:38'),
(401, 54, 18, '2024-10-11 03:16:37'),
(402, 54, 18, '2024-10-11 03:16:41'),
(403, 54, 18, '2024-10-11 03:16:57'),
(404, 54, 18, '2024-10-11 03:17:48'),
(405, 54, 18, '2024-10-11 03:17:59'),
(406, 54, 18, '2024-10-11 03:19:14'),
(407, 54, 18, '2024-10-11 03:19:24'),
(408, 54, 18, '2024-10-11 03:20:35'),
(409, 54, 18, '2024-10-11 03:20:41'),
(410, 54, 18, '2024-10-11 03:20:50'),
(411, 54, 18, '2024-10-11 03:21:04'),
(412, 54, 18, '2024-10-11 03:21:50'),
(413, 54, 18, '2024-10-11 03:24:00'),
(414, 54, 18, '2024-10-11 03:25:18'),
(415, 54, 18, '2024-10-11 03:25:55'),
(416, 54, 18, '2024-10-11 03:26:04'),
(417, 54, 18, '2024-10-11 03:27:53'),
(418, 54, 18, '2024-10-11 03:29:07'),
(419, 54, 18, '2024-10-11 03:29:13'),
(420, 54, 18, '2024-10-11 03:29:15'),
(421, 54, 18, '2024-10-11 03:29:38'),
(422, 54, 18, '2024-10-11 03:29:39'),
(423, 54, 18, '2024-10-11 03:29:43'),
(424, 54, 18, '2024-10-11 03:29:44'),
(425, 54, 18, '2024-10-11 03:29:48'),
(426, 54, 18, '2024-10-11 03:31:00'),
(427, 54, 18, '2024-10-11 03:31:01'),
(428, 54, 18, '2024-10-11 03:31:13'),
(429, 54, 18, '2024-10-11 03:31:14'),
(430, 54, 18, '2024-10-11 03:31:15'),
(431, 54, 18, '2024-10-11 03:31:16'),
(432, 54, 18, '2024-10-11 03:31:18'),
(433, 54, 18, '2024-10-11 03:31:28'),
(434, 54, 18, '2024-10-11 03:31:31'),
(435, 54, 18, '2024-10-11 03:31:32'),
(436, 54, 42, '2024-10-11 03:32:59'),
(437, 54, 42, '2024-10-11 03:35:15'),
(438, 54, 55, '2024-10-11 04:11:59'),
(439, 54, 55, '2024-10-11 04:12:04'),
(440, 54, 55, '2024-10-11 04:12:38'),
(441, 54, 55, '2024-10-11 04:12:38'),
(442, 54, 55, '2024-10-11 04:12:38'),
(443, 54, 55, '2024-10-11 04:12:39'),
(444, 54, 55, '2024-10-11 04:12:39'),
(445, 54, 55, '2024-10-11 04:12:39'),
(446, 54, 55, '2024-10-11 04:12:39'),
(447, 54, 55, '2024-10-11 04:12:39'),
(448, 54, 55, '2024-10-11 04:12:39'),
(449, 54, 55, '2024-10-11 04:12:39'),
(450, 54, 55, '2024-10-11 04:12:40'),
(451, 54, 55, '2024-10-11 04:12:41'),
(452, 54, 55, '2024-10-11 04:12:41'),
(453, 54, 55, '2024-10-11 04:12:41'),
(454, 54, 55, '2024-10-11 04:12:41'),
(455, 54, 55, '2024-10-11 04:12:50'),
(456, 54, 55, '2024-10-11 04:12:51'),
(457, 54, 55, '2024-10-11 04:13:37'),
(458, 54, 55, '2024-10-11 04:14:35'),
(459, 54, 55, '2024-10-11 04:14:53'),
(460, 54, 55, '2024-10-11 04:14:56'),
(461, 54, 55, '2024-10-11 04:17:16'),
(462, 54, 55, '2024-10-11 04:17:38'),
(463, 54, 55, '2024-10-11 04:17:52'),
(464, 54, 55, '2024-10-11 04:21:18'),
(465, 54, 55, '2024-10-11 04:21:37'),
(466, 54, 55, '2024-10-11 04:21:48'),
(467, 54, 55, '2024-10-11 04:22:01'),
(468, 54, 55, '2024-10-11 04:22:03'),
(469, 54, 55, '2024-10-11 04:23:54'),
(470, 54, 55, '2024-10-11 04:23:56'),
(471, 54, 55, '2024-10-11 04:24:57'),
(472, 54, 55, '2024-10-11 04:24:59'),
(473, 54, 55, '2024-10-11 04:25:00'),
(474, 54, 55, '2024-10-11 04:25:00'),
(475, 54, 55, '2024-10-11 04:26:05'),
(476, 54, 55, '2024-10-11 04:26:05'),
(477, 54, 55, '2024-10-11 04:29:57'),
(478, 54, 55, '2024-10-11 04:30:09'),
(479, 54, 18, '2024-10-11 04:42:36'),
(480, 54, 18, '2024-10-11 04:44:15'),
(481, 54, 18, '2024-10-11 04:44:29'),
(482, 54, 18, '2024-10-11 04:45:39'),
(483, 54, 18, '2024-10-11 04:45:50'),
(484, 54, 18, '2024-10-11 04:46:02'),
(485, 54, 18, '2024-10-11 04:46:08'),
(486, 54, 18, '2024-10-11 04:46:17'),
(487, 54, 18, '2024-10-11 04:46:45'),
(488, 54, 18, '2024-10-11 04:46:53'),
(489, 54, 18, '2024-10-11 04:47:31'),
(490, 54, 18, '2024-10-11 04:48:01'),
(491, 54, 18, '2024-10-11 04:48:19'),
(492, 54, 18, '2024-10-11 04:48:24'),
(493, 54, 18, '2024-10-11 04:48:49'),
(494, 54, 18, '2024-10-11 04:49:04'),
(495, 54, 18, '2024-10-11 04:49:27'),
(496, 54, 18, '2024-10-11 04:49:49'),
(497, 54, 18, '2024-10-11 04:50:01'),
(498, 54, 18, '2024-10-11 04:50:27'),
(499, 54, 18, '2024-10-11 04:50:38'),
(500, 54, 18, '2024-10-11 04:50:48'),
(501, 54, 18, '2024-10-11 04:51:02'),
(502, 54, 18, '2024-10-11 04:52:41'),
(503, 54, 18, '2024-10-11 04:54:03'),
(504, 54, 18, '2024-10-11 04:54:15'),
(505, 54, 18, '2024-10-11 04:54:28'),
(506, 54, 18, '2024-10-11 04:55:04'),
(507, 54, 18, '2024-10-11 04:55:20'),
(508, 54, 18, '2024-10-11 04:55:22'),
(509, 54, 18, '2024-10-11 04:55:43'),
(510, 54, 18, '2024-10-11 04:55:58'),
(511, 54, 18, '2024-10-11 04:56:02'),
(512, 54, 18, '2024-10-11 04:56:17'),
(513, 54, 18, '2024-10-11 04:56:36'),
(514, 54, 18, '2024-10-11 04:57:09'),
(515, 54, 18, '2024-10-11 04:57:30'),
(516, 54, 18, '2024-10-11 05:01:07'),
(517, 54, 18, '2024-10-11 05:01:55'),
(518, 54, 18, '2024-10-11 05:02:10'),
(519, 54, 18, '2024-10-11 05:02:45'),
(520, 54, 18, '2024-10-11 05:02:52'),
(521, 54, 18, '2024-10-11 05:03:02'),
(522, 54, 18, '2024-10-11 05:03:21'),
(523, 54, 18, '2024-10-11 05:03:37'),
(524, 54, 18, '2024-10-11 05:03:54'),
(525, 54, 18, '2024-10-11 05:04:31'),
(526, 54, 18, '2024-10-11 05:25:46'),
(527, 54, 18, '2024-10-11 05:25:48'),
(528, 54, 18, '2024-10-11 05:26:03'),
(529, 54, 18, '2024-10-11 05:26:04'),
(530, 54, 18, '2024-10-11 05:26:22'),
(531, 54, 18, '2024-10-11 05:26:36'),
(532, 54, 18, '2024-10-11 05:27:48'),
(533, 54, 18, '2024-10-11 05:28:17'),
(534, 54, 18, '2024-10-11 05:29:03'),
(535, 54, 18, '2024-10-11 05:29:09'),
(536, 54, 18, '2024-10-11 05:29:13'),
(537, 54, 18, '2024-10-11 05:29:29'),
(538, 54, 18, '2024-10-11 05:29:40'),
(539, 54, 18, '2024-10-11 05:29:51'),
(540, 54, 18, '2024-10-11 05:30:11'),
(541, 54, 18, '2024-10-11 05:30:17'),
(542, 54, 18, '2024-10-11 05:30:28'),
(543, 54, 18, '2024-10-11 05:30:40'),
(544, 54, 18, '2024-10-11 05:31:06'),
(545, 54, 18, '2024-10-11 05:32:12'),
(546, 54, 18, '2024-10-11 05:32:23'),
(547, 54, 18, '2024-10-11 05:32:29'),
(548, 54, 18, '2024-10-11 05:32:36'),
(549, 54, 18, '2024-10-11 05:32:49'),
(550, 54, 18, '2024-10-11 05:32:54'),
(551, 54, 18, '2024-10-11 05:33:00'),
(552, 54, 18, '2024-10-11 05:33:20'),
(553, 54, 18, '2024-10-11 05:33:36'),
(554, 54, 18, '2024-10-11 05:33:50'),
(555, 54, 18, '2024-10-11 05:33:57'),
(556, 54, 18, '2024-10-11 05:34:19'),
(557, 54, 18, '2024-10-11 05:34:31'),
(558, 54, 18, '2024-10-11 05:34:40'),
(559, 53, 18, '2024-10-11 05:54:31'),
(560, 35, 18, '2024-10-11 05:54:41'),
(561, 35, 18, '2024-10-11 05:55:53'),
(562, 54, 18, '2024-10-11 05:59:29'),
(563, 54, 18, '2024-10-11 06:00:21'),
(564, 54, 18, '2024-10-11 06:01:09'),
(565, 54, 18, '2024-10-11 06:01:13'),
(566, 54, 42, '2024-10-11 06:11:49'),
(567, 54, 42, '2024-10-11 06:13:19'),
(568, 54, 42, '2024-10-11 06:13:21'),
(569, 54, 42, '2024-10-11 06:14:22'),
(570, 54, 42, '2024-10-11 06:14:41'),
(571, 54, 42, '2024-10-11 06:14:52'),
(572, 54, 42, '2024-10-11 06:15:19'),
(573, 53, 42, '2024-10-11 06:16:17'),
(574, 54, 42, '2024-10-11 06:16:29'),
(575, 54, 42, '2024-10-11 06:21:14'),
(576, 54, 42, '2024-10-11 06:21:26'),
(577, 54, 42, '2024-10-11 06:27:52'),
(578, 54, 42, '2024-10-11 06:28:04'),
(579, 54, 42, '2024-10-11 06:28:43'),
(580, 54, 42, '2024-10-11 06:29:18'),
(581, 54, 42, '2024-10-11 06:29:18'),
(582, 54, 42, '2024-10-11 06:29:43'),
(583, 54, 42, '2024-10-11 06:30:00'),
(584, 54, 42, '2024-10-11 06:34:00'),
(585, 54, 42, '2024-10-11 06:38:19'),
(586, 54, 42, '2024-10-11 06:39:08'),
(587, 54, 18, '2024-10-11 08:26:38'),
(588, 54, 18, '2024-10-11 08:27:21'),
(589, 54, 18, '2024-10-11 08:27:21'),
(590, 54, 18, '2024-10-11 08:27:21'),
(591, 54, 18, '2024-10-11 08:34:52'),
(592, 54, 18, '2024-10-11 08:34:54'),
(593, 53, 18, '2024-10-14 03:10:19'),
(594, 53, 18, '2024-10-14 03:11:58'),
(595, 53, 18, '2024-10-14 03:12:01'),
(596, 36, 18, '2024-10-14 03:12:11'),
(597, 37, 18, '2024-10-14 03:30:24'),
(598, 53, 18, '2024-10-14 04:57:12'),
(599, 53, 18, '2024-10-14 05:00:42'),
(600, 53, 18, '2024-10-14 05:02:19'),
(601, 53, 18, '2024-10-14 05:02:23'),
(602, 38, 18, '2024-10-14 05:02:29'),
(603, 37, 18, '2024-10-14 05:02:33'),
(604, 36, 18, '2024-10-14 05:02:37'),
(605, 44, 18, '2024-10-14 05:02:48'),
(606, 36, 18, '2024-10-14 05:02:54'),
(607, 38, 18, '2024-10-14 05:03:05'),
(608, 36, 18, '2024-10-14 05:03:18'),
(609, 53, 18, '2024-10-14 05:03:30'),
(610, 53, 18, '2024-10-14 05:11:29'),
(611, 53, 18, '2024-10-14 05:12:03'),
(612, 38, 18, '2024-10-14 05:18:28'),
(613, 36, 18, '2024-10-14 05:18:32'),
(614, 44, 18, '2024-10-14 05:18:40'),
(615, 44, 18, '2024-10-14 05:21:07'),
(616, 44, 18, '2024-10-14 05:21:31'),
(617, 44, 18, '2024-10-14 05:21:34'),
(618, 44, 18, '2024-10-14 05:23:36'),
(619, 44, 18, '2024-10-14 05:23:54'),
(620, 44, 18, '2024-10-14 05:24:43'),
(621, 44, 18, '2024-10-14 05:25:28'),
(622, 44, 18, '2024-10-14 05:27:23'),
(623, 44, 18, '2024-10-14 05:27:39'),
(624, 44, 18, '2024-10-14 05:27:52'),
(625, 44, 18, '2024-10-14 05:28:37'),
(626, 44, 18, '2024-10-14 05:29:53'),
(627, 44, 18, '2024-10-14 05:30:13'),
(628, 44, 18, '2024-10-14 05:31:28'),
(629, 37, 18, '2024-10-14 05:31:34'),
(630, 37, 18, '2024-10-14 05:32:51'),
(631, 37, 18, '2024-10-14 05:34:06'),
(632, 37, 18, '2024-10-14 05:34:16'),
(633, 37, 18, '2024-10-14 05:34:28'),
(634, 37, 18, '2024-10-14 05:34:33'),
(635, 37, 18, '2024-10-14 05:34:40'),
(636, 37, 18, '2024-10-14 05:34:50'),
(637, 37, 18, '2024-10-14 05:35:02'),
(638, 37, 18, '2024-10-14 05:35:10'),
(639, 37, 18, '2024-10-14 05:35:47'),
(640, 37, 18, '2024-10-14 05:37:06'),
(641, 37, 18, '2024-10-14 05:37:22'),
(642, 37, 18, '2024-10-14 05:37:40'),
(643, 37, 18, '2024-10-14 05:40:37'),
(644, 37, 18, '2024-10-14 05:41:12'),
(645, 37, 18, '2024-10-14 05:42:28'),
(646, 37, 18, '2024-10-14 05:42:32'),
(647, 37, 18, '2024-10-14 05:42:38'),
(648, 37, 18, '2024-10-14 05:43:01'),
(649, 37, 18, '2024-10-14 05:43:06'),
(650, 37, 18, '2024-10-14 05:43:08'),
(651, 37, 18, '2024-10-14 05:43:12'),
(652, 37, 18, '2024-10-14 05:43:46'),
(653, 37, 18, '2024-10-14 05:46:47'),
(654, 37, 18, '2024-10-14 05:47:08'),
(655, 37, 18, '2024-10-14 05:47:09'),
(656, 37, 18, '2024-10-14 05:47:16'),
(657, 37, 18, '2024-10-14 05:47:23'),
(658, 37, 18, '2024-10-14 05:47:29'),
(659, 37, 18, '2024-10-14 05:47:41'),
(660, 37, 18, '2024-10-14 05:47:55'),
(661, 37, 18, '2024-10-14 05:48:16'),
(662, 38, 18, '2024-10-14 05:49:00'),
(663, 36, 18, '2024-10-14 05:49:04'),
(664, 44, 18, '2024-10-14 05:49:09'),
(665, 51, 18, '2024-10-14 05:49:13'),
(666, 51, 18, '2024-10-14 05:49:17'),
(667, 53, 18, '2024-10-14 05:49:24'),
(668, 53, 18, '2024-10-14 05:50:04'),
(669, 53, 18, '2024-10-14 05:50:29'),
(670, 53, 18, '2024-10-14 05:50:37'),
(671, 53, 18, '2024-10-14 05:52:04'),
(672, 53, 18, '2024-10-14 05:53:34'),
(673, 53, 18, '2024-10-14 05:53:34'),
(674, 53, 18, '2024-10-14 05:54:02'),
(675, 53, 18, '2024-10-14 05:54:22'),
(676, 53, 18, '2024-10-14 05:54:49'),
(677, 53, 18, '2024-10-14 05:55:31'),
(678, 53, 18, '2024-10-14 05:58:11'),
(679, 53, 18, '2024-10-14 05:58:27'),
(680, 53, 18, '2024-10-14 05:58:55'),
(681, 53, 18, '2024-10-14 05:59:19'),
(682, 53, 18, '2024-10-14 05:59:35'),
(683, 53, 18, '2024-10-14 05:59:57'),
(684, 53, 18, '2024-10-14 06:00:40'),
(685, 53, 18, '2024-10-14 06:00:54'),
(686, 53, 18, '2024-10-14 06:03:16'),
(687, 53, 18, '2024-10-14 06:03:38'),
(688, 53, 18, '2024-10-14 06:03:51'),
(689, 53, 18, '2024-10-14 06:04:04'),
(690, 53, 18, '2024-10-14 06:04:26'),
(691, 53, 18, '2024-10-14 06:05:02'),
(692, 53, 18, '2024-10-14 06:05:16'),
(693, 53, 18, '2024-10-14 06:05:20'),
(694, 53, 18, '2024-10-14 06:07:13'),
(695, 53, 18, '2024-10-14 06:07:45'),
(696, 53, 18, '2024-10-14 06:08:01'),
(697, 53, 18, '2024-10-14 06:08:46'),
(698, 53, 18, '2024-10-14 06:09:08'),
(699, 53, 18, '2024-10-14 06:10:06'),
(700, 53, 18, '2024-10-14 06:10:18'),
(701, 53, 18, '2024-10-14 06:10:30'),
(702, 53, 18, '2024-10-14 06:11:08'),
(703, 53, 18, '2024-10-14 06:11:16'),
(704, 53, 18, '2024-10-14 06:12:55'),
(705, 53, 18, '2024-10-14 06:13:24'),
(706, 53, 18, '2024-10-14 06:14:18'),
(707, 53, 18, '2024-10-14 06:15:12'),
(708, 53, 18, '2024-10-14 06:15:32'),
(709, 53, 18, '2024-10-14 06:15:47'),
(710, 53, 18, '2024-10-14 06:15:53'),
(711, 53, 18, '2024-10-14 06:16:17'),
(712, 53, 18, '2024-10-14 06:16:20'),
(713, 53, 18, '2024-10-14 06:16:43'),
(714, 53, 18, '2024-10-14 06:17:13'),
(715, 53, 18, '2024-10-14 06:18:39'),
(716, 53, 18, '2024-10-14 06:18:54'),
(717, 53, 18, '2024-10-14 06:22:10'),
(718, 53, 18, '2024-10-14 06:22:54'),
(719, 53, 18, '2024-10-14 06:23:10'),
(720, 53, 18, '2024-10-14 06:23:11'),
(721, 53, 18, '2024-10-14 06:23:28'),
(722, 53, 18, '2024-10-14 06:23:31'),
(723, 53, 18, '2024-10-14 06:23:46'),
(724, 53, 18, '2024-10-14 06:23:47'),
(725, 53, 18, '2024-10-14 06:23:48'),
(726, 53, 18, '2024-10-14 06:23:49'),
(727, 53, 18, '2024-10-14 06:23:49'),
(728, 53, 18, '2024-10-14 06:23:54'),
(729, 53, 18, '2024-10-14 06:23:55'),
(730, 53, 18, '2024-10-14 06:23:55'),
(731, 53, 18, '2024-10-14 06:23:56'),
(732, 53, 18, '2024-10-14 06:23:56'),
(733, 53, 18, '2024-10-14 06:23:56'),
(734, 53, 18, '2024-10-14 06:23:56'),
(735, 53, 18, '2024-10-14 06:23:57'),
(736, 53, 18, '2024-10-14 06:23:57'),
(737, 53, 18, '2024-10-14 06:23:57'),
(738, 53, 18, '2024-10-14 06:23:57'),
(739, 53, 18, '2024-10-14 06:23:57'),
(740, 53, 18, '2024-10-14 06:23:57'),
(741, 53, 18, '2024-10-14 06:23:58'),
(742, 53, 18, '2024-10-14 06:23:58'),
(743, 53, 18, '2024-10-14 06:23:58'),
(744, 53, 18, '2024-10-14 06:23:58'),
(745, 53, 18, '2024-10-14 06:23:58'),
(746, 53, 18, '2024-10-14 06:23:58'),
(747, 53, 18, '2024-10-14 06:23:59'),
(748, 53, 18, '2024-10-14 06:23:59'),
(749, 53, 18, '2024-10-14 06:23:59'),
(750, 53, 18, '2024-10-14 06:23:59'),
(751, 53, 18, '2024-10-14 06:23:59'),
(752, 53, 18, '2024-10-14 06:24:00'),
(753, 53, 18, '2024-10-14 06:24:00'),
(754, 53, 18, '2024-10-14 06:24:01'),
(755, 53, 18, '2024-10-14 06:24:01'),
(756, 53, 18, '2024-10-14 06:24:01'),
(757, 53, 18, '2024-10-14 06:24:01'),
(758, 53, 18, '2024-10-14 06:24:01'),
(759, 53, 18, '2024-10-14 06:24:02'),
(760, 53, 18, '2024-10-14 06:24:56'),
(761, 53, 18, '2024-10-14 06:26:02'),
(762, 53, 18, '2024-10-14 06:28:01'),
(763, 53, 18, '2024-10-14 06:28:14'),
(764, 53, 18, '2024-10-14 06:28:15'),
(765, 53, 18, '2024-10-14 06:28:17'),
(766, 53, 18, '2024-10-14 06:29:27'),
(767, 53, 18, '2024-10-14 06:31:22'),
(768, 53, 18, '2024-10-14 06:31:22'),
(769, 53, 18, '2024-10-14 06:31:22'),
(770, 53, 18, '2024-10-14 06:31:22'),
(771, 53, 18, '2024-10-14 06:31:24'),
(772, 53, 18, '2024-10-14 06:31:25'),
(773, 53, 18, '2024-10-14 06:31:26'),
(774, 53, 18, '2024-10-14 06:31:41'),
(775, 53, 18, '2024-10-14 06:31:45'),
(776, 53, 18, '2024-10-14 06:31:45'),
(777, 53, 18, '2024-10-14 06:31:46'),
(778, 53, 18, '2024-10-14 06:31:47'),
(779, 53, 18, '2024-10-14 06:31:48'),
(780, 53, 18, '2024-10-14 06:31:48'),
(781, 53, 18, '2024-10-14 06:31:49'),
(782, 53, 18, '2024-10-14 06:31:50'),
(783, 53, 18, '2024-10-14 06:32:12'),
(784, 53, 18, '2024-10-14 06:32:14'),
(785, 53, 18, '2024-10-14 06:32:15'),
(786, 53, 18, '2024-10-14 06:33:21'),
(787, 53, 18, '2024-10-14 06:33:39'),
(788, 53, 18, '2024-10-14 06:33:44'),
(789, 53, 18, '2024-10-14 06:35:45'),
(790, 53, 18, '2024-10-14 06:37:28'),
(791, 53, 18, '2024-10-14 06:37:38'),
(792, 53, 18, '2024-10-14 06:37:58'),
(793, 53, 18, '2024-10-14 06:38:05'),
(794, 53, 18, '2024-10-14 06:38:06'),
(795, 53, 18, '2024-10-14 06:38:18'),
(796, 53, 18, '2024-10-14 06:38:38'),
(797, 53, 18, '2024-10-14 06:38:40'),
(798, 53, 18, '2024-10-14 06:39:02'),
(799, 53, 18, '2024-10-14 06:39:10'),
(800, 53, 18, '2024-10-14 06:39:11'),
(801, 53, 18, '2024-10-14 06:39:11'),
(802, 53, 18, '2024-10-14 06:39:12'),
(803, 53, 18, '2024-10-14 06:39:18'),
(804, 53, 18, '2024-10-14 06:39:18'),
(805, 53, 18, '2024-10-14 06:40:55'),
(806, 53, 18, '2024-10-14 06:40:59'),
(807, 53, 18, '2024-10-14 06:41:00'),
(808, 53, 18, '2024-10-14 06:41:02'),
(809, 53, 18, '2024-10-14 06:41:04'),
(810, 53, 18, '2024-10-14 06:41:54'),
(811, 53, 18, '2024-10-14 06:43:35'),
(812, 53, 18, '2024-10-14 06:44:57'),
(813, 53, 18, '2024-10-14 06:45:19'),
(814, 53, 18, '2024-10-14 06:45:20'),
(815, 53, 18, '2024-10-14 06:45:45'),
(816, 53, 18, '2024-10-14 06:45:52'),
(817, 53, 18, '2024-10-14 06:48:06'),
(818, 53, 18, '2024-10-14 06:51:06'),
(819, 53, 18, '2024-10-14 06:51:06'),
(820, 53, 18, '2024-10-14 06:51:06'),
(821, 53, 18, '2024-10-14 06:51:06'),
(822, 53, 18, '2024-10-14 06:51:50'),
(823, 53, 18, '2024-10-14 06:51:52'),
(824, 53, 18, '2024-10-14 06:51:54'),
(825, 38, 18, '2024-10-14 06:52:24'),
(826, 53, 18, '2024-10-14 06:52:26'),
(827, 53, 18, '2024-10-14 06:52:28'),
(828, 51, 18, '2024-10-14 06:52:33'),
(829, 51, 18, '2024-10-14 06:52:34'),
(830, 53, 18, '2024-10-14 06:52:48'),
(831, 53, 18, '2024-10-14 06:54:32'),
(832, 53, 18, '2024-10-14 06:54:59'),
(833, 53, 18, '2024-10-14 06:55:49'),
(834, 53, 18, '2024-10-14 06:56:19'),
(835, 53, 18, '2024-10-14 06:56:47'),
(836, 53, 18, '2024-10-14 06:56:54'),
(837, 53, 18, '2024-10-14 06:56:56'),
(838, 53, 18, '2024-10-14 06:57:23'),
(839, 53, 18, '2024-10-14 06:57:24'),
(840, 53, 18, '2024-10-14 06:57:25'),
(841, 53, 18, '2024-10-14 06:57:25'),
(842, 53, 18, '2024-10-14 06:57:26'),
(843, 53, 18, '2024-10-14 06:57:26'),
(844, 53, 18, '2024-10-14 06:57:28'),
(845, 53, 18, '2024-10-14 06:57:30'),
(846, 53, 18, '2024-10-14 06:57:31'),
(847, 53, 18, '2024-10-14 06:59:11'),
(848, 53, 18, '2024-10-14 07:00:39'),
(849, 53, 18, '2024-10-14 07:00:39'),
(850, 53, 18, '2024-10-14 07:00:39'),
(851, 53, 18, '2024-10-14 07:00:39'),
(852, 53, 18, '2024-10-14 07:00:39'),
(853, 53, 18, '2024-10-14 07:00:39'),
(854, 53, 18, '2024-10-14 07:00:39'),
(855, 53, 18, '2024-10-14 07:00:39'),
(856, 53, 18, '2024-10-14 07:00:40'),
(857, 53, 18, '2024-10-14 07:00:40'),
(858, 53, 18, '2024-10-14 07:02:16'),
(859, 53, 18, '2024-10-14 07:02:29'),
(860, 53, 18, '2024-10-14 07:02:39'),
(861, 53, 18, '2024-10-14 07:03:21'),
(862, 53, 18, '2024-10-14 07:03:44'),
(863, 53, 18, '2024-10-14 07:10:45'),
(864, 53, 18, '2024-10-14 07:11:48'),
(865, 36, 18, '2024-10-14 07:12:20'),
(866, 53, 18, '2024-10-14 07:14:58'),
(867, 53, 18, '2024-10-14 07:15:23'),
(868, 53, 18, '2024-10-14 08:26:06'),
(869, 53, 18, '2024-10-14 08:32:25'),
(870, 53, 18, '2024-10-17 04:41:20'),
(871, 53, 18, '2024-10-17 05:00:10'),
(872, 53, 18, '2024-10-17 05:21:22'),
(873, 51, 18, '2024-10-17 05:44:45'),
(874, 53, 18, '2024-10-17 05:52:56'),
(875, 53, 18, '2024-10-17 05:52:58'),
(876, 53, 18, '2024-10-17 05:53:01'),
(877, 53, 18, '2024-10-17 05:53:51'),
(878, 38, 18, '2024-10-21 03:04:47'),
(879, 38, 18, '2024-10-21 03:05:15'),
(880, 53, 18, '2024-10-21 03:05:17'),
(881, 38, 18, '2024-10-21 03:05:40'),
(882, 37, 18, '2024-10-21 03:05:45'),
(883, 36, 18, '2024-10-21 03:05:55'),
(884, 38, 18, '2024-10-21 03:05:59'),
(885, 44, 18, '2024-10-21 03:06:02'),
(886, 35, 18, '2024-10-21 03:06:07'),
(887, 35, 18, '2024-10-21 03:08:41'),
(888, 35, 18, '2024-10-21 03:08:55'),
(889, 35, 18, '2024-10-21 03:09:06'),
(890, 51, 18, '2024-10-21 03:09:12'),
(891, 44, 18, '2024-10-21 03:09:17'),
(892, 53, 18, '2024-10-21 03:09:21'),
(893, 53, 18, '2024-10-21 03:10:09'),
(894, 53, 18, '2024-10-21 03:10:32'),
(895, 53, 18, '2024-10-21 03:10:33'),
(896, 53, 18, '2024-10-21 03:10:37'),
(897, 53, 18, '2024-10-21 03:10:40'),
(898, 53, 18, '2024-10-21 03:10:44'),
(899, 53, 18, '2024-10-21 03:10:47'),
(900, 35, 18, '2024-10-21 03:11:27'),
(901, 35, 18, '2024-10-21 03:12:37'),
(902, 53, 18, '2024-10-21 03:12:41'),
(903, 53, 18, '2024-10-21 03:12:57'),
(904, 53, 18, '2024-10-21 03:15:22'),
(905, 53, 18, '2024-10-21 03:15:35'),
(906, 53, 18, '2024-10-21 03:15:53'),
(907, 53, 18, '2024-10-21 03:16:02'),
(908, 53, 18, '2024-10-21 03:16:06'),
(909, 37, 18, '2024-10-21 03:16:26'),
(910, 36, 18, '2024-10-21 03:16:42'),
(911, 36, 18, '2024-10-21 03:17:09'),
(912, 53, 18, '2024-10-21 03:35:22'),
(913, 53, 18, '2024-10-21 06:34:46'),
(914, 53, 18, '2024-10-21 06:35:36'),
(915, 53, 18, '2024-10-21 06:36:18'),
(916, 35, 18, '2024-10-21 06:37:02'),
(917, 53, 18, '2024-10-21 06:38:55'),
(918, 53, 18, '2024-10-21 06:39:26'),
(919, 35, 18, '2024-10-21 06:41:07'),
(920, 44, 18, '2024-10-21 06:41:28'),
(921, 62, 18, '2024-10-21 06:41:33'),
(922, 53, 18, '2024-10-21 06:43:45'),
(923, 53, 18, '2024-10-21 06:43:59'),
(924, 53, 18, '2024-10-21 06:52:23'),
(925, 53, 18, '2024-10-24 05:06:46'),
(926, 53, 18, '2024-10-24 05:08:18'),
(927, 53, 18, '2024-10-24 05:13:41'),
(928, 53, 18, '2024-10-24 05:13:53'),
(929, 53, 18, '2024-10-24 05:14:13'),
(930, 53, 18, '2024-10-24 05:14:47'),
(931, 53, 18, '2024-10-24 05:15:01'),
(932, 53, 18, '2024-10-24 05:15:35'),
(933, 53, 18, '2024-10-24 05:17:40'),
(934, 53, 18, '2024-10-24 05:17:55'),
(935, 53, 18, '2024-10-24 05:18:44'),
(936, 53, 18, '2024-10-24 05:19:29'),
(937, 53, 18, '2024-10-24 05:21:43'),
(938, 53, 18, '2024-10-24 05:22:54'),
(939, 62, 18, '2024-10-24 05:23:08'),
(940, 62, 18, '2024-10-24 05:25:38'),
(941, 62, 18, '2024-10-24 05:26:05'),
(942, 62, 18, '2024-10-24 05:26:07'),
(943, 62, 18, '2024-10-24 05:26:27'),
(944, 62, 18, '2024-10-24 05:27:09'),
(945, 62, 18, '2024-10-24 05:27:54'),
(946, 62, 18, '2024-10-24 05:28:00'),
(947, 62, 18, '2024-10-24 05:28:03'),
(948, 62, 18, '2024-10-24 05:28:14'),
(949, 62, 18, '2024-10-24 05:28:24'),
(950, 62, 18, '2024-10-24 05:28:34'),
(951, 62, 18, '2024-10-24 05:28:48'),
(952, 62, 18, '2024-10-24 05:29:23'),
(953, 62, 18, '2024-10-24 05:29:29'),
(954, 62, 18, '2024-10-24 05:29:35'),
(955, 62, 18, '2024-10-24 05:29:42'),
(956, 62, 18, '2024-10-24 05:29:55'),
(957, 62, 18, '2024-10-24 05:30:03'),
(958, 62, 18, '2024-10-24 05:30:11'),
(959, 62, 18, '2024-10-24 05:30:19'),
(960, 62, 18, '2024-10-24 05:30:59'),
(961, 62, 18, '2024-10-24 05:32:01'),
(962, 62, 18, '2024-10-24 05:32:30'),
(963, 62, 18, '2024-10-24 05:33:04'),
(964, 62, 18, '2024-10-24 05:33:39'),
(965, 44, 18, '2024-10-24 05:33:44'),
(966, 35, 18, '2024-10-24 05:33:47'),
(967, 35, 18, '2024-10-24 05:34:31'),
(968, 35, 18, '2024-10-24 05:35:49'),
(969, 53, 18, '2024-10-24 05:38:43'),
(970, 38, 18, '2024-10-24 05:38:47'),
(971, 44, 18, '2024-10-24 05:38:53'),
(972, 53, 56, '2024-10-24 05:41:21'),
(973, 53, 56, '2024-10-24 05:44:35'),
(974, 53, 56, '2024-10-24 05:44:57'),
(975, 53, 56, '2024-10-24 05:46:21'),
(976, 53, 56, '2024-10-24 05:46:50'),
(977, 53, 56, '2024-10-24 05:49:29'),
(978, 53, 56, '2024-10-24 05:49:49'),
(979, 53, 56, '2024-10-24 05:51:21'),
(980, 53, 56, '2024-10-24 05:52:33'),
(981, 53, 56, '2024-10-24 05:53:07'),
(982, 53, 56, '2024-10-24 05:53:37'),
(983, 53, 56, '2024-10-24 05:53:47'),
(984, 35, 56, '2024-10-24 05:54:25'),
(985, 53, 56, '2024-10-24 05:56:22'),
(986, 53, 18, '2024-10-24 05:56:55'),
(987, 53, 18, '2024-10-24 05:59:02'),
(988, 53, 18, '2024-10-24 06:00:33'),
(989, 53, 18, '2024-10-24 06:00:42'),
(990, 53, 18, '2024-10-24 06:00:53'),
(991, 53, 18, '2024-10-24 06:01:06'),
(992, 53, 18, '2024-10-24 06:01:43'),
(993, 53, 18, '2024-10-24 06:02:01'),
(994, 53, 18, '2024-10-24 06:08:10'),
(995, 53, 18, '2024-10-24 06:14:23'),
(996, 44, 18, '2024-10-24 06:14:33'),
(997, 36, 18, '2024-10-24 06:14:40'),
(998, 53, 56, '2024-10-24 06:14:59'),
(999, 53, 56, '2024-10-24 06:15:20'),
(1000, 53, 56, '2024-10-24 06:15:27'),
(1001, 53, 56, '2024-10-24 06:16:31'),
(1002, 51, 56, '2024-10-24 06:16:52'),
(1003, 38, 56, '2024-10-24 06:16:55'),
(1004, 37, 56, '2024-10-24 06:17:01'),
(1005, 36, 56, '2024-10-24 06:17:07'),
(1006, 62, 56, '2024-10-24 06:17:12'),
(1007, 62, 56, '2024-10-24 06:18:43'),
(1008, 62, 56, '2024-10-24 06:19:01'),
(1009, 62, 56, '2024-10-24 06:19:30'),
(1010, 62, 56, '2024-10-24 06:20:15'),
(1011, 62, 56, '2024-10-24 06:22:53'),
(1012, 62, 56, '2024-10-24 06:23:42'),
(1013, 62, 56, '2024-10-24 06:25:21'),
(1014, 62, 56, '2024-10-24 06:25:54'),
(1015, 62, 56, '2024-10-24 06:26:40'),
(1016, 62, 56, '2024-10-24 06:28:14'),
(1017, 62, 56, '2024-10-24 06:29:05'),
(1018, 62, 56, '2024-10-24 06:37:49'),
(1019, 62, 56, '2024-10-24 06:37:56'),
(1020, 51, 56, '2024-10-24 06:38:49'),
(1021, 53, 56, '2024-10-24 06:40:57'),
(1022, 53, 56, '2024-10-24 06:41:15'),
(1023, 53, 56, '2024-10-24 06:41:25'),
(1024, 53, 56, '2024-10-24 06:43:39'),
(1025, 53, 56, '2024-10-24 06:43:40'),
(1026, 53, 56, '2024-10-24 06:44:43'),
(1027, 53, 56, '2024-10-24 06:47:02'),
(1028, 53, 56, '2024-10-24 07:33:16'),
(1029, 53, 18, '2024-10-25 02:53:04'),
(1030, 51, 18, '2024-10-25 02:53:12'),
(1031, 37, 18, '2024-10-25 02:53:17'),
(1032, 36, 18, '2024-10-25 02:53:21'),
(1033, 62, 18, '2024-10-25 02:53:30'),
(1034, 53, 56, '2024-10-25 02:53:46'),
(1035, 36, 56, '2024-10-25 02:53:50'),
(1036, 37, 56, '2024-10-25 02:53:55'),
(1037, 53, 56, '2024-10-25 02:54:22'),
(1038, 53, 56, '2024-10-25 02:57:27'),
(1039, 53, 56, '2024-10-25 03:02:32'),
(1040, 53, 56, '2024-10-25 03:02:41'),
(1041, 53, 56, '2024-10-25 03:03:50'),
(1042, 53, 56, '2024-10-25 03:04:25'),
(1043, 53, 56, '2024-10-25 03:05:41'),
(1044, 53, 56, '2024-10-25 03:06:39'),
(1045, 53, 56, '2024-10-25 03:07:29'),
(1046, 53, 56, '2024-10-25 03:08:26'),
(1047, 53, 56, '2024-10-25 03:09:16'),
(1048, 53, 57, '2024-10-25 03:12:04'),
(1049, 54, 57, '2024-10-25 03:14:07'),
(1050, 54, 57, '2024-10-25 03:14:38'),
(1051, 54, 57, '2024-10-25 03:18:02'),
(1052, 54, 57, '2024-10-25 03:18:14'),
(1053, 54, 57, '2024-10-25 03:25:39'),
(1054, 54, 57, '2024-10-25 03:25:46'),
(1055, 54, 57, '2024-10-25 03:26:41'),
(1056, 54, 57, '2024-10-25 03:26:52'),
(1057, 54, 57, '2024-10-25 03:27:04'),
(1058, 54, 57, '2024-10-25 03:28:52'),
(1059, 54, 57, '2024-10-25 03:28:56'),
(1060, 54, 57, '2024-10-25 03:29:40'),
(1061, 54, 57, '2024-10-25 03:30:58'),
(1062, 54, 57, '2024-10-25 03:31:18'),
(1063, 54, 57, '2024-10-25 03:31:29'),
(1064, 54, 57, '2024-10-25 03:31:42'),
(1065, 54, 57, '2024-10-25 03:33:04'),
(1066, 54, 57, '2024-10-25 03:34:06'),
(1067, 54, 57, '2024-10-25 03:35:00'),
(1068, 54, 57, '2024-10-25 03:35:16'),
(1069, 54, 57, '2024-10-25 03:35:56'),
(1070, 54, 57, '2024-10-25 03:36:13'),
(1071, 54, 57, '2024-10-25 03:37:05'),
(1072, 54, 57, '2024-10-25 03:38:11'),
(1073, 54, 57, '2024-10-25 03:39:09'),
(1074, 54, 57, '2024-10-25 03:39:26'),
(1075, 54, 57, '2024-10-25 03:41:03'),
(1076, 54, 57, '2024-10-25 03:42:01'),
(1077, 54, 18, '2024-10-25 03:44:51'),
(1078, 54, 57, '2024-10-25 03:45:10'),
(1079, 54, 57, '2024-10-25 03:45:32'),
(1080, 54, 57, '2024-10-25 03:46:02'),
(1081, 54, 57, '2024-10-25 03:48:22'),
(1082, 54, 57, '2024-10-25 03:48:37'),
(1083, 54, 57, '2024-10-25 03:49:56'),
(1084, 54, 57, '2024-10-25 03:50:29'),
(1085, 54, 57, '2024-10-25 03:51:24'),
(1086, 54, 57, '2024-10-25 03:51:36'),
(1087, 54, 57, '2024-10-25 03:54:54'),
(1088, 54, 57, '2024-10-25 03:55:09'),
(1089, 54, 57, '2024-10-25 03:55:40'),
(1090, 54, 57, '2024-10-25 03:56:58'),
(1091, 54, 57, '2024-10-25 03:58:33'),
(1092, 54, 57, '2024-10-25 03:58:35'),
(1093, 54, 57, '2024-10-25 04:00:17'),
(1094, 53, 18, '2024-10-25 04:06:20'),
(1095, 53, 18, '2024-10-25 04:06:38'),
(1096, 53, 18, '2024-10-25 04:23:01'),
(1097, 53, 18, '2024-10-25 04:23:02'),
(1098, 53, 18, '2024-10-25 04:23:41'),
(1099, 53, 18, '2024-10-25 04:24:08'),
(1100, 53, 18, '2024-10-25 04:24:24'),
(1101, 53, 18, '2024-10-25 04:26:15'),
(1102, 53, 18, '2024-10-25 04:26:21'),
(1103, 53, 18, '2024-10-25 04:28:35'),
(1104, 53, 18, '2024-10-25 04:28:43'),
(1105, 53, 18, '2024-10-25 04:29:02'),
(1106, 53, 18, '2024-10-25 04:33:22'),
(1107, 53, 18, '2024-10-25 04:33:52'),
(1108, 53, 18, '2024-10-25 04:34:51'),
(1109, 53, 18, '2024-10-25 04:35:09'),
(1110, 53, 18, '2024-10-25 04:35:30'),
(1111, 53, 57, '2024-10-25 04:37:48'),
(1112, 53, 57, '2024-10-25 04:40:25'),
(1113, 53, 57, '2024-10-25 04:41:35'),
(1114, 53, 57, '2024-10-25 04:42:37'),
(1115, 53, 57, '2024-10-25 04:42:43'),
(1116, 53, 57, '2024-10-25 04:43:07'),
(1117, 53, 57, '2024-10-25 04:44:04'),
(1118, 53, 57, '2024-10-25 04:47:37'),
(1119, 53, 57, '2024-10-25 04:48:25'),
(1120, 53, 57, '2024-10-25 04:48:48'),
(1121, 53, 57, '2024-10-25 04:52:45'),
(1122, 53, 57, '2024-10-25 04:52:45'),
(1123, 44, 57, '2024-10-25 05:03:40'),
(1124, 53, 18, '2024-10-25 05:13:24'),
(1125, 53, 18, '2024-10-25 05:13:50'),
(1126, 53, 18, '2024-10-25 05:15:08'),
(1127, 53, 18, '2024-10-25 05:16:03'),
(1128, 53, 18, '2024-10-25 05:17:59'),
(1129, 53, 18, '2024-10-25 05:18:11'),
(1130, 53, 18, '2024-10-25 05:18:35'),
(1131, 53, 18, '2024-10-25 05:19:15'),
(1132, 53, 18, '2024-10-25 05:20:22'),
(1133, 53, 18, '2024-10-25 05:21:28'),
(1134, 53, 18, '2024-10-25 05:22:14'),
(1135, 53, 18, '2024-10-25 05:22:20'),
(1136, 54, 18, '2024-10-25 05:22:39'),
(1137, 54, 18, '2024-10-25 05:22:44'),
(1138, 54, 18, '2024-10-25 05:23:08'),
(1139, 54, 18, '2024-10-25 05:24:32'),
(1140, 54, 18, '2024-10-25 05:28:13'),
(1141, 54, 18, '2024-10-25 05:29:58'),
(1142, 54, 18, '2024-10-25 05:31:32'),
(1143, 54, 18, '2024-10-25 05:31:41'),
(1144, 54, 18, '2024-10-25 05:32:02'),
(1145, 54, 18, '2024-10-25 05:32:20'),
(1146, 54, 18, '2024-10-25 05:32:53'),
(1147, 54, 18, '2024-10-25 05:34:05'),
(1148, 54, 18, '2024-10-25 05:34:19'),
(1149, 54, 18, '2024-10-25 05:35:25'),
(1150, 54, 18, '2024-10-25 05:36:10'),
(1151, 54, 18, '2024-10-25 05:36:32'),
(1152, 54, 18, '2024-10-25 05:37:04'),
(1153, 54, 18, '2024-10-25 05:37:06'),
(1154, 54, 18, '2024-10-25 05:37:16'),
(1155, 54, 18, '2024-10-25 05:37:30'),
(1156, 54, 18, '2024-10-25 05:37:45'),
(1157, 54, 18, '2024-10-25 05:40:00'),
(1158, 54, 18, '2024-10-25 05:40:49'),
(1159, 54, 18, '2024-10-25 05:41:00'),
(1160, 54, 18, '2024-10-25 05:41:11'),
(1161, 54, 18, '2024-10-25 05:41:52'),
(1162, 54, 18, '2024-10-25 05:42:36'),
(1163, 54, 18, '2024-10-25 05:42:44'),
(1164, 53, 18, '2024-10-25 05:44:31'),
(1165, 53, 18, '2024-10-25 05:46:08'),
(1166, 53, 18, '2024-10-25 05:46:24'),
(1167, 44, 57, '2024-10-25 07:21:54'),
(1168, 44, 57, '2024-10-25 07:22:20'),
(1169, 36, 57, '2024-10-25 07:22:33'),
(1170, 37, 57, '2024-10-25 07:22:57'),
(1171, 35, 57, '2024-10-25 07:23:04'),
(1172, 38, 18, '2024-10-30 07:42:51'),
(1173, 38, 18, '2024-10-30 07:43:03'),
(1174, 38, 18, '2024-10-30 07:43:47'),
(1175, 38, 18, '2024-10-30 07:45:52'),
(1176, 38, 18, '2024-10-30 07:46:30'),
(1177, 38, 18, '2024-10-30 07:49:16'),
(1178, 38, 18, '2024-10-30 07:49:33'),
(1179, 54, 18, '2024-11-07 06:36:18'),
(1180, 54, 18, '2024-11-07 06:37:52'),
(1181, 62, 58, '2024-11-07 08:48:52'),
(1182, 54, 58, '2024-11-07 08:48:59'),
(1183, 67, 18, '2024-11-08 13:07:19'),
(1184, 54, 18, '2024-11-08 13:15:17'),
(1185, 66, 18, '2024-11-17 10:22:14'),
(1186, 53, 18, '2024-11-17 10:22:58'),
(1187, 66, 18, '2024-11-17 10:32:44'),
(1188, 37, 18, '2024-11-17 10:33:53'),
(1189, 54, 18, '2024-11-17 10:34:03'),
(1190, 66, 18, '2024-11-17 10:37:30'),
(1191, 66, 18, '2024-11-17 10:41:04'),
(1192, 66, 18, '2024-11-17 10:47:16'),
(1193, 67, 18, '2024-11-17 10:47:33'),
(1194, 67, 18, '2024-11-17 10:48:32'),
(1195, 66, 18, '2024-11-17 12:35:02'),
(1196, 66, 18, '2024-11-19 09:31:24'),
(1197, 66, 18, '2024-11-19 09:32:08'),
(1198, 66, 18, '2024-11-19 09:35:34'),
(1199, 66, 18, '2024-11-19 09:36:13'),
(1200, 66, 18, '2024-11-19 09:36:16'),
(1201, 54, 18, '2024-11-19 09:36:19'),
(1202, 54, 18, '2024-11-19 09:39:26'),
(1203, 51, 18, '2024-11-19 09:40:20'),
(1204, 69, 18, '2024-11-19 10:12:52'),
(1205, 66, 18, '2024-11-19 10:13:29'),
(1206, 69, 18, '2024-11-19 10:14:11'),
(1207, 69, 18, '2024-11-19 10:15:59'),
(1208, 69, 18, '2024-11-19 10:21:32'),
(1209, 69, 18, '2024-11-19 10:22:09'),
(1210, 69, 18, '2024-11-19 10:22:39'),
(1211, 69, 18, '2024-11-19 10:24:32'),
(1212, 69, 18, '2024-11-19 10:24:49'),
(1213, 66, 18, '2024-11-19 10:24:53'),
(1214, 66, 18, '2024-11-19 10:25:09'),
(1215, 44, 18, '2024-11-19 10:26:37'),
(1216, 66, 18, '2024-11-19 10:26:46'),
(1217, 66, 18, '2024-11-19 10:27:40'),
(1218, 70, 18, '2024-11-19 10:51:20'),
(1219, 70, 18, '2024-11-19 10:54:01'),
(1220, 70, 18, '2024-11-19 10:54:17'),
(1221, 70, 18, '2024-11-19 10:56:12'),
(1222, 51, 18, '2024-11-19 11:00:31'),
(1223, 68, 18, '2024-11-21 12:20:06'),
(1224, 54, 18, '2024-11-21 13:02:40'),
(1225, 66, 18, '2024-11-21 13:02:43'),
(1226, 66, 18, '2024-11-21 13:22:44'),
(1227, 53, 18, '2024-11-21 13:24:51'),
(1228, 54, 18, '2024-11-21 13:26:29'),
(1229, 37, 18, '2024-11-22 04:01:33'),
(1230, 44, 18, '2024-11-22 04:05:08'),
(1231, 44, 32, '2024-11-22 04:47:29'),
(1232, 72, 32, '2024-11-22 04:47:37'),
(1233, 35, 32, '2024-11-22 04:48:31'),
(1235, 68, 18, '2024-11-22 07:35:33'),
(1236, 66, 18, '2024-11-22 08:47:23'),
(1237, 72, 18, '2024-11-22 08:49:27'),
(1238, 36, 18, '2024-11-22 08:49:43'),
(1239, 51, 18, '2024-11-22 08:49:55'),
(1240, 54, 18, '2024-11-22 08:53:37'),
(1241, 36, 18, '2024-11-22 08:53:42'),
(1246, 66, 18, '2024-12-22 10:27:56'),
(1247, 38, 18, '2024-12-22 12:16:21'),
(1248, 38, 32, '2024-12-22 12:17:02'),
(1249, 38, 18, '2024-12-22 12:17:30'),
(1250, 66, 18, '2024-12-22 15:02:00'),
(1251, 62, 18, '2024-12-22 15:04:28'),
(1252, 53, 18, '2024-12-23 02:16:12'),
(1253, 53, 18, '2024-12-23 02:17:31'),
(1254, 53, 18, '2024-12-23 02:17:46'),
(1255, 53, 18, '2024-12-23 02:18:28'),
(1256, 53, 18, '2024-12-23 02:21:04'),
(1257, 53, 18, '2024-12-23 02:21:16'),
(1258, 53, 18, '2024-12-23 02:21:23'),
(1259, 53, 18, '2024-12-23 02:21:29'),
(1260, 53, 18, '2024-12-23 02:21:35'),
(1261, 53, 18, '2024-12-23 02:21:50'),
(1262, 53, 18, '2024-12-23 02:23:09'),
(1263, 53, 18, '2024-12-23 02:23:33'),
(1264, 53, 18, '2024-12-23 02:24:46'),
(1265, 53, 18, '2024-12-23 02:24:55'),
(1266, 53, 18, '2024-12-23 02:25:06'),
(1267, 53, 18, '2024-12-23 02:25:23'),
(1268, 53, 18, '2024-12-23 02:25:32'),
(1269, 53, 18, '2024-12-23 02:25:46'),
(1270, 53, 18, '2024-12-23 02:26:14'),
(1271, 53, 18, '2024-12-23 02:27:28'),
(1272, 53, 18, '2024-12-23 02:27:40'),
(1273, 53, 18, '2024-12-23 02:28:35'),
(1274, 53, 18, '2024-12-23 02:28:40'),
(1275, 53, 18, '2024-12-23 02:28:41'),
(1276, 53, 18, '2024-12-23 02:29:19'),
(1277, 53, 18, '2024-12-23 02:30:37'),
(1278, 53, 18, '2024-12-23 02:31:04'),
(1279, 53, 18, '2024-12-23 02:31:10'),
(1280, 53, 18, '2024-12-23 02:34:31'),
(1281, 53, 18, '2024-12-23 02:39:27'),
(1282, 53, 18, '2024-12-23 02:40:44'),
(1283, 51, 18, '2024-12-23 03:06:42'),
(1284, 51, 18, '2024-12-23 03:08:52'),
(1285, 51, 18, '2024-12-23 03:09:03'),
(1286, 51, 18, '2024-12-23 03:10:08'),
(1287, 51, 18, '2024-12-23 03:10:11'),
(1288, 51, 18, '2024-12-23 03:10:52'),
(1289, 51, 18, '2024-12-23 03:10:58'),
(1290, 51, 18, '2024-12-23 03:12:06'),
(1291, 51, 18, '2024-12-23 03:13:10'),
(1292, 51, 18, '2024-12-23 03:15:11'),
(1293, 51, 18, '2024-12-23 03:15:43'),
(1294, 51, 18, '2024-12-23 03:17:22'),
(1295, 51, 18, '2024-12-23 03:17:30'),
(1296, 51, 18, '2024-12-23 03:17:51'),
(1297, 51, 18, '2024-12-23 03:20:35'),
(1298, 51, 18, '2024-12-23 03:20:37'),
(1299, 51, 18, '2024-12-23 03:20:46'),
(1300, 51, 18, '2024-12-23 03:21:40'),
(1301, 51, 18, '2024-12-23 03:21:45'),
(1302, 51, 18, '2024-12-23 03:22:24'),
(1303, 51, 18, '2024-12-23 03:22:36'),
(1304, 51, 18, '2024-12-23 03:22:44'),
(1305, 51, 18, '2024-12-23 03:22:51'),
(1306, 51, 18, '2024-12-23 03:22:56'),
(1307, 51, 18, '2024-12-23 03:23:03'),
(1308, 51, 18, '2024-12-23 03:24:42'),
(1309, 51, 18, '2024-12-23 03:24:58'),
(1310, 51, 18, '2024-12-23 03:25:04'),
(1311, 51, 18, '2024-12-23 03:25:25'),
(1312, 51, 18, '2024-12-23 03:25:30'),
(1313, 53, 18, '2024-12-23 03:30:59'),
(1314, 53, 18, '2024-12-23 03:31:52'),
(1315, 53, 18, '2024-12-23 03:31:58'),
(1316, 53, 18, '2024-12-23 03:32:35'),
(1317, 53, 18, '2024-12-23 03:32:54'),
(1318, 53, 18, '2024-12-23 03:33:01'),
(1319, 53, 18, '2024-12-23 03:35:32'),
(1320, 37, 18, '2024-12-23 03:38:04'),
(1321, 37, 18, '2024-12-23 03:38:21'),
(1322, 37, 18, '2024-12-23 03:38:31'),
(1323, 37, 18, '2024-12-23 03:40:21'),
(1324, 37, 18, '2024-12-23 03:42:07'),
(1325, 37, 18, '2024-12-23 03:42:37'),
(1326, 37, 18, '2024-12-23 03:43:03'),
(1327, 37, 18, '2024-12-23 03:46:55'),
(1328, 37, 18, '2024-12-23 03:47:06'),
(1329, 37, 18, '2024-12-23 03:47:18'),
(1330, 37, 18, '2024-12-23 03:47:38'),
(1331, 37, 18, '2024-12-23 03:47:55'),
(1332, 37, 18, '2024-12-23 03:48:04'),
(1333, 37, 18, '2024-12-23 03:48:17'),
(1334, 37, 18, '2024-12-23 03:53:42'),
(1335, 37, 18, '2024-12-23 03:53:47'),
(1336, 66, 18, '2024-12-23 04:02:23'),
(1337, 66, 18, '2024-12-23 04:02:52'),
(1338, 66, 18, '2024-12-23 04:06:08'),
(1339, 66, 18, '2024-12-23 04:07:10'),
(1340, 72, 18, '2024-12-23 04:08:12'),
(1341, 51, 18, '2024-12-23 04:08:38'),
(1342, 51, 18, '2024-12-23 04:10:52'),
(1343, 51, 18, '2024-12-23 04:12:03'),
(1344, 51, 18, '2024-12-23 04:13:38'),
(1345, 51, 18, '2024-12-23 04:17:09'),
(1346, 51, 18, '2024-12-23 04:17:09'),
(1347, 51, 18, '2024-12-23 04:17:09'),
(1348, 51, 18, '2024-12-23 04:17:30'),
(1349, 51, 18, '2024-12-23 04:18:35'),
(1350, 51, 18, '2024-12-23 04:20:38'),
(1351, 51, 18, '2024-12-23 04:22:03'),
(1352, 51, 18, '2024-12-23 04:27:54'),
(1353, 51, 18, '2024-12-23 04:29:02'),
(1354, 51, 18, '2024-12-23 04:29:22'),
(1355, 51, 18, '2024-12-23 04:31:53'),
(1356, 51, 18, '2024-12-23 04:32:53'),
(1357, 51, 18, '2024-12-23 04:33:17'),
(1358, 51, 18, '2024-12-23 04:33:38'),
(1359, 37, 18, '2024-12-23 04:33:49'),
(1360, 37, 18, '2024-12-23 04:34:43'),
(1361, 37, 18, '2024-12-23 04:37:00'),
(1362, 66, 18, '2024-12-23 04:40:18'),
(1363, 66, 18, '2024-12-23 04:41:06'),
(1364, 66, 18, '2024-12-23 04:41:56'),
(1365, 66, 18, '2024-12-23 04:42:24'),
(1366, 66, 18, '2024-12-23 04:50:52'),
(1367, 66, 18, '2024-12-23 05:51:30'),
(1368, 66, 18, '2024-12-23 05:54:14'),
(1369, 66, 18, '2024-12-23 05:54:44'),
(1370, 66, 18, '2024-12-23 05:56:39'),
(1371, 66, 18, '2024-12-23 05:56:46'),
(1372, 66, 18, '2024-12-23 05:58:20'),
(1373, 66, 18, '2024-12-23 05:58:49'),
(1374, 66, 18, '2024-12-23 06:01:21'),
(1375, 66, 18, '2024-12-23 06:02:02'),
(1376, 66, 18, '2024-12-23 06:02:24'),
(1377, 66, 18, '2024-12-23 06:04:37'),
(1378, 66, 18, '2024-12-23 06:08:04'),
(1379, 66, 18, '2024-12-23 06:09:10'),
(1380, 66, 18, '2024-12-23 06:09:32'),
(1381, 66, 18, '2024-12-23 06:10:07'),
(1382, 66, 18, '2024-12-23 06:10:19'),
(1383, 66, 18, '2024-12-23 06:11:09'),
(1384, 66, 18, '2024-12-23 06:11:22');
INSERT INTO `blogs_views` (`view_id`, `blog_id`, `user_id`, `viewed_at`) VALUES
(1385, 66, 18, '2024-12-23 06:11:42'),
(1386, 66, 18, '2024-12-23 06:12:22'),
(1387, 66, 18, '2024-12-23 06:14:18'),
(1388, 66, 18, '2024-12-23 06:15:29'),
(1389, 66, 18, '2024-12-23 06:15:56'),
(1390, 66, 18, '2024-12-23 06:17:11'),
(1391, 66, 18, '2024-12-23 06:17:33'),
(1392, 66, 18, '2024-12-23 06:19:32'),
(1393, 37, 18, '2024-12-23 06:20:34'),
(1394, 72, 18, '2024-12-23 06:23:09'),
(1395, 72, 18, '2024-12-23 06:25:01'),
(1396, 72, 18, '2024-12-23 06:25:38'),
(1397, 53, 41, '2024-12-23 07:41:28'),
(1398, 53, 41, '2024-12-23 07:41:52'),
(1399, 54, 41, '2024-12-23 07:42:00'),
(1400, 54, 41, '2024-12-23 07:42:13'),
(1401, 54, 41, '2024-12-23 07:42:26'),
(1402, 54, 41, '2024-12-23 07:42:46'),
(1403, 66, 18, '2024-12-23 07:50:05'),
(1404, 53, 18, '2024-12-23 07:50:42'),
(1405, 51, 18, '2024-12-23 07:54:59'),
(1406, 51, 18, '2024-12-23 07:56:25'),
(1407, 51, 18, '2024-12-23 07:56:42'),
(1408, 51, 18, '2024-12-23 07:56:46'),
(1409, 51, 18, '2024-12-23 07:56:57'),
(1410, 51, 18, '2024-12-23 07:58:40'),
(1411, 51, 18, '2024-12-23 07:59:15'),
(1412, 51, 18, '2024-12-23 08:00:48'),
(1413, 51, 18, '2024-12-23 08:01:02'),
(1414, 51, 18, '2024-12-23 08:04:06'),
(1415, 51, 18, '2024-12-23 08:04:51'),
(1416, 51, 18, '2024-12-23 08:06:21'),
(1417, 51, 18, '2024-12-23 08:06:28'),
(1418, 51, 18, '2024-12-23 08:06:36'),
(1419, 51, 18, '2024-12-23 08:06:47'),
(1420, 51, 18, '2024-12-23 08:06:53'),
(1421, 51, 18, '2024-12-23 08:07:23'),
(1422, 51, 18, '2024-12-23 08:07:45'),
(1423, 51, 18, '2024-12-23 08:08:01'),
(1424, 51, 18, '2024-12-23 08:08:07'),
(1425, 51, 18, '2024-12-23 08:10:21'),
(1426, 51, 18, '2024-12-23 08:12:10'),
(1427, 51, 18, '2024-12-23 08:12:49'),
(1428, 51, 18, '2024-12-23 08:12:59'),
(1429, 51, 18, '2024-12-23 08:13:08'),
(1430, 51, 18, '2024-12-23 08:13:23'),
(1431, 51, 18, '2024-12-23 08:13:53'),
(1432, 51, 18, '2024-12-23 08:14:21'),
(1433, 51, 18, '2024-12-23 08:15:14'),
(1434, 51, 18, '2024-12-23 08:15:52'),
(1435, 66, 18, '2024-12-23 08:32:09'),
(1436, 66, 18, '2024-12-23 08:32:21'),
(1437, 66, 18, '2024-12-23 08:32:32'),
(1438, 66, 18, '2024-12-23 08:32:39'),
(1439, 66, 18, '2024-12-23 08:32:44'),
(1440, 66, 18, '2024-12-23 08:33:32'),
(1441, 66, 18, '2024-12-23 08:33:45'),
(1442, 66, 18, '2024-12-23 08:33:54'),
(1443, 66, 18, '2024-12-23 08:34:01'),
(1444, 66, 18, '2024-12-23 08:34:08'),
(1445, 66, 18, '2024-12-23 08:34:15'),
(1446, 66, 18, '2024-12-23 08:34:55'),
(1447, 66, 18, '2024-12-23 08:35:07'),
(1448, 66, 18, '2024-12-23 08:35:18'),
(1449, 66, 18, '2024-12-23 08:35:24'),
(1450, 66, 18, '2024-12-23 08:39:13'),
(1451, 66, 18, '2024-12-23 08:40:16'),
(1452, 66, 18, '2024-12-23 08:40:29'),
(1453, 66, 18, '2024-12-23 08:40:37'),
(1454, 66, 18, '2024-12-23 08:41:19'),
(1455, 66, 18, '2024-12-23 08:42:01'),
(1456, 66, 18, '2024-12-23 08:42:07'),
(1457, 66, 18, '2024-12-23 08:42:15'),
(1458, 66, 18, '2024-12-23 08:42:19'),
(1459, 66, 18, '2024-12-23 08:45:33'),
(1460, 66, 18, '2024-12-23 08:45:39'),
(1461, 66, 18, '2024-12-23 08:46:27'),
(1462, 66, 18, '2024-12-23 08:46:33'),
(1463, 66, 18, '2024-12-23 08:46:44'),
(1464, 53, 18, '2024-12-23 08:48:03'),
(1465, 51, 18, '2024-12-25 01:20:19'),
(1466, 51, 18, '2024-12-25 01:23:09'),
(1467, 51, 18, '2024-12-25 01:24:41'),
(1468, 51, 18, '2024-12-25 01:24:53'),
(1469, 51, 18, '2024-12-25 01:26:20'),
(1470, 51, 18, '2024-12-25 01:26:34'),
(1471, 51, 18, '2024-12-25 01:26:39'),
(1472, 51, 18, '2024-12-25 01:27:01'),
(1473, 51, 18, '2024-12-25 01:27:11'),
(1474, 51, 18, '2024-12-25 01:27:15'),
(1475, 51, 18, '2024-12-25 01:27:23'),
(1476, 51, 18, '2024-12-25 01:27:49'),
(1477, 51, 18, '2024-12-25 01:32:37'),
(1478, 51, 18, '2024-12-25 01:33:58'),
(1479, 51, 18, '2024-12-25 01:34:27'),
(1480, 51, 18, '2024-12-25 01:34:47'),
(1481, 51, 18, '2024-12-25 01:35:01'),
(1482, 51, 18, '2024-12-25 01:36:20'),
(1483, 51, 18, '2024-12-25 01:37:49'),
(1484, 66, 18, '2024-12-25 02:11:20'),
(1485, 66, 18, '2024-12-25 02:11:38'),
(1486, 66, 18, '2024-12-25 02:12:54'),
(1487, 66, 18, '2024-12-25 02:13:25'),
(1488, 66, 18, '2024-12-25 02:13:36'),
(1489, 66, 18, '2024-12-25 02:14:00'),
(1490, 66, 18, '2024-12-25 02:15:35'),
(1491, 66, 18, '2024-12-25 02:15:58'),
(1492, 66, 18, '2024-12-25 02:16:11'),
(1493, 66, 18, '2024-12-25 02:16:50'),
(1494, 66, 18, '2024-12-25 02:17:04'),
(1495, 66, 18, '2024-12-25 02:18:23'),
(1496, 66, 18, '2024-12-25 02:18:45'),
(1497, 66, 18, '2024-12-25 02:18:57'),
(1498, 66, 18, '2024-12-25 02:19:10'),
(1499, 66, 18, '2024-12-25 02:19:27'),
(1500, 66, 18, '2024-12-25 02:19:46'),
(1501, 66, 18, '2024-12-25 02:20:57'),
(1502, 66, 18, '2024-12-25 02:21:19'),
(1503, 66, 18, '2024-12-25 02:21:23'),
(1504, 66, 18, '2024-12-25 02:21:34'),
(1505, 66, 18, '2024-12-25 02:21:57'),
(1506, 66, 18, '2024-12-25 02:24:45'),
(1507, 66, 18, '2024-12-25 02:25:35'),
(1508, 66, 18, '2024-12-25 02:25:45'),
(1509, 66, 18, '2024-12-25 02:33:23'),
(1510, 66, 18, '2024-12-25 02:33:31'),
(1511, 66, 18, '2024-12-25 02:33:38'),
(1512, 66, 18, '2024-12-25 02:33:58'),
(1513, 66, 18, '2024-12-25 02:34:09'),
(1514, 66, 18, '2024-12-25 02:34:52'),
(1515, 66, 18, '2024-12-25 02:35:08'),
(1516, 66, 18, '2024-12-25 02:35:22'),
(1517, 66, 18, '2024-12-25 02:36:42'),
(1518, 66, 18, '2024-12-25 02:39:02'),
(1519, 66, 18, '2024-12-25 02:40:01'),
(1520, 66, 18, '2024-12-25 02:40:27'),
(1521, 66, 18, '2024-12-25 02:41:09'),
(1522, 66, 18, '2024-12-25 02:41:53'),
(1523, 66, 18, '2024-12-25 02:42:13'),
(1524, 66, 18, '2024-12-25 02:42:19'),
(1525, 66, 18, '2024-12-25 02:42:25'),
(1526, 66, 18, '2024-12-25 02:42:31'),
(1527, 66, 18, '2024-12-25 02:42:36'),
(1528, 66, 18, '2024-12-25 02:43:05'),
(1529, 66, 18, '2024-12-25 02:43:12'),
(1530, 66, 18, '2024-12-25 02:43:24'),
(1531, 66, 18, '2024-12-25 02:43:32'),
(1532, 66, 18, '2024-12-25 02:44:00'),
(1533, 66, 18, '2024-12-25 02:45:40'),
(1534, 66, 18, '2024-12-25 02:46:01'),
(1535, 66, 18, '2024-12-25 02:46:17'),
(1536, 66, 18, '2024-12-25 02:46:49'),
(1537, 66, 18, '2024-12-25 02:47:05'),
(1538, 66, 18, '2024-12-25 02:48:34'),
(1539, 66, 18, '2024-12-25 02:49:09'),
(1540, 66, 18, '2024-12-25 02:49:52'),
(1541, 66, 18, '2024-12-25 02:51:16'),
(1542, 66, 18, '2024-12-25 02:51:27'),
(1543, 66, 18, '2024-12-25 02:52:51'),
(1544, 66, 18, '2024-12-25 02:53:12'),
(1545, 66, 18, '2024-12-25 02:53:29'),
(1546, 66, 18, '2024-12-25 02:53:46'),
(1547, 66, 18, '2024-12-25 02:55:10'),
(1548, 66, 18, '2024-12-25 02:55:14'),
(1549, 66, 18, '2024-12-25 02:55:43'),
(1550, 66, 18, '2024-12-25 02:56:21'),
(1551, 66, 18, '2024-12-25 02:57:13'),
(1552, 66, 18, '2024-12-25 02:57:53'),
(1553, 66, 18, '2024-12-25 03:00:05'),
(1554, 66, 18, '2024-12-25 03:07:29'),
(1555, 66, 18, '2024-12-25 03:07:29'),
(1556, 66, 18, '2024-12-25 03:07:29'),
(1557, 66, 18, '2024-12-25 03:09:17'),
(1558, 66, 18, '2024-12-25 03:10:41'),
(1559, 66, 18, '2024-12-25 03:14:59'),
(1560, 66, 18, '2024-12-25 03:15:39'),
(1561, 66, 18, '2024-12-25 03:15:56'),
(1562, 66, 18, '2024-12-25 03:21:50'),
(1563, 66, 18, '2024-12-25 03:23:31'),
(1564, 66, 18, '2024-12-25 03:31:09'),
(1565, 66, 18, '2024-12-25 03:31:40'),
(1566, 66, 18, '2024-12-25 03:32:32'),
(1567, 66, 18, '2024-12-25 03:33:21'),
(1568, 66, 18, '2024-12-25 03:33:47'),
(1569, 66, 18, '2024-12-25 03:33:54'),
(1570, 66, 18, '2024-12-25 03:39:25'),
(1571, 66, 18, '2024-12-25 03:41:02'),
(1572, 66, 18, '2024-12-25 03:41:26'),
(1573, 66, 18, '2024-12-25 03:41:42'),
(1574, 66, 18, '2024-12-25 03:41:48'),
(1575, 66, 18, '2024-12-25 03:42:04'),
(1576, 66, 18, '2024-12-25 03:42:08'),
(1577, 66, 18, '2024-12-25 03:43:23'),
(1578, 66, 18, '2024-12-25 03:43:56'),
(1579, 66, 18, '2024-12-25 03:45:32'),
(1580, 66, 18, '2024-12-25 03:45:49'),
(1581, 66, 18, '2024-12-25 03:46:09'),
(1582, 66, 18, '2024-12-25 03:46:33'),
(1583, 66, 18, '2024-12-25 03:46:55'),
(1584, 66, 18, '2024-12-25 03:47:03'),
(1585, 66, 18, '2024-12-25 03:47:42'),
(1586, 66, 18, '2024-12-25 03:48:04'),
(1587, 66, 18, '2024-12-25 03:48:14'),
(1588, 66, 18, '2024-12-25 03:49:16'),
(1589, 66, 18, '2024-12-25 03:49:29'),
(1590, 66, 18, '2024-12-25 03:50:02'),
(1591, 66, 18, '2024-12-25 03:52:05'),
(1592, 66, 18, '2024-12-25 03:52:14'),
(1593, 66, 18, '2024-12-25 03:52:51'),
(1594, 66, 18, '2024-12-25 03:53:11'),
(1595, 66, 18, '2024-12-25 03:53:26'),
(1596, 66, 18, '2024-12-25 03:54:23'),
(1597, 66, 18, '2024-12-25 03:54:33'),
(1598, 66, 18, '2024-12-25 03:56:12'),
(1599, 66, 18, '2024-12-25 03:56:51'),
(1600, 66, 18, '2024-12-25 03:57:15'),
(1601, 66, 18, '2024-12-25 03:57:22'),
(1602, 66, 18, '2024-12-25 03:57:51'),
(1603, 66, 18, '2024-12-25 03:58:04'),
(1604, 66, 18, '2024-12-25 04:01:03'),
(1605, 66, 18, '2024-12-25 04:01:23'),
(1606, 66, 18, '2024-12-25 04:01:25'),
(1607, 66, 18, '2024-12-25 04:01:34'),
(1608, 66, 18, '2024-12-25 04:01:43'),
(1609, 66, 18, '2024-12-25 04:01:53'),
(1610, 66, 18, '2024-12-25 04:02:11'),
(1611, 66, 18, '2024-12-25 04:02:27'),
(1612, 66, 18, '2024-12-25 04:02:54'),
(1613, 66, 18, '2024-12-25 04:05:20'),
(1614, 66, 18, '2024-12-25 04:05:26'),
(1615, 66, 18, '2024-12-25 04:05:34'),
(1616, 66, 18, '2024-12-25 04:09:55'),
(1617, 66, 18, '2024-12-25 04:10:00'),
(1618, 66, 18, '2024-12-25 04:10:06'),
(1619, 66, 18, '2024-12-25 04:10:16'),
(1620, 66, 18, '2024-12-25 04:10:24'),
(1621, 66, 18, '2024-12-25 04:10:27'),
(1622, 66, 18, '2024-12-25 04:12:26'),
(1623, 66, 18, '2024-12-25 04:12:40'),
(1624, 66, 18, '2024-12-25 04:14:51'),
(1625, 66, 18, '2024-12-25 04:15:02'),
(1626, 66, 18, '2024-12-25 04:15:09'),
(1627, 66, 18, '2024-12-25 04:15:45'),
(1628, 66, 18, '2024-12-25 04:16:02'),
(1629, 66, 18, '2024-12-25 04:16:06'),
(1630, 66, 18, '2024-12-25 04:16:11'),
(1631, 66, 18, '2024-12-25 04:16:15'),
(1632, 66, 18, '2024-12-25 04:16:24'),
(1633, 66, 18, '2024-12-25 04:16:30'),
(1634, 66, 18, '2024-12-25 04:16:38'),
(1635, 66, 18, '2024-12-25 04:16:43'),
(1636, 66, 18, '2024-12-25 04:16:46'),
(1637, 66, 18, '2024-12-25 04:16:53'),
(1638, 66, 18, '2024-12-25 04:16:58'),
(1639, 72, 18, '2024-12-25 06:44:16'),
(1640, 66, 18, '2024-12-25 06:44:35'),
(1641, 66, 18, '2024-12-25 12:05:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blog_likes`
--

CREATE TABLE `blog_likes` (
  `id` int NOT NULL,
  `blog_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blog_likes`
--

INSERT INTO `blog_likes` (`id`, `blog_id`, `user_id`, `created_at`) VALUES
(8, 54, 38, '2024-09-13 04:31:04'),
(46, 53, 39, '2024-09-13 04:42:53'),
(77, 54, 39, '2024-09-13 05:11:27'),
(94, 54, 28, '2024-09-13 05:32:10'),
(105, 38, 18, '2024-09-30 03:53:10'),
(122, 54, 18, '2024-10-08 04:27:18'),
(123, 54, 42, '2024-10-11 06:41:05'),
(129, 44, 18, '2024-10-14 05:24:22'),
(130, 53, 18, '2024-10-21 06:39:13'),
(143, 36, 18, '2024-11-22 08:53:35'),
(147, 51, 18, '2024-12-23 08:30:59'),
(151, 66, 18, '2024-12-23 08:43:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blog_tags`
--

CREATE TABLE `blog_tags` (
  `blog_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blog_tags`
--

INSERT INTO `blog_tags` (`blog_id`, `tag_id`) VALUES
(35, 131),
(36, 131),
(37, 131),
(38, 131),
(44, 131),
(51, 131),
(53, 131),
(54, 131),
(62, 131),
(66, 131),
(67, 131),
(68, 131),
(69, 131),
(70, 131),
(72, 131),
(85, 131),
(35, 132),
(36, 132),
(54, 132),
(67, 132),
(69, 132),
(70, 132),
(72, 132),
(62, 133),
(66, 133),
(67, 133),
(37, 134),
(53, 137),
(68, 138),
(38, 139),
(44, 139),
(51, 140);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `parent_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `parent_id`, `created_at`, `updated_at`, `is_delete`) VALUES
(1, 'Sport', 'không có gì', NULL, '2024-07-21 13:08:18', '2024-10-02 07:00:36', 1),
(4, 'News', 'Latest sports news articles and updates', NULL, '2024-08-13 04:15:46', '2024-11-22 02:45:35', 0),
(5, 'Analysis & Commentary', 'In-depth sports analysis and opinions', NULL, '2024-08-13 04:16:07', '2024-11-22 02:48:33', 0),
(6, 'Health & Fitness', 'Info about health, fitness, and nutrition', NULL, '2024-08-13 04:16:25', '2024-11-22 02:49:09', 0),
(7, 'Behind the Scenes', 'News about athletes off the field', NULL, '2024-08-13 04:16:42', '2024-11-22 02:49:54', 0),
(8, 'Major Events', 'Updates on national and international events', NULL, '2024-08-13 04:16:51', '2024-11-22 02:50:16', 0),
(9, 'Olympic Games', 'News from the Olympic Games', 8, '2024-08-13 04:17:04', '2024-11-22 02:50:59', 0),
(17, 'Paralympic Games', 'News from the Paralympic Games', 8, '2024-09-16 11:08:56', '2024-11-22 02:51:21', 0),
(18, 'Pro', 'fffffffffffff', NULL, '2024-09-16 11:09:05', '2024-10-11 08:35:57', 1),
(19, 'World Championships', 'International sports championship coverage', 8, '2024-09-16 11:09:19', '2024-11-22 02:51:45', 0),
(20, 'Transfers', 'News about player transfers and team changes', 4, '2024-09-16 11:09:30', '2024-11-22 02:55:27', 0),
(21, 'Results & Rankings', 'Updates on match results and rankings', 4, '2024-09-16 11:09:41', '2024-11-22 02:53:57', 0),
(22, 'Highlight Videos', 'Videos featuring memorable moments', 4, '2024-09-16 11:23:41', '2024-11-22 02:54:24', 0),
(23, 'Tactics', 'Tactical analysis of teams and players', 5, '2024-11-22 02:54:52', '2024-11-22 02:54:52', 0),
(24, 'Player Evaluations', 'Performance reviews of athletes', 5, '2024-11-22 03:07:47', '2024-11-22 03:07:47', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `comment_id` int NOT NULL,
  `blog_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`comment_id`, `blog_id`, `user_id`, `content`, `image_url`, `created_at`, `updated_at`, `is_delete`) VALUES
(1, 44, 18, 'Sample content for comment test - 1231', '122222222222222222222233', '2024-08-03 06:09:35', '2024-10-23 03:50:27', 0),
(3, 35, 18, 'chào em nha', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Fz5705147606196_a8ab3fd4721a6cbeb41c3989ac7e38fe.jpg?alt=media&token=ff377f8f-e29f-4419-b4ee-f4ad472cb6e2', '2024-08-08 03:48:28', '2024-08-08 03:48:28', 0),
(6, 44, 18, 'hehe123', '', '2024-08-08 05:16:40', '2024-08-08 05:17:03', 0),
(10, 51, 18, 'chào', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Fpokemon4.jpg?alt=media&token=b471c278-2e8d-4b9c-aa70-49cebb30f7df', '2024-08-10 05:52:30', '2024-08-10 05:52:30', 0),
(16, 54, 20, 'hêlo', '', '2024-08-12 08:05:43', '2024-08-12 08:05:43', 0),
(18, 54, 18, 'ádasdasd1234', '', '2024-08-12 14:56:30', '2024-10-25 05:30:25', 1),
(31, 54, NULL, 'chào', '', '2024-08-13 05:34:38', '2024-08-13 05:34:38', 0),
(33, 54, 25, 'chào em', '', '2024-08-13 06:13:57', '2024-08-13 06:13:57', 0),
(35, 53, 37, 'hi', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Fblog_the_thao.sql?alt=media&token=e5336281-93bb-4c8b-b857-7d942d4102e1', '2024-08-15 07:54:01', '2024-08-15 07:54:01', 0),
(37, 54, 18, 'Sample comment 1', NULL, '2024-10-08 06:25:08', '2024-10-25 05:41:48', 1),
(38, 54, 18, 'Sample comment 2', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(39, 54, 18, 'Sample comment 3', NULL, '2024-10-08 06:25:08', '2024-10-25 05:41:46', 1),
(40, 54, 18, 'Sample comment 4', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(41, 54, 18, 'Sample comment 5', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(42, 54, 18, 'Sample comment 6', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(43, 54, 18, 'Sample comment 7', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(44, 54, 18, 'Sample comment 8', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(45, 54, 18, 'Sample comment 9', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(46, 54, 18, 'Sample comment 10', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(47, 54, 18, 'Sample comment 11', NULL, '2024-10-08 06:25:08', '2024-10-25 05:39:56', 1),
(48, 54, 18, 'Sample comment 12', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(49, 54, 18, 'Sample comment 13', NULL, '2024-10-08 06:25:08', '2024-10-25 05:40:02', 1),
(50, 54, 18, 'Sample comment 14', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(51, 54, 18, 'Sample comment 15', NULL, '2024-10-08 06:25:08', '2024-10-08 06:25:08', 0),
(52, 54, 18, 'Sample comment 16', NULL, '2024-10-08 06:25:08', '2024-10-25 05:22:45', 1),
(53, 54, 18, 'Sample comment 17', NULL, '2024-10-08 06:25:08', '2024-10-25 05:26:58', 1),
(54, 54, 18, 'Sample comment 18', NULL, '2024-10-08 06:25:08', '2024-10-25 05:42:56', 1),
(55, 54, 18, 'Sample comment 19', NULL, '2024-10-08 06:25:08', '2024-10-25 05:43:06', 1),
(56, 54, 18, 'Sample comment 20', NULL, '2024-10-08 06:25:08', '2024-10-25 05:43:05', 1),
(59, 54, 18, 'adad', '', '2024-10-11 02:52:43', '2024-10-11 02:52:43', 0),
(60, 54, 18, '11/10/2024', '', '2024-10-11 02:53:01', '2024-10-11 02:53:01', 0),
(61, 54, 18, 'ad', '', '2024-10-11 02:56:34', '2024-10-11 02:56:34', 0),
(63, 54, 18, 'Hello mọi người', '', '2024-10-11 03:15:24', '2024-10-25 05:33:11', 1),
(64, 54, 18, 'Most Developers Failed with this Senior-Level Python Interview Question', '', '2024-10-11 03:16:59', '2024-10-25 05:33:00', 1),
(65, 54, 18, 'Most Developers Failed with this Senior-Level Python Interview Question\nada\naddsdMost Developers Failed with this Senior-Level Python Interview Question', '', '2024-10-11 03:17:07', '2024-10-25 05:22:38', 1),
(68, 54, 55, 'e', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Fdefault.jpg?alt=media&token=7e9e6f33-bd74-43c2-b381-412b54de89f9', '2024-10-11 04:14:55', '2024-10-11 04:14:55', 0),
(69, 54, 55, '\"Tôi chưa bao giờ chỉ đạo các cá nhân\", Priestman trần tình. \"Tôi vẫn đang tìm hiểu chi tiết và rõ ràng mọi chuyện đã diễn ra. Nhưng một lần nữa, tôi nghĩ điều quan trọng lúc này là nhìn về phía trước, đưa ra các hành động và thực hiện các biện pháp kỷ luật\".\n\nCanada xếp thứ tám thế giới và là đương kim vô địch Olympic khi giành HC vàng tại Tokyo 2020, trong khi New Zealand xếp hạng thứ 28. Ngoài Canada và New Zealand, bảng A môn bóng đá nữ Olympic Paris 2024 còn có chủ nhà Pháp và Colombia.', '', '2024-10-11 04:15:37', '2024-10-11 04:15:37', 0),
(72, 35, 18, 'Djokovic (trái) và Nadal chụp ảnh trước trận đấu trên sân Philippe Chatrier.\n\nHai tay vợt chuẩn bị bước vào sân Philippe Chatrier\n\n\nimage-2024-07-29-184304375-172-8464-9559\nNadal (trước) và Djokovic trong đường hầm sân chính Philippe Chatrier. Ảnh chụp màn hình  \n\nPeople who liked this post: 0\nDo you like this post?', '', '2024-10-11 05:54:46', '2024-10-11 05:54:46', 0),
(73, 35, 18, 'Nadal thua liền bốn game\nNadal khởi đầu đuối hơn hẳn Djokovic và tiếp tục phải cứu break-point trong game giao bóng, khi bị dẫn 0-3, 30-40. Ở một pha đấu trí trên lưới, Nadal cài bóng chéo sân ngoài tầm với Nole, cân bằng tỷ số 40-40.\n\nỞ điểm tiếp theo, hai tay vợt tiếp tục cống hiến màn đọ sức đỉnh cao trên lưới, với phần thắng thuộc về Djokovic sau pha vô-lê ghi winner. Ở break-point tiếp theo, Djokovic chơi đẹp khi chủ động phủ quyết trọng tài dây. Nole tự xác nhận bóng của Nadal trong sân mà không cần trọng tài chính xuống kiểm tra.\n\nNole có break-point thứ ba trong game, sau một điểm winner trái tay dọc dây. Nadal không thể giữ game, sau khi đánh bóng trúng cạnh vợt. Djokovic dẫn 4-0.', '', '2024-10-11 05:55:40', '2024-10-11 05:55:40', 0),
(74, 37, 18, 'ad', '', '2024-10-14 03:30:18', '2024-10-14 03:30:18', 0),
(75, 37, 18, 'sd', '', '2024-10-14 03:30:20', '2024-10-14 03:30:20', 0),
(76, 37, 18, 'aaaaaaaaaa', '', '2024-10-14 03:30:21', '2024-10-14 03:30:21', 0),
(77, 37, 18, 'sdd', '', '2024-10-14 03:30:23', '2024-10-14 03:30:23', 0),
(78, 37, 18, 'sada', '', '2024-10-14 03:30:24', '2024-10-14 03:30:24', 0),
(79, 37, 18, 'ad', '', '2024-10-14 03:30:26', '2024-10-14 03:30:26', 0),
(80, 37, 18, 'a', '', '2024-10-14 03:30:27', '2024-10-14 03:30:27', 0),
(81, 37, 18, 'd', '', '2024-10-14 03:30:28', '2024-10-14 03:30:28', 0),
(82, 37, 18, 's', '', '2024-10-14 03:30:29', '2024-10-14 03:30:29', 0),
(83, 37, 18, 'ds', '', '2024-10-14 03:30:30', '2024-10-14 03:30:30', 0),
(84, 37, 18, 'ddâda', '', '2024-10-14 03:30:33', '2024-10-14 03:30:33', 0),
(85, 53, 18, 'abc\n', '', '2024-10-14 05:11:27', '2024-10-25 05:21:50', 1),
(86, 53, 18, 'abc\n', '', '2024-10-14 05:11:27', '2024-10-25 05:21:47', 1),
(87, 53, 18, 'abc\n', '', '2024-10-14 05:11:27', '2024-10-25 05:21:45', 1),
(88, 53, 18, 'abc\n', '', '2024-10-14 05:11:27', '2024-10-25 05:18:52', 1),
(89, 53, 18, 'abc\n', '', '2024-10-14 05:11:27', '2024-10-25 05:18:22', 1),
(90, 53, 18, 'abc\n', '', '2024-10-14 05:11:27', '2024-10-25 05:18:15', 1),
(92, 44, 18, 'ada', '', '2024-10-14 05:18:34', '2024-10-14 05:18:34', 0),
(98, 53, 18, 'Hello\n', '', '2024-10-14 06:00:38', '2024-10-25 05:22:00', 1),
(99, 53, 18, 'alo\n', '', '2024-10-14 06:00:53', '2024-10-25 05:21:39', 1),
(100, 53, 18, 'adad', '', '2024-10-14 06:04:45', '2024-10-14 06:04:45', 0),
(103, 53, 18, '1', '', '2024-10-14 06:31:52', '2024-10-14 06:31:52', 0),
(104, 53, 18, '2', '', '2024-10-14 06:31:54', '2024-10-25 05:21:32', 1),
(105, 53, 18, '3', '', '2024-10-14 06:31:55', '2024-10-14 06:31:55', 0),
(106, 53, 18, '4', '', '2024-10-14 06:31:56', '2024-10-25 05:21:27', 1),
(107, 53, 18, '5', '', '2024-10-14 06:31:57', '2024-10-25 05:21:22', 1),
(108, 53, 18, '6', '', '2024-10-14 06:31:58', '2024-10-25 05:19:53', 1),
(109, 53, 18, '2', '', '2024-10-14 06:32:00', '2024-10-25 05:13:45', 1),
(110, 53, 18, 'abc1', '', '2024-10-14 06:41:37', '2024-10-25 05:16:10', 1),
(111, 53, 18, 'ad', '', '2024-10-14 06:41:50', '2024-10-25 05:13:36', 1),
(112, 53, 18, 'ad', '', '2024-10-14 06:41:50', '2024-10-25 05:19:02', 1),
(113, 53, 18, 'da', '', '2024-10-14 06:43:29', '2024-10-25 05:13:26', 1),
(114, 53, 18, 'E:PP\n', '', '2024-10-14 06:43:41', '2024-10-25 05:17:54', 1),
(116, 53, 18, 'ee', '', '2024-10-14 06:44:53', '2024-10-25 05:15:02', 1),
(133, 62, 18, 'Hai tay vợt chuẩn bị bước vào sân Philippe Chatrier\n\n\nimage-2024-07-29-184304375-172-8464-9559\nNadal (trước) và Djokovic trong đường hầm sân chính Philippe Chatrier. Ảnh chụp màn hình ', '', '2024-10-21 06:42:06', '2024-10-21 06:42:06', 0),
(144, 62, 18, 'Hai tay vợt chuẩn bị bước vào sân Philippe Chatrier\n\n\nimage-2024-07-29-184304375-172-8464-9559\nNadal (trước) và Djokovic trong đường hầm sân chính Philippe Chatrier. Ảnh chụp màn hình ', '', '2024-10-21 06:43:01', '2024-10-21 06:43:01', 0),
(145, 62, 18, 'Thành tích đối đầu là 30-29 nghiêng về Djokovic.\n\n\n\nScreenshot-2024-07-29-184459-9648-172225\nDjokovic (trái) và Nadal chụp ảnh trước trận đấu trên sân Philippe Chatrier.\n\nHai tay vợt chuẩn bị bước vào sân Philippe Chatrier\n', '', '2024-10-21 06:43:09', '2024-10-21 06:43:09', 0),
(148, 54, 57, 'ad', '', '2024-10-25 03:17:56', '2024-10-25 03:45:48', 1),
(150, 54, 57, 'ewe', '', '2024-10-25 03:45:56', '2024-10-25 03:46:02', 1),
(151, 54, 57, 'ae', '', '2024-10-25 03:50:20', '2024-10-25 03:50:22', 1),
(152, 54, 57, 'hello', '', '2024-10-25 03:51:17', '2024-10-25 03:51:19', 1),
(153, 54, 57, 'đâ', '', '2024-10-25 03:51:25', '2024-10-25 03:52:24', 1),
(154, 54, 57, 'e', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Fimages%20-%20Copy.jpg?alt=media&token=29021ea8-a364-456c-bdde-b49d7442a563', '2024-10-25 03:51:37', '2024-10-25 03:52:21', 1),
(155, 54, 57, 'halo', '', '2024-10-25 03:52:45', '2024-10-25 03:52:45', 0),
(156, 53, 57, 'e', '', '2024-10-25 04:37:35', '2024-10-25 04:37:35', 0),
(157, 53, 57, 'Vai chuong', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2FGiai-Nhi-1--Nang-Tre.jpg?alt=media&token=4d8be313-2be3-4306-b6b3-848b47ae8e14', '2024-10-25 04:56:53', '2024-10-25 04:56:53', 0),
(158, 53, 18, 'da', '', '2024-10-25 05:20:07', '2024-10-25 05:20:08', 1),
(159, 54, 18, 'da', '', '2024-10-25 05:27:07', '2024-10-25 05:27:07', 0),
(160, 54, 18, 'da', '', '2024-10-25 05:29:26', '2024-10-25 05:34:19', 1),
(161, 54, 18, 'da', '', '2024-10-25 05:29:32', '2024-10-25 05:29:32', 0),
(162, 54, 18, 'Cda', '', '2024-10-25 05:31:22', '2024-10-25 05:31:22', 0),
(163, 54, 18, 'ad', '', '2024-10-25 05:31:29', '2024-10-25 05:31:29', 0),
(164, 54, 18, 'da', '', '2024-10-25 05:31:47', '2024-10-25 05:31:47', 0),
(165, 54, 18, 'da', '', '2024-10-25 05:32:11', '2024-10-25 05:32:14', 1),
(166, 54, 18, 'dada', '', '2024-10-25 05:33:29', '2024-10-25 05:33:29', 0),
(167, 54, 18, 'wqeqe', '', '2024-10-25 05:33:36', '2024-10-25 05:34:41', 1),
(168, 54, 18, 'da', '', '2024-10-25 05:33:59', '2024-10-25 05:34:15', 1),
(169, 54, 18, 'da', '', '2024-10-25 05:35:13', '2024-10-25 05:35:13', 0),
(170, 54, 18, 'da', '', '2024-10-25 05:36:03', '2024-10-25 05:36:03', 0),
(171, 54, 18, 'da', '', '2024-10-25 05:36:22', '2024-10-25 05:36:22', 0),
(172, 54, 18, 'da', '', '2024-10-25 05:36:26', '2024-10-25 05:36:26', 0),
(173, 54, 18, 'da', '', '2024-10-25 05:36:58', '2024-10-25 05:43:25', 1),
(174, 54, 18, 'da', '', '2024-10-25 05:37:22', '2024-10-25 05:39:57', 1),
(175, 54, 18, 'da', '', '2024-10-25 05:40:40', '2024-10-25 05:43:26', 1),
(176, 54, 18, 'da', '', '2024-10-25 05:42:26', '2024-10-25 05:42:26', 0),
(177, 54, 18, 'da', '', '2024-10-25 05:42:36', '2024-10-25 05:42:36', 0),
(178, 53, 18, 'da', '', '2024-10-25 05:44:27', '2024-10-25 05:44:27', 0),
(179, 53, 18, 'da', '', '2024-10-25 05:44:29', '2024-10-25 05:44:29', 0),
(180, 53, 18, 'da', '', '2024-10-25 05:44:30', '2024-10-25 05:44:30', 0),
(181, 53, 18, 'da', '', '2024-10-25 05:44:31', '2024-10-25 05:44:31', 0),
(182, 53, 18, 'da', '', '2024-10-25 05:44:32', '2024-10-25 05:44:32', 0),
(183, 53, 18, 'da', '', '2024-10-25 05:44:33', '2024-10-25 05:44:33', 0),
(184, 53, 18, 'da', '', '2024-10-25 05:44:34', '2024-10-25 05:44:34', 0),
(185, 53, 18, 'da', '', '2024-10-25 05:44:47', '2024-10-25 05:44:47', 0),
(186, 53, 18, 'uow', '', '2024-10-25 05:46:04', '2024-10-25 05:46:04', 0),
(187, 36, 57, 'e\n', '', '2024-10-25 07:22:27', '2024-10-25 07:22:27', 0),
(188, 54, 18, 'hi', '', '2024-11-08 13:15:15', '2024-11-08 13:15:15', 0),
(189, 66, 18, 'hello em', '', '2024-11-17 12:35:00', '2024-11-17 12:35:00', 0),
(190, 38, 18, 'chào em nha\n', '', '2024-12-22 12:16:43', '2024-12-22 12:16:43', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `follow`
--

CREATE TABLE `follow` (
  `id` int NOT NULL,
  `follower_id` int NOT NULL,
  `followed_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `follow`
--

INSERT INTO `follow` (`id`, `follower_id`, `followed_id`, `created_at`) VALUES
(12, 23, 18, '2024-09-25 15:32:07'),
(18, 23, 28, '2024-09-26 15:01:02'),
(22, 23, 41, '2024-09-26 21:02:16'),
(24, 36, 18, '2024-09-27 22:23:37'),
(26, 40, 18, '2024-09-27 22:42:59'),
(27, 28, 18, '2024-09-27 22:53:24'),
(32, 36, 28, '2024-09-27 16:19:08'),
(36, 41, 20, '2024-09-26 20:58:50'),
(54, 28, 40, '2024-09-26 22:29:58'),
(56, 41, 23, '2024-09-26 22:55:22'),
(57, 41, 25, '2024-09-26 22:55:23'),
(102, 18, 40, '2024-09-27 13:09:20'),
(241, 18, 23, '2024-10-05 13:11:33'),
(243, 18, 20, '2024-10-08 09:32:05'),
(245, 18, 41, '2024-10-08 09:33:38'),
(255, 32, 38, '2024-11-22 12:16:32'),
(256, 32, 18, '2024-11-22 12:16:33'),
(258, 18, 32, '2024-12-22 19:18:00'),
(259, 18, 36, '2024-12-23 11:08:22'),
(260, 18, 28, '2024-12-23 11:08:23'),
(261, 18, 39, '2024-12-23 13:18:42'),
(262, 39, 18, '2024-12-23 13:19:17'),
(263, 55, 18, '2024-12-23 13:19:17'),
(264, 18, 55, '2024-12-23 13:19:27'),
(265, 41, 18, '2024-12-23 14:40:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `blog_id` int DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `blog_id`, `message`, `timestamp`) VALUES
(533, 18, 23, 37, 'hi', '2024-12-23 11:36:24'),
(534, 18, 36, 37, 'cc', '2024-12-23 11:37:02'),
(535, 18, 23, 66, 'hi', '2024-12-23 11:40:14'),
(536, 18, 36, 66, 'hi', '2024-12-23 11:40:14'),
(537, 18, 28, 66, 'hi', '2024-12-23 11:42:43'),
(538, 18, 23, 66, 'xin chào', '2024-12-23 12:54:14'),
(539, 18, 23, 66, 'hi', '2024-12-23 12:54:38'),
(540, 18, 23, 66, 'hi', '2024-12-23 12:56:27'),
(541, 18, 36, 66, 'cc', '2024-12-23 12:56:38'),
(542, 18, 23, 66, 'đxxxc', '2024-12-23 12:58:13'),
(543, 18, 23, 66, 'ccc', '2024-12-23 13:02:01'),
(544, 18, 23, 66, 'sdaf', '2024-12-23 13:07:54'),
(545, 18, 36, 66, 'dddd', '2024-12-23 13:11:39'),
(546, 18, 40, 37, NULL, '2024-12-23 13:22:25'),
(547, 18, 23, 72, NULL, '2024-12-23 13:25:59'),
(548, 41, 18, 53, 'coi đi đồ rẻ jack', '2024-12-23 14:41:34'),
(549, 41, 18, 54, NULL, '2024-12-23 14:41:53'),
(550, 41, 23, 54, NULL, '2024-12-23 14:41:54'),
(551, 41, 23, 54, NULL, '2024-12-23 14:42:12'),
(552, 41, 23, 54, NULL, '2024-12-23 14:42:18'),
(553, 18, 41, 51, 'coi đi', '2024-12-23 15:01:27'),
(554, 18, 41, 51, NULL, '2024-12-23 15:02:22'),
(555, 18, 36, 51, NULL, '2024-12-23 15:02:22'),
(556, 18, 23, 51, NULL, '2024-12-23 15:03:59'),
(557, 18, 23, 53, 'Đọc bài viết mới nhất đi', '2024-12-23 15:48:08'),
(558, 18, 28, 66, 'sfdasf', '2024-12-25 19:05:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `follower_id` int NOT NULL,
  `blog_id` int DEFAULT NULL,
  `author_id` int NOT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint NOT NULL DEFAULT '0',
  `is_hidden` tinyint NOT NULL DEFAULT '0',
  `notification_type` enum('comment','like','follow','message') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'comment'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `follower_id`, `blog_id`, `author_id`, `content`, `created_at`, `is_read`, `is_hidden`, `notification_type`) VALUES
(13, 18, 38, 20, '', '2024-10-30 07:40:43', 0, 0, 'comment'),
(14, 23, 66, 18, '', '2024-11-07 06:34:23', 0, 0, 'follow'),
(15, 36, 66, 18, '', '2024-11-07 06:34:23', 0, 0, 'follow'),
(16, 40, 66, 18, '', '2024-11-07 06:34:23', 0, 0, 'follow'),
(17, 28, 66, 18, '', '2024-11-07 06:34:23', 0, 0, 'follow'),
(18, 23, 67, 18, '', '2024-11-07 06:46:40', 0, 0, 'follow'),
(19, 36, 67, 18, '', '2024-11-07 06:46:40', 0, 0, 'comment'),
(20, 40, 67, 18, '', '2024-11-07 06:46:40', 0, 0, 'comment'),
(21, 28, 67, 18, '', '2024-11-07 06:46:40', 0, 0, 'comment'),
(22, 23, 68, 18, '', '2024-11-07 06:52:17', 0, 0, 'comment'),
(23, 36, 68, 18, '', '2024-11-07 06:52:17', 0, 0, 'follow'),
(24, 40, 68, 18, '', '2024-11-07 06:52:17', 0, 0, 'follow'),
(25, 28, 68, 18, '', '2024-11-07 06:52:17', 0, 0, 'follow'),
(26, 23, 69, 18, '', '2024-11-08 12:57:27', 0, 0, 'follow'),
(27, 36, 69, 18, '', '2024-11-08 12:57:27', 0, 0, 'follow'),
(28, 40, 69, 18, '', '2024-11-08 12:57:27', 0, 0, 'follow'),
(29, 28, 69, 18, '', '2024-11-08 12:57:27', 0, 0, 'follow'),
(30, 18, 68, 39, '', '2024-10-30 00:40:43', 0, 0, 'follow'),
(31, 18, 66, 18, '', '2024-11-06 23:34:23', 1, 0, 'follow'),
(32, 18, 62, 36, '', '2024-11-06 23:34:23', 0, 0, 'follow'),
(33, 18, 62, 37, '', '2024-11-06 23:34:23', 0, 0, 'follow'),
(34, 18, 53, 23, '', '2024-11-06 23:34:23', 0, 0, 'follow'),
(35, 18, 54, 56, '', '2024-11-06 23:46:40', 0, 0, 'follow'),
(36, 18, 53, 38, '', '2024-11-06 23:46:40', 0, 0, 'follow'),
(37, 18, 54, 23, '', '2024-11-06 23:46:40', 0, 0, 'follow'),
(38, 18, 67, 56, '', '2024-11-06 23:46:40', 0, 0, 'follow'),
(39, 18, 38, 57, '', '2024-11-06 23:52:17', 0, 0, 'follow'),
(40, 18, 54, 20, '', '2024-11-06 23:52:17', 0, 0, 'follow'),
(44, 36, 69, 18, '', '2024-11-08 05:57:27', 0, 0, 'follow'),
(45, 40, 69, 18, '', '2024-11-08 05:57:27', 0, 0, 'follow'),
(46, 41, 68, 20, '', '2024-11-08 05:57:27', 0, 0, 'follow'),
(47, 23, 70, 18, '', '2024-11-19 10:50:45', 0, 0, 'follow'),
(48, 36, 70, 18, '', '2024-11-19 10:50:45', 0, 0, 'follow'),
(49, 40, 70, 18, '', '2024-11-19 10:50:45', 0, 0, 'follow'),
(50, 28, 70, 18, '', '2024-11-19 10:50:45', 0, 0, 'follow'),
(51, 23, 71, 18, '', '2024-11-20 15:08:44', 0, 0, 'follow'),
(52, 36, 71, 18, '', '2024-11-20 15:08:44', 0, 0, 'follow'),
(53, 40, 71, 18, '', '2024-11-20 15:08:44', 0, 0, 'follow'),
(54, 28, 71, 18, '', '2024-11-20 15:08:44', 0, 0, 'follow'),
(55, 23, 72, 18, '', '2024-11-20 15:09:17', 0, 0, 'follow'),
(56, 36, 72, 18, '', '2024-11-20 15:09:17', 0, 0, 'follow'),
(57, 40, 72, 18, '', '2024-11-20 15:09:17', 0, 0, 'follow'),
(58, 28, 72, 18, '', '2024-11-20 15:09:17', 0, 0, 'follow'),
(81, 18, 51, 41, '', '2024-12-20 06:54:55', 1, 0, 'message'),
(83, 18, 38, 57, '', '2024-12-22 08:14:09', 1, 0, 'comment'),
(85, 18, NULL, 41, 'Mà gợi ý để làm gì vậy em', '2024-12-22 08:24:50', 1, 0, 'message'),
(86, 32, 38, 18, 'comment', '2024-12-22 12:16:43', 1, 0, 'comment'),
(87, 18, NULL, 41, 'hj', '2024-12-22 12:18:33', 0, 0, 'message'),
(88, 41, NULL, 18, 'thằng ngu này gợi ý là gì', '2024-12-22 12:19:25', 0, 0, 'message'),
(89, 41, NULL, 18, 'dell biết', '2024-12-22 12:19:42', 0, 0, 'message'),
(90, 18, 37, 23, 'hi', '2024-12-23 04:36:24', 0, 0, 'message'),
(91, 18, 37, 36, 'cc', '2024-12-23 04:37:02', 0, 0, 'message'),
(92, 18, 66, 23, 'hi', '2024-12-23 04:40:14', 0, 0, 'message'),
(93, 18, 66, 36, 'hi', '2024-12-23 04:40:14', 0, 0, 'message'),
(94, 18, 66, 28, 'hi', '2024-12-23 04:42:43', 0, 0, 'message'),
(95, 18, 66, 23, 'xin chào', '2024-12-23 05:54:14', 0, 0, 'message'),
(96, 18, 66, 23, 'hi', '2024-12-23 05:54:38', 0, 0, 'message'),
(97, 18, 66, 23, 'hi', '2024-12-23 05:56:27', 0, 0, 'message'),
(98, 18, 66, 36, 'cc', '2024-12-23 05:56:38', 0, 0, 'message'),
(99, 18, 66, 23, 'đxxxc', '2024-12-23 05:58:13', 0, 0, 'message'),
(100, 18, 66, 23, 'ccc', '2024-12-23 06:02:01', 0, 0, 'message'),
(101, 18, 66, 23, 'sdaf', '2024-12-23 06:07:54', 0, 0, 'message'),
(102, 18, 66, 36, 'dddd', '2024-12-23 06:11:39', 0, 0, 'message'),
(103, 18, 37, 40, NULL, '2024-12-23 06:22:25', 0, 0, 'message'),
(104, 18, 72, 23, NULL, '2024-12-23 06:25:59', 0, 0, 'message'),
(105, 41, 53, 18, 'coi đi đồ rẻ jack', '2024-12-23 07:41:34', 0, 0, 'message'),
(106, 41, 54, 18, NULL, '2024-12-23 07:41:53', 0, 0, 'message'),
(107, 41, 54, 23, NULL, '2024-12-23 07:41:54', 0, 0, 'message'),
(108, 41, 54, 23, NULL, '2024-12-23 07:42:12', 0, 0, 'message'),
(109, 41, 54, 23, NULL, '2024-12-23 07:42:18', 0, 0, 'message'),
(110, 18, 51, 41, 'coi đi', '2024-12-23 08:01:27', 0, 0, 'message'),
(111, 18, 51, 41, NULL, '2024-12-23 08:02:22', 0, 0, 'message'),
(112, 18, 51, 36, NULL, '2024-12-23 08:02:22', 0, 0, 'message'),
(113, 18, 51, 23, NULL, '2024-12-23 08:03:59', 0, 0, 'message'),
(114, 18, 53, 23, 'Đọc bài viết mới nhất đi', '2024-12-23 08:48:08', 0, 0, 'message'),
(115, 18, 66, 28, 'sfdasf', '2024-12-25 12:05:21', 0, 0, 'message');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications_blogs`
--

CREATE TABLE `notifications_blogs` (
  `notification_id` int NOT NULL,
  `user_id` int NOT NULL,
  `blog_id` int NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications_blogs`
--

INSERT INTO `notifications_blogs` (`notification_id`, `user_id`, `blog_id`, `reason`, `created_at`, `is_read`) VALUES
(23, 38, 71, 'Bài viết không liên quan đến thể thao.', '2024-12-22 19:23:02', 0),
(24, 18, 85, 'Bài viết không liên quan đến thể thao.', '2024-12-22 19:23:07', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification_preferences`
--

CREATE TABLE `notification_preferences` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `author_id` int NOT NULL,
  `notification_disabled` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otps`
--

CREATE TABLE `otps` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `otp` varchar(6) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `parent_comment`
--

CREATE TABLE `parent_comment` (
  `parent_comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0',
  `reply_to_user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `parent_comment`
--

INSERT INTO `parent_comment` (`parent_comment_id`, `user_id`, `comment_id`, `content`, `image_url`, `created_at`, `updated_at`, `is_delete`, `reply_to_user_id`) VALUES
(16, 18, 1, 'Sample content for comment 1 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 05:54:47', 0, 20),
(18, 20, 3, 'Sâmdadadple content for comment 3 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 05:55:21', 0, 18),
(19, 20, 3, 'Sample content for comment 3 - Second', NULL, '2024-10-23 03:49:37', '2024-10-24 04:11:07', 0, 18),
(20, 23, 6, 'Sample content for comment 6 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 04:03:15', 0, 23),
(21, 23, 6, 'Sample content for comment 6 - Second', NULL, '2024-10-23 03:49:37', '2024-10-24 04:03:15', 0, 23),
(22, 25, 10, 'Sample content for comment 10 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 05:55:43', 0, 18),
(23, 25, 10, 'Sample content for comment 10 - Second', NULL, '2024-10-23 03:49:37', '2024-10-24 05:55:41', 0, 23),
(24, 28, 18, 'Sample content for comment 18 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 04:03:15', 0, 28),
(25, 28, 18, 'Sample content for comment 18 - Second', NULL, '2024-10-23 03:49:37', '2024-10-24 05:55:56', 0, 25),
(26, 18, 35, 'Sample content for comment 35 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 04:03:15', 0, 18),
(27, 18, 35, 'Sample content for comment 35 - Second', NULL, '2024-10-23 03:49:37', '2024-10-24 04:03:15', 0, 18),
(28, 20, 49, 'Sample content for comment 49 - First', NULL, '2024-10-23 03:49:37', '2024-10-24 04:03:15', 0, 20),
(29, 20, 49, 'Sample content for comment 49 - Second', NULL, '2024-10-23 03:49:37', '2024-10-24 05:56:09', 0, 56),
(48, 18, 1, 'Sample content for comment 1 - First', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:04', 0, 20),
(49, 18, 1, 'Sample content for comment 1 - Second', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:07', 0, 20),
(50, 20, 6, 'Sample content for comment 2 - First', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:52', 0, 25),
(51, 20, 6, 'Sample content for comment 2 - Second', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:46', 0, 18),
(52, 23, 3, 'Sample content for comment 3 - First', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:29', 0, 18),
(53, 23, 3, 'Sample content for comment 3 - Second', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:33', 0, 20),
(54, 25, 10, 'Sample content for comment 4 - First', NULL, '2024-10-23 04:44:28', '2024-10-24 05:55:38', 0, 23),
(55, 25, 10, 'Sample content for comment 4 - Second', NULL, '2024-10-23 04:44:28', '2024-10-24 04:03:15', 0, 25),
(60, 20, 3, 'Sample content for comment 3 - First', NULL, '2024-10-24 05:16:52', '2024-10-24 05:16:52', 0, 20),
(64, 18, 116, 'ad', '', '2024-10-24 05:22:44', '2024-10-24 05:22:44', 0, 18),
(65, 18, 145, 'Hay vl', '', '2024-10-24 05:23:13', '2024-10-24 05:23:13', 0, 18),
(66, 18, 145, 'Đỉnh vl', '', '2024-10-24 05:23:39', '2024-10-24 05:23:39', 0, 18),
(67, 18, 145, 'ad', '', '2024-10-24 05:25:59', '2024-10-24 05:25:59', 0, 18),
(68, 18, 145, 'ada', '', '2024-10-24 05:30:18', '2024-10-24 05:30:18', 0, 18),
(69, 18, 145, 'ad', '', '2024-10-24 05:32:01', '2024-10-24 05:32:01', 0, 18),
(70, 18, 144, 'da', '', '2024-10-24 05:32:07', '2024-10-24 05:32:07', 0, 18),
(71, 18, 145, 'ad', '', '2024-10-24 05:33:24', '2024-10-24 05:33:24', 0, 18),
(72, 18, 3, 'e', '', '2024-10-24 05:33:53', '2024-10-24 05:33:53', 0, 18),
(73, 56, 114, 'hay', '', '2024-10-24 05:41:22', '2024-10-24 05:41:22', 0, 56),
(74, 56, 114, 'ad', '', '2024-10-24 05:44:27', '2024-10-24 05:44:27', 0, 56),
(75, 56, 114, 'da', '', '2024-10-24 05:44:55', '2024-10-24 05:44:55', 0, 18),
(76, 56, 114, 'da', '', '2024-10-24 05:44:59', '2024-10-24 05:44:59', 0, 18),
(77, 56, 113, 'ad', '', '2024-10-24 05:46:48', '2024-10-24 05:56:06', 0, 23),
(78, 18, 113, 'ê cu', '', '2024-10-24 06:02:09', '2024-10-24 06:02:09', 0, 18),
(79, 56, 10, 'e', '', '2024-10-24 06:39:28', '2024-10-24 06:39:28', 0, 18),
(80, 56, 113, 'chào', '', '2024-10-24 06:41:34', '2024-10-24 06:41:34', 0, 18),
(81, 56, 110, 'alo 123', '', '2024-10-24 06:42:13', '2024-10-24 06:42:13', 0, 18),
(82, 56, 116, 'ew', '', '2024-10-24 06:42:49', '2024-10-24 06:42:49', 0, 18),
(83, 56, 116, 'sa', '', '2024-10-24 06:43:08', '2024-10-24 06:43:08', 0, 18),
(93, 56, 35, 'e', '', '2024-10-25 03:09:11', '2024-10-25 03:09:11', 0, 37),
(94, 56, 35, 'da', '', '2024-10-25 03:09:16', '2024-10-25 03:09:16', 0, 18),
(95, 56, 35, 'Chào bn', '', '2024-10-25 03:09:50', '2024-10-25 03:09:50', 0, 18),
(96, 56, 35, 'lo', '', '2024-10-25 03:10:06', '2024-10-25 03:10:06', 0, 37),
(97, 57, 35, '112', '', '2024-10-25 03:12:04', '2024-10-25 03:12:04', 0, 37),
(98, 57, 35, 'á shiba', '', '2024-10-25 03:12:15', '2024-10-25 03:12:15', 0, 56),
(99, 57, 35, 'e cu', '', '2024-10-25 03:12:24', '2024-10-25 03:12:24', 0, 56),
(100, 57, 69, '1', '', '2024-10-25 03:17:42', '2024-10-25 03:17:42', 0, 55),
(101, 57, 68, 'e', '', '2024-10-25 03:30:17', '2024-10-25 03:30:17', 0, 55),
(102, 57, 68, 'e', '', '2024-10-25 03:31:40', '2024-10-25 03:31:40', 0, 57),
(103, 57, 148, 'e', '', '2024-10-25 03:34:03', '2024-10-25 03:34:03', 0, 57),
(104, 57, 69, 'e', '', '2024-10-25 03:35:14', '2024-10-25 03:35:14', 0, 55),
(105, 57, 69, 'vaix', '', '2024-10-25 03:35:54', '2024-10-25 03:35:54', 0, 57),
(106, 57, 69, 'e', '', '2024-10-25 03:36:19', '2024-10-25 03:36:19', 0, 57),
(107, 57, 69, 'waw', '', '2024-10-25 03:41:04', '2024-10-25 03:41:04', 0, 57),
(108, 57, 150, 'dada', '', '2024-10-25 03:45:59', '2024-10-25 03:45:59', 0, 57),
(109, 57, 154, 'wow', '', '2024-10-25 03:51:42', '2024-10-25 03:51:42', 0, 57),
(110, 57, 155, 'e', '', '2024-10-25 03:53:55', '2024-10-25 03:53:55', 0, 57),
(111, 57, 155, 'da', '', '2024-10-25 03:54:17', '2024-10-25 03:54:17', 0, 57),
(114, 57, 156, 'Halol\n   ada\nad', '', '2024-10-25 04:55:21', '2024-10-25 04:55:21', 0, 57),
(115, 57, 156, 'wow', '', '2024-10-25 04:55:42', '2024-10-25 04:55:42', 0, 57),
(116, 57, 116, 'haha', '', '2024-10-25 04:55:53', '2024-10-25 04:55:53', 0, 18),
(117, 57, 156, 'daa', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Flondon-eye-800x534%20-%20Copy.jpg?alt=media&token=0d359b75-4131-4150-b565-b787cdd2e842', '2024-10-25 04:56:36', '2024-10-25 04:56:36', 0, 57),
(118, 57, 1, 'Zo\n', '', '2024-10-25 05:03:49', '2024-10-25 05:03:49', 0, 18),
(119, 18, 18, 'da', '', '2024-10-25 05:29:44', '2024-10-25 05:29:44', 0, 18),
(120, 18, 18, 'da', '', '2024-10-25 05:29:52', '2024-10-25 05:29:52', 0, 18),
(121, 18, 18, 'da', '', '2024-10-25 05:29:55', '2024-10-25 05:29:55', 0, 28),
(123, 18, 16, 'da', '', '2024-10-25 05:30:04', '2024-10-25 05:30:04', 0, 18),
(125, 18, 69, 'da', '', '2024-10-25 05:33:26', '2024-10-25 05:33:26', 0, 55),
(126, 18, 167, 'da', '', '2024-10-25 05:34:26', '2024-10-25 05:34:26', 0, 18),
(129, 57, 6, 'wow', '', '2024-10-25 07:22:03', '2024-10-25 07:22:03', 0, 18),
(130, 57, 92, 'wow', '', '2024-10-25 07:22:17', '2024-10-25 07:22:17', 0, 18),
(131, 57, 187, '1', '', '2024-10-25 07:22:31', '2024-10-25 07:22:31', 0, 57),
(132, 57, 187, '2', '', '2024-10-25 07:22:34', '2024-10-25 07:22:34', 0, 57),
(133, 57, 187, '3', '', '2024-10-25 07:22:38', '2024-10-25 07:22:38', 0, 57),
(134, 57, 187, '4', '', '2024-10-25 07:22:40', '2024-10-25 07:22:40', 0, 57),
(135, 57, 3, '3', '', '2024-10-25 07:23:10', '2024-10-25 07:23:10', 0, 23),
(136, 57, 73, 'bolala\n', '', '2024-10-25 07:36:15', '2024-10-25 07:36:15', 0, 18),
(137, 18, 189, 'hi', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FComments%2Fbongda2.jpg?alt=media&token=7ab57b9f-45de-40bb-805e-972e552d0e21', '2024-11-17 12:35:19', '2024-11-17 12:35:34', 0, 18);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int NOT NULL,
  `blog_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` tinyint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reports`
--

CREATE TABLE `reports` (
  `id` int NOT NULL,
  `blog_id` int NOT NULL,
  `user_id` int NOT NULL,
  `reason` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pending','resolved','rejected') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reports`
--

INSERT INTO `reports` (`id`, `blog_id`, `user_id`, `reason`, `status`, `created_at`, `updated_at`) VALUES
(2, 36, 20, 'Spam nội dung', 'resolved', '2024-12-23 03:30:00', '2024-12-23 08:45:00'),
(3, 37, 23, 'Nội dung sai sự thật', 'pending', '2024-12-25 01:00:00', '2024-12-25 01:00:00'),
(5, 66, 18, 'Other', 'pending', '2024-12-25 03:29:47', '2024-12-25 03:29:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sports`
--

CREATE TABLE `sports` (
  `sport_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sports`
--

INSERT INTO `sports` (`sport_id`, `name`, `description`, `images`, `created_at`, `updated_at`, `is_delete`) VALUES
(0, 'Basketball', 'khôg có gì', '[\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Fsport01.jpg?alt=media&token=786a3f98-587e-44e6-913a-31ca36c7b4ea\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Fsport02.jpg?alt=media&token=447b0520-fade-4fce-b16a-65b55e35031d\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Fsport03.jpg?alt=media&token=66c7e611-3c7a-4452-ae21-c82046cd9e09\"]', '2024-07-21 13:11:26', '2024-11-22 03:09:27', 0),
(6, 'Football/Soccer', 'Football/Soccer', '[\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=f371d7b9-6a01-4f34-bfab-f0d8774eb402\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(2).jpg?alt=media&token=707add2f-5ccf-4c48-8363-755318ed5616\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=67f625bf-0ce1-49d1-8fb0-c61bc1567fe5\"]', '2024-08-13 04:19:55', '2024-08-13 04:48:11', 0),
(7, 'Swimming', 'Swimming', '[\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=d73172e2-7c9c-4266-a054-7ec7cc29e438\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(3).jpg?alt=media&token=edb87282-7eb8-42fa-a539-4f30da6c2adb\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=1e85fe09-62e9-4873-875e-3b3f32653b74\"]', '2024-08-13 04:24:39', '2024-08-13 04:24:39', 0),
(8, 'Shooting', 'Shooting', '[\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=5a26ec57-2e2c-4bfd-b0dd-026147c5dd47\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(2).jpg?alt=media&token=7987f784-2c34-4602-8ed1-5ea4b1016274\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=b03ede1e-7f58-494b-a23f-da93fdb1e6b4\"]', '2024-08-13 04:26:35', '2024-08-13 04:26:35', 0),
(9, 'Tennis', 'Tennis', '[\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(1).jpg?alt=media&token=36d132a6-c9a2-4a4d-9897-2c63af574a7e\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(2).jpg?alt=media&token=4779f83b-3c0a-49db-b2ac-d715ad45e0f4\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(3).jpg?alt=media&token=e3f89fb2-9ca9-451e-b5ce-d718f583a122\",\"https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2Fsports%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=48781334-d9a0-40dd-8bef-4da2f148d4af\"]', '2024-08-13 04:27:54', '2024-10-02 08:12:55', 1),
(10, 'Basketball', 'A team sport where two teams of five players each compete to score points by throwing a ball through a hoop.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(11, 'Volleyball', 'A team sport where two teams of six players each try to score points by hitting a ball over a net into the opponent\'s court.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(12, 'Badminton', 'A racket sport where players or teams use a shuttlecock to hit over a net, scoring points when the shuttlecock lands in the opponent\'s court.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(13, 'Table Tennis', 'A racket sport where players compete to hit a lightweight ball back and forth over a net on a table.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(14, 'Athletics', 'A collection of sports events that involve competitive running, jumping, throwing, and walking.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(15, 'Boxing', 'A combat sport in which two people, usually wearing protective gloves, throw punches at each other.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(16, 'Fencing', 'A combat sport where two opponents fight using swords or other bladed weapons, aiming to touch the opponent with the tip of the weapon.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(17, 'Weightlifting', 'A sport where athletes lift weights in the form of a barbell, attempting to lift the heaviest weight possible.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(18, 'Judo', 'A martial art and Olympic sport focusing on throws, holds, and submission techniques.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(19, 'Taekwondo', 'A Korean martial art known for its high, fast kicks and dynamic techniques, practiced both competitively and for self-defense.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(20, 'Karate', 'A Japanese martial art emphasizing strikes, kicks, and blocking techniques.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(21, 'Cycling', 'A sport involving the use of bicycles, either on roads or tracks, for racing or leisure.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(22, 'Rowing', 'A sport where athletes race in boats, using oars to propel themselves forward.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(23, 'Golf', 'An outdoor sport where players use clubs to hit a ball into a series of holes on a course in as few strokes as possible.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(24, 'Baseball', 'A team sport where two teams take turns batting and fielding, aiming to score points by hitting a pitched ball and running around bases.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(25, 'Rugby', 'A team sport where two teams of players aim to carry or kick a ball over the opponent\'s goal line to score points.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(26, 'Hockey', 'A team sport where players use a stick to hit a puck or ball into the opposing team\'s goal.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(27, 'Figure Skating', 'An ice skating sport where individuals or pairs perform on ice, executing jumps, spins, and footwork to music.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(28, 'Skiing', 'A winter sport where athletes use skis to glide across snow-covered terrain or ski slopes.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(29, 'Water Polo', 'A competitive team sport played in water, where two teams of seven players each attempt to score goals by throwing a ball into the opponent\'s net.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(30, 'Archery', 'A sport where participants use a bow to shoot arrows at a target, aiming to score the highest points.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(31, 'Diving', 'A sport where athletes dive into water from a platform or springboard, performing acrobatic movements.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0),
(32, 'Sport Climbing', 'A sport where participants climb walls or rock faces as quickly and efficiently as possible.', NULL, '2024-11-22 03:12:25', '2024-11-22 03:12:25', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tags`
--

CREATE TABLE `tags` (
  `tag_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tags`
--

INSERT INTO `tags` (`tag_id`, `name`, `created_at`, `updated_at`, `is_delete`) VALUES
(1, 'tag1', '2024-07-21 13:11:53', '2024-08-13 04:43:19', 1),
(131, 'SportsNews', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(132, 'LiveScores', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(133, 'MatchAnalysis', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(134, 'AthleteProfiles', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(135, 'TrainingTips', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(136, 'SportsNutrition', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(137, 'InjuryPrevention', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(138, 'Sportsmanship', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(139, 'SportsTechnology', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(140, 'FantasySports', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(141, 'Football', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(142, 'Basketball', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(143, 'Tennis', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(144, 'Cricket', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(145, 'Baseball', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(146, 'Hockey', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(147, 'Rugby', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(148, 'Swimming', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(149, 'Boxing', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(150, 'TrackAndField', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(151, 'Messi', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(152, 'LeBronJames', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(153, 'UsainBolt', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(154, 'SerenaWilliams', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(155, 'TigerWoods', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(156, 'MichaelPhelps', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(157, 'CristianoRonaldo', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(158, 'KobeBryant', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(159, 'NovakDjokovic', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(160, 'SimoneBiles', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(161, 'WorldCup', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(162, 'SuperBowl', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(163, 'Olympics', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(164, 'Wimbledon', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(165, 'NBAFinals', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(166, 'ChampionsLeague', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(167, 'TheMasters', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(168, 'TourDeFrance', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(169, 'FIFAWorldCup', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(170, 'SummerOlympics', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(171, 'ManchesterUnited', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(172, 'LosAngelesLakers', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(173, 'NewYorkYankees', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(174, 'FCBarcelona', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(175, 'Arsenal', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(176, 'GoldenStateWarriors', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(177, 'NewEnglandPatriots', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(178, 'ParisSaintGermain', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(179, 'BayernMunich', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0),
(180, 'RealMadrid', '2024-11-22 03:16:16', '2024-11-22 03:16:16', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(225) COLLATE utf8mb4_general_ci NOT NULL,
  `image_user` varchar(225) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `bio` text COLLATE utf8mb4_general_ci,
  `role` enum('user','author','admin') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0',
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cccd` varchar(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `why_delete` text COLLATE utf8mb4_general_ci,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `google_id` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `confirm_author` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `full_name`, `image_user`, `phone`, `bio`, `role`, `created_at`, `updated_at`, `is_delete`, `address`, `cccd`, `why_delete`, `status`, `google_id`, `verified`, `confirm_author`) VALUES
(18, 'admin123', 'admin123@gmail.com', '$2b$10$JZBt8A.ukxZHyp6Idxx4jujBcuX9/JzNybjGgzTjaXR6e779OgKie', 'Lý Văn Kiệt 1', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2F5cu.jpg?alt=media', '0123456789', 'I\'m Jack Bay, a passionate web developer and designer who loves to create beautiful, responsive websites.', 'admin', '2024-08-02 13:22:32', '2024-11-22 04:26:57', 0, 'ádasdasd', '123456789012', NULL, 'active', NULL, 1, 0),
(20, 'hello123', '123@123.com', '$2a$10$G1XAxkD.R0NDEc4y1CEPbOqAKxgAq.H/SD9PFuvfC9r9rRNVq7B/a', 'Antony', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fpokemon4.jpg?alt=media&token=74e34bd9-98e0-4682-b946-51f6fef0acdb', '1234567890', 'Passionate sports fan and analyst. Breaking down game strategies, player performances, and the stories behind the stats.', 'admin', '2024-08-03 06:51:09', '2024-11-21 12:37:24', 0, 'ádasdasd', '123456789012', 'hello', 'active', NULL, 1, 0),
(23, 'kiet555', 'kietchamhoc1@gmail.com', '$2a$10$VX1xjaBrf5ItI1v8OkauSOpvtGWwxYVm9sN4lVGsE0g2RcgaVGnAm', 'Lý Văn Kiệt', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Funnamed%20(4).png?alt=media&token=eb37fbe5-444a-4ba7-aa54-ce6ed9a050f9', '1334567890', 'I specialize in JavaScript frameworks like React.js and Node.js, and have a strong foundation in database technologies such as MySQL and MongoDB. My expertise includes both frontend and backend development, ensuring seamless user experiences and efficient backend services.', 'author', '2024-08-08 04:23:44', '2024-11-24 14:40:24', 0, 'ádasdasd', '123456789013', NULL, 'active', NULL, 1, 2),
(25, 'Ly Van Kiet (FPL CT)', 'kietlvpc07051@fpt.edu.vn', '', 'Ly Van Kiet (FPL CT)', 'https://lh3.googleusercontent.com/a/ACg8ocJ3lvLbYw7CtHnj2sANlha1BqPOVbdwhutsc9Aihe_aT8j4sg=s96-c', '', 'When I’m not coding, you can find me contributing to open-source projects or exploring tech communities to stay updated on the latest innovations in the field.', 'user', '2024-08-11 14:58:26', '2024-11-21 12:37:19', 0, NULL, NULL, NULL, 'active', '113880194809169407581', 1, 0),
(28, 'Quốc An', 'lequocan948@gmail.com', '', 'Quốc An', 'https://lh3.googleusercontent.com/a/ACg8ocLYzHqc0g8qyy8RqwUByxPENfA2sJVxk5TlsVxkPOHbM8ZJWZfN=s96-c', '', 'A passionate software engineer with a love for problem-solving and exploring new technologies. Sharing knowledge one line of code at a time!', 'user', '2024-08-13 06:11:19', '2024-11-21 12:37:16', 0, NULL, NULL, NULL, 'active', '101334455513281278071', 1, 0),
(32, 'author123', 'author123@gmail.com', '$2a$10$EOi4mrw0mt.aBgLoCTAV8.6ENMxczI2Unt6kHPDSE1D/1CtmSgbmG', 'author1', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fpokemon1.webp?alt=media&token=44f4985b-7a46-424f-bcb5-f326ebb04bc2', '01269682358', '12345', 'author', '2024-08-14 13:19:04', '2024-11-22 04:32:32', 0, 'Cần Thơ', '123456789087', NULL, 'active', NULL, 1, 0),
(36, 'kiet1234', 'kietchamhoc5@gmail.com', '$2b$10$ohApbO7gsOp6RmbERx9bnud8ngR1C3VeygeEZucVrbQk0yIcdwesu', 'Ly van kiet', '', '0777449336', NULL, 'user', '2024-08-15 07:53:00', '2024-11-21 12:37:10', 0, NULL, NULL, NULL, 'active', NULL, 1, 0),
(37, 'Kiệt Lý Văn', 'kietchamhoc1@gmail.com', '$2b$10$JZBt8A.ukxZHyp6Idxx4jujBcuX9/JzNybjGgzTjaXR6e779OgKie', 'Kiệt Lý Văn', 'https://lh3.googleusercontent.com/a/ACg8ocKctVLgEK4e-xTr6ppplCmUAG4Z9O80nCJ2O6Fp3ad-fPwdJIc=s96-c', '', NULL, 'user', '2024-08-15 07:53:24', '2024-11-22 04:28:54', 0, NULL, NULL, NULL, 'active', '105123742556282844151', 1, 0),
(38, 'kiet12345', 'kietlvpc07051@fpt.edu.vn', '$2a$10$RnjWQ8gpTzzSWCee2qwREu7CFieD/Zzy5mds4gVLCZIfEbi5WBssG', 'Ly van kiet', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fbg123.jpg?alt=media&token=89ad76cd-bb63-44c2-862f-be0a0b5f82e1', '0777449338', '123', 'author', '2024-08-15 08:06:23', '2024-11-22 04:29:39', 0, 'ádas', '123456789014', 'hello', 'active', NULL, 1, 0),
(39, 'Le Quoc An (FPL CT)', 'anlqpc06965@fpt.edu.vn', '', 'Le Quoc An (FPL CT)', 'https://lh3.googleusercontent.com/a/ACg8ocKdc5gplHTU6upXn8ALE8fg5tCb8VU-EDm7rnnf3uFXeZdbjThg=s96-c', '', NULL, 'user', '2024-09-12 12:36:04', '2024-11-21 12:36:59', 0, NULL, NULL, NULL, 'active', '117054827188403134264', 1, 0),
(40, 'lean2004', 'andeptrai@gmail.com', '$2b$10$vOArd.uQK7jcFHZkxQnCgulwru2BUd.lJE/srqVcXwSe.7vWhWI5a', 'le an', '', '0182272235', 'Throughout my career, I have successfully developed and deployed several web applications, collaborating with cross-functional teams to deliver high-quality software solutions. I am always eager to learn new technologies and improve my skills.', 'user', '2024-09-13 04:32:28', '2024-11-21 12:36:55', 1, NULL, NULL, 'sai', 'inactive', NULL, 1, 0),
(41, 'phuc123', 'phucpvpc06866@fpt.edu.vn', '$2b$10$4g/WD831nLQHyfRuf1QtwOW0M7L2UVnpwypRIx.wNozYMZUF7bvkS', 'phúc rờm', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fprofile-2.png?alt=media', '0347121916', 'I am a dedicated and passionate Full Stack Developer with over 5 years of experience in building dynamic web applications. I specialize in JavaScript frameworks like React.js.', 'user', '2024-09-24 06:57:29', '2024-12-23 07:48:04', 0, NULL, NULL, NULL, 'active', NULL, 1, 0),
(42, 'admin01', 'thoai2223@gmail.com', '$2b$10$6n8hgVa5UdI.imlQQroGme15Pwho3SH4nJQFpGsLMpY0VytzLKyRO', 'Lâm Chí Thoại', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fdefault.jpg?alt=media', '0378348472', '', 'user', '2024-10-11 03:32:35', '2024-11-21 12:36:47', 0, NULL, NULL, NULL, 'active', NULL, 1, 0),
(55, 'admin02', 'thoai2224@gmail.com', '$2b$10$JVn5KY/i8RWJcB4mx6cym.N8LqaCcxI6zTlMNdjacxyE3LqJ4UY6W', 'Lam chi THoaiss', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fdefault.jpg?alt=media', '0378238472', NULL, 'user', '2024-10-11 04:11:26', '2024-11-21 12:36:44', 0, NULL, NULL, NULL, 'active', NULL, 1, 0),
(56, 'admin', 'thoai11392004@gmail.com', '$2b$10$M7xibqCEg.9omYnKsTTGMu6J5bG2YjGwjq0DFudB2ZS7hx0OOg6VW', 'lamchithoai', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fdefault.jpg?alt=media', '0378328321', NULL, 'user', '2024-10-24 05:40:58', '2024-11-21 12:36:41', 0, NULL, NULL, NULL, 'active', NULL, 1, 0),
(57, 'admin1', 'thoai0402ba@gmail.com', '$2b$10$pjpUtwPnghctb/qjezVMdegO3lFxFvWfsOmpSNnXVrRx72N0raOVW', 'lamchithoai', 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fdu-lich-anh-2.webp?alt=media', '0323212321', '', 'user', '2024-10-25 03:10:56', '2024-11-21 12:36:32', 0, NULL, NULL, NULL, 'active', NULL, 1, 0),
(58, 'Kiệt Lý', 'kietghetho111c@gmail.com', '', 'Kiệt Lý', 'https://lh3.googleusercontent.com/a/ACg8ocJVm8Lv5ng-o_c3z6-iMBs5tZLWytbEoIrGEHNQqE5GWdSyP-I=s96-c', '', NULL, 'user', '2024-11-07 08:39:10', '2024-11-21 12:41:21', 1, NULL, NULL, 'hello', 'inactive', '118438638419437464591', 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_verifications`
--

CREATE TABLE `user_verifications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `blocked_users`
--
ALTER TABLE `blocked_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_blocker_blocked` (`blocker_id`,`blocked_id`),
  ADD KEY `blocked_id` (`blocked_id`);

--
-- Chỉ mục cho bảng `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `sport_id` (`sport_id`);

--
-- Chỉ mục cho bảng `blogs_share`
--
ALTER TABLE `blogs_share`
  ADD PRIMARY KEY (`share_id`),
  ADD KEY `fk_blog_id` (`blog_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `blogs_views`
--
ALTER TABLE `blogs_views`
  ADD PRIMARY KEY (`view_id`),
  ADD KEY `post_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UC_BlogUserLike` (`blog_id`,`user_id`),
  ADD KEY `FK_BlogLike_User` (`user_id`);

--
-- Chỉ mục cho bảng `blog_tags`
--
ALTER TABLE `blog_tags`
  ADD PRIMARY KEY (`blog_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `fk_categories_parent` (`parent_id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `follower_id_followed_id` (`follower_id`,`followed_id`),
  ADD KEY `followed_id` (`followed_id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Chỉ mục cho bảng `notifications_blogs`
--
ALTER TABLE `notifications_blogs`
  ADD PRIMARY KEY (`notification_id`),
  ADD UNIQUE KEY `unique_user_blog` (`user_id`,`blog_id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Chỉ mục cho bảng `notification_preferences`
--
ALTER TABLE `notification_preferences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`author_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Chỉ mục cho bảng `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `parent_comment`
--
ALTER TABLE `parent_comment`
  ADD PRIMARY KEY (`parent_comment_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reply_to_user_id` (`reply_to_user_id`);

--
-- Chỉ mục cho bảng `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `post_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `sports`
--
ALTER TABLE `sports`
  ADD PRIMARY KEY (`sport_id`);

--
-- Chỉ mục cho bảng `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `user_verifications`
--
ALTER TABLE `user_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `blocked_users`
--
ALTER TABLE `blocked_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT cho bảng `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT cho bảng `blogs_share`
--
ALTER TABLE `blogs_share`
  MODIFY `share_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `blogs_views`
--
ALTER TABLE `blogs_views`
  MODIFY `view_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1642;

--
-- AUTO_INCREMENT cho bảng `blog_likes`
--
ALTER TABLE `blog_likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT cho bảng `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=266;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=559;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT cho bảng `notifications_blogs`
--
ALTER TABLE `notifications_blogs`
  MODIFY `notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `notification_preferences`
--
ALTER TABLE `notification_preferences`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT cho bảng `parent_comment`
--
ALTER TABLE `parent_comment`
  MODIFY `parent_comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT cho bảng `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `sports`
--
ALTER TABLE `sports`
  MODIFY `sport_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT cho bảng `user_verifications`
--
ALTER TABLE `user_verifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `blocked_users`
--
ALTER TABLE `blocked_users`
  ADD CONSTRAINT `blocked_users_ibfk_1` FOREIGN KEY (`blocker_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blocked_users_ibfk_2` FOREIGN KEY (`blocked_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blogs_ibfk_3` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`sport_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `blogs_share`
--
ALTER TABLE `blogs_share`
  ADD CONSTRAINT `blogs_share_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blogs_share_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `blogs_views`
--
ALTER TABLE `blogs_views`
  ADD CONSTRAINT `blogs_views_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blogs_views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD CONSTRAINT `FK_BlogLike_Blog` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_BlogLike_User` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `blog_tags`
--
ALTER TABLE `blog_tags`
  ADD CONSTRAINT `blog_tags_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blog_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_categories_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`),
  ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `notifications_blogs`
--
ALTER TABLE `notifications_blogs`
  ADD CONSTRAINT `notifications_blogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_blogs_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `notification_preferences`
--
ALTER TABLE `notification_preferences`
  ADD CONSTRAINT `notification_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_preferences_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `otps`
--
ALTER TABLE `otps`
  ADD CONSTRAINT `otps_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `parent_comment`
--
ALTER TABLE `parent_comment`
  ADD CONSTRAINT `parent_comment_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parent_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `parent_comment_ibfk_3` FOREIGN KEY (`reply_to_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `user_verifications`
--
ALTER TABLE `user_verifications`
  ADD CONSTRAINT `user_verifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Sự kiện
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_expired_tokens` ON SCHEDULE EVERY 5 MINUTE STARTS '2024-11-18 19:22:14' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM user_verifications
  WHERE TIMESTAMPDIFF(MINUTE, created_at, NOW()) > 30$$

CREATE DEFINER=`root`@`localhost` EVENT `delete_unverified_users` ON SCHEDULE EVERY 5 MINUTE STARTS '2024-11-18 18:22:28' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM users 
WHERE verified = 0 
  AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) > 30$$

CREATE DEFINER=`root`@`localhost` EVENT `delete_expired_otps` ON SCHEDULE EVERY 10 MINUTE STARTS '2024-11-19 12:45:19' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM otps
  WHERE TIMESTAMPDIFF(MINUTE, created_at, NOW()) > 2$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
