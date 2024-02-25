const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
// require('dotenv').config();

async function getConnection() {
  const connection= await mysql.createConnection({
host:'localhost',
user:'root',
password:'root', 
database:'netflix',
port: '/var/run/mysqld/mysqld.sock'
  });
  await connection.connect();
  return connection;
}

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//endpoints

server.get  ('/api/movies', async (req,res) => {
  const conex= await getConnection();
  const sql= 'SELECT * FROM movies';
  const [results]= await conex.query(sql);
  console.log (results);
  //conex.end();
  res.json({success:true, movies:results });
});

const staticServer ="./src/public-react";
server.use(express.static(staticServer));


//crear endpoints -->  CRUD DE LA BD
// server.get('/api/movies', async (req, res) => {
//   const { genre, sort } = req.query;
//   console.log(req.query);
//   const conex = await getConnection();

//   let listMovies = [];
//   if (genre === '') {
//     const selectMovie = `select * from movies order by title ${sort}`;
//     const [resultMovies] = await conex.query(selectMovie);
//     listMovies = resultMovies;
//   } else {
//     const selectMovie = `select * from movies where genre = ? order by title ${sort}`;
//     const [resultMovies] = await conex.query(selectMovie, [genre]);
//     listMovies = resultMovies;
//   }
//   conex.end();
//   res.json({
//     success: true,
//     movies: listMovies,
//   });
// });

