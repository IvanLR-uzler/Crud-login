const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = ({
  title: { type: String, require: true },
  description: { type: String, require: true},
  date: { type: Date, default: Date.now},
  user:{type: String}
});

module.exports= mongoose.model('Note',NoteSchema);