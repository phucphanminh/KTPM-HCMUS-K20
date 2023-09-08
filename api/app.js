const express = require('express');
const cors = require('cors');
const db = require('./config.js');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const driverRouter = require('./routes/driverRouter');
const callcenterRouter = require('./routes/callcenterRouter.js');
const { Kafka } = require('kafkajs'); 

const app = express();
const port = 3000 || process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/callcenter', callcenterRouter);
app.use('/api/user', userRouter);
app.use('/api/driver', driverRouter);

// Tạo danh sách các topic bạn muốn tạo
const topicsToCreate = ['processing', 'unresolved'];

async function createTopics() {
  try {
    const kafka = new Kafka({
      clientId: 'ktpm-k20-hcmus',
      brokers: ['localhost:9092'], // Danh sách các Kafka broker
    });

    // Kết nối tới Kafka broker
    const admin = kafka.admin();
    await admin.connect();

    for (const topicName of topicsToCreate) {
      try {
        // Kiểm tra xem topic đã tồn tại hay chưa
        const topicExists = await admin.listTopics();

        if (!topicExists.includes(topicName)) {
          // Tạo topic mới nếu chưa tồn tại
          await admin.createTopics({
            topics: [
              {
                topic: topicName,
                numPartitions: 1, // Số lượng partition
                replicationFactor: 1, // Factor sao chép
              },
            ],
          });

          console.log(`Đã tạo topic mới: ${topicName}`);
        } else {
          console.log(`Topic "${topicName}" đã tồn tại.`);
        }
      } catch (error) {
        console.error(`Lỗi khi xử lý topic "${topicName}": `, error);
      }
    }

    // Đóng kết nối
    await admin.disconnect();
  } catch (error) {
    console.error('Lỗi khi tạo topics: ', error);
  }
}

// Call createTopics() after connecting to the database
db.connect((error) => {
  if (error) return console.log(error);
  console.log("Connected to the database successfully");

  // createTopics(); // Call the createTopics function here

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
