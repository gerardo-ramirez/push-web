console.log('register worker');
//le enviamos notificaciones con self.registration.showN...
self.addEventListener(
    'push',e =>{

         const data =    e.data.json();
         console.log('desde el worker:', data)
         //el mensaje va dentro del cuerpo tbn se le puede colocar icono .
         self.registration.showNotification(data.title, {body:data.message})
}
) ;