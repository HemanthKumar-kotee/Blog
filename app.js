const dataBaseUser= 'postgres';

const password = 'In 21 feb 2005';
const express =require('express');
const bodyParser =require('body-parser');
const path = require('path');

const port= 3000;

const app= express();
const { Pool } = require('pg');

const default_port =5432 ;
const postGreConfig = {
  user: dataBaseUser,
  host: 'localhost',
  database: 'postgres',
  password: password,
  port:default_port,
};

const pool = new Pool(postGreConfig);

pool.connect().then(() => {
  const query = 'CREATE TABLE IF NOT EXISTS post (s_no SERIAL PRIMARY KEY, blog VARCHAR(150) NOT NULL,time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';
  return pool.query(query);
}).then(() => {
  console.log('Table created successfully ');
  
})
.catch(err => {
  console.error('Error in executing query ', err.stack);
  pool.end();
});

app.use(bodyParser.urlencoded({ extended: true }))

// Middleware to parse JSON bodies 
app.use(bodyParser.json()) ;

app.use(express.static(__dirname +'/public'));

app.use('/src', express.static(__dirname+'/src'));
app.get('/',(req,res) =>{

  res.sendFile(path.join(__dirname,"public","Home.html"));
});


app.get('/main', (req,res) =>{

   res.sendFile(path.join(__dirname,"public","main.html"));
 });

app.get('/blog', (req,res) =>{
  res.sendFile(path.join(__dirname, "public","Blog.html"));

});


app.get('/api/fetchText' ,async (req, res) => {
  try {

    const metaData = await pool.query('SELECT COUNT(*) AS blog FROM Post');
    
    TotalBlogs = metaData.rows[0].blog;
  
    if (TotalBlogs < 4) {  
      const result =await pool.query('SELECT blog FROM Post LIMIT ${TotalBlogs}') ;

      res.json(result.rows.map(row => row.blog));
      
    }
    if (TotalBlogs >4){
      const result =await pool.query('SELECT DISTINCT blog FROM Post LIMIT 4 ') ; 
      
      //console.log(result.rows.map(row => row.blog));
      res.json(result.rows.map(row => row.blog));  
      
      }
    else if(TotalBlogs ==4){
      const result = await pool.query('SELECT blog FROM Post');
      res.json(result.rows.map(row => {row.blog}));
      
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
        'INSERT INTO Post (blog) VALUES ($1)',
        [blog]
      );

      
      res.status(200).send('Blog Inserted Successfully' );

    } catch (error) {
    
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }

});

app.listen(port, ()=>{

    console.log ('Server is running on port: ',port);
});