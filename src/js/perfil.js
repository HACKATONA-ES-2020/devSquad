function loadInfoUserPerfil() {
    firebase.database().ref('/users/' + localStorage.getItem('idTemporario'))
    .once('value').then(function(snapshot) {
       const userInfo = snapshot.val()
       $("#nome-perfil").text(userInfo.name + " " + userInfo.lastName)
       $("#descricao-perfil").text(userInfo.description)
       carregarProdutosPerfil(localStorage.getItem('idTemporario'));
  });
  }

  loadInfoUserPerfil();
  

  function carregarProdutosPerfil(id) {
    let count = 0;
    const produtosRef = firebase.database().ref('produtos');
    produtosRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const childData = childSnapshot.val();
        
          if(id === childData.userid) { 
            count++;
           
          $("#produtos-perfil").append(`
          <div class="col-md-6 col-lg-4 text-center mb-5">
            <img src="upload/${childData.imagem ? childData.imagem : 'noimage.jpg' }" alt="produto-x" class="img-fluid w-50 rounded-circle mb-3">
            <h2 class="text-black font-weight-light mb-4">${childData.name}</h2>
            <p>${childData.description}</p>
          </div>
`)
  
          }
  
        });
  
           console.log(count)
           count > 0 ? '' :  $("#produtos").append(`<span>Desculpe ainda não
           existem produtos para esse usuário:(</span>`)
    });
  }
  