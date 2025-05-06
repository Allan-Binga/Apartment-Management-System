# Use an official Node.js runtime as the base image
FROM node:22-alpine AS builder

# Set the working directory in the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

#Multi stage build
FROM node:22-alpine

WORKDIR /app/client

# Copy only the node_modules from the build stage
COPY --from=builder /app/client/node_modules ./node_modules
COPY --from=builder /app/client ./

# Default command to run the development server
CMD ["npm", "run", "dev"]