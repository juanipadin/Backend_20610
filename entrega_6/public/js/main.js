const socket = io.connect();

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const foto = document.getElementById('foto').value;
  
  socket.emit('new-product', {nombre, precio, foto});
});

socket.on('products', (products) => {
  console.log(products);
  
  const productList = products.map((product) => `
    <li>Nombre: ${product.nombre} - Precio: ${product.precio}</li>
  `).join(' ');

  const list = document.getElementById('real-time-products');

  list.innerHTML = `<ul>${productList}</ul>`;
})