firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	window.location = 'http://students.bcitdev.com/A00541112/WebpageMobile/fridge.html'
  } else {
    // No user is signed in.
  }
});


/*SignIn Process -- logs the user in*/

$("#loginBtn").click(

function(){
	
	var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
        $("#signInError").show().text(errorMessage);

});
if(user){
		 window.location = 'http://students.bcitdev.com/A00541112/WebpageMobile/index.html'
	  }
	}
);



/*Signup Process -- signs the user up into the database*/

$("#signUpBtn").click(

function(){
	
	var email = $("#signUpEmail").val();
    var password = $("#signUpPassword").val();

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
        $("#signUpError").show().text(errorMessage);

});
if(user){
		  window.location = 'http://students.bcitdev.com/A00541112/WebpageMobile/index.html'
	  }
	}
);

          var provider = new firebase.auth.GoogleAuthProvider();

$("#googleBtn").click(


function(){
	
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}

);