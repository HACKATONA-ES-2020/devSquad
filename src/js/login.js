$("#login").on("click", function() {
    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        console.log('logado')
        saveUserData(firebaseUser.uid);
      })
      .catch(function(error) {
        console.log(error);
      });
  
});

const saveUserData =  (id) => localStorage.setItem('userId', id);


