/*==============================================================*/
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127229	DƯ PHÁT LỘC                                         */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Create schema
DROP SCHEMA IF EXISTS TAXI CASCADE;
CREATE SCHEMA TAXI;

-- Set search path to the TAXI schema
SET search_path = TAXI;

-- Create CUSTOMER table
CREATE TABLE CUSTOMER
(
   ID                   CHAR(20) NOT NULL,
   TEL                  CHAR(15) NOT NULL,
   NAME                 VARCHAR(30),
   PRIMARY KEY (ID)
);

-- Create DRIVER table
CREATE TABLE DRIVER
(
   ID                   CHAR(20) NOT NULL,
   TEL                  CHAR(15) NOT NULL,
   PASS                 TEXT NOT NULL,
   NAME                 NCHAR(30) NOT NULL,
   AVA                  CHAR(30) NOT NULL,
   ACC                  CHAR(30) NOT NULL,
   VEHICLEID            CHAR(20) NOT NULL,
   VEHICLETYPE          CHAR(50) NOT NULL,
   BRANDNAME            CHAR(50) NOT NULL,
   CMND                 CHAR(20) NOT NULL,
   FREE                 BOOLEAN NOT NULL,
   PRIMARY KEY (ID)
);

-- Create APPUSER table
CREATE TABLE APPUSER
(
   TEL                  CHAR(15) NOT NULL,
   PASS                 TEXT NOT NULL,
   NAME                 NCHAR(30) NOT NULL,
   AVA                  CHAR(30) NOT NULL,
   VIP                  BOOLEAN NOT NULL,
   PRIMARY KEY (TEL)
);

-- Create RIDE table
CREATE TABLE RIDE
(
   ID                   CHAR(20) NOT NULL,
   USE_ID               CHAR(20),
   CUS_ID               CHAR(20),
   DRI_ID               CHAR(20) NOT NULL,
   PICKUP               CHAR(50) NOT NULL,
   DROPOFF              CHAR(50) NOT NULL,
   STATUS               BOOLEAN NOT NULL,
   BOOKTIME             TIMESTAMP NOT NULL,
   PRICE                FLOAT NOT NULL,
   RESERVEDTIME         TIMESTAMP,
   PRIMARY KEY (ID),
   CONSTRAINT FK_RIDE_CUSTOMER FOREIGN KEY (CUS_ID) REFERENCES CUSTOMER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT,
   CONSTRAINT FK_RIDE_APPUSER FOREIGN KEY (USE_ID) REFERENCES APPUSER (TEL) ON DELETE RESTRICT ON UPDATE RESTRICT,
   CONSTRAINT FK_RIDE_DRIVER FOREIGN KEY (DRI_ID) REFERENCES DRIVER (ID) ON DELETE RESTRICT ON UPDATE RESTRICT
);



