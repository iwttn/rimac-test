# Reto Backend

Este proyecto es un backend basado en microservicios construido con **NestJS** y desplegado en **AWS Lambda** mediante **Serverless Framework**. Incluye integración con una base de datos **DynamoDB** y consume las API de **SWAPI** y **Imdb** para obtener los personajes y ademas la información de las películas en las que aperece.


## Características

- **NestJS** como framework de backend
- **AWS Lambda** y **Serverless Framework** para despliegues serverless
- **Amazon EventBridge** para manejar eventos de la aplicación
- **DynamoDB** como base de datos NoSQL y para Caching de datos
- **Integración con API SWAPI** para obtener datos de personajes de Star Wars
- **Integración con API Imdb** para obtener información de las películas en las que aperece el personaje.
- **Validación y Transformación de Datos** con `class-validator` y `class-transformer`

## Requisitos

- **Node.js** >= 14.x
- **npm** >= 6.x
- **AWS CLI** configurado
- **Serverless Framework** instalado globalmente

  ```bash
  npm install -g serverless

  
## Installation

Clonar el repositorio en tu entorno de trabajo.

Cambiar al directorio del proyecto: cd reto-backend

Instalar las dependencias del proyecto:
```bash
  npm install
```
    
## Uso

Construir el proyecto:

```bash
  npm run build
```

Iniciar el servidor en desarrollo:

```bash
  npm run start
```
Ejecutar pruebas:

```bash
  npm run test
```


## API Reference

### Obtener todos los datos fusionados
```http
  GET /fusionados?page=1
```

### Obtener un dato fusionado en base al id
```http
  GET /fusionados/:id
```

### Guardar un dato personalizado
```http
  POST /almacenar
```

### Ver el historial que vas dejando en endpoint /fusionados
```http
  GET /historial?page=1&limit=10
```

### Ejemplo de Solicitud

```bash
  curl -X POST https://t8r27zxz09.execute-api.us-east-2.amazonaws.com/dev/fusionados/1 \
  -H "Content-Type: application/json" \
  -d '{
        "id": "1",
        "characterName": "Luke Skywalker",
        "characterHeight": "172cm",
        "characterMass": "77kg",
        "characterGender": "male",
        "characterBirthyear": "19BBY",
        "films": [
            {
                "imdbId": "tt0120915",
                "title": "Star Wars: Episode IV - A New Hope",
                "genders": [
                    "Action",
                    "Adventure",
                    "Fantasy"
                ],
                "duration": "2h 1min",
                "description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
                "posterImage": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_.jpg",
                "releaseDate": "Wednesday, May 25, 1977",
                "directors": [
                    "George Lucas"
                ],
                "budget": "$11,000,000.00",
                "grossWorldwide": "$775,398,507.00"
            },
            {
                "imdbId": "tt0121765",
                "title": "Star Wars: Episode IV - A New Hope",
                "genders": [
                    "Action",
                    "Adventure",
                    "Fantasy"
                ],
                "duration": "2h 1min",
                "description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
                "posterImage": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_.jpg",
                "releaseDate": "Wednesday, May 25, 1977",
                "directors": [
                    "George Lucas"
                ],
                "budget": "$11,000,000.00",
                "grossWorldwide": "$775,398,507.00"
            },
            {
                "imdbId": "tt0121766",
                "title": "Star Wars: Episode IV - A New Hope",
                "genders": [
                    "Action",
                    "Adventure",
                    "Fantasy"
                ],
                "duration": "2h 1min",
                "description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
                "posterImage": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_.jpg",
                "releaseDate": "Wednesday, May 25, 1977",
                "directors": [
                    "George Lucas"
                ],
                "budget": "$11,000,000.00",
                "grossWorldwide": "$775,398,507.00"
            },
            {
                "imdbId": "tt0086190",
                "title": "Star Wars: Episode IV - A New Hope",
                "genders": [
                    "Action",
                    "Adventure",
                    "Fantasy"
                ],
                "duration": "2h 1min",
                "description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
                "posterImage": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_.jpg",
                "releaseDate": "Wednesday, May 25, 1977",
                "directors": [
                    "George Lucas"
                ],
                "budget": "$11,000,000.00",
                "grossWorldwide": "$775,398,507.00"
            }
        ]
    }'
```

## Despliegue

Para desplegar en AWS Lambda usando Serverless Framework:

Asegúrate de estar autenticado en AWS CLI y ejecuta el siguiente comando para desplegar el servicio:

```http
  serverless deploy --stage dev
```

Primero Desplegar para que se pueda crear Base de Datos

```http
  serverless offline
```