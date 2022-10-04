
# Define imagen a utilizar de base
FROM node:18

# Crea Directorio
RUN mkdir -p /home/app

# Copia Codigo Aplicación
COPY . /home/app

# Instala Dependencias (desde package.json)
WORKDIR /home/app
RUN npm install

# Define Puerto
EXPOSE 3000

# Inicializa Aplicacion
CMD ["node", "index.js"]
