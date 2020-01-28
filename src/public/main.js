const PUBLIC_WAPID_KEY ='BHivLOCrW8g_YWCWaI7KlxANZKDN0aGp1aW8d2DaK76BWo5zGSgFU9XM4oappL7vWFeLDqPnyBcfP0-2cFfvPzE';

//esta funcion transforma el argumento (public api key) en un formato particular
//la funcion se tomo de la documentacion de web-push npm 
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const subscription = async () => {
    //registramos desde el navegador 
    /*
    service worker: funciona en segundo plano , con los archivos guardados en cache
    permi que enviemos notificaciones aunque la pag este cerrada.el service worker decide si va a 
    le envia esa peticion al servidor, a caché  o incluso si desea mandar otra cosa. 
    porque funciona en segundo plano sus estados son terminated o fetch
    Después utilizamos el método .register() de la propiedad navigator.serviceWorker
     y le pasamos como parámetro la ruta a un archivo de javascript 
     donde le daremos instrucciones a nuestro service worker.
      *Este archivo debe de estar en la raíz de nuestro proyecto para que nuestro service worker 
      pueda acceder a todas las rutas(archivos) de nuestro proyecto.
    */
   //registramos el worker
        const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('new server worker');

    //
    const subscriptionNew = await register.pushManager.subscribe(
        {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_WAPID_KEY)
        }
    )

await fetch('/subscription',{
    method: 'POST',
    body: JSON.stringify(subscriptionNew),
    headers:{
        "Content-Type": "application/json"
    }
});
console.log('subscripto')
};
//obtenemos el formulario 
const form = document.getElementById("idForm");
const message = document.getElementById("message");
const title = document.getElementById("title");

console.log(message.value)
form.addEventListener('submit', e =>{
  e.preventDefault();
  fetch('/new-message',{
    method: 'POST',
    body: JSON.stringify({message : message.value, title: title.value}),
    headers:{
      'Content-Type': 'application/json'
    }
  });
  form.reset()
})
subscription();