
## Metodo 1 
Para levantar este servicio se puede ejecutar la siguiente secuencia:

1. Crear imagen (lee archivo Dockerfile):
    `docker build -t imagen-sg .`

2. Crear contenedor a partir de imagen anterior:
    `docker create -p8080:8080 --name hola-mundo-sg imagen-sg`

3. Activa contenedor:
    `docker start hola-mundo-sg`

4. Detiene contenedor:
    `docker stop hola-mundo-sg`

5. Detiene contenedor:
    `docker rm hola-mundo-sg`

6. Detiene contenedor:
    `docker image rm imagen-sg`


## Metodo 2

1. Crea imagen, contenedor e inicia a partir de docker-compose.yml
    `docker compose up`

2. Detener servicio 
    `Ctrl + C`

3. Elemina contenedor e imagen (no se me borro imagen)
    `docker compose down`
