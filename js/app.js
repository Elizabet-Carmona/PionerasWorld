var config = {
    apiKey: "AIzaSyCCq78qK3CVV4FsM7v9py5YXg54fRqYAl0",
    authDomain: "pionerasworld.firebaseapp.com",
    databaseURL: "https://pionerasworld.firebaseio.com",
    projectId: "pionerasworld",
    storageBucket: "pionerasworld.appspot.com",
    messagingSenderId: "9860997148"
  };
  
  var app =firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore(app);
//Registrarse
function registrar(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    var pass = document.getElementById('pass').value;
    var country = document.getElementById('country').value;
    var language =  document.getElementById('language').value;
    var tip = document.getElementById('tip').value;

if(contrasena != pass)
{
    alert('Las contraseñas no coinciden');
}
else{
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
      //datos de los usuarios al registrarse
    db.collection("users").add({
          name: name,
          email: email,
          contrasena: contrasena,
          pass: pass,
          country: country,
          language: language,
          tip: tip
          //img : url()
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

        verficar()
    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
    }
}

//iniciar sesion
function ingreso(){
    
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;
    
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });


}
//verificar que el usuario exista
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario activo')
            aparece(user);
          // User is signed in.
          var displayName = user.displayName;
          
          var email = user.email;
          
          console.log('*****************');
          console.log(user.emailVerified) //si el usuario ya verifico el email true o si no false
          console.log('*****************');
          
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('no existe usuario activo')
          // ...
        }
      });
}
observador();
//cuando inicie sesion
function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    //si el correo esta verificado
    if(user.emailVerified){
        contenido.innerHTML = `
        <button onclick="cerrar()">Logout</button> 
        `;
    } 
}
//cerrar sesion
function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...')
    })
    .catch(function(error){
        console.log(error)
    })
}
//correo de verificacion
function verficar(){
    var user = firebase.auth().currentUser;  
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('Enviando correo...');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    }); 
}


function llenarPaises() {
    init();
    const x = document.getElementById("mySelect");
    for (let pais of paises) {
        const option = document.createElement("option");
        option.text = pais.name;
        option.value = pais.name;
        x.add(option);
    }
}