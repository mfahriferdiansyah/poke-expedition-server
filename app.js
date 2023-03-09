var express = require('express');
var cors = require('cors')
var app = express();
var PORT = process.env.PORT || 3000;
const router = require('./routes') 
const errorHandler = require('./middlewares/errorHandler');

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(router)
app.use(errorHandler)
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});