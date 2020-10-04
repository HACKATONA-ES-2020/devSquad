$("#login").on("click", function() {
    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        saveUserData(firebaseUser.uid);
        $("#loginModal").modal("hide");
        $("#loader").show();
        checkLogin();
      })
      .catch(function(error) {
        console.log(error);
      });
  
});


const saveUserData =  (id) => localStorage.setItem('userId', id);

function carregarProdutos() {

  var produtosRef = firebase.database().ref('produtos');
  produtosRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
      });
  });
  produtosRef.on('child_added', function(snapshot) {
    console.log(snapshot)
  });

}

function loadUserData() {
  console.log('users/' + localStorage.getItem("userId"))
  return firebase.database().ref('/users/' + localStorage.getItem("userId")).once('value').then(function(snapshot) {
    var username = snapshot.val();
    console.log(username);
    // ...
  });
}


