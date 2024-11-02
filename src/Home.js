if (window.location.pathname !='./Home.html'){

    return;
}

const getStart =document.getElementById("getStarted");


getStart.addEventListener("click" ,function(){

    window.location.href ='code.html';
});