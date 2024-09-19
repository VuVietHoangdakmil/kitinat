# Base image
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Expose the port the app runs on
EXPOSE 4173

# Run the application
CMD ["npm", "run", "preview"]

