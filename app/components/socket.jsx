import { io } from 'socket.io-client';

const URL = 'https://26.123.171.243:3001';
const socket = io(URL, { 
  autoConnect: true,
  secure: true,
  rejectUnauthorized: false,
  withCredentials: true
});

export default socket;
