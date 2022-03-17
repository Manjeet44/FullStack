const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Se agrego un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedido = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.pedidoId).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });
    
    if(!pedido) {
        res.json({mensaje: 'No existe'})
        return next();
    }
    res.json(pedido);
}

exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.productoId}, req.body, {
            new : true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id: req.params.pedidoId});
        res.json({mensaje: 'El pedido se ha eliminado correctamente'})
    } catch (error) {
        console.log(error);
        next();
    }
}