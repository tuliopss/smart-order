import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    product: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    orderTime: { type: Date },
    status: { type: String },
    tableID: { type: String, ref: 'Table' }, // Alterado para Number
  },
  { timestamps: true, collection: 'orders' },
);
