import axios from "axios";

export default axios.create({
  // baseURL: 'https://be.talentsage.com/',
//   baseURL: 'https://uatbe.talentsage.com/',
  // baseURL: 'https://betest.gcm3.com/',
  baseURL: 'http://127.0.0.1:8000/',
  headers: { 'token': 'cCW7PW2CRotxuALrBuMob5lXgVhY4xo' }
});