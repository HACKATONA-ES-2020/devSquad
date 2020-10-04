
function checkLogin() {

    if (localStorage.getItem('userId')) { 
        $("#inicio").hide();
        console.log($("#cadastrar-produtos").show())
        $("#cadastrar-produtos").show()
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
