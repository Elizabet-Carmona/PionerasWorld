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
    var country = document.getElementById('mySelect').value;
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
    mostrar();
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
// country
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
// mostrar datos en profile (corregir, mostrar solo usuario logueado)
function mostrar() {  
    var tip = document.getElementById('avatar');
    var form = document.getElementById('form');  
    var database = firebase.database();

    db.collection("users").onSnapshot((querySnapshot) => {
       form.innerHTML = ' ';
       tip.innerHTML = ' ';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().name}`);
            form.innerHTML += `
            <tr>
            <td>Name:</td>
            <td><input id="name" class="space" type="text" value="${doc.data().name}" readonly></td>
        </tr>
        <tr>
            <td>Country:</td>
            <td><input id="country" class="space" type="text" value="${doc.data().country}" readonly></td>
        </tr>
        <tr>
            <td>Favorite Language:</td>
            <td><input id="language" class="space" type="text" value="${doc.data().language}" readonly></td>
        </tr>
        <tr>
            <td>E-mail:</td>
            <td><input id="email" class="space" type="text" value="${doc.data().email}" readonly></td>
        </tr>`;
        tip.innerHTML += `
        <textarea id="tip" maxlength="500"  class="write-tip">${doc.data().tip}</textarea>`;
        });
    });
}    


