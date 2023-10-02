import { Router } from 'express';
//import { CartManagerFS } from '../dao/fs/cartManagerFS.js';
import { CartManagerDB } from '../dao/mongo/services/cartManagerDB.js';

const router = Router();

//const CartService = new CartManagerFS('carts.json'); 
const CartService = new CartManagerDB()

router.post('/', async (req, res) => {
    const result = await CartService.createCart(); 
    res.send(result);
});

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const cart = await CartService.getCartById(cartId);
    
    if (cart) {
        res.send(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1; 

    const result = await CartService.addProductToCart(cartId, productId, quantity); 
    res.send(result);
});

export default router;
