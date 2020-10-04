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

$('#entre-em-contato').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  let idUser = button.data('whatever')

  loadInfoUser(idUser);
})
