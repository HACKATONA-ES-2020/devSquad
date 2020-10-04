const changeBottomLogin = () => {
    $("#exibe-itens").hide();
}

if (localStorage.getItem('userId')) { 
    $("#inicio").hide();
} else {
    changeBottomLogin();
}

