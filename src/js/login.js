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
  let count = 0;
  const produtosRef = firebase.database().ref('produtos');
  produtosRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        const user = JSON.parse(localStorage.getItem('userData'))
        
      
        if(user.cidade === childData.cidade && user.estado === childData.estado) { 
          count++;
         
        $("#produtos").append(`<div class="d-block d-md-flex podcast-entry
         bg-white mb-5" data-aos="fade-up" id="categoria-${childData.categoria}">
      
        <div class="image" style="background-image: url('images/img_1.jpg');"></div>
        <div class="text">

          <h3 class="font-weight-light"><a href="single-post.html">${childData.name}</a>
          </h3>
          <div class="text-white mb-3"><span class="text-black-opacity-05">
          ${childData.description}
           </span></div>
              <span style="color:#f23a2e;" class="text-black-opacity-05"> R$ ${childData.value} </span>
              <button style="float: right" type="button" id="visualizar-item"  
              class="btn btn-primary">Visualizar Item</button>
          </div>

        </div>`)

        }

        console.log(count)
        count > 0 ? '' :  $("#produtos").append(`<span>Desculpe ainda não
         existem produtos cadastrados em sua cidade :(</span>`)


      });
  });
}

function loadUserData() {
  console.log('users/' + localStorage.getItem("userId"))
  return firebase.database().ref('/users/' + localStorage.getItem("userId"))
    .once('value').then(function(snapshot) {
      const user = snapshot.val()
      localStorage.setItem('userData', JSON.stringify(user))
  });
}


