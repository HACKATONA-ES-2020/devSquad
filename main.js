"use strict";

$("#cadastrar").on("click", function () {
  var email = $("#inputEmailCadastro").val();
  var password = $("#inputPasswordCadastro").val();
  var cidade = $("#cidade_sb").val();
  var estado = $("#estado_sb").val();
  var date = $("#inputDate").val();
  var name = $("#inputName").val();
  var lastName = $("#inputLastName").val();
  console.log(email);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
    saveUserData(firebaseUser.uid);
    writeUserData(name, lastName, cidade, estado, date);
    $("#cadastroModal").modal("hide");
    $("#loader").show();
    checkLogin();
  })["catch"](function (error) {
    console.log(error);
  });
});

var writeUserData = function writeUserData(name, lastName, cidade, estado) {
  firebase.database().ref('users/' + localStorage.getItem('userId')).set({
    name: name,
    lastName: lastName,
    cidade: cidade,
    estado: estado
  });
};
"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyBhKnlPltiE6UCTJhTQkx8X1XiIAiYC2QY",
  authDomain: "ajude-seu-vizinho.firebaseapp.com",
  databaseURL: "https://ajude-seu-vizinho.firebaseio.com",
  projectId: "ajude-seu-vizinho",
  storageBucket: "ajude-seu-vizinho.appspot.com",
  messagingSenderId: "47714639101",
  appId: "1:47714639101:web:f30e5f0db68760f359f294",
  measurementId: "G-WD9NRP0TGW"
};
firebase.initializeApp(firebaseConfig);
"use strict";

function checkLogin() {
  if (localStorage.getItem('userId')) {
    $("#inicio").hide();
    console.log($("#cadastrar-produtos").show());
    $("#cadastrar-produtos").show();
    setTimeout(function () {
      $("#loader").hide();
      $("#exibe-itens").show();
    }, 1000);
  } else {
    $("#exibe-itens").hide();
    $("#cadastrar-produtos").hide();
    setTimeout(function () {
      $("#loader").hide();
      $("#inicio").show();
    }, 1000);
  }
}

checkLogin();
$("#loader").hide();
"use strict";

$("#login").on("click", function () {
  var email = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
    saveUserData(firebaseUser.uid);
    $("#loginModal").modal("hide");
    $("#loader").show();
    checkLogin();
  })["catch"](function (error) {
    console.log(error);
  });
});

var saveUserData = function saveUserData(id) {
  return localStorage.setItem('userId', id);
};
