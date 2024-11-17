document.addEventListener('DOMContentLoaded', function() {

    // Blog JS is used to handle the blogs that are created by the user 

    const blogInput =document.getElementsByClassName('Newblog');
    const post = document.getElementById('post');

    post.addEventListener("click", async (event) =>{
        event.preventDefault() ;

        const blog = blogInput.value;
        try {
        
        const response =  await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': '/application/json',
                },
                body: JSON.stringify({ blog }),

            });

            const result =await response.json();
            console.log(result) ;
            
            alert(result);
            }         

        catch (error){
            console.log( 'Error submitting the message'+ error);
        }
    });

});   