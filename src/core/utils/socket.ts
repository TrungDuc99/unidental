import * as io from 'socket.io-client';
const socket = io.connect('http://localhost:9888');
export default socket;
