-- Baba Marketing - FRENDO Electric Scooty Database Schema
-- Database: babascooty

CREATE DATABASE IF NOT EXISTS `babascooty` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `babascooty`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) DEFAULT 'Admin',
  `role` VARCHAR(50) DEFAULT 'superadmin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) UNIQUE NOT NULL,
  `description` TEXT,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `model_number` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(150) UNIQUE NOT NULL,
  `category_id` INT NULL,
  `short_description` TEXT,
  `detailed_description` LONGTEXT,
  `price` DECIMAL(10,2) NULL,
  `price_label` VARCHAR(100) DEFAULT 'Contact for Best Price',
  `special_offers` TEXT NULL,
  `availability` VARCHAR(50) DEFAULT 'In Stock',
  `is_featured` BOOLEAN DEFAULT FALSE,
  `is_published` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_category` (`category_id`),
  INDEX `idx_published` (`is_published`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Product Images Table
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255),
  `is_primary` BOOLEAN DEFAULT FALSE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_product_img` (`product_id`),
  CONSTRAINT `fk_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Product Specifications Table
CREATE TABLE IF NOT EXISTS `product_specifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL UNIQUE,
  `motor_power` VARCHAR(100) NOT NULL,
  `battery_voltage` VARCHAR(100) NOT NULL,
  `controller` VARCHAR(150) NOT NULL,
  `front_tyre` VARCHAR(100) NOT NULL,
  `rear_tyre` VARCHAR(100) NOT NULL,
  `brakes` VARCHAR(150) NOT NULL,
  `central_locking` VARCHAR(50) DEFAULT 'Yes',
  `digital_meter` VARCHAR(50) DEFAULT 'Yes',
  `reverse_gear` VARCHAR(50) DEFAULT 'Yes',
  `other_specifications` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_product_spec` (`product_id`),
  CONSTRAINT `fk_specs_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Homepage Sections Table
CREATE TABLE IF NOT EXISTS `homepage_sections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `section_key` VARCHAR(50) UNIQUE NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` TEXT,
  `content` LONGTEXT,
  `is_visible` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. Banners Table
CREATE TABLE IF NOT EXISTS `banners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255),
  `offer_text` VARCHAR(255),
  `button_text` VARCHAR(100) DEFAULT 'Explore Scooters',
  `button_link` VARCHAR(255) DEFAULT '/scooters',
  `image_url` VARCHAR(500),
  `banner_type` VARCHAR(50) DEFAULT 'hero',
  `is_active` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 8. Contact Settings Table
CREATE TABLE IF NOT EXISTS `contact_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `business_name` VARCHAR(150) DEFAULT 'Baba Marketing',
  `brand_name` VARCHAR(150) DEFAULT 'FRENDO',
  `tagline` VARCHAR(255) DEFAULT 'Electric Scooty | Clean Energy | Better Tomorrow',
  `address` TEXT NOT NULL,
  `primary_phone` VARCHAR(50) NOT NULL,
  `whatsapp_number` VARCHAR(50) NOT NULL,
  `additional_phones` TEXT,
  `email` VARCHAR(150) DEFAULT 'info@babamarketing.in',
  `google_maps_url` TEXT,
  `google_maps_embed` TEXT,
  `opening_hours` VARCHAR(255) DEFAULT 'Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 5:00 PM',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 9. Website Settings Table
CREATE TABLE IF NOT EXISTS `website_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) UNIQUE NOT NULL,
  `setting_value` LONGTEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 10. SEO Settings Table
CREATE TABLE IF NOT EXISTS `seo_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_route` VARCHAR(100) UNIQUE NOT NULL,
  `meta_title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT NOT NULL,
  `keywords` TEXT,
  `canonical_url` VARCHAR(255),
  `og_image` VARCHAR(500),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 11. Customer Enquiries Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NULL,
  `product_name` VARCHAR(150) NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `customer_email` VARCHAR(150) NULL,
  `city` VARCHAR(100) NULL,
  `message` TEXT,
  `status` VARCHAR(50) DEFAULT 'New',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB;
