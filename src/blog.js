
document.addEventListener('DOMContentLoaded', function() {

    // Blog JS is used to handle the blogs that are created by the user 

    const blogInput =document.getElementsByClassName('Newblog')[0];
    const post = document.getElementById('post');

    post.addEventListener("click", async (event) =>{
        event.preventDefault() ;

        const blog = blogInput.value;
        console.log(blog)
        try {
        
        // const response =  await fetch('http://127.0.0.1:3000/api/message', {
        //         mode: 'no-cors',
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body:  JSON.stringify({blogContent: blog}) ,

        //     });

        //     const result =await response.json();
        //     console.log(result) ;
            
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("blog", blog);
        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:3000/api/message", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(document.querySelector('h2').innerHTML = 'Thanks !')
        .then(document.getElementsByClassName('box-container')[0].innerHTML = ' Blog is inserted successfully')
        .catch(error => console.log('error', error));      
        
    }         
    
    catch (error){
    console.log( 'Error submitting the message'+ error);
    }
    });
    
    });   