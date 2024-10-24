export default function handler(req, res) 
{ 
    console.log("testing", req);
    require('dotenv').config()
  
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.gmail.com",
        auth: {
            user:"vatsalyasagar8@gmail.com",
            pass: 'snbx ljdp zzst gbsk',
        },
    })
    // info@cloudxperte.com,
    // const mailData = {
    //     from: `${'Taciti Enquiry'}`,
    //     to: `Prasad.a@coinage.in, ${req.body.email}` ,
    //     subject: `Enquiry From - ${req.body.firstName}`,
    //     text: req.body.name + " | Sent from: " + req.body.email,
    //     html:
    //     ` <div> 
    //     <p><strong>Name:</strong> ${req.body.firstName}_${req.body.lastName}</p>
    //     <p><strong>Email:</strong> ${req.body.email}</p>
    //     <p><strong>Phone Number:</strong> ${req.body.phone}</p>
    //     <p><strong>Company:</strong> ${req.body.company}</p>
    //     <p><strong>Country:</strong> ${req.body.country}</p>
    //     <p><strong>Service Selected:</strong> ${req.body.selectedService}</p>
    //     <p><strong>Industry Selected:</strong> ${req.body.selectedIndustry}</p>
    //     <p><strong>Description:</strong> ${req.body.description}</p>
      
    //     </div>`
    // }


    const mailData = {
        from: `Taciti Enquiry <${req.body.email}>`,
        to: `Prasad.a@coinage.in, ${req.body.email}`,
        subject: `Enquiry From - ${req.body.firstName}`,
        text: req.body.firstName+ " | Sent from: " + req.body.email,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #2e6c80;">New Enquiry from Taciti</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Field</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Details</th>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.firstName} ${req.body.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.email}</td>
              </tr>
              <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;">Phone Number</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Company</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.company}</td>
              </tr>
              <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;">Country</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.country}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Service Selected</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.selectedService}</td>
              </tr>
              <tr style="background-color: #f2f2f2;">
                <td style="padding: 10px; border: 1px solid #ddd;">Industry Selected</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.selectedIndustry}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Description</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${req.body.description}</td>
              </tr>
            </table>
          </div>
        `
      };
      
     
 
    transporter.sendMail(mailData, function (err, info) 
    {
        if (err)
            console.log(err)
        else
            console.log(info)
    })
    return res.status(200).json({
        success: true
    });
}

