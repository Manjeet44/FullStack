const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//Midle proteger rutas
const auth = require('../middleware/auth');

module.exports = function() {
    
    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', 
        clienteController.mostrarClientes
    );
    //Obtener cliente especifico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);
    //Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    //Productos
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Mostrar productos
    router.get('/productos', productosController.mostrarProductos)
    
    //Mostrar producto via id
    router.get('/productos/:productoId', productosController.mostrarProducto);

    //Actualizar producto
    router.put('/productos/:productoId',
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //Eliminar un producto
    router.delete('/productos/:productoId',
        productosController.eliminarProducto
    );

    //Busqueda de productos
    router.post('/productos/busqueda/:query', productosController.buscarProducto);

    //Pedidos
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

    //Mostrar pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Mostrar pedido especifico por id
    router.get('/pedidos/:pedidoId', pedidosController.mostrarPedido);

    //Actualizar pedidos
    router.put('/pedidos/:pedidoId', pedidosController.actualizarPedido);

    //Eliminar pedidos
    router.delete('/pedidos/:pedidoId', pedidosController.eliminarPedido);

    //Usuarios
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );
    return router;
}