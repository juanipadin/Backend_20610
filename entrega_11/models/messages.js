const messages = [
  { 
    id: 0,
    author: {
      id: 'mail del usuario', 
      nombre: 'nombre del usuario', 
      apellido: 'apellido del usuario', 
      edad: 'edad del usuario', 
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario'
    },
    text: "¡Hola! ¿Que tal?"
  },
  { 
    id: 1,
    author: {
      id: 'mail del usuario', 
      nombre: 'nombre del usuario', 
      apellido: 'apellido del usuario', 
      edad: 'edad del usuario', 
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario'
    },
    text: "¡Muy bien! ¿Y vos?"
  },
  { 
    id: 2,
    author: {
      id: 'mail del usuario', 
      nombre: 'nombre del usuario', 
      apellido: 'apellido del usuario', 
      edad: 'edad del usuario', 
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario'
    },
    text: "¡Genial!"
  }
];

const normalizeMessages = require( '../utils/normalizar' );

const Mensajes = require( '../models/messages_archivo' );
const messageContenedor = new Mensajes('/DB/messages.json');

const saveMessages = async (newMessage) => {
    const mensajeNuevo = await messageContenedor.save(newMessage)
    return mensajeNuevo
}

const getMessages = async () => {
    return normalizeMessages({ id: 'messages', messages });
    
}; 

module.exports = {
    saveMessages,
    getMessages
}