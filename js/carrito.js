/*VARIABLES*/
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*FUNCIONES*/

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
const mostrarProductos = (productos) => {
	const contenedorProductos = document.querySelector(".product-list");
	contenedorProductos.innerHTML = "";
	productos.forEach((producto) => {
		const li = document.createElement("li");
		li.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p class="product-description">${producto.descripcion}</p>
    <p class="product-price">$${producto.precio} USD</p>
    <button id="agregar-${producto.id}" class="add-to-cart">Agregar al carrito</button>
    `;
		contenedorProductos.appendChild(li);
		const boton = document.getElementById(`agregar-${producto.id}`);
		boton.addEventListener("click", () => {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Agregaste un producto al carrito',
				showConfirmButton: false,
				timer: 1500
			  })
			agregarAlCarrito(producto.id);
		});
	});
};

// FUNCIONES DEL CARRITO 



const agregarAlCarrito = (id) => {
	if (!carrito.some((producto) => producto.id === id)) {
		const producto = productos.find((producto) => producto.id === id);
		carrito.push({ ...producto, cantidad: 1 });
	} else {
		const producto = carrito.find((producto) => producto.id === id);
		producto.cantidad++;
	}
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const mostrarCarrito = () => {
	const contenedorCarrito = document.querySelector(".carrito");
	contenedorCarrito.innerHTML = "";
	if (carrito.length > 0) {
		const productsCart = document.createElement("ul");
		productsCart.classList.add("productsCart");
		contenedorCarrito.appendChild(productsCart);
		const contenedorTotal = document.createElement("p");
		actualizarTotal(contenedorTotal);
		contenedorCarrito.appendChild(contenedorTotal);
		carrito.forEach((producto) => {
			const li = document.createElement("li");
			li.innerHTML = `
			<table class="table">
				<tbody>
					<tr>
						<td scope="row"> 
							<h3>${producto.nombre}</h3>
							<img src="${producto.imagen}" alt="${producto.nombre}" />
						</td>
						<td>
							<p class="product-description">${producto.descripcion}</p>
						</td>
						<td>
							<p class="producto-precio">$${producto.precio} USD</p>
						</td>
						<td>
							<div class="counter">
								<button id="decrementar-${producto.id}" class="button">-</button>
								<span class="product-price">${producto.cantidad}u.</span>
								<button id="incrementar-${producto.id}" class="button">+</button>
							</div>
						</td>
						<td scope="col">
							<button id="eliminar-${producto.id}" class="remove">Eliminar</button> 
						</td>
					</tr>
   				</tbody>
			</table>`;
			productsCart.appendChild(li);
			const boton = document.getElementById(`eliminar-${producto.id}`);
			boton.addEventListener("click", () => {
				Swal.fire({
					title: 'Estas seguro que deseas eliminar?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si, quiero eliminar!'
				  }).then((result) => {
					if (result.isConfirmed) {
					  Swal.fire(
						'Eliminado',
						'Tu articulo ha sido eliminado.',
						'success'
					  )
					  eliminarProducto(producto.id);
					}
				  })
			});


			const decrementar = document.getElementById(`decrementar-${producto.id}`);
			decrementar.addEventListener("click", () => {
				decrementarProducto(producto.id);
			});

			const incrementar = document.getElementById(`incrementar-${producto.id}`);
			incrementar.addEventListener("click", () => {
				incrementarProducto(producto.id);
			});
		});
	} else {
		contenedorCarrito.innerHTML = '<p class="empty">No hay productos</p>';
	}
};

const decrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);
	if (producto.cantidad === 1) {
		eliminarProducto(producto.id);
	} else {
		producto.cantidad--;
		localStorage.setItem("carrito", JSON.stringify(carrito));
		mostrarCarrito();
	}
};

const incrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);
	producto.cantidad++;
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const eliminarProducto = (id) => {
	carrito = carrito.filter((producto) => producto.id !== id);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const actualizarTotal = (contenedor) => { 
	const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
	contenedor.textContent = `Total: $${total} USD`;
};


/*LÓGICA*/

mostrarProductos(productos);
mostrarCarrito();
