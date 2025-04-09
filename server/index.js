const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
require('./src/config/database');
const user_routes = require('./src/routes/userRoutes');
const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/user', user_routes);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

   socket.on('send_message', (data)=>{
    io.emit('receive_message', data);
   })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});