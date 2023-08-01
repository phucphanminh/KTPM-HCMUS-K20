/*==============================================================*/
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127229	DƯ PHÁT LỘC                                         */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

USE TAXI;

/* Xác thực người dùng */
DELIMITER $$
DROP PROCEDURE IF EXISTS `AuthenticateUser`$$
CREATE PROCEDURE `AuthenticateUser`(
      IN userTel CHAR(15),
      IN userPass TEXT(256)
)
BEGIN
      -- Mã hóa mật khẩu đầu vào bằng hàm SHA2() với độ dài hash là 256
      SET userPass = SHA2(userPass, 256);
  
      -- Khai báo biến session matchUserId
      SET @matchUserId = NULL;
  
      -- Gán giá trị cho biến session matchUserId
      SELECT TEL INTO @matchUserId FROM USER WHERE TEL = userTel AND PASS = userPass;
  
      IF @matchUserId IS NOT NULL THEN
          -- Xử lý khớp thành công và trả về số điện thoại của người dùng
          SELECT @matchUserId AS result;
      ELSE
          SELECT 'Số điện thoại hoặc mật khẩu không đúng' AS result;
      END IF;
END $$
DELIMITER ;

-- CALL AuthenticateUser('0123456789', 'Random_Password_1');

/* Lấy thông tin người dùng */
DELIMITER $$
DROP PROCEDURE IF EXISTS `GetUser`$$
CREATE PROCEDURE GetUser(
	UTEL varchar(15)
)
BEGIN
	SELECT * 
	FROM USER
	WHERE TEL = UTEL;
END $$
DELIMITER ;

/* Tạo người dùng */
DELIMITER $$
DROP PROCEDURE IF EXISTS `AddUser`$$
CREATE PROCEDURE `AddUser`(
     IN userTel CHAR(15),
     IN userPass TEXT(256),
     IN userName NCHAR(30),
     IN userAva CHAR(30)
)
BEGIN
     -- Kiểm tra xem userTel đã tồn tại trong bảng USER chưa
     IF EXISTS (SELECT 1 FROM USER WHERE TEL = userTel) THEN
         SELECT 'Số điện thoại đã được sử dụng' AS message;
     ELSE
         -- Mã hóa mật khẩu đầu vào bằng hàm SHA2() với độ dài hash là 30
         SET userPass = SHA2(userPass, 256);

         -- Thêm thông tin người dùng vào bảng USER
         INSERT INTO USER (TEL, PASS, NAME, AVA, VIP)
         VALUES (userTel, userPass, userName, userAva, FALSE);
         SELECT 'Tạo tài khoản thành công' AS message;
     END IF;
END $$
DELIMITER ;

/* Cập nhật thông tin người dùng */
DELIMITER $$
DROP PROCEDURE IF EXISTS `UpdateUser`$$
CREATE PROCEDURE UpdateUser(
    IN userTel char(15),
    IN userPass TEXT(256),
    IN userName nchar(30),
    IN userAva char(30),
    IN userVIP bool
)
BEGIN
    UPDATE USER
    SET
        PASS = userPass,
        NAME = userName,
        AVA = userAva,
        VIP = userVIP
    WHERE TEL = userTel;
    SELECT 'Cập nhật thông tin thành công' AS message;
END $$
DELIMITER ;



/* Lấy lịch sử các cước xe của người dùng */
DELIMITER $$
DROP PROCEDURE IF EXISTS `GetRidesByUserID`$$
CREATE PROCEDURE GetRidesByUserID(
    IN userID char(20)
)
BEGIN
    SELECT *
    FROM RIDE
    WHERE USE_ID = userID;
END $$
DELIMITER ;

/* Hủy đặt xe */
DELIMITER $$
DROP PROCEDURE IF EXISTS `CancelRide`$$
CREATE PROCEDURE CancelRide(
    IN rideID char(20)
)
BEGIN
    UPDATE RIDE
    SET
        STATUS = FALSE
    WHERE ID = rideID;
END $$
DELIMITER ;

/* Xác thực tài xế */
DELIMITER $$
DROP PROCEDURE IF EXISTS `AuthenticateDriver`$$
DELIMITER $$
DROP PROCEDURE IF EXISTS `AuthenticateDriver`$$
CREATE PROCEDURE `AuthenticateDriver`(
     IN driverTel CHAR(15),
     IN driverPass TEXT(256)
)
BEGIN
     -- Mã hóa mật khẩu đầu vào bằng hàm SHA2() với độ dài hash là 256
     SET driverPass = SHA2(driverPass, 256);
 
     -- Khai báo biến session matchDriverId
     SET @matchDriverId = NULL;
 
     -- Gán giá trị cho biến session matchDriverId
     SELECT ID INTO @matchDriverId FROM DRIVER WHERE TEL = driverTel AND PASS = driverPass;
 
     IF @matchDriverId IS NOT NULL THEN
         -- Xử lý khớp thành công và trả về ID của tài xế
         SELECT @matchDriverId AS result;
     ELSE
         SELECT 'Số điện thoại hoặc mật khẩu không đúng' AS result;
     END IF;
