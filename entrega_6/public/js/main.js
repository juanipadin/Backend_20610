const socket = io.connect();

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const foto = document.getElementById('foto').value;
  
  socket.emit('new-product', {nombre, precio, foto});
});

socket.on('productos', (productos) => {
    
  console.log(productos);
  
  
  const productList = productos.map((product) => `
  <tr>
          <td>
            ${product.nombre}
          </td>
          <td>
            ${product.precio}
          </td>
          <td>
            <img src="${product.foto}" alt="" width="50" height="50">
          </td>
        </tr>
  `).join(' ');
  console.log(productList)
  const list = document.getElementById('real-time-products');

  list.innerHTML = productList;
})