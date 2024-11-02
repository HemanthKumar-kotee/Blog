

const create_blog =document.getElementById("createblog");
const blog_id =document.getElementById("blog-id") ;

// The main page of the blog application used to show the blogs to the user 
/*
blog_id.addEventListener("click", 
    async ()=>{

    window.location.href= "blogs.html";
});*/

/*
Main JavaScript file used to handle the event listener to 

    make reliable to the user of the blog application

*/ 

create_blog.addEventListener("click", 
    ()=>{

    window.location.href = 'Create_Blog.html';

});

async function loadMessages(){
    try {
        const response =fetch('/api/message') ;
        if (!response.ok) {

            throw new Error('Failed to load message') ;
        }
        const messages = response.json();
        const messageList = document.getElementById('skeleton');
    
        messagesList.innerHTML= '';

        messages.forEach(message => {
            const listItem = document.createElement('li');
            listItem.textContent = message.message;
        // Assuming the table has a column 'message'
        
        messageList.appendChild(listItem);
        })
    } catch (error) {

        console.log('Error ', error) ;
    }
    
window.onload =loadMessages();
  
}