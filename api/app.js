const express = require('express');
const cors = require('cors');
const db = require('./config.js');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const driverRouter = require('./routes/driverRouter');
const callcenterRouter = require('./routes/callcenterRouter.js');

const app = express();
const port = 4500 || process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/callcenter', callcenterRouter);
app.use('/api/user', userRouter);
app.use('/api/driver', driverRouter);

// Call createTopics() after connecting to the database
db.connect((error) => {
  if (error) return console.log(error);
  console.log("Connected to the database successfully");

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
