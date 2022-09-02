-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2022 a las 01:31:56
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cabo_norte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` int(5) NOT NULL,
  `user_inf` int(50) DEFAULT NULL,
  `type_user` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `user_inf`, `type_user`, `username`, `password`, `status`, `updated_at`, `created_at`) VALUES
(1, NULL, 'administrador', 'Admin', '$2y$10$jkBM8YkQ1XaTymoaaQD5.O/YAFOxt2/2fJjRDEG40poZUyIq3Bc1e', 'Habilitado', NULL, '2022-07-06 13:18:08'),
(86, 90, 'guardia', 'gr', '$2y$10$rvJ2N8VupaJZJOmvOE1RxeKCvZCoRSEqf8.K/pnh2PPkJi3gDnPba', 'Habilitado', NULL, '2022-09-01 17:37:40'),
(88, 92, 'encargado', 'Gama', '$2y$10$S12K.AZJywWUktZ3eHL3t.BHoYv1ALC4dshLr6AE5FJwDR3Y1jFM.', 'Habilitado', NULL, '2022-09-01 21:07:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora_providers`
--

CREATE TABLE `bitacora_providers` (
  `id` int(100) NOT NULL,
  `num_provider` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `work` varchar(100) NOT NULL,
  `service` varchar(100) NOT NULL,
  `num_cone` varchar(100) NOT NULL,
  `entry_provider` datetime DEFAULT current_timestamp(),
  `exit_provider` datetime DEFAULT NULL,
  `identification` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bitacora_providers`
--

INSERT INTO `bitacora_providers` (`id`, `num_provider`, `name`, `work`, `service`, `num_cone`, `entry_provider`, `exit_provider`, `identification`) VALUES
(21, 'SCK60J', 'materiales ea', 'armura 5', 'proveedro de materiales', '1', '2022-08-30 22:21:53', NULL, 'descarga.jpg'),
(22, 'ESRZHM', 'hjkhhk', 'armura 5', 'rytryt', '2', '2022-08-31 10:17:41', NULL, '1661959060731Ejma5EuXcAEIBMU.jpg'),
(23, '94BC2Z', 'dasd1', 'armura 5', 'ddaasd', '1', '2022-09-01 15:44:25', '2022-09-01 15:44:41', '1662065065444images.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora_workers`
--

CREATE TABLE `bitacora_workers` (
  `id` int(100) NOT NULL,
  `register_number` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `manager` varchar(100) NOT NULL,
  `work` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `entry_worker` datetime DEFAULT current_timestamp(),
  `exit_worker` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bitacora_workers`
--

INSERT INTO `bitacora_workers` (`id`, `register_number`, `fullname`, `company`, `manager`, `work`, `position`, `entry_worker`, `exit_worker`) VALUES
(46, 'BVI53A', 'Jose  Martinez lopwz', 'dsadsad', 'Andrez martinez', 'armura 5', 'dasdd', '2022-08-26 16:18:39', '2022-08-26 16:19:09'),
(47, '0SQOUN', 'Fernando Hernandez Hernandez', 'Limpezas Mr', 'Andrez martinez', 'armura 5', 'limpieza', '2022-08-26 16:26:35', '2022-08-26 16:27:09'),
(49, 'BVI53A', 'Jose  Martinez lopwz', 'dsadsad', 'Andrez martinez', 'armura 5', 'dasdd', '2022-08-30 19:17:50', '2022-08-30 19:18:06'),
(50, 'BVI53A', 'Jose  Martinez lopwz', 'Ann', 'Andrez martinez', 'armura 5', 'Admin', '2022-09-01 15:35:12', '2022-09-01 15:35:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cones`
--

CREATE TABLE `cones` (
  `id` int(100) NOT NULL,
  `num_cone` int(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `provider` int(100) DEFAULT NULL,
  `register_number` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cones`
--

INSERT INTO `cones` (`id`, `num_cone`, `status`, `provider`, `register_number`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 1, NULL, NULL),
(3, 3, 1, NULL, NULL),
(4, 4, 1, NULL, NULL),
(5, 5, 1, NULL, NULL),
(6, 6, 1, NULL, NULL),
(7, 7, 1, NULL, NULL),
(8, 8, 1, NULL, NULL),
(9, 9, 1, NULL, NULL),
(10, 10, 1, NULL, NULL),
(11, 11, 1, NULL, NULL),
(12, 12, 1, NULL, NULL),
(13, 13, 1, NULL, NULL),
(14, 14, 1, NULL, NULL),
(15, 15, 1, NULL, NULL),
(16, 16, 1, NULL, NULL),
(17, 17, 1, NULL, NULL),
(18, 18, 1, NULL, NULL),
(19, 19, 1, NULL, NULL),
(20, 20, 1, NULL, NULL),
(21, 21, 1, NULL, NULL),
(22, 22, 1, NULL, NULL),
(23, 23, 1, NULL, NULL),
(24, 24, 1, NULL, NULL),
(25, 25, 1, NULL, NULL),
(26, 26, 1, NULL, NULL),
(27, 27, 1, NULL, NULL),
(28, 28, 1, NULL, NULL),
(29, 29, 1, NULL, NULL),
(30, 30, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `managers`
--

CREATE TABLE `managers` (
  `id` int(50) NOT NULL,
  `manager_number` varchar(200) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `work` int(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `managers`
--

INSERT INTO `managers` (`id`, `manager_number`, `name`, `lastname`, `company`, `position`, `work`, `updated_at`, `created_at`) VALUES
(90, '4PHW0I', 'nicandro', 'martinez', 'xzxsdasd', 'dasdsad', NULL, NULL, '2022-09-01 17:37:40'),
(91, 'TOYEJS', 'nicandro', 'martinez', 'lñllñlñl', 'nnn', 36, NULL, '2022-09-01 17:39:55'),
(92, '214QZB', 'nicandro', 'martinez', 'qweqwe', 'qweqwe', 36, NULL, '2022-09-01 21:07:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `providers`
--

CREATE TABLE `providers` (
  `id` int(100) NOT NULL,
  `register_number` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `service` varchar(100) NOT NULL,
  `work` int(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workers`
--

CREATE TABLE `workers` (
  `id` int(100) NOT NULL,
  `register_number` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `job` int(100) NOT NULL,
  `manager` int(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `works`
--

CREATE TABLE `works` (
  `id` int(50) NOT NULL,
  `job` varchar(100) NOT NULL,
  `batch` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `works`
--

INSERT INTO `works` (`id`, `job`, `batch`, `color`, `status`, `updated_at`, `created_at`) VALUES
(36, 'jhkkk', 'kkjjkj', '#73ff00', 'Habilitado', NULL, '2022-09-01 17:39:34');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `user_inf` (`user_inf`);

--
-- Indices de la tabla `bitacora_providers`
--
ALTER TABLE `bitacora_providers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `bitacora_workers`
--
ALTER TABLE `bitacora_workers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cones`
--
ALTER TABLE `cones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider` (`provider`);

--
-- Indices de la tabla `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `manager_number` (`manager_number`),
  ADD KEY `worker` (`work`);

--
-- Indices de la tabla `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `register_number` (`register_number`),
  ADD KEY `work` (`work`);

--
-- Indices de la tabla `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `regisister_number` (`register_number`),
  ADD KEY `job` (`job`),
  ADD KEY `manager` (`manager`);

--
-- Indices de la tabla `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `bitacora_providers`
--
ALTER TABLE `bitacora_providers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `bitacora_workers`
--
ALTER TABLE `bitacora_workers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `cones`
--
ALTER TABLE `cones`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `managers`
--
ALTER TABLE `managers`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `works`
--
ALTER TABLE `works`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_inf`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cones`
--
ALTER TABLE `cones`
  ADD CONSTRAINT `cones_ibfk_1` FOREIGN KEY (`provider`) REFERENCES `providers` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `managers`
--
ALTER TABLE `managers`
  ADD CONSTRAINT `managers_ibfk_1` FOREIGN KEY (`work`) REFERENCES `works` (`id`);

--
-- Filtros para la tabla `providers`
--
ALTER TABLE `providers`
  ADD CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`work`) REFERENCES `works` (`id`);

--
-- Filtros para la tabla `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `workers_ibfk_1` FOREIGN KEY (`job`) REFERENCES `works` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `workers_ibfk_2` FOREIGN KEY (`manager`) REFERENCES `managers` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
