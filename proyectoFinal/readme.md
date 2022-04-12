# 2 Bike or not 2 Bike
El proyecto consiste en un sitio web e-commerce dedicado a la venta de productos para bicicletas.
El sitio se desarrolló en Javascript usando el framework Express.js como soporte fundamental.

## Contenedores
El sitio posee un archivo contenedor que utilizando POO permite unificar todas las funciones que el usuario o el administrador realizará. En este caso se han creado las funciones save, getAll, getById, deleteById, deleteAll, update. De igual forma, el sitio posee un contenedor para los mensajes del chat el cual posee como funciones saveMessages (guarda los mensajes en la base) y getMessages (muestra los mensajes en la base).

## Rutas del Sitio

### /home
Esta ruta permite la visualización de los productos que se encuentran disponibles y permite agregar productos. La estructura de la base está dada por valores de nombre, precio, foto y un id que se genera de forma secuencial cada vez que se agrega un producto. 

### /productos
Esta ruta toma la función getAll y mediante el método GET envía de forma automática todos los productos registrados.
En caso de que se utilice el método POST, se permite agregar nuevos productos usando la función save.


### /productos/:id
Similiar a la ruta anterior, utilizando el método GET y la función .getById retorna los productos con idéntico ID al registrado. Si se utiliza el método DELETE, se eliminará de la base el producto que posea el ID indicado en la ruta. Por su parte, si se usa el método PUT, se actualizará de la base la información requerida.

### /lista-productos
Esta rúta usando el método GET, regresa mediante un proceso previo de renderizado, el listado de productos con una interfaz de usuario amigable.
 

### /login
El login permite al usuario ingresar al sitio mediante la acreditación de su nombre de usuario y contraseña. El registro de dichos datos realiza en la ruta /singup. La validación de la contraseña se realiza mediante el bCrypt (misma tecnología utilizada para el hasheo de la contraseña). En caso de que el login sea satisfactorio, el usuario ingresará el sitio y por el contrario, el sistema indicará una falla y solicitará que ingrese nuevamente el usuario y contraseña. 

### /singup
En esta ruta el usuario completa sus datos personales para registrarse y sus datos se almacenan en una base de dato de Mongo. La contraseña se hashea utilizando el bCrypt.

## Tecnologías Utilizadas
* Axios: Permiten realizar testeos a fin de verificar la viabilidad del proyecto y su escalabilidad.
* bCrypt: Habilita el hasheo de la contraseña.
* connect-mongo: Conexión del sitio con la base.
* ejs: Permite renderizar el sitio mediante la creación de templates.
* express: Habilita la integración del sitio.
* passport: Realiza la autenticación del usuario al loguearse.
* socket.io: Se utiliza para visualizar y cargar nuevos productos en /home y para el manejo de los mensajes. Permite crear una conexión bidireccional evitando que el usuario tenga que cargar nuevamente la página para visualizar una actualización puesto que la misma se realiza de forma automática.

