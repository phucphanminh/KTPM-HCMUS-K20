const express = require('express');
const bodyParser = require('body-parser');
const callcenterRouter = require('./routes/callcenterRouter.js');
const customerRouter = require('./routes/customerRouter');
const driverRouter = require('./routes/driverRouter');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/callcenter', callcenterRouter);
app.use('/api/customer', customerRouter);
app.use('/api/driver', driverRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
