"use strict";

$("#cadastrar").on("click", function () {
  var email = $("#inputEmailCadastro").val();
  var password = $("#inputPasswordCadastro").val();
  var cidade = $("#cidade_sb").val();
  var estado = $("#estado_sb").val();
  var date = $("#inputDate").val();
  var name = $("#inputName").val();
  var telefone = $("#inputTelefone").val();
  var lastName = $("#inputLastName").val();
  var description = $("#inputDescricaoCadastro").val();
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
    saveUserData(firebaseUser.uid);
    writeUserData(name, lastName, cidade, estado, telefone, description);
    $("#cadastroModal").modal("hide");
    $("#loader").show();
    checkLogin();
  })["catch"](function (error) {
    console.log(error);
  });
});

var writeUserData = function writeUserData(name, lastName, cidade, estado, telefone, description) {
  firebase.database().ref('users/' + localStorage.getItem('userId')).set({
    name: name,
    lastName: lastName,
    cidade: cidade,
    estado: estado,
    telefone: telefone,
    description: description
  });
};
"use strict";

$('#upload').on('click', function () {
  var files = document.getElementById("imagem").files;
  var name = $("#c_fname").val();
  var valor = $("#valor").val();
  var descricao = $("#descricao").val();
  var cat = $("input[name='categoria']:checked").val();
  console.log(name, valor, descricao, files[0].name, cat);

  if (files.length > 0) {
    var formData = new FormData();
    formData.append("imagem", files[0]);
    var xhttp = new XMLHttpRequest(); // Set POST method and ajax file path

    xhttp.open("POST", "upload.php", true); // call on request changes state

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;

        if (response == 1) {
          cadastroProdutoFirebase(name, cat, valor, descricao, files[0].name);
          sucessFunction();
        } else {
          alert("File not uploaded.");
        }
      }
    };

    xhttp.send(formData);
  } else {
    alert("Selecione uma imagem");
  }
});

function cadastroProdutoFirebase(name, cat, valor, descricao, imagem) {
  var infoUser = JSON.parse(localStorage.getItem('userData'));
  firebase.database().ref('produtos/' + Math.floor(Math.random() * 1050)).set({
    name: name,
    categoria: cat,
    cidade: infoUser.cidade,
    estado: infoUser.estado,
    description: descricao,
    value: valor,
    userid: localStorage.getItem('userId'),
    imagem: imagem
  });
}

$("#alert-sucess").hide();

function sucessFunction() {
  $("#alert-sucess").show();
  $('html, body').animate({
    scrollTop: $('#alert-sucess').offset().top
  }, 500);
  setTimeout(function () {
    $("#alert-sucess").hide();
  }, 4000);
  $('#cadastro-produto').each(function () {
    this.reset();
  });
}
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

function loadUserData() {
  return firebase.database().ref('/users/' + localStorage.getItem("userId")).once('value').then(function (snapshot) {
    var user = snapshot.val();
    localStorage.setItem('userData', JSON.stringify(user));
  });
}

function loadInfoUser(idUser) {
  firebase.database().ref('/users/' + idUser).once('value').then(function (snapshot) {
    var userInfo = snapshot.val();
    $("#nameInfo").text(userInfo.name + " " + userInfo.lastName);
    $("#enderecoInfo").text(userInfo.cidade + " , " + userInfo.estado);
    $("#telefoneInfo").text(userInfo.telefone);
    $("#ver-perfil").on('click', function () {
      localStorage.setItem('idTemporario', idUser);
    });
  });
}

function carregarProdutos() {
  var count = 0;
  var produtosRef = firebase.database().ref('produtos');
  produtosRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      var user = JSON.parse(localStorage.getItem('userData'));

      if (user.cidade === childData.cidade && user.estado === childData.estado) {
        count++;
        $("#produtos").append("<div class=\"d-block d-md-flex podcast-entry\n           bg-white mb-5 categoria-".concat(childData.categoria, "\" data-aos=\"fade-up\">\n        \n          <div class=\"image\" style=\"background-image: url('upload/").concat(childData.imagem ? childData.imagem : 'noimage.jpg', "');\"></div>\n          <div class=\"text\">\n  \n            <h3 class=\"font-weight-light\">").concat(childData.name, "\n            </h3>\n            <div class=\"text-white mb-3\"><span class=\"text-black-opacity-05\">\n            ").concat(childData.description, "\n             </span></div>\n                <span style=\"color:#f23a2e;\" class=\"text-black-opacity-05\"> R$ ").concat(childData.value, " </span>\n                <button style=\"float: right\" type=\"button\" data-toggle=\"modal\" data-target=\"#entre-em-contato\" data-whatever=\"").concat(childData.userid, "\" id=\"visualizar-item\"  \n                class=\"btn btn-primary\">Entrar em contato</button>\n            </div>\n  \n          </div>"));
      }
    });
    console.log(count);
    count > 0 ? '' : $("#produtos").append("<span>Desculpe ainda n\xE3o\n           existem produtos cadastrados em sua cidade :(</span>");
  });
}
"use strict";

