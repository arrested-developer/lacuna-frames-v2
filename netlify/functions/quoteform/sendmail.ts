import nodemailer from "nodemailer";

const sendmail = async (address, message) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: address, // list of receivers
    subject: "Hello ✔", // Subject line
    text: message, // plain text body
    html: "<b>message</b>", // html body
  });
  return info.messageId;
};

export default sendmail;
