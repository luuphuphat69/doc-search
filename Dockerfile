# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container to the app's folder
WORKDIR /doc-search/doc-search

# Copy package.json and package-lock.json to the working directory
COPY doc-search/package.json .

# Install dependencies
RUN npm install

# Copy the rest of the app's code into the container
COPY doc-search .

# Expose the port that the Vite development server will run on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
