import serverless from 'serverless-http';
import app from '../server/app.js';

// Wrap the Express app with serverless-http
const handler = serverless(app);

export default async function vercelHandler(req, res) {
  // serverless-http expects a Node-style request and response.
  // On Vercel, exporting default async function receives (req, res) compatible with Express.
  return handler(req, res);
}
