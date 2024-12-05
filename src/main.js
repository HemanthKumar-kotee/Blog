document.addEventListener('DOMContentLoaded' ,()=> {

    fetchAndDisplayText();

    const create_blog =document.getElementById("Add-blog");

    // The main page of the blog application used to show the blogs to the user 
    /*
    Main JavaScript file used to handle the event listener to 

        make reliable to the user of the blog application
    */ 

    create_blog.addEventListener("click", ()=>{

        window.location.href = "http://127.0.0.1:3000/blog" ;

    });

    async function fetchAndDisplayText(){
        console.log("Fetching data from the server...");
        try{

            const response = await fetch('http://127.0.0.1:3000/api/fetchText');
                
            if (!response.ok) {
                throw new Error('Response error: ${response.status}');
            }
            
            const data = await response.json();
            
            console.log('Data received: ',data);
               
                const blogDisplay = document.getElementsByClassName('recentskeleton')[0];

                data.forEach(blog => {
                    const blogElement = document.createElement('div');

                    blogElement.style.marginTop = '25px';
                    blogElement.style.width = '50%';
                    blogElement.style.textAlign = 'center';
                    blogElement.style.display = 'flex';
                    blogElement.style.height = '10vh';
                    blogElement.style.borderRadius = '20px';
                    blogElement.style.border = '2px solid #0d1a1a';
                    blogElement.textContent = blog;
                    blogDisplay.appendChild(blogElement);

                });
            } catch (error) {

            console.error('Unable to fetch data from the server! ',error);
        }
    }   
});
