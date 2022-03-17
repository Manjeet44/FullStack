const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no valido'))
        }
    },
}

//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar productos
exports.mostrarProductos = async (req, res, next) => {
    
    try {
        ///Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);

    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar producto por id
exports.mostrarProducto = async (req, res, next) => {
    //Obtener por id
    const producto = await Productos.findById(req.params.productoId);
    
    if(!producto) {
        res.json({mensaje: 'Ese producto no existe'});
        return next();
    }
    res.json(producto);
    
}

//Actualizar producto
exports.actualizarProducto = async (req, res, next) => {
    try {
        let productoAnterior = await Productos.findById(req.params.productoId);

        let nuevoProducto = req.body;

        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }


        let producto = await Productos.findOneAndUpdate({_id: req.params.productoId}, nuevoProducto, {
            new: true,
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }

}

//Eliminar producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findOneAndDelete({_id: req.params.productoId});
        res.json({mensaje: 'El producto se ha eliminado correctamente'})
    } catch (error) {
        console.log(error);
        next();
    }
}


//Buscar producots
exports.buscarProducto = async (req, res, next) => {
    try {
        const {query} =req.params;
        const prodcuto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(prodcuto);
    } catch (error) {
        console.log(error);
        next();
    }
}