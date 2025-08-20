import * as dotenv from 'dotenv';
import http from 'http';
import app from './app';
import { sequelize } from './config/database';
import { initializeSocket } from './sockets/sticky-note.socket';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync database (for development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synced');
    }

    const server = http.createServer(app);
    
    // Initialize WebSocket
    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();