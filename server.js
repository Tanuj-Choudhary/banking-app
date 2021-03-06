// Third Party Imports
require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Project Imports
const app = require('./src/app');

const PORT = process.env.PORT || 8000;

// LOCAL DATABASE
let database = process.env.DATABASE;
database = database.replace('<password>', process.env.DATABASE_PASSWORD);

const DB = database || process.env.DATABASE_LOCAL;

// Connect to database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log('database connected');
    }
  })
  .catch((err) => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log(err);
    }
  });

// Start server
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.log('Listening at port 8000');
  }
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
