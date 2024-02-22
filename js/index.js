function renderProductos(){
    const productos = obtenerProductosLS();
    const categoria = obtenerIdCategoriaLS();
    
    const productosFiltadros = categoria === 'todos' ? productos : productos.filter (item=> item.categoria ===categoria);
    
    let contenido = "";

    for (const producto of productosFiltadros) {
        contenido += 
        `<div class="col-md-4 text-center" >
            <a href="producto.html" onclick="verProducto(${producto.id});" class="text-decoration-none">
                <img src="${producto.imagen}" alt="${producto.nombre}" height="240" />
                <p class="colorFuente roboto-bold">${producto.nombre}</p>
             </a>
        </div>`;
    }
    document.getElementById("productos").innerHTML = contenido;

}


renderProductos();
renderBotonCarrito();


