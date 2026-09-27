const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.io bağlantılarını dinliyoruz
io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı babacan');

  // HTML'den 'chat message' adıyla gelen mesajı yakala
  socket.on('chat message', (msg) => {
    // Yakalanan bu mesajı bağlı olan HERKESE geri dağıt
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
