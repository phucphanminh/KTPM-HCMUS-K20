/*==============================================================*/
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127229	DƯ PHÁT LỘC                                         */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

USE TAXI;

-- Insert data into CUSTOMER table
INSERT INTO CUSTOMER (ID, TEL, NAME)
VALUES
   ('C1', '0123456789', 'Jane Smith'),
   ('C2', '0234567890', 'John Doe'),
   ('C3', '0345678901', 'Bob Johnson'),
   ('C4', '0456789012', 'Alice Brown'),
   ('C5', '0567890123', 'Michael Lee');

-- Insert data into DRIVER table
INSERT INTO DRIVER (ID, TEL, PASS, NAME, AVA, ACC, VEHICLEID, VEHICLETYPE, BRANDNAME, CMND, FREE)
VALUES
    ('D1', '1111111111', SHA2('Random_Password_1', 256), 'Isabella Taylor', 'D1.png', '6589320147', '51C1-12345', 'Motorcycle', 'Honda Wave Alpha', '089765432110', TRUE),
    ('D2', '2222222222', SHA2('Random_Password_2', 256), 'William Martinez', 'D2.png', '3150782496', '36G8-67890', 'Car 7 seats', 'Mercedes-Benz E-Class', '034567890109', TRUE),
    ('D3', '3333333333', SHA2('Random_Password_3', 256), 'Emily Williams', 'D3.png', '8912634075', '77A2-98765', 'Car 4 seats', 'Ford Mustang', '012345678908', TRUE),
    ('D4', '4444444444', SHA2('Random_Password_4', 256), 'Ethan Patel', 'D4.png', '4062819357', '59B6-54321', 'Car 4 seats', 'Rolls-Royce Phantom', '065432109876', TRUE),
    ('D5', '5555555555', SHA2('Random_Password_5', 256), 'James Chen', 'D5.png', '5291760348', '63D9-23456', 'Motorcycle', 'Yamaha Exciter', '045678901232', TRUE);



-- Insert data into USER table
INSERT INTO USER (TEL, PASS, NAME, AVA, VIP)
VALUES
    ('0123456789', SHA2('Random_Password_1', 256), 'Olivia Kim', 'U1.png', TRUE),
    ('0234567890', SHA2('Random_Password_2', 256), 'Mia Garcia', 'U2.png', FALSE),
    ('0345678901', SHA2('Random_Password_3', 256), 'Michael Wong', 'U3.png', FALSE),
    ('0456789012', SHA2('Random_Password_4', 256), 'Christopher Anderson', 'U4.png', TRUE),
    ('0567890123', SHA2('Random_Password_5', 256), 'Sophia Davis', 'U5.png', TRUE);

-- Insert data into RIDE table
INSERT INTO RIDE (ID, USE_ID, CUS_ID, DRI_ID, PICKUP, DROPOFF, STATUS, BOOKTIME, PRICE, RESERVEDTIME)
VALUES
   ('R1', '0234567890', NULL, 'D2', 'Chợ Bến Thành', 'Chùa Vĩnh Nghiêm', TRUE, '2023-07-26 12:34:56', 210000 , '2023-07-26 10:00:00'),
   ('R2', '0345678901', NULL, 'D3', 'Thảo Cầm Viên', 'Công viên Lê Văn Tám', FALSE, '2023-07-26 13:45:12', 325000, '2023-07-26 11:15:00'),
   ('R3', NULL, 'C3', 'D4', 'Nhà thờ Đức Bà', 'Bảo tàng Lịch sử Việt Nam', TRUE, '2023-07-26 15:30:21', 160000, '2023-07-26 12:45:00'),
   ('R4', NULL, 'C4', 'D5', 'Bảo tàng Mỹ thuật', 'Khu du lịch Suối Tiên', TRUE, '2023-07-26 17:20:48', 275000, '2023-07-26 15:00:00'),
   ('R5', '0234567890', NULL, 'D1', 'Nhà thờ Tân Định', 'Khu phố Tây Bùi Viện', FALSE, '2023-07-26 19:10:39', 390000, '2023-07-26 17:30:00'),
   ('R6', NULL, 'C1', 'D3', 'Chợ Bà Chiểu', 'Bảo tàng Chứng tích chiến tranh', TRUE, '2023-07-27 08:15:00', 120000, '2023-07-27 06:45:00'),
   ('R7', '0456789012', NULL, 'D4', 'Đại học Khoa học Tự nhiên', 'Khu du lịch Đầm Sen', FALSE, '2023-07-27 09:30:00', 350000, '2023-07-27 07:45:00'),
   ('R8', NULL, 'C3', 'D5', 'Tòa nhà Bitexco Financial Tower', 'Đại học Bách Khoa', TRUE, '2023-07-27 10:45:00', 180000, '2023-07-27 09:00:00'),
   ('R9', '0234567890', NULL, 'D1', 'Galaxy Cinema Nguyễn Du', 'Đại học Y Dược', TRUE, '2023-07-27 12:00:00', 295000, '2023-07-27 10:15:00'),
   ('R10', '0345678901', NULL, 'D2', 'BHD Star Cineplex Vincom Quang Trung', 'Đại học Sư phạm', FALSE, '2023-07-27 13:15:00', 230000, '2023-07-27 11:30:00');
