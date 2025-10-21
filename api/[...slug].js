import serverless from 'serverless-http';
import app from '../server/app.js';

// Export the serverless handler directly. Vercel will call this as the function entry.
export default serverless(app);
