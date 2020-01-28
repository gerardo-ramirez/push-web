const webPush = require('web-push');
//la documentacion me pide una llave publica y una privada.
//estas estan alojadas en las variables de entorno. 

//desde donde llegan las notificaciones:
webPush.setVapidDetails('malito: gerardoramirez656@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

module.exports = webPush; 