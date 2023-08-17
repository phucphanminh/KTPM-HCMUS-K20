const userPromises = require('../promises/userPromises.js');

const login = async(req, res) => {
    const { userTel, userPass } = req.body;
    // Kiểm tra userTel có rỗng không
    if (!userTel) {
      return res.status(400).json({ error: 'Số điện thoại không được bỏ trống.' });
    }
    // Kiểm tra userTel có khoảng trắng hay có kí tự đb không
    else if (isNaN(userTel) || userTel.includes(' ')) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ.' });
    }
    try {
        const result = await userPromises.callAuthenticateUser(userTel, userPass);
        return res.status(200).json({ result: result.result });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực người dùng.' });
    }
};

const userInfor = async(req, res) => {
    const userTel = req.params.user_tel;

    try {
      const user = await userPromises.callGetUser(userTel);
      if (user.length === 0) {
        return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng.' });
      }
      return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
    }
};

const userAdd = async(req, res) => {
    const { userTel, userPass, userName, userAva } = req.body;

    try {
        const result = await userPromises.callAddUser(userTel, userPass, userName, userAva);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm user.' });
    }
};

const userInforUpdate = async(req, res) => {
    const { userTel, userPass, userName, userAva, userVIP } = req.body;

    try {
        const result = await userPromises.callUpdateUser(userTel, userPass, userName, userAva, userVIP);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
    }
};

const userRides = async(req, res) => {
    const userID = req.params.user_id;

    try {
        const rides = await userPromises.callGetRidesByUserID(userID);
        if (rides.length === 0) {
          return res.status(404).json({ message: 'Bạn chưa có lịch sử di chuyển.' });
        }
        return res.json(rides);
    } catch (error) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy lịch sử cuốc xe của người dùng.' });
    }
};

const createBooking = (req, res) => {
    // Xử lý tạo cuốc xe từ App Khách Hàng
    // ...
};

const getAvailableDrivers = (req, res) => {
    // Xử lý lấy danh sách tài xế hiện có
    // ...
};

const cancelBooking = (req, res) => {
    // Xử lý hủy cuốc xe từ App Khách Hàng
    // ...
};

module.exports = {
    login,
    userInfor,
    userAdd,
    userInforUpdate,
    userRides,
    createBooking,
    getAvailableDrivers,
    cancelBooking,
};