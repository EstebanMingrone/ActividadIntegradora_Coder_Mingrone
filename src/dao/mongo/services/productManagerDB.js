import { productModel } from "../models/productModel.js";

class productManagerDB {

    async getProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            console.error(error.message);
            return []; 
        }
    }

    async addProduct(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        if (!title || !description || !code || !price || !stock || !category) {
            return 'Error al crear el producto';
        }

        const newProduct = {
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails ?? []
        }

        try {
            const result = await productModel.create(newProduct); 

            return 'Producto creado correctamente';
        } catch (error) {
            console.error(error.message);
            return 'Error al crear el producto';
        }
    }
}

export { productManagerDB };