$("#login").on("click", function() {
    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      console.log(firebaseUser); 
    })
    .catch(function(error) {
      console.log(error);
    });
  
});