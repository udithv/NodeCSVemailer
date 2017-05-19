
'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const multer = require('multer');



//Required variables 
const port = 4200;

const mailer = require('./routes/mailer');




//Initiate express
const app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Loading Middleware

//Body Parser
 app.use(bodyParser.json());

 //Cors 
 app.use(cors());


 //Logger
 app.use(morgan('dev'));

//Set Static Folder 
app.use(express.static(path.join(__dirname,'public')));



app.use('/mailer',mailer);

app.get('/',(req, res) => {
	res.render('index', { title: 'Bulk Mailer' });
});

app.get('/downloadsample',(req, res, next) => {
			// send sample csv
			let file = __dirname+'/uploads/sample.csv';

			res.download(file);
		

});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {
	console.log('Bulk Mailer Server Running At Port : '+port);
});






