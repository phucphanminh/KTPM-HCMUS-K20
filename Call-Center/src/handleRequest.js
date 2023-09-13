import CoordinateProviderFactory from "./CoordinateProviderFactory.js";
import axios from "axios";
import GpsHistory from "./DTO/GpsHistory";
import {
  CustomerInfoDTO,
  Customer,
  Position,
  CarDetails,
} from "./DTO/CustomerInfoDTO .js";
import { SocketIOClient } from "./socket/index.tsx";

const toString = {
  "7 seats": 200000,
  "4 seats": 120000,
  "Goong Maps": "goongProvider",
};

const socketClient = SocketIOClient.getInstance();
socketClient.connect();

async function handleRequest(requestData) {
  // const requestData = {
  //   tel: "0123456789",
  //   name: "phuc phan",
  //   // originDescription: "Đại học Văn Lang",
  //   originDescription: "2 Nguyễn Văn Cừ, Quận 5, TP.Hồ Chí Minh",
  //   destinationDescription: "Landmark 81",
  //   tel: "Car 7 seats",
  //   coordinateProviderType: "goongProvider"
  // };

  try {
    // Gửi yêu cầu POST đến máy chủ bằng Axios
    const response = await axios.post(
      "https://ktpm-k20-hcmus.onrender.com/api/callcenter/customer",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    // response rỗng, tạo CoordinateProviderFactory và dịch vụ dựa trên coordinateProviderType
    const coordinateProviderFactory = new CoordinateProviderFactory();
    const coordinateProviderType = toString[requestData.coordinateProviderType];
    const coordinateProvider = coordinateProviderFactory.createProvider(
      coordinateProviderType
    );

    // Lấy tọa độ điểm đến
    const dropoffCoordinate = await coordinateProvider.getCoordinateResponse(
      requestData.destinationDescription
    );
    console.log(dropoffCoordinate);
    // Lấy ra giá trị geometry/location/lat và geometry/location/lng của mỗi phần tử
    const extractedDropoffCoordinates = dropoffCoordinate.results.map(
      (item) => ({
        lat: item.geometry.location.lat,
        lng: item.geometry.location.lng,
      })
    );

    console.log("Drop off: ", extractedDropoffCoordinates[0]);
    // console.log("Drop off: ", extractedDropoffCoordinates);

    const customer = new Customer(requestData.tel, requestData.name);
    // console.log(customer);
    const cardetails = new CarDetails(
      toString[requestData.genre],
      requestData.genre
    );
    // console.log(carDetail);
    const destination = new Position(
      requestData.destinationDescription,
      extractedDropoffCoordinates[0].lat,
      extractedDropoffCoordinates[0].lng
    );
    console.log("Drop off coordinate service: ", destination);
    // console.log('Drop off coordinate service: ', customerInfoDTO.pickUpLat); // Kiểm tra coi có vị trùng không
    let origin = "";

    if (response.data) {
      const responseData = response.data;
      console.log(responseData);
      origin = new Position(
        requestData.originDescription,
        responseData.latitude,
        responseData.longitude
      );
      console.log("Origin coordinate db: ", origin);
    } else {
      // Lấy tọa độ điểm đón
      const pickupCoordinate = await coordinateProvider.getCoordinateResponse(
        requestData.originDescription
      );
      // console.log(pickupCoordinate);
      // Lấy ra giá trị geometry/location/lat và geometry/location/lng của mỗi phần tử
      const extractedPickUpCoordinates = pickupCoordinate.results.map(
        (item) => ({
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng,
        })
      );

      console.log("Pick up: ", extractedPickUpCoordinates[0]);
      // console.log("Pick up: ", extractedPickUpCoordinates);

      //Lưu tọa độ đón của customer
      const gpsHistory = new GpsHistory(
        requestData.tel,
        requestData.originDescription,
        extractedPickUpCoordinates[0].lat,
        extractedPickUpCoordinates[0].lng
      );
      console.log("GPS History: ", gpsHistory);

      const result = await axios.post(
        "https://ktpm-k20-hcmus.onrender.com/api/callcenter/save",
        gpsHistory,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Result: ", result.data.message);

      origin = new Position(
        requestData.originDescription,
        extractedPickUpCoordinates[0].lat,
        extractedPickUpCoordinates[0].lng
      );
      console.log("Origin coordinate service: ", origin);
    }

    const customerInfoDTO = new CustomerInfoDTO(
      customer,
      origin,
      destination,
      cardetails,
      requestData.coordinateProviderType
    );
    // console.log(customerInfoDTO.Customer);
    console.log(customerInfoDTO);

    // Ghi nhận thông tin customer
    const newCustomer = {
      ID: customerInfoDTO.ID,
      tel: customerInfoDTO.Customer.tel,
      name: customerInfoDTO.Customer.name,
    };
    console.log(newCustomer);
    const result = await axios.post(
      "https://ktpm-k20-hcmus.onrender.com/api/callcenter/add-customer",
      newCustomer,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Result: ", result.data.message);

    socketClient.emitSendBooking(customerInfoDTO);
  } catch (err) {
    console.log(err);
  }
}

export default handleRequest;
