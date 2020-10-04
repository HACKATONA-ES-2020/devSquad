$("#cadastrar").on("click", function() {

    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()
    const cidade = $("#cidade_sb").val()
    const estado = $("#estado_sb").val()
    const date = $("#inputDate").val()
    const name = $("#inputName").val()
    const lastName = $("#inputLastName").val()

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        saveUserData(firebaseUser.uid);
        writeUserData(name, lastName, cep, date);
      })
      .catch(function(error) {
        console.log(error);
      });
  
});

const writeUserData = (name, lastName, cidade, estado, date) => {
    firebase.database().ref('users/' + localStorage.getItem('userId')).set({
      name: name,
      lastName: lastName,
      cidade: cidade,
      estado: estado,
      date: date
    });
  }