END $$
DELIMITER ;

-- CALL AuthenticateDriver('2222222222', 'Random_Password_2');

/* Lấy thông tin tài xế */
DELIMITER $$
DROP PROCEDURE IF EXISTS `GetDriver`$$
CREATE PROCEDURE GetDriver(
	UID varchar(20)
)
BEGIN
	SELECT * 
	FROM DRIVER
	WHERE ID = UID;
END $$
DELIMITER ;

/* Tạo tài xế */
DELIMITER $$
DROP PROCEDURE IF EXISTS `AddDriver`$$
CREATE PROCEDURE `AddDriver`(
    IN driverID char(20),
    IN driverTel char(15),
    IN driverPass TEXT(256),
    IN driverName nchar(30),
    IN driverAva char(30),
    IN driverAcc char(30),
    IN driverVehicleID char(20),
    IN driverBrandName char(50),
    IN driverCMND char(20)
)
BEGIN
    -- Kiểm tra số điện thoại đã tồn tại
    IF EXISTS (SELECT 1 FROM DRIVER WHERE TEL = driverTel) THEN
        SELECT 'Số điện thoại đã được sử dụng' AS message;
    ELSE
        -- Mã hóa mật khẩu bằng hàm SHA2() với độ dài hash là 30
		SET driverPass = SHA2(driverPass, 256);

		-- Thêm thông tin tài xế vào bảng DRIVER
		INSERT INTO DRIVER (ID, TEL, PASS, NAME, AVA, ACC, VEHICLEID, BRANDNAME, CMND, FREE)
		VALUES (driverID, driverTel, driverPass, driverName, driverAva, driverAcc, driverVehicleID, driverBrandName, driverCMND, TRUE);
		SELECT 'Tạo tài khoản thành công' AS message;
		END IF;
END $$
DELIMITER ;


/* Cập nhật thông tin tài xế */
DELIMITER $$
DROP PROCEDURE IF EXISTS `UpdateDriver`$$
CREATE PROCEDURE UpdateDriver(
    IN driverID char(20),
    IN driverTel char(15),
    IN driverPass TEXT(256),
    IN driverName nchar(30),
    IN driverAva char(30),
    IN driverAcc char(30),
    IN driverVehicleID char(20),
    IN driverBrandName char(50),
    IN driverCMND char(20),
    IN driverFree bool
)
BEGIN
    UPDATE DRIVER
    SET
        TEL = driverTel,
        PASS = driverPass,
        NAME = driverName,
        AVA = driverAva,
        ACC = driverAcc,
        VEHICLEID = driverVehicleID,
        BRANDNAME = driverBrandName,
        CMND = driverCMND,
        FREE = driverFree
    WHERE ID = driverID;
    SELECT 'Cập nhật thông tin thành công' AS message;
END $$
DELIMITER ;

/* Tới điểm trả khách */
DELIMITER $$
DROP PROCEDURE IF EXISTS `CompleteRide`$$
CREATE PROCEDURE CompleteRide(
    IN rideID char(20),
    IN userID char(20),
    IN cusID char(20),
    IN driverID char(20),
    IN pickupLocation char(50),
    IN dropOffLocation char(50),
    IN bookTime datetime,
    IN price float,
    IN reservedTime datetime
)
BEGIN
    INSERT INTO RIDE (ID, USE_ID, CUS_ID, DRI_ID, PICKUP, DROPOFF, STATUS, BOOKTIME, PRICE, RESERVEDTIME)
    VALUES (rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, TRUE, bookTime, price, reservedTime);
    SELECT 'Thêm cuốc xe thành công' AS message;
END $$
DELIMITER ;

/* Lấy lịch sử các cước xe của tài xế */
DELIMITER $$
DROP PROCEDURE IF EXISTS `GetRidesByDriverID`$$
CREATE PROCEDURE GetRidesByDriverID(
    IN driverID char(20)
)
BEGIN
    SELECT *
    FROM RIDE
    WHERE DRI_ID = driverID;
END $$
DELIMITER ;

-- CALL GetRidesByDriverID ('D2');






