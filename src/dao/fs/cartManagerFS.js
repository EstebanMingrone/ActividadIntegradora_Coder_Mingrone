import fs from 'fs';

class CartManagerFS {
    constructor(file) {
        this.file = file;
        this.cartIDCounter = 1;
    }

    getCarts() {
        try {
            const carts = fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            console.error('Error al leer el archivo de carritos', error.message);
            return [];
        }
    }

    getCartById(id) {
        const carts = this.getCarts();
        const cart = carts.find((c) => c.id === id);

        if (!cart) {
            console.error('Carrito no encontrado');
        }
        return cart;
    }

    createCart() {
        const newCart = {
            id: this.cartIDCounter++, // Genera un nuevo ID autogenerado.
            products: [],
        };

        const carts = this.getCarts();
        carts.push(newCart);

        try {
            fs.writeFileSync(this.file, JSON.stringify(carts, null, '\t'));

            return 'Carrito creado correctamente';
        } catch (error) {
            console.error('Error al escribir en el archivo de carritos', error.message);
            return 'Error al crear el carrito';
        }
    }

    addProductToCart(cartId, productId, quantity) {
        const carts = this.getCarts();
        const cartIndex = carts.findIndex((c) => c.id === cartId);

        if (cartIndex === -1) {
            console.error('Carrito no encontrado');
            return 'Carrito no encontrado';
        }

        const cart = carts[cartIndex];
        const existingProduct = cart.products.find((p) => p.product === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        try {
            fs.writeFileSync(this.file, JSON.stringify(carts, null, '\t'));
            return 'Producto agregado al carrito correctamente';
        } catch (error) {
            console.error('Error al escribir en el archivo de carritos', error.message);
            return 'Error al agregar el producto al carrito';
        }
    }
}

export { CartManagerFS };
