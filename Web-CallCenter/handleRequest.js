// geocoding API
const geocoding_api_key='AIzaSyANOciyl6IX13PTN7IGzEypCEfYe2SJAzI';

// goong API
const goong_api_key='tubIc8ZMj8csxNXRARKPmYaZSg9A6C5LMFHQoWiJ';

function sendPostRequest() {
  const requestData = {
      phoneNumber: "0123456789",
      pickupAddress: "2 Nguyễn Văn Cừ, Quận 5, TP.Hồ Chí Minh",
      carType: "Car 7 seats",
      coordinateProviderType: "goongProvider"
  };

  $.ajax({
      url: 'http://localhost:3000/api/callcenter/customer',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function(response) {
          console.log('Response from server:', response);
      },
      error: function(error) {
          console.error('Error sending POST request:', error);
      }
  });
}

$(document).ready(function() {
    // Tạo nút "Send POST Request" bằng jQuery
    const sendButton = $('<button>').text('Send POST Request');

    // Gán sự kiện nhấp chuột cho nút
    sendButton.click(sendPostRequest);

    // Thêm nút vào thẻ body của trang
    $('body').append(sendButton);
});
