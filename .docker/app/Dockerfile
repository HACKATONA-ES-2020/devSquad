FROM php:7-apache

# PS: individual RUN blocks allow individual caches, in case some of them fail
RUN apt-get update

# Install dependencies

# Xdebug
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug

# pdo_mysql
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-enable pdo_mysql

# mysqli
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod headers
