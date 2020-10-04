
function checkLogin() {

    if (localStorage.getItem('userId')) { 
        $("#inicio").hide();
        setTimeout(function(){
            $("#loader").hide();
            $("#exibe-itens").show();
        }, 1000);
    } else {
        $("#exibe-itens").hide();
        setTimeout(function(){
            $("#loader").hide();
            $("#inicio").show();
        }, 1000);
    }
    
}

checkLogin();

$("#loader").hide();
