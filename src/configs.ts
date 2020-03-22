import axios from 'axios';

const instance = axios.create({
  baseURL: ''
});

export function getApi(url: string) {
  return instance.get(`https://corona.lmao.ninja/${url}`);
}

export function getIp() {
  return instance.get(`https://api.ipify.org/?format=json`);
}

export function getLocation(ip: string) {
  return instance.get(`https://json.geoiplookup.io/api/${ip}`);
}

