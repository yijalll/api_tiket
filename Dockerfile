FROM node:18

Set the working directory to /app
WORKDIR /app

Copy the package.json and package-lock.json files to /app
COPY package*.json ./

Install dependencies
RUN npm install

Copy the rest of the application code to /app
COPY . .

Expose port 5000
EXPOSE 5000

Start the server
CMD ["node", "index.js"]
