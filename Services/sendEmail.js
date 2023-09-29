import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "k200288@nu.edu.pk",
    pass: "Kanza1430",
  },
});

export const SendEmail = (To, Subject, Body, cb) => {
  const mailOptions = {
    from: process.env.email,
    to: To,
    subject: Subject,
    text: Body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      cb(error, null);
    } else {
      console.log("Email sent: " + info.response);
      cb(null, info);
    }
  });
};

export const SendEmailAsync = (To, Subject, Body, cb) => {
  const mailOptions = {
    from: process.env.email,
    to: To,
    subject: Subject,
    text: Body,
  };
  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        rej(error);
      } else {
        res(info);
      }
    });
  });
};
