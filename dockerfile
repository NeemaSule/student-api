# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./

# Install dependencies (including devDependencies for building)
RUN npm install

# Copy all source files
COPY . .

# Expose API port (must match your PORT variable)
EXPOSE 3000

# Define runtime environment variables
ENV DB_HOST=db \
    DB_USER=student \
    DB_PASSWORD=Neema@@24 \
    DB_NAME=student_db \
    PORT=3000

# Startup command (replace 'server.js' with your main file if different)
CMD ["node", "server.js"]
