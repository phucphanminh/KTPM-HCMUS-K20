const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const callcenterRouter = require('./routes/callcenterRouter.js');
const userRouter = require('./routes/userRouter');
const driverRouter = require('./routes/driverRouter');
const createTcpPool = require('./config.js'); // Đặt đường dẫn đúng

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Kết nối đến cơ sở dữ liệu và gắn pool kết nối vào request object
app.use(async (req, res, next) => {
  try {
    const pool = await createTcpPool(); // Gọi hàm để tạo pool kết nối
    req.pool = pool; // Gắn pool kết nối vào request object
    next();
  } catch (error) {
    console.error('Error creating database connection pool:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Sử dụng các routes
app.use('/api/callcenter', callcenterRouter);
app.use('/api/user', userRouter);
app.use('/api/driver', driverRouter);

// Khởi động ứng dụng
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
