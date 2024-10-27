import nodemailer from "nodemailer";

// Nodemailer transporter 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASSWORD,
  },
});

// 기본 메일 옵션 설정
const defaultMailOptions = {
  from: process.env.NODE_MAIL_USER,
  subject: "메일 테스트", // 기본 제목
  text: "This is the default text message.", // 기본 텍스트 본문
  html: "<h1>Hello!</h1><p>This is the default email sent using Nodemailer!</p>", // 기본 HTML 본문
};

export const sendEmail = async (email) => {
  const mailOptions = {
    ...defaultMailOptions,
    to: email, // 수신자 이메일 주소 설정
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
