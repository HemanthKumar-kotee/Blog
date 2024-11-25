document.addEventListener('DOMContentLoaded' ,function() {

    const create_blog =document.getElementById("Add-blog");
    
    // The main page of the blog application used to show the blogs to the user 
    /*
    Main JavaScript file used to handle the event listener to 

        make reliable to the user of the blog application
    */ 

    create_blog.addEventListener("click", ()=>{

        window.location.href = '../public/Blog.html';

    });

    async function fetchAndDisplayText(){

        try{
            const response = await fetch('http://localhost:3000/api/fetchText');
            if (response.ok) {
                const responseJson = await response.json();

                const blogs = response.text();
                const blogDisplay = document.getElementsByClassName('recentskeleton');
                blogDisplay.innerHTML = '';

                blogs.forEach(blog => {
                    const blogElement = document.createElement('div');
                    blogElement.textContent = blog;
                    blogDisplay.appendChild(blogElement);

                });

            } else {

                console.error('Failed to fetch  texts.')
            }

        }
        catch (error) {
            console.error('Unable to fetch data from the server! ',error);
        }
    }   

    fetchAndDisplayText();
});