const fs = require('fs');
const http = require('http');

//console.log(process)

const readFile = (file) => {
  return new Promise((resolve, reject)=> {
    fs.readFile(file, (err, data) => {
      if(err) {
        reject(err);
      }
      else {
        resolve(data.toString())
      }
    }
  )}
  )};

  const writeFile = (file, data) => {
    return new Promise((resolve, reject)=> {
      fs.writeFile(file, data, (err, data) => {
        if(err) {
          reject(err);
        }
        else {
          resolve();
        }
      }
    )})
  };

 const addUser = (user) => {
   return readFile('./users.json')
   .then(data => {
     const users = JSON.parse(data);
     let max = users.reduce((acc, user)=> {
       if(user.id > acc) {
         acc = user.id;
       }
       return acc;
     }, 0);
     user.id = max + 1;
     users.push(user);
     return writeFile('./users.json', JSON.stringify(users));
   })
   .then(() => {
     return user;
   })
 };


addUser({ name: `curly-${Math.random()}`})
.then( user => console.log(user));



http.createServer((req, res)=> {
if (req.url === '/api/users') {
    if(req.method === 'GET') {
    readFile('./users.json')
    .then(data => {
      res.write(data);
      res.end();
    })
    .catch( ex => {
      res.statusCode = 500;
      res.write(ex.message);
      res.end();
    })
  }
  else {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', ()=> {
      const user = JSON.parse(body);
      addUser(user)
      .then(user => {
        res.statusCode = 201;
        res.write(JSON.stringify(user));
        res.end();
      })
      .catch(ex => {
        res.statusCode = 500;
        res.write(ex.message);
        res.end();
      })
      console.log(user);
    })
  }
} else if (req.url === '/') {
    readFile('./index.html')
    .then(data => {
      res.write(data);
      res.end();
    })
    .catch( ex => {
      res.statusCode = 500;
      res.write(ex.message);
      res.end();
})
}}).listen(3000);



