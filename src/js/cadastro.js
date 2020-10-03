$("#cadastrar").on("click", function() {
    console.log('teste');

    const email = $("#inputEmail").val()
    const password = $("#inputPassword").val()
    const cep = $("#inputCep").val()
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

const writeUserData = (name, lastName, cep, date) => {
    firebase.database().ref('users/' + localStorage.getItem('userId')).set({
      name: name,
      lastName: lastName,
      cep: cep,
      date: date
    });
  }