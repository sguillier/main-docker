# Aplicacion de ejemplo para curso de Docker, del canal Hola Mundo.

Curso completo gratis aca: https://www.youtube.com/watch?v=4Dko5W96WHg



## Instrucciones produccion

1. Crear carpeta node_modules. Este paso lo podemos evitar si agregamos dentro de Dockerfile `WORKDIR /home/app` y `RUN npm install`
    `npm install` 

2. Crea imagen, contenedor e inicia a partir de docker-compose.yml o bien docker-compose-dev.yml
    `docker compose up`
    `docker compose -f docker-compose-dev.yml up` (este último no funciono, no se actualizaban los cambios hechos en index.js)

3. Detener servicio 
    `Ctrl + C`

4. Elemina contenedores y redes creadas con "docker compose up"
    `docker compose down`
