const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const socket = require('socket.io');
dotenv.config();

// Middleware
app.use(cors({
  origin: 'https://chat-app-frontends-yla0.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

app.use('/auth', require('./Routes/AuthRoutes'));
app.use('/chat', require('./Routes/ChatRoute'));
app.use('/message', require('./Routes/MessageRoute'));

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-app-frontends-yla0.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});

const io = socket(server, {
  cors: {
    origin: 'https://chat-app-frontends-yla0.onrender.com', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
  },
});

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('addNewUser', (userId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
      console.log('OnlineUser', onlineUsers);

      io.emit('getonlineUsers', onlineUsers);
    }
  });

  // Add message
  socket.on('sendMessage', (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipientId);

    if (user) {
      io.to(user.socketId).emit('getmessage', message);
      io.to(user.socketId).emit('getnotification', {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
      console.log('Message sent: ', message);
    }
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit('getonlineUsers', onlineUsers);
  });
});
