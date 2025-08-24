# Base image
FROM node:22-alpine AS builder

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Dockerfile snippet
ARG VITE_BACKEND_ENDPOINT
ARG VITE_APP_STRIPE_PUBLISHABLE_KEY

ENV VITE_BACKEND_ENDPOINT=$VITE_BACKEND_ENDPOINT
ENV VITE_APP_STRIPE_PUBLISHABLE_KEY=$VITE_APP_STRIPE_PUBLISHABLE_KEY


RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]