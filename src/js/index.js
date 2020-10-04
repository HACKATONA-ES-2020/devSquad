
function checkLogin() {

    if (localStorage.getItem('userId')) { 
        $("#inicio").hide();
        loadUserData();
        carregarProdutos();
        setTimeout(function(){
            $("#loader").hide();
            $("#exibe-itens").show();
            $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(2)").show()
            $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(3)").show()
            $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(4)").hide()
            document.querySelector("#cadastrar-servico")
        }, 1000);
    } else {
        $("#exibe-itens").hide();
        $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(2)").hide()
        $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(4)").show()
        $("body > div.site-wrap > header > div > div > div.col-9 > nav > ul > li:nth-child(3)").hide()
        setTimeout(function(){
            $("#loader").hide();
            $("#inicio").show();
        }, 1000);
    }
    
}


checkLogin();

$("#loader").hide();


$("#servicos").on("click", function() {
        $(".categoria-2").show()
        $('.categoria-1').attr('style','display:none !important')

        if($('#produt').hasClass('selected-cat')){
            $('#produt').removeClass('selected-cat')
        } if($('#todos').hasClass('selected-cat')) {
            $('#todos').removeClass('selected-cat')
        }

        $('#servicos').addClass('selected-cat')

});

$("#produt").on("click", function() {
    $(".categoria-1").show()
    $('.categoria-2').attr('style','display:none !important')

    if($('#servicos').hasClass('selected-cat')){
        $('#servicos').removeClass('selected-cat')
    } if($('#todos').hasClass('selected-cat')) {
        $('#todos').removeClass('selected-cat')
     }

     $('#produt').addClass('selected-cat')

});


$("#todos").on("click", function() {
    $(".categoria-1").show()
    $('.categoria-2').show()

    if($('#servicos').hasClass('selected-cat')){
        $('#servicos').removeClass('selected-cat')
    } if($('#produt').hasClass('selected-cat')) {
        $('#produt').removeClass('selected-cat')
     }

     $('#todos').addClass('selected-cat')
});

