/**
 * Created by jasonlines on 12/23/13.
 */
var RaspiCam = require("raspicam"),
    nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "jlines2009@gmail.com",
        pass: "p1at3au!!"
    }
});

var camera = new RaspiCam({
    mode:"photo",
    output:"./pictures/" + new Date().getTime() + ".jpg"
});

console.log("camera init");

exports.sendImage = function(req, res){
    res.send("emailing photo");

    //to take a snapshot, start a timelapse or video recording
    camera.start( );
};

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, filename){
    console.log(JSON.stringify(filename));
    console.log("./pictures/" + filename + ".jpg";)
    var mailOptions = {
        from: "jlines <jlines@blurdybloop.com>", // sender address
        to: "commanderjason@gmail.com", // list of receivers
        subject: "Image captured at " + new Date().toISOString(), // Subject line
        text: "New Image",
        attachments: {
            filePath:"./pictures/" + filename + ".jpg"
        }
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
});