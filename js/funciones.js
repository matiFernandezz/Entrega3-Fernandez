//Defino Array de productos 
const productos = [
    {id:1, nombre:"AMD Ryzen 5 5600G",imagen: "https://acdn.mitiendanube.com/stores/002/297/812/products/sin-titulo111-67118c676632575c7316622269312792-1024-1024.png" , categoria:"Procesador", precio:201530},
    {id:2, nombre:"Intel Core i7 12700F",imagen: "https://www.venex.com.ar/products_images/1679339493_i7.png" , categoria:"Procesador", precio:432999},
    {id:3, nombre:"AMD Ryzen 7 5800X",imagen: "https://mexx-img-2019.s3.amazonaws.com/39168_1.jpeg" , categoria:"Procesador", precio:360000},
    {id:4, nombre:"Monitor Samsung 27",imagen: "https://http2.mlstatic.com/D_NQ_NP_948747-MLA44170848802_112020-O.webp" ,categoria:"Monitor", precio:219900},
    {id:5, nombre:"Monitor Samsung 24 Curvo" ,imagen: "https://axa.com.ar/webaxa/24794/monitor-gamer-curvo-samsung-c24f390fh-led-24-black-high-glossy-100v-240v.jpg" ,categoria:"Monitor", precio:261500},
    {id:6, nombre:"Monitor Gamer LG 27",imagen: "https://www.qloud.ar/SITES/IMG/joy-div-computers-09-2021/236_15-10-2022-12-10-59-monitor-lg-27-27gp750-b-fullhd-244hz-gaming-2.jpg" ,categoria:"Monitor", precio:355900},
    {id:7, nombre:"Teclado Mecanico Redragon", imagen: "https://acdn.mitiendanube.com/stores/001/329/380/products/61dtr681tl-_ac_ss450_1-01e514b62c2869abea16482455101434-640-0.jpg" ,categoria:"Periferico", precio:39130},
    {id:8, nombre:"Auriculares Redragon", imagen: "https://mexx-img-2019.s3.amazonaws.com/Auricular-Gamer-Redragon-Zeus-H510-Rgb_41187_1.jpeg" ,categoria:"Periferico", precio: 21999},
    {id:9, nombre:"Mouse Redragon", imagen: "https://s3-sa-east-1.amazonaws.com/saasargentina/js5YAR90pHrt0Vvo5kCB/imagen" ,categoria:"Periferico", precio: 25740},    
]

const guardarProductosLS = (productos)=>{
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS =()=>{
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS =()=>{
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS =()=>{
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length; 
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.precio, 0);
}
const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    
    renderCarrito();
    renderBotonCarrito();
}

const confirmacionEliminarCarrito = () => {
    Swal.fire({
        title: "Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            eliminarCarrito();
          Swal.fire({
            title: "Eliminado!",
            text: "Su carrito ha sido eliminado.",
            icon: "success"
          });
          notificacion("Carrito Eliminado!");
        }
      });
}


const renderTotalCarrito = ()=>{
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id===id);
    
    return producto;
}

const agregarProductoCarrito = () =>{
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS(); 
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por tu Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
        imageUrl: "../multi/logo.png",
        imageWidth: 160,
        imageAlt: "MF",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Volver a la tienda"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
                notificacion("Gracias por su compra!");
            }
        });
}


const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}


const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

guardarProductosLS(productos);






















