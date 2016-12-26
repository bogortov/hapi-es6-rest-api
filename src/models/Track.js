import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TrackSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  duration: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const TrackModel = mongoose.model('Track', TrackSchema);

export default TrackModel;
