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


writeFile('./users.json', JSON.stringify([{ id: 1, name: 'moe' }]))
.then(() => console.log('success'))
.catch(() => console.log('failure'));


http.createServer((req, res)=> {
if (req.url === '/api/users') {
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



