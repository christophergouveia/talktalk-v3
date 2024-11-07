import { io } from 'socket.io-client';

const URL = 'http://26.123.171.243:3001';
const socket = io(URL, { autoConnect: true });

export default socket;
