const {Router} = require('express');

const router = Router();
const webPush = require('../wepPush');
//creamos una variable para guardar el objeto del post:
let pushSubscription;

//suscripcion del usuario. Respuesta del usuario al servidor.
//ruta que suscribe:
router.post('/subscription',async (req,res)=>{
    pushSubscription= req.body;
    res.status(200).json();


});
//ruta que envia notificaciones
router.post('/new-message', async (req,res) =>{
    const { message, title } = req.body;
    const payload ={
        title: title,
        message: message
    };
   //enviamos notificaciones. es sato siempre es string pero yo quiero darle unn objeto.
  //por esto  creo una constante payload.
  //usamos un try and catch para manejar errores
  try{
   await webPush.sendNotification(pushSubscription, JSON.stringify(payload));
 
} catch{
      console.log('error');
  }


   
});
module.exports = router;
