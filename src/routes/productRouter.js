import { Router } from "express";
//import { productManagerFS } from "../dao/fs/productManagerFS.js";
import { productManagerDB } from "../dao/mongo/services/productManagerDB.js";
import { uploader } from "../utils/multer.js";

const router = Router();

//const ProductService = new productManagerFS('Products.json')
const ProductService = new productManagerDB();

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await ProductService.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit, 5));
        res.send(limitedProducts)
    }else{
        res.send(products);
    }
});

router.get('/:pid', async (req, res)=>{
    const productId = parseInt(req.params.pid, 10);
    const product = await ProductService.getProductById(productId)

    if (product) {
        res.send(product)
    } else{
        res.status(404).send('Producto no encontrado')
    }
})

router.post('/', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    const result = await ProductService.addProduct(req.body);

    res.send({
        message: result
    });
});

router.put('/:pid', async (req, res)=>{
    const productId = parseInt(req.params.pid, 10);
    const updatedProduct = req.body;
    const result = await ProductService.updateProduct(productId, updatedProduct)

    res.send({
        message: result
    })
})

router.delete('/:pid', async (req, res)=>{
    const productId = parseInt(req.params.pid, 10);
    const result = await ProductService.deleteProduct(productId);

    res.send({
        message: result
    })
})

export default router;
