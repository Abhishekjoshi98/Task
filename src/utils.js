import axios from 'axios';

const git = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 10000,
});

export {git};