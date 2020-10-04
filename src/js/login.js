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

$("#logout").on("click", function() {
    localStorage.removeItem('userId')
    window.location.href = "./"
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
         bg-white mb-5 categoria-${childData.categoria}" data-aos="fade-up">
      
        <div class="image" style="background-image: url('upload/${childData.imagem ? childData.imagem : 'noimage.jpg' }');"></div>
        <div class="text">

          <h3 class="font-weight-light">${childData.name}
          </h3>
          <div class="text-white mb-3"><span class="text-black-opacity-05">
          ${childData.description}
           </span></div>
              <span style="color:#f23a2e;" class="text-black-opacity-05"> R$ ${childData.value} </span>
              <button style="float: right" type="button" data-toggle="modal" data-target="#entre-em-contato" data-whatever="${childData.userid}" id="visualizar-item"  
              class="btn btn-primary">Entar em contato</button>
          </div>

        </div>`)

const saveUserData =  (id) => localStorage.setItem('userId', id);



$('#entre-em-contato').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  let idUser = button.data('whatever')

  loadInfoUser(idUser);

})




