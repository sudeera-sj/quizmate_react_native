import axios from 'axios';

const apiController = axios.create({
  baseURL: 'https://opentdb.com/',
});

export default apiController;
