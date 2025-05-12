import { app } from './app.js';

console.log('TEEEEEST');
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV} mode]`);
});

server.on('error', error => {
  console.error('💥 Server error:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM. Graceful shutdown');
  server.close(() => process.exit(0));
});
