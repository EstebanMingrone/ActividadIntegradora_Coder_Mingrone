import express from 'express';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import { Server } from 'socket.io'
import productRouter from './routes/productRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import cartRouter from './routes/cartRouter.js'
import __dirname from './utils/utils.js';

const uri = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views/layouts');
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)
app.use('/realtimeproducts', viewsRouter)

const PORT = 8080;
const httpServer = app.listen(PORT, ()=>{
    console.log(`Conectado al puerto ${PORT} correctamente`)
})

const io = new Server(httpServer);

const messages = [];
io.on('connection', socket => {
    console.log('Se ha conectado un nuevo cliente', socket.id);

    socket.on('message', data => {
        messages.push(data);
        io.emit('messagesLogs', messages);
    });

    socket.on('userConnect', data => {
        socket.emit('messagesLogs', messages);
        socket.broadcast.emit('newUser', data);
    })
})

