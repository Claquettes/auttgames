-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 22 nov. 2022 à 16:40
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `auttgames`
--

-- --------------------------------------------------------

--
-- Structure de la table `stats`
--

CREATE TABLE `stats` (
  `id` int NOT NULL,
  `Citations_total_games` int NOT NULL DEFAULT '0',
  `Citations_wins` int NOT NULL DEFAULT '0',
  `Citations_nbA` int NOT NULL DEFAULT '0',
  `Citations_totalA` int NOT NULL DEFAULT '0',
  `Citations_nbgames_last` int NOT NULL DEFAULT '0',
  `Morpion_total_games` int NOT NULL DEFAULT '0',
  `Morpion_wins` int NOT NULL DEFAULT '0',
  `Dinautt_total_games` int NOT NULL DEFAULT '0',
  `Dinautt_highscore` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `stats`
--

INSERT INTO `stats` (`id`, `Citations_total_games`, `Citations_wins`, `Citations_nbA`, `Citations_totalA`, `Citations_nbgames_last`, `Morpion_total_games`, `Morpion_wins`, `Dinautt_total_games`, `Dinautt_highscore`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(70) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `level` int NOT NULL DEFAULT '0',
  `xp` int NOT NULL DEFAULT '0',
  `coins` int NOT NULL DEFAULT '0',
  `cheat` tinyint(1) NOT NULL COMMENT '1 => cheat',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `banner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `date`, `level`, `xp`, `coins`, `cheat`, `avatar`, `banner`) VALUES
(1, 'flashonfire', '$2b$10$kF18/h5RUkTbUaLcHH/nVO3PaiFEdth20Jaa2ExnkSbS1FnTW9Mxe', '2022-11-19 20:24:48', 0, 0, 0, 0, '', ''),
(2, 'aaa', '$2b$10$tLrG1KQY7IbN2hP70k.YmebYz/Q7NgUJg6cs1qr1n3tIJNFmY/fQS', '2022-11-20 00:04:06', 0, 0, 0, 0, '', ''),
(12, 'bbb', '$2b$10$Yh.kGypoRLqvZpYGKM2td.NGkDVKjWGll7kGp2DsKRwmlqHxuCLFa', '2022-11-22 15:40:20', 0, 0, 0, 0, '', '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
