const express = require('express');


const html = require('./routes/htmlroutes')
const api = require('./routes/apiroutes')

const PORT = process.env.PORT || 3001;
const host = "0.0.0.0";
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
 app.use('/', html);





app.listen(PORT, host, () =>
  console.log(`running on PORT: ${PORT} 🚀`)
);
