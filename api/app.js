const express = require('express');
const db = require ('./config.js');
const bodyParser = require('body-parser');
const callcenterRouter = require('./routes/callcenterRouter.js');
const userRouter = require('./routes/userRouter');
const driverRouter = require('./routes/driverRouter');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/callcenter', callcenterRouter);
app.use('/api/user', userRouter);
app.use('/api/driver', driverRouter);

//connect to DB
db.connect((error) => {
  if (error) return console.log(error);
  console.log("Connect to DB success");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
