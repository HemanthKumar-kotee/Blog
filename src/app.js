const express =require('express') ;
const bodyParser =require('body-parser');
const port=3000;

const app= express();
const { Pool } = require('pg');

const postGreConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'In 21 feb 2005',
  port: 5432,
};

const pool = new Pool(postGreConfig);

// Middleware to parse JSON bodies 
app.use(express.json()) ;

app.get('/blog' ,async (req, res) => {
  try {
    let TotalBlogs = await pool.query('SELECT COUNT(*) FROM Post') ;

    if (TotalBlogs < 4 ){
      
      const result =await pool.query('SELECT blog FROM Post') ;

      res.json(result.rows.blog) ;
      
    }
    else {
    const result = await pool.query('SELECT DISTINCT blog FROM Post ORDER BY RANDOM() LIMIT 4 ') ; 
    
    res.json(result.rows.blog);  
    }
  } catch (error) {
    console.error('Error in executing query', error);

    res.status(500).send('Internal Server Error');
  }

});

app.post('/api/message', async (req, res) =>{
    const { blog } =req.body;

    if (!blog || blog.length >140){
      return res.status(400).send('Blog should not be empty and not more than 140 Characters '); 
    }

    try {
      const result= await pool.query(
        'INSERT INTO Post (blog) VALUES ($blog)',
        [blog]
      );

      
      res.json(result.rows.blog);

    } catch (error) {
    
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }

});

app.listen(port, ()=>{

    console.log ('Server is running on port: ',port);
})