function checkLogin() {
  if (localStorage.getItem('userId')) {
    $("#inicio").hide();
    loadUserData();
    carregarProdutos();
    setTimeout(function () {
      $("#loader").hide();
      $("#exibe-itens").show();
      $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(2)").show();
      $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(3)").show();
      $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(4)").hide();
      document.querySelector("#cadastrar-servico");
    }, 1000);
  } else {
    $("#exibe-itens").hide();
    $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(2)").hide();
    $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(4)").show();
    $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(3)").hide();
    setTimeout(function () {
      $("#loader").hide();
      $("#inicio").show();
    }, 1000);
  }
}

checkLogin();
$("#loader").hide();
$("#servicos").on("click", function () {
  $(".categoria-2").show();
  $('.categoria-1').attr('style', 'display:none !important');

  if ($('#produt').hasClass('selected-cat')) {
    $('#produt').removeClass('selected-cat');
  }

  if ($('#todos').hasClass('selected-cat')) {
    $('#todos').removeClass('selected-cat');
  }

  $('#servicos').addClass('selected-cat');
});
$("#produt").on("click", function () {
  $(".categoria-1").show();
  $('.categoria-2').attr('style', 'display:none !important');

  if ($('#servicos').hasClass('selected-cat')) {
    $('#servicos').removeClass('selected-cat');
  }

  if ($('#todos').hasClass('selected-cat')) {
    $('#todos').removeClass('selected-cat');
  }

  $('#produt').addClass('selected-cat');
});
$("#todos").on("click", function () {
  $(".categoria-1").show();
  $('.categoria-2').show();

  if ($('#servicos').hasClass('selected-cat')) {
    $('#servicos').removeClass('selected-cat');
  }

  if ($('#produt').hasClass('selected-cat')) {
    $('#produt').removeClass('selected-cat');
  }

  $('#todos').addClass('selected-cat');
});
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
$("#logout").on("click", function () {
  localStorage.removeItem('userId');
  window.location.href = "./";
});

var saveUserData = function saveUserData(id) {
  return localStorage.setItem('userId', id);
};

$('#entre-em-contato').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var idUser = button.data('whatever');
  loadInfoUser(idUser);
});
"use strict";

function loadInfoUserPerfil() {
  firebase.database().ref('/users/' + localStorage.getItem('idTemporario')).once('value').then(function (snapshot) {
    var userInfo = snapshot.val();
    $("#nome-perfil").text(userInfo.name + " " + userInfo.lastName);
    $("#descricao-perfil").text(userInfo.description);
    carregarProdutosPerfil(localStorage.getItem('idTemporario'));
  });
}

loadInfoUserPerfil();

function carregarProdutosPerfil(id) {
  var count = 0;
  var produtosRef = firebase.database().ref('produtos');
  produtosRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      if (id === childData.userid) {
        count++;
<<<<<<< HEAD
        $("#produtos").append("<div class=\"d-block d-md-flex podcast-entry\n         bg-white mb-5 categoria-".concat(childData.categoria, "\" data-aos=\"fade-up\">\n      \n        <div class=\"image\" style=\"background-image: url('upload/").concat(childData.imagem ? childData.imagem : 'noimage.jpg', "');\"></div>\n        <div class=\"text\">\n\n          <h3 class=\"font-weight-light\">").concat(childData.name, "\n          </h3>\n          <div class=\"text-white mb-3\"><span class=\"text-black-opacity-05\">\n          ").concat(childData.description, "\n           </span></div>\n              <span style=\"color:#f23a2e;\" class=\"text-black-opacity-05\"> R$ ").concat(childData.value, " </span>\n              <button style=\"float: right\" type=\"button\" data-toggle=\"modal\" data-target=\"#entre-em-contato\" data-whatever=\"").concat(childData.userid, "\" id=\"visualizar-item\"  \n              class=\"btn btn-primary\">Entar em contato</button>\n          </div>\n\n        </div>"));
=======
        $("#produtos-perfil").append("\n          <div class=\"col-md-6 col-lg-4 text-center mb-5\">\n            <img src=\"upload/".concat(childData.imagem ? childData.imagem : 'noimage.jpg', "\" alt=\"produto-x\" class=\"img-fluid w-50 rounded-circle mb-3\">\n            <h2 class=\"text-black font-weight-light mb-4\">").concat(childData.name, "</h2>\n            <p>").concat(childData.description, "</p>\n          </div>\n"));
>>>>>>> 776ec085a18cad28be687ee25efdfcf5350b598c
      }
    });
    console.log(count);
    count > 0 ? '' : $("#produtos").append("<span>Desculpe ainda n\xE3o\n           existem produtos para esse usu\xE1rio:(</span>");
  });
}
