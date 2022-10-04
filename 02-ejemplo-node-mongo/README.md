

## Instrucciones

1. Crea imagen a partir de , contenedor e inicia a partir de docker-compose.yml
    `docker compose up`

2. Detener servicio 
    `Ctrl + C`

3. Elemina contenedores y redes creadas con "docker compose up"
    `docker compose down`

Nota: Se puede volver a levantar el servicio con `docker compose up` y se mantendrán los cambios hechos en el contenedor "monguito", esto es debido a que definimos un volumen llamado "mongo-data" que guarda la información y la vuelve a cargar.


Ejemplo sacado de: https://www.youtube.com/watch?v=4Dko5W96WHg

