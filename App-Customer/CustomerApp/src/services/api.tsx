import axios from 'axios';
const PORT=3000
const api = axios.create({
	baseURL: `http://192.168.2.13:${PORT}/api`,
  });
  

export default api