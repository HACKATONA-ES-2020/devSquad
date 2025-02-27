$("#cadastrar").on("click", function() {

    const email = $("#inputEmailCadastro").val()
    const password = $("#inputPasswordCadastro").val()
    const cidade = $("#cidade_sb").val()
    const estado = $("#estado_sb").val()
    const date = $("#inputDate").val()
    const name = $("#inputName").val()
    const telefone = $("#inputTelefone").val()
    const lastName = $("#inputLastName").val()
    const description = $("#inputDescricaoCadastro").val()

    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        saveUserData(firebaseUser.uid);
        writeUserData(name, lastName, cidade, estado, telefone,description);
        $("#cadastroModal").modal("hide");
        $("#loader").show();
        checkLogin();
      })
      .catch(function(error) {
        console.log(error);
      });
  
});

const writeUserData = (name, lastName, cidade, estado, telefone,description) => {
    firebase.database().ref('users/' + localStorage.getItem('userId')).set({
      name: name,
      lastName: lastName,
      cidade: cidade,
      estado: estado,
      telefone: telefone,
      description: description
    });
  }
  