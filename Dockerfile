# Use the official Node.js 18 image as a base image
FROM node:18-alpine

# Set environment variable to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY package.json package-lock.json ./
RUN npm pkg delete scripts.prepare && npm install --production --omit=dev

# Copy the built Next.js files and other necessary files
COPY .next .next
COPY public public
COPY next.config.mjs next.config.mjs

# Expose the port that the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
