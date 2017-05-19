const router = require('express').Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
var csv = require('fast-csv');
var fs = require('fs');
const upload = multer({ dest: path.join(__dirname, '../uploads') });




// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '<email>',
        pass: '<password>'
    }
});





router.get('/',(req, res, next) => {
	res.render('mailer', { title: 'Bulk Mailer' });
});



router.post('/', upload.single('myFile'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  console.log(req.file);
  let currentfile = req.file.path;

  let stream = fs.createReadStream(currentfile);
 
csv
 .fromStream(stream, {headers : true, ignoreEmpty:true})
 .on("data", function(data){
    
     console.log('Sending Email.....');
     sendEmail(data);
 })
 .on("end", function(){
     console.log("done");
 });


  res.render('upsuccess', {
    title: 'Upload Success'
  });

});


function sendEmail(email){
  let from =  email.from;
  let to = email.email_id;
  let subject = email.subject;
  let content = email.content;
  let html = '<h2>'+content+'</h2>'
    // setup email data with unicode symbols
let mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: content, // plain text body
    html: html // html body
};

console.log(mailOptions);
            // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send('BulkMailer: Error Sending Email ')
            }
            res.send('Message  sent');
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        
}




module.exports = router;