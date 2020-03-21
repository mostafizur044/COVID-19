import axios from 'axios';

const instance = axios.create({
  baseURL: `https://corona.lmao.ninja/`
});

export function getApi(url: string) {
  return instance.get(url);
}

