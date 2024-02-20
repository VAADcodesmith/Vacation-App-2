const express = require('express');
const path = require('path');
const userRoutes = require('../routes/userRoutes');
const connectDB = require('../db/connect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const NODE_ENV = process.env.NODE_ENV;

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


const PORT = 3000;
const DB_URI = 'mongodb+srv://herreraanthony2:pOQN2b1E5E2PbVZ8@users.wszkqhb.mongodb.net/';

connectDB(DB_URI);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Routes for user-related operations
app.use('/', userRoutes);

// Serve static files from the React application
app.use(express.static(path.resolve(__dirname, '../build')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

if (NODE_ENV === 'production'){
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../template.html'));
  });
  }


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});

module.exports = app;