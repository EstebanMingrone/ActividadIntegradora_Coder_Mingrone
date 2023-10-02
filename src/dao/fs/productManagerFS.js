import fs from 'fs';

class productManagerFS {
    
    constructor(file) {
        this.file = file;
        this.productIDCounter = 1;
    }

    getProducts() {
        try {
            const products = fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error('Error al leer el archivo de productos', error.message);
            return []; 
        }
    }

    getProductById(id){
        const products = this.getProducts()
        const product = products.find((p)=> p.id === id);

        if (!product) {
            console.error('Producto no encontrado')
        }
        return product
    }

    addProduct(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        if (!title || !description || !code || !price || !stock || !category) {
            return 'Error al crear el producto';
        }

        const products = this.getProducts();

        if (products.some((p)=> p.code === product.code)) {
            return 'Error al crear el producto: Código existente'
        }

        product.id = this.productIDCounter++;

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

        products.push(newProduct);

        try {
            fs.writeFileSync(this.file, JSON.stringify(products, null, '\t'));

            return 'Producto creado correctamente';
        } catch (error) {
            console.error(error.message);
            return 'Error al crear el producto';
        }
    }

    updateProduct(id, updatedProduct){
        const products = this.getProducts();
        const index = products.findIndex((p)=> p.id === id)

        if (index === -1) {
            console.error('Producto no encontrado');
            return 'Producto no encontrado'
        }

        updatedProduct.id = id;
        products[index] = updatedProduct;

        try {
            fs.writeFileSync(this.file, JSON.stringify(products, null, '\t'));
            return 'Producto actualizado correctamente';
        } catch (error) {
            console.error('Error al escribir en el archivo de productos:', error.message);
            return 'Error al actualizar el producto';
        }
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex((p) => p.id === id);

        if (index === -1) {
            console.error('Producto no encontrado');
            return 'Producto no encontrado';
        }

        products.splice(index, 1);

        try{
            fs.writeFileSync(this.file, JSON.stringify(products, null, '\t'))
            return 'Producto eliminado correctamente'
        } catch (error){
            console.error('Error al escribir en el archivo de productos', error.message)
            return 'Error al eliminar el producto'
        }
    }
}

export { productManagerFS };