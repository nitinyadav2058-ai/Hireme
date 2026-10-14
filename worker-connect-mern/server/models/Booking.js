import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    customerName: {
      type: String,
      required: true
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },

    service: {
      type: String,
      required: true
    },

    sku: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    paymentMethod: {
      type: String,
      enum: ['cash', 'demo-online'],
      default: 'cash'
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    },

    status: {
      type: String,
      enum: [
        'confirmed',
        'completed',
        'cancelled'
      ],
      default: 'confirmed'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  'Booking',
  bookingSchema
);