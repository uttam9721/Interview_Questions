import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

export default instance;
