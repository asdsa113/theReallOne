import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'guest'
  },
  items: [{
    id: Number,
    title: String,
    poster: String,
    type: String,
    releaseDate: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

export default mongoose.model('Watchlist', watchlistSchema);

