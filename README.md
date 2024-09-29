# GamerProXela-
Simular tienda de video juegos con sucursales
# Configuración del GameProXela

Este README proporciona instrucciones para configurar tanto el backend como el frontend del proyecto GameProXela.

## 1. Configuración del Backend

### 1.1 Instalar Dependencias

Ejecutar el siguiente comando para instalar todas las dependencias:

```
npm install
```

Si existe algún error al instalar express, dotenv o cors, use:

```
npm i express dotenv cors
```

Si PostgreSQL no está instalado, ejecute:

```
npm install --save sequelize
npm install --save pg pg-hstore
```

### 1.2 Instalar Tecnologías Requeridas

#### Nodemon
Instalar globalmente:
```
npm install -g nodemon
```

O como dependencia de desarrollo:
```
npm install --save-dev nodemon
```

#### TypeScript
Instalar globalmente:
```
npm install -g typescript
```

### 1.3 Modificar package.json

Agregar lo siguiente a la sección "scripts" del archivo package.json:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

El archivo package.json completo debería verse así:

```json
{
  "name": "api-games",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "nodemon": "^3.1.7",
    "pg": "^8.12.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.3"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21"
  }
}
```

## 2. Configuración del Frontend

### 2.1 Instalar Node.js

Para instalar la versión requerida de Node.js (18.10.0), se recomienda usar nvm (Node Version Manager).

#### Instalar nvm (opcional)

Para Linux:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Para Windows, descargue desde: https://github.com/coreybutler/nvm-windows/releases

Documentación oficial: https://github.com/nvm-sh/nvm

#### Instalar Node.js 18.10.0
```
nvm install 18.10.0
```

### 2.2 Instalar Angular CLI
```
npm install -g @angular/cli@15
```

### 2.3 Instalar Dependencias de la Aplicación Frontend

Navegue a la carpeta "ng-game-pro-xela" y ejecute:
```
npm install
```

## 3. Iniciar las Aplicaciones

### 3.1 Iniciar el Backend

En la carpeta api-games, ejecute:
```
nodemon dist/index.js
```

### 3.2 Iniciar el Frontend

En la carpeta ng-game-pro-xela, ejecute:
```
ng serve -o
```

Esto iniciará el servidor de desarrollo de Angular y abrirá la aplicación en su navegador predeterminado.
## Video GameProXela

Mostrando Funcioanlidades [aquí](https://tinyurl.com/27826pco).
