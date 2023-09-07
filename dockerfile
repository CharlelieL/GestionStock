FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Move node_modules to a global directory
RUN mv node_modules /node_modules

# Copy the rest of your application into the container
COPY . .

# Set the NODE_PATH environment variable
ENV NODE_PATH=/node_modules

EXPOSE 3000
CMD ["npm", "start"]