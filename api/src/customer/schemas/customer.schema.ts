import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String },
    cpf: { type: String },
    tableID: { type: String, unique: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true, collection: 'customers' },
);
