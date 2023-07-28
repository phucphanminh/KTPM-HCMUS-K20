/*==============================================================*/
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127229	DƯ PHÁT LỘC                                         */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

USE TAXI;

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

/* Cập nhật thông tin người dùng */
DELIMITER $$
DROP PROCEDURE IF EXISTS `UpdateUser`$$
CREATE PROCEDURE UpdateUser(
    IN userTel char(15),
    IN userPass char(30),
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

/* Cập nhật thông tin tài xế */
DELIMITER $$
DROP PROCEDURE IF EXISTS `UpdateDriver`$$
CREATE PROCEDURE UpdateDriver(
    IN driverID char(20),
    IN driverTel char(15),
    IN driverPass char(30),
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
END $$
DELIMITER ;

/* Tới điểm trả khách */
DELIMITER $$
DROP PROCEDURE IF EXISTS `CompleteRide`$$
CREATE PROCEDURE CompleteRide(
    IN rideID char(20)
)
BEGIN
    UPDATE RIDE
    SET
        STATUS = TRUE
    WHERE ID = rideID;
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






