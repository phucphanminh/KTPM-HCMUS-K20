const userPromises = require('../promises/userPromises.js');

const login = async(req, res) => {
    const { userTel, userPass } = req.body;

    try {
        const result = await userPromises.callAuthenticateUser(userTel, userPass);
        return res.status(200).json({ result: result.result });
    } catch (error) {
        console.error('Lỗi khi xác thực người dùng:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực người dùng.' });
    }
};

const userInfor = async(req, res) => {
    const userTel = req.params.user_tel;

    try {
        const user = await userPromises.callGetUser(userTel);
        return res.json(user);
    } catch (error) {
        console.error('Lỗi khi gọi stored procedure:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
    }
};

const userAdd = async(req, res) => {
    const { userTel, userPass, userName, userAva } = req.body;

    try {
        const result = await userPromises.callAddUser(userTel, userPass, userName, userAva);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Lỗi khi gọi stored procedure:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm user.' });
    }
};

const userInforUpdate = async(req, res) => {
    const { userTel, userPass, userName, userAva, userVIP } = req.body;

    try {
        const result = await userPromises.callUpdateUser(userTel, userPass, userName, userAva, userVIP);
        return res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Lỗi khi gọi stored procedure:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
    }
};

const userRides = async(req, res) => {
    const userID = req.params.user_id;

    try {
        const rides = await userPromises.callGetRidesByUserID(userID);
        return res.json(rides);
    } catch (error) {
        console.error('Lỗi khi gọi stored procedure:', error);
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