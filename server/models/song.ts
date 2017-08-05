import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  song_name: String,
  singer: String,
  create_at: Number,
  update_at: Number
});

const Song = mongoose.model('Song', catSchema);

export default Song;
