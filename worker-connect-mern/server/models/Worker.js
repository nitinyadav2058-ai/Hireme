import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      sparse: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    service: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    distanceKm: {
      type: Number,
      default: 1
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },

    jobs: {
      type: Number,
      default: 0
    },

    priceFrom: {
      type: Number,
      required: true,
      min: 0
    },

    verified: {
      type: Boolean,
      default: false
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

workerSchema.virtual('initials').get(function () {
  return this.name
    .split(/\s+/)
    .map((x) => x[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
});

workerSchema.set(
  'toJSON',
  {
    virtuals: true
  }
);

export default mongoose.model(
  'Worker',
  workerSchema
);