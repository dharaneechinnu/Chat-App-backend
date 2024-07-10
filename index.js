const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });



  app.use('/auth', require('./Routes/AuthRoutes'));
  app.use('/chat',require('./Routes/ChatRoute'));
  app.use('/message',require('./Routes/MessageRoute'))
  










  const port = process.env.PORT
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on : ${port}`);
});

