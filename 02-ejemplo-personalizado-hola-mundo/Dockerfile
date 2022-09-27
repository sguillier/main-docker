
# Define imagen a utilizar de base
FROM node:18

# Crea Directorio
RUN mkdir -p /usr/src/app

# Copia Codigo Aplicación
COPY . /usr/src/app

# Instala Dependencias
WORKDIR /usr/src/app
RUN npm install

# Define Puerto
EXPOSE 8080

# Inicializa Aplicacion
CMD ["node", "/usr/src/app/index.js"]
#CMD [ "npm", "start" ]

