import mongoose from 'mongoose';

const testimonySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  tags: [{
    type: String,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

testimonySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Testimony = mongoose.model('Testimony', testimonySchema); 