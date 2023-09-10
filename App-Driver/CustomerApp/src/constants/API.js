export const API = {
  USER: {
    LOGIN: '/user/login',
    REGISTER: '/user/add-user',
  },
  DRIVER: {
    LOGIN: '/driver/login',
    REGISTER: '/driver/add-driver',
    GET_INFO: '/driver/driver-info',
    CREATE_RIDE: '/driver/bookings/process',
    GET_RIDE: '/driver/driver-rides',
    CANCEL_RIDE: '/driver/driver-rides/cancel',
    COMPLETE_RIDE: '/driver/driver-rides/complete',
  },
};
