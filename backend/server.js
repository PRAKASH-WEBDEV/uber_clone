const http = require('http');//backend/server.js
const app = require('./app');
const port = process.env.PORT || 3000;


const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

