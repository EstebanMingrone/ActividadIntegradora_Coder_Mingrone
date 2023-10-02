import { CartModel } from '../models/cartModel.js';

class CartManagerDB {
  async createCart() {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId).populate('products.product', 'title price'); 
      return cart;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        console.error('Carrito no encontrado');
        return 'Carrito no encontrado';
      }

      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
       
        cart.products[existingProductIndex].quantity += quantity;
      } else {
       
        cart.products.push({ product: productId, quantity });
      }

      await cart.save(); 
      return 'Producto agregado al carrito correctamente';
    } catch (error) {
      console.error(error.message);
      return 'Error al agregar el producto al carrito';
    }
  }
}

export { CartManagerDB };
