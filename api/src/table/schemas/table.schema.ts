import * as mongoose from 'mongoose';

export const TableSchema = new mongoose.Schema(
  {
    tableID: { type: String, unique: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    // customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  },
  { timestamps: true, collection: 'tables' },
);
