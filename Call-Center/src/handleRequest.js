import CoordinateProviderFactory from './CoordinateProviderFactory.js';
import axios from 'axios';
import GpsHistory from './DTO/GpsHistory';
import CustomerInfoDTO from './DTO/CustomerInfoDTO .js';

async function handleRequest() {
  const requestData = {
    phoneNumber: "0123456789",
    name: "phuc phan",
    // pickupAddress: "Đại học Văn Lang",
    pickupAddress: "2 Nguyễn Văn Cừ, Quận 5, TP.Hồ Chí Minh",
    dropoffAddress: "Landmark 81",
    carType: "Car 7 seats",
    coordinateProviderType: "goongProvider"
  };

  try {
    // Gửi yêu cầu POST đến máy chủ bằng Axios
    const response = await axios.post('http://localhost:4500/api/callcenter/customer', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // response rỗng, tạo CoordinateProviderFactory và dịch vụ dựa trên coordinateProviderType
    const coordinateProviderFactory = new CoordinateProviderFactory();
    const coordinateProviderType = requestData.coordinateProviderType;
    const coordinateProvider = coordinateProviderFactory.createProvider(coordinateProviderType);
    const customerInfoDTO = new CustomerInfoDTO(requestData.phoneNumber, requestData.name, requestData.pickupAddress, requestData.dropoffAddress, requestData.coordinateProviderType);
    // console.log(customerInfoDTO);

    // Lấy tọa độ điểm đến
    const dropoffCoordinate = await coordinateProvider.getCoordinateResponse(requestData.dropoffAddress);
    // console.log(dropoffCoordinate);
    // Lấy ra giá trị geometry/location/lat và geometry/location/lng của mỗi phần tử
    const extractedDropoffCoordinates = dropoffCoordinate.results.map(item => ({
      lat: item.geometry.location.lat,
      lng: item.geometry.location.lng,
    }));

    console.log("Drop off: ", extractedDropoffCoordinates[0]);
    // console.log("Drop off: ", extractedDropoffCoordinates);     
    
    customerInfoDTO.dropOffLat = extractedDropoffCoordinates[0].lat;
    customerInfoDTO.dropOffLng = extractedDropoffCoordinates[0].lng;
    console.log('Drop off coordinate service: ', customerInfoDTO);
    // console.log('Drop off coordinate service: ', customerInfoDTO.pickUpLat); // Kiểm tra coi có vị trùng không

    if (response.data) {
      const responseData = response.data;
      console.log(responseData);
      customerInfoDTO.pickUpLat = responseData.latitude;
      customerInfoDTO.pickUpLng = responseData.longitude;
      console.log('Pick up coordinate db: ', customerInfoDTO);
    } else {
      // Lấy tọa độ điểm đón
      const pickupCoordinate = await coordinateProvider.getCoordinateResponse(requestData.pickupAddress);
      // console.log(pickupCoordinate);
      // Lấy ra giá trị geometry/location/lat và geometry/location/lng của mỗi phần tử
      const extractedPickUpCoordinates = pickupCoordinate.results.map(item => ({
        lat: item.geometry.location.lat,
        lng: item.geometry.location.lng,
      }));

      console.log("Pick up: ", extractedPickUpCoordinates[0]);
      // console.log("Pick up: ", extractedPickUpCoordinates);
      
      //Lưu tọa độ đón của customer
      const gpsHistory = new GpsHistory(requestData.phoneNumber, requestData.pickupAddress, extractedPickUpCoordinates[0].lat, extractedPickUpCoordinates[0].lng);
      console.log('GPS History: ', gpsHistory);
      
      const result = await axios.post('http://localhost:4500/api/callcenter/save', gpsHistory, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Result: ', result.data.message);

      customerInfoDTO.pickUpLat = extractedPickUpCoordinates[0].lat;
      customerInfoDTO.pickUpLng = extractedPickUpCoordinates[0].lng;
      console.log('Pick up coordinate service: ', customerInfoDTO);
    }

    // Ghi nhận thông tin customer
    // const result = await axios.post('http://localhost:4500/api/callcenter/add-customer', customerInfoDTO, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // console.log('Result: ', result.data.message);
  } catch (err) {
    console.log(err);
  }
}

export default handleRequest;
