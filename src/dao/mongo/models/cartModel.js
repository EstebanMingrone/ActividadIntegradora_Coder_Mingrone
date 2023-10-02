import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

export const CartModel = mongoose.model(cartCollection, cartSchema);
