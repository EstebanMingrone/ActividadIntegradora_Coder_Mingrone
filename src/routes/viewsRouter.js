import { Router } from 'express';
//import { productManagerFS } from '../dao/fs/productManagerFS.js';
import { productManagerDB } from '../dao/mongo/services/productManagerDB.js';

const router = Router();
//const ProductService = new productManagerFS('Products.json');
const ProductService = new productManagerDB();

router.get('/', (req, res) => {
    res.render(
        'realtimeproducts',
        {
            title: 'Actividad Integradora',
            style: 'index.css',
            products: ProductService.getProducts()
        }
    )
});

export default router;