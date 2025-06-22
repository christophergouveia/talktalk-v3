const io = require('socket.io-client');

console.log('🔧 Socket.IO Connection Test');
console.log('================================');

const socketUrl = 'http://localhost:3005';
console.log(`📡 Connecting to: ${socketUrl}`);

// Test with the same configuration as the app
const socket = io(socketUrl, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  forceNew: true,
  autoConnect: false,
  timeout: 10000
});

console.log('⚙️  Socket configuration:', {
  url: socket.io.uri,
  transports: socket.io.opts.transports,
  timeout: socket.io.opts.timeout,
  withCredentials: socket.io.opts.withCredentials,
  forceNew: socket.io.opts.forceNew
});

socket.on('connect', () => {
  console.log('✅ SUCCESS: Socket connected!');
  console.log('🆔 Socket ID:', socket.id);
  
  // Test basic functionality
  console.log('📤 Testing basic communication...');
  socket.emit('test-message', 'Hello from test client');
  
  setTimeout(() => {
    console.log('🔌 Disconnecting...');
    socket.disconnect();
    process.exit(0);
  }, 2000);
});

socket.on('connect_error', (error) => {
  console.log('❌ CONNECTION ERROR:', error);
  console.log('📋 Error details:', {
    type: error.type,
    description: error.description,
    message: error.message,
    context: error.context
  });
  
  // Try polling only
  if (socket.io.opts.transports.includes('websocket')) {
    console.log('🔄 Retrying with polling only...');
    socket.io.opts.transports = ['polling'];
    setTimeout(() => socket.connect(), 1000);
  } else {
    console.log('💔 All connection methods failed');
    process.exit(1);
  }
});

socket.on('error', (error) => {
  console.log('⚠️  SOCKET ERROR:', error);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Disconnected:', reason);
});

console.log('🚀 Starting connection...');
socket.connect();

// Safety timeout
setTimeout(() => {
  console.log('⏰ Test timeout after 15 seconds');
  process.exit(1);
}, 15000);
