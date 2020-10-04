$('#upload').on('click', function() {
    var files = document.getElementById("imagem").files;

    const name = $("#c_fname").val();
    const valor = $("#valor").val();
    const descricao = $("#descricao").val();
    const cat = $("input[name='categoria']:checked").val();

    console.log(name,valor,descricao,files[0].name, cat)

    if(files.length > 0 ){
 
       var formData = new FormData();
       formData.append("imagem", files[0]);
       var xhttp = new XMLHttpRequest();
 
       // Set POST method and ajax file path
       xhttp.open("POST", "upload.php", true);
 
       // call on request changes state
       xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
 
            var response = this.responseText;
            if(response == 1){
               cadastroProdutoFirebase(name,cat,valor,descricao, files[0].name)
               sucessFunction()

            }else{
               alert("File not uploaded.");
            }
          }
       };

       xhttp.send(formData);
 
    }else{
       alert("Selecione uma imagem");
    }
});

function cadastroProdutoFirebase(name,cat,valor,descricao, imagem) {
        const infoUser = JSON.parse(localStorage.getItem('userData'));
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
    $('html, body').animate({ scrollTop: $('#alert-sucess').offset().top }, 500);

    setTimeout(function(){
          $("#alert-sucess").hide();
     }, 4000);

    $('#cadastro-produto').each (function(){
    this.reset();
    });
}