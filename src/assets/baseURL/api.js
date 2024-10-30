import axios from "axios";

export default axios.create({
  // baseURL: 'http://ec2-52-194-187-214.ap-northeast-1.compute.amazonaws.com/',
  baseURL: 'https://api.therelovedmarketplace.com/',
  headers: { 'token': 'cCW7PW2CRotxuALrBuMob5lXgVhY4xo' }
});