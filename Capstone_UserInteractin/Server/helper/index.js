const nodeMailer = require("nodemailer");
 
const defaultEmailData = { from: "noreply@userinteraction.com" };
 
exports.sendEmail = async (emailData) => {
    
    
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "userinteraction",
            pass: "ldwtdkzgexxyfdvj"
        }
    });

    
    //console.log("fromm ::: ",emailData.to)
    // console.log("fromm ::: ",emailData.Subject)
    // console.log("fromm ::: ",emailData.TextPart)
    // console.log("fromm ::: ",emailData.HTMLPart)

     const mailData = {
         from : emailData.from,
         to: emailData.to,
         subject: "Password Reset Instructions",
         text: emailData.TextPart,
         html: emailData.HTMLPart
     }

    return (
        transporter.sendMail(mailData, (err,info) => {
           if(err) {
            console.log(`Problem sending email: ${err}`)
            } else {
                console.log(`Message sent: ${info.response}`)
            }
        })
    );
};