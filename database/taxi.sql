/*==============================================================*/
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127229	DƯ PHÁT LỘC                                         */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

DROP SCHEMA IF EXISTS TAXI;
CREATE SCHEMA TAXI;
USE TAXI;

/*==============================================================*/
/* Table: CUSTOMER                                              */
/*==============================================================*/
create table CUSTOMER
(
   ID                   char(20) not null  comment '',
   TEL                  char(15) not null  comment '',
   NAME                 nchar(30)  comment '',
   primary key (ID)
);

/*==============================================================*/
/* Table: DRIVER                                                */
/*==============================================================*/
create table DRIVER
(
   ID                   char(20) not null  comment '',
   TEL                  char(15) not null  comment '',
   PASS                 text(256) not null  comment '',
   NAME                 nchar(30) not null  comment '',
   AVA                  char(30) not null  comment '',
   ACC                  char(30) not null  comment '',
   VEHICLEID            char(20) not null  comment '',
   VEHICLETYPE          char(50) not null  comment '',
   BRANDNAME            char(50) not null  comment '',
   CMND         		char(20) not null  comment '',
   FREE                 bool not null  comment '',
   primary key (ID)
);

/*==============================================================*/
/* Table: RIDE                                                  */
/*==============================================================*/
create table RIDE
(
   ID                   char(20) not null  comment '',
   USE_ID               char(20)  comment '',
   CUS_ID               char(20)  comment '',
   DRI_ID               char(20) not null  comment '',
   PICKUP               char(50) not null  comment '',
   DROPOFF              char(50) not null  comment '',
   STATUS               bool not null  comment '',
   BOOKTIME             datetime not null  comment '',
   PRICE                float not null  comment '',
   RESERVEDTIME         datetime  comment '',
   primary key (ID)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   TEL                  char(15) not null  comment '',
   PASS                 text(256) not null  comment '',
   NAME                 nchar(30) not null  comment '',
   AVA                  char(30) not null  comment '',
   VIP                  bool not null  comment '',
   primary key (TEL)
);

alter table RIDE add constraint FK_RIDE_CUSTOMER foreign key (CUS_ID)
      references CUSTOMER (ID) on delete restrict on update restrict;

alter table RIDE add constraint FK_RIDE_USER foreign key (USE_ID)
      references USER (TEL) on delete restrict on update restrict;

alter table RIDE add constraint FK_RIDE_DRIVER foreign key (DRI_ID)
      references DRIVER (ID) on delete restrict on update restrict;

