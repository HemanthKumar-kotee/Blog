document.addEventListener('DOMContentLoaded', function() {
                
    const getStart =document.getElementById("getStart");

    //Linked to the main page of the blog 

    getStart.addEventListener("click", function () {
        
        window.location.href = "http://127.0.0.1:3000/main";
    });
});