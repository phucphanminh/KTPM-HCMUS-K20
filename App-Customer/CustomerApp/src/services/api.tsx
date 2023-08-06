import axios from 'axios';
import { useDispatch } from 'react-redux';

const PORT=3000
const api = axios.create({
	baseURL: `http://localhost:${PORT}/api`,
  });
  

export default api