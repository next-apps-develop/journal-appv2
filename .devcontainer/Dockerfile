
# Use an official Node.js image
FROM node:18-alpine

# Add metadata to the image
LABEL name="Journal app v2"

# Instalar Git
RUN apk add --no-cache zsh curl git
# SHELL ["/bin/zsh", "-c"]

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .
    
EXPOSE 5173
USER root
# Start the application
CMD ["yarn", "dev"]