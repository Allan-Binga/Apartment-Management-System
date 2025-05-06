#Base image
FROM node:22-alpine AS builder

#Working direcotry
WORKDIR /app

#Copy package.json
COPY package*json ./

#Install dependencies
RUN npm install --production

#Copy all files
COPY . .

#Multi stage build
FROM node:22-alpine

WORKDIR /app

# Copy only the node_modules from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

#Expose port
CMD ["npm", "start"]