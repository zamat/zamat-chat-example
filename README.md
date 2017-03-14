# Zamat Chat Full Example
Chat application for Symfony 3 built on the [zamat-chat](https://github.com/zamat/zamat-chat) library and 
[zamat-websocket](https://github.com/zamat/zamat-websocket) library.

## Getting Started
For documentation specific to this bundle, continue reading below.

## Installation

### Step 1: Instalation source 
``` bash
$ composer create-project zamat/zamat-chat-example [local_directory_path]; 
```

### Step 2: Configure your database 
``` yaml
# app/config/parameters.yml
```
You can also use Symfony composer initializer scripts

### Step 3: Run Command
Create database Schema, load fixtures and clear cache
``` bash
   php bin/console doctrine:database:create
   php bin/console doctrine:schema:update --force
   php bin/console doctrine:fixtures:load

   php bin/console cache:clear --env=prod
```


