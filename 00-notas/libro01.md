
## Instalacion

* Para instalar se ejecuta el .exe, luego el instalador pide reiniciar.  
* Una vez reiniciado al intentar ejecutar solicita actualizar una configuracion de WSL2 (Windows Subsitem Linux) derivando a una página, solo se deben seguir las instrucciones. Los pasos que se solicitarán son:
1. Descargar un ejecutable del tipo `wsl_update_x64.msi`
2. Ejecutar el archivo (poner next y si a todo)
3. Dejar WSL2 como la versión predetermianda, para ello ejecutar `wsl --set-default-version 2`
4. Reiniciar el computador (si no, no funcionará)
5. En configuracion (logo engranaje) en item "general" desclickear que se inicie automaticamente


## Imagenes
* Listar las imagenes existentes
    `docker images`  

* Descargar imagenes desde hub.docker.com
    ``docker pull node``  
    ``docker pull node:18`` (si queremos alguna version en especifico)  
    ``docker pull mysql``  
    ``docker pull mongo``

* Eliminar imagenes
    ``docker image rm node:18``

## Contenedores 

* Crear un contenedor a partir de una imagen (con un nombre aleatotio)
    ``docker container create mongo`` (utilizando la imagen "mongo")
    ``docker create mongo`` (abreviación que hace lo mismo que antes)

* Crear un contenedor a partir de una imagen pero con un nombre especifico (monguito en este ejemplo)
    ``docker create --name monguito mongo``  

* Crear un contenedor con vinculación de puerto
    `docker create -p27017:27017 --name monguito mongo`  (el primero de los dos puertos es el del computador físico, el real)

* Elimina contenedor
    ``docker rm monguito``

* Iniciar Contenedor
    `docker start monguito`

* Detener Contenedor
    `docker stop monguito`

* Lstar contenedores
    ``docker ps`` (activas)
    ``docker ps -a`` (activas e inactivas)

* Ver logs de los contenedores
    `docker logs monguito` (da una sola vista)
    `docker logs --follow monguito` (se queda tomado el terminal escuchando, crtl+c para salir)

### Docker run
* Para descargar imagen + crear contenedor + iniciar contenedor ejecutamos:  
    `docker run mongo` (deja terminal tomada, con ctrl+c detenemos el contenedor)
    `docker run -d mongo` (no deja tomada la terminal y el contenedor se queda ejecutando)

* Para hacer lo mismo que antes pero con opciones "personalidas" hacemos:  
    `docker run --name monguito -p27017:27017 -d mongo`

### Variables de entonrno

Para crear contenedores con variables de entorno se debe poner "-e". Las variables de entorno son relativas a cada imagen. A continuación un ejemplo para mongo
    `docker create -p27017:27017 --name monguito -e MONGO_INITDB_ROOT_USERNAME:root MONGO_INITDB_ROOT_PASSWORD:example  mongo`


## Redes

* Para crear redes
    ``docker create network mired``

* Para listar redes
    ``docker network ls``

* Para eliminar red
    ``docker network rm mired``

* Crear contenedor y asociarlo a una red en especifico
    `docker create -p27017:27017 --name monguito --network mired mongo`

NOTA: Dentro de una misma red todos puertos se llaman con el nombre del contenedor. Es decir, para este último ejemplo todos los contenedores dentro de la red "mired" verán a este contenedor en el puerto "monguito".


## Dockerfile

Por medio del archivo llamado Dockerfile podemos crear imagenes.


* Ejemplo imagen de ubuntu con git

1. Archivo Dockerfile:

    ``FROM ubuntu:20.04``  (imagen que utiliza y su etiqueta (Dockerfile crea imagen a partir de otra imagen))

    ``RUN apt-get update && apt-get -y upgrade`` (ejecuta una actualización. RUN se usa para acceder a los comandos linux)

    ``RUN apt-get install -y git`` (instala git)

2. Crear imagen
    ``docker build -t ubuntu-git .`` (ubuntu-git es el nombre que le dimos a la imagen, "." es la ruta relativa del Dockerfile)

3. Para ver la imagen creada (listar imagenes)
    `docker images`  



* Ejemplo imagen node.

1. Archivo Dockerfile:

    ``FROM node:18`` (imagen que utiliza y su etiqueta)

    ``RUN mkdir -p /home/app`` (crea una carpeta dentro del contenedor en la ruta señalada. RUN se usa para acceder a comandos linux)

    ``COPY . /home/app`` (copia todo el codigo desde la maquina local (ruta ".") hacia la ruta en el contenedor "/home/app". COPY vive en ambos mundo, maquina local y contenedor linux)

    ``WORKDIR /home/app``  (define la ruta /home/app como la principal)
    
    ``RUN npm install``  (instala las cosas que estan en package.json)

    ``EXPOSE 3000``  (puerto de la maquina fisica a la cual se expondrá este contenedor que se está creando)

    ``CMD ["node", "/home/app/index.js"]`` (ejecutar que la aplicación corra)

2. Crear imagen
    ``docker build -t miapp:1 .`` (miapp es el nombre y tag que le dimos a la imagen, "." es la ruta relativa del Dockerfile)

3. Para ver la imagen creada (listar imagenes)
    `docker images`  

4. Crear contenedor a partir de esta imagen
    `docker create -p3000:3000 --name chanchito miapp:1`    

5. Crear contenedor a partir de esta imagen y asociado a una red especifica
    `docker create -p3000:3000 --name chanchito --network mired miapp:1`    

NOTA: En este último ejemplo se utiliza la red de ejemplo "mired" como una manera de facilitar la vinculacion con alguna base de datos en esa misma red.


## docker-compose.yml

Con el archivo docker-compose.yml se pueden crear al mismo tiempo varios contenedores, redes, volumenes e imagenes (esas últimas a partir de otros archivos DockerFile).


* Ejemplo de archivo docker-compose.yml:

```yml
# Verison de Docker
version: "3.9"  
# Servicios (contenedores)
services:  
    # Servicio 1: se construye con nombre "chanchito"
    chanchito:  
        # Se construye a partir del archivo Dockerfile en la ruta "." (el archivo es el mismo del ejemplo node anterior)
        build: .  
        # Mapea los puertos
        ports:  
            - "3000:3000"  
        # Se nombran los contenedores que chanchito utilizara 
        links:  
            - monguito  
    # Servicio 2: se construye con nombre "monguito"
    monguito:  
        # imagen que utiliza
        image: mongo  
        # Mapea los puertos
        ports:  
            - "27017:27017"  
        # Variables de entorno  
        environment:     
            - MONGO_INITDB_ROOT_USERNAME=nico
            - MONGO_INITDB_ROOT_PASSWORD=password
        # Volumenes que utiliza (OPCIONAL)
        volumes:
            - mongo-data:/data/db
            # mysql -> /var/lib/mysql
            # postgres -> /var/lib/postgresql/data

# Volúmenes que declaramos
volumes:
    mongo-data:
```

* Para ejecutar lo anterior nos paramos en la ruta del archivo y ejecutamos
`docker compose up`

* Para eleminar todo lo que se creo en el paso anterior
`docker compose down`



