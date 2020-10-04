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
    return firebase.database().ref('/users/' + localStorage.getItem("userId"))
      .once('value').then(function(snapshot) {
        const user = snapshot.val()
        localStorage.setItem('userData', JSON.stringify(user))
    });
  }
  
  function loadInfoUser(idUser) {
    firebase.database().ref('/users/' + idUser)
    .once('value').then(function(snapshot) {
       const userInfo = snapshot.val()
       $("#nameInfo").text(userInfo.name + " " + userInfo.lastName)
       $("#enderecoInfo").text(userInfo.cidade + " , " + userInfo.estado)
       $("#telefoneInfo").text(userInfo.telefone)
       
       $("#ver-perfil").on('click', function() {
        localStorage.setItem('idTemporario', idUser);
       })
  });
  }

  function carregarProdutos() {
    let count = 0;
    const produtosRef = firebase.database().ref('produtos');
    produtosRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const childData = childSnapshot.val();
          const user = JSON.parse(localStorage.getItem('userData'))
          
        
          if(user.cidade === childData.cidade && user.estado === childData.estado) { 
            count++;
           
          $("#produtos").append(`<div class="d-block d-md-flex podcast-entry
           bg-white mb-5 categoria-${childData.categoria}" data-aos="fade-up">
        
          <div class="image" style="background-image: url('upload/${childData.imagem ? childData.imagem : 'noimage.jpg' }');"></div>
          <div class="text">
  
            <h3 class="font-weight-light"><a href="single-post.html">${childData.name}</a>
            </h3>
            <div class="text-white mb-3"><span class="text-black-opacity-05">
            ${childData.description}
             </span></div>
                <span style="color:#f23a2e;" class="text-black-opacity-05"> R$ ${childData.value} </span>
                <button style="float: right" type="button" data-toggle="modal" data-target="#entre-em-contato" data-whatever="${childData.userid}" id="visualizar-item"  
                class="btn btn-primary">Entar em contato</button>
            </div>
  
          </div>`)
  
          }
  
        });
  
           console.log(count)
           count > 0 ? '' :  $("#produtos").append(`<span>Desculpe ainda não
           existem produtos cadastrados em sua cidade :(</span>`)
    });
  }
  