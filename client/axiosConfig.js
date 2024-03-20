import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://192.168.31.165:5000',//AirFiber
  // baseURL: 'http://192.168.43.89:5000', //POCO F!
 baseURL:'http://192.168.137.57:5000', //blackbox
  // baseURL: 'http://localhost:5000', 
  // baseURL:'http://192.168.137.98:5000', //NANHINI
  // baseURL:'http://192.168.137.220:5000', //JP
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
