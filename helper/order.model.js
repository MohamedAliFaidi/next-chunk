import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  checkoutInfo: {
    amount: {
      type: Number,
      required: true,
    },
    tax: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
  orderStatus: {
    type: String,
    default: "Processing",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
