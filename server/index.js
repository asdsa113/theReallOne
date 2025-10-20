import app from './app.js';

// Only start a local server when RUN_LOCAL=true. Vercel serverless will import the app.
const PORT = process.env.PORT || 5000;

if (process.env.RUN_LOCAL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
