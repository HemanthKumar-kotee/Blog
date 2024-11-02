
 if (window.location.pathname!=="./Create_Blog.html"){

    console.log("Error Wrong HTML file is rendered! ") ;
    return ;
}
// Blog JS is used to handle the blogs that are created by the user 

const blogInput =document.getElementsByClassName("Newblog");
const post = document.getElementById('post');

post.addEventListener("click", () =>{
    

    const blog =blogInput.value.trim();
    try {
       if (blog) { 
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': '/application/json',
            },
            body: blog ,

        });
        if (response.ok) {

            let data = response.json();
            console.log('Message Created successfully') ;

            console.log(data) ;
        
            window.location.href = 'code.html' ;
        }else {
            
            console.log('Error', response.text()) ;
            }
        }

    }
    catch (error){
        console.log( 'Error submitting the message'+ error);
    }    
});