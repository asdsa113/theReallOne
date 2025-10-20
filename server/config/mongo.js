import mongoose from 'mongoose';

/**
 * Cached mongoose connection helper for serverless environments.
 * Re-uses an existing connection if present to avoid opening many connections.
 */
export default function ensureMongoConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;

  // @ts-ignore - attach cache to globalThis
  if (globalThis.__MONGOOSE_PROMISE) return globalThis.__MONGOOSE_PROMISE;

  // Create connection promise and cache it
  globalThis.__MONGOOSE_PROMISE = mongoose.connect(uri)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      // Don't rethrow so serverless function can still run for non-db routes
    });

  return globalThis.__MONGOOSE_PROMISE;
}
