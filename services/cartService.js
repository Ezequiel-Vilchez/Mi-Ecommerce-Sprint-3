const db = require('../db/database')

const cartService = {

    // Inicializar carrito en sesión si no existe
    initCart: (session) => {
        if (!session.cart) {
            session.cart = [];
        }
    },


    agregarProducto: (session, productId) => {
        cartService.initCart(session);
        const consu = db.prepare('SELECT id, stock FROM products WHERE id = ?');
        const producto = consu.get(productId);

        if (producto && producto.stock > 0) {
            const itemExiste = session.cart.find(item => item.productId === productId);
            if(itemExiste){
                if(itemExiste.quantity < producto.stock){
                    itemExiste.quantity += 1;
                }
            } else{
                session.cart.push({productId, quantity: 1});
            }
            return true;
        }
        return false;
    },


    aumentarCantidad: (session, productId) => {
        cartService.initCart(session);
        const aum = db.prepare('SELECT stock FROM products WHERE id = ?');
        const producto = aum.get(productId)
        const item = session.cart.find(item => item.productId === productId);
        if (item && producto && item.quantity < producto.stock) {
            item.quantity += 1;
        }
    },

    
    disminuirCantidad: (session, productId) => {
        cartService.initCart(session);
        const index = session.cart.findIndex(item => item.productId === productId);
        if (index !== -1) {
            session.cart[index].quantity -= 1;
            if (session.cart[index].quantity <= 0) {
                session.cart.splice(index, 1);
            }
        }
    },

    vaciarCarrito: (session) => {
        session.cart = [];
    },

    getItems: (session) => {
        cartService.initCart(session);
        return session.cart.map(item => {
            const stmt = db.prepare('SELECT nombre, precio, imagen FROM products WHERE id = ?');
            const producto = stmt.get(item.productId);

            return {
                productId: item.productId,
                quantity: item.quantity,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen ? producto.imagen : '/img/imagen-error.png',
                subtotal: producto.precio * item.quantity
            };
        }).filter(item => item !== null);
    },

    calcularTotal: (items) => {
        return items.reduce((acc, item) => acc + item.subtotal, 0);
    }

};

module.exports = cartService;