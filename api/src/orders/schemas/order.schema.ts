import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    product: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    orderTime: { type: Date },
    status: { type: String },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  },
  { timestamps: true, collection: 'orders' },
);
