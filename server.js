const exp = require('express');
const app = exp();

app.use(exp.json());


app.get('/contact', (req,res)=> {
  res.sendFile('./public/contact.html', {root:__dirname});
})

app.post('/form', (req,res)=> {
  console.log(req.body)
})

app.listen(8000);