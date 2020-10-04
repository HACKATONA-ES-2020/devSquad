
function checkLogin() {

    if (localStorage.getItem('userId')) { 
        $("#inicio").hide();
        $("#cadastrar-produtos").show();
        loadUserData();
        carregarProdutos();
        setTimeout(function(){
            $("#loader").hide();
            $("#exibe-itens").show();
        }, 1000);
    } else {
        $("#exibe-itens").hide();
        $("#cadastrar-produtos").hide();
        setTimeout(function(){
            $("#loader").hide();
            $("#inicio").show();
        }, 1000);
    }
    
}


checkLogin();

$("#loader").hide();


$("#servicos").on("click", function() {
        $("#categoria-2").show()
        $('#categoria-1').attr('style','display:none !important')

        if($('#produt').hasClass('selected-cat')){
            $('#produt').removeClass('selected-cat')
        } if($('#todos').hasClass('selected-cat')) {
            $('#todos').removeClass('selected-cat')
        }

        $('#servicos').addClass('selected-cat')

});

$("#produt").on("click", function() {
    $("#categoria-1").show()
    $('#categoria-2').attr('style','display:none !important')

    if($('#servicos').hasClass('selected-cat')){
        $('#servicos').removeClass('selected-cat')
    } if($('#todos').hasClass('selected-cat')) {
        $('#todos').removeClass('selected-cat')
     }

     $('#produt').addClass('selected-cat')

});


$("#todos").on("click", function() {
    $("#categoria-1").show()
    $('#categoria-2').show()

    if($('#servicos').hasClass('selected-cat')){
        $('#servicos').removeClass('selected-cat')
    } if($('#produt').hasClass('selected-cat')) {
        $('#produt').removeClass('selected-cat')
     }

     $('#todos').addClass('selected-cat')
});

