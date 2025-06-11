import nodemailer from "nodemailer";
import { DateTime } from "luxon";

// Nodemailer transporter 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASSWORD,
  },
});

export const sendConfirmEmail = async (
  email,
  mainGuidePhoto,
  fullname,
  startTime,
  endTime,
  serviceFee,
  reservationId,
  pickupPlaceMain,
  pickupPlaceDetail,
  guideAge
) => {
  const startISO = startTime.toISOString();
  const endISO = endTime.toISOString();

  const vietnamStartDate = DateTime.fromISO(startISO, {
    zone: "Asia/Ho_Chi_Minh",
  });
  const vietnamEndDate = DateTime.fromISO(endISO, { zone: "Asia/Ho_Chi_Minh" });

  const formattedServiceFee = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(serviceFee);

  const mailOptions = {
    from: process.env.NODE_MAIL_USER,
    to: email,
    subject: "FGFG - 예약이 확정 되었습니다!",
    text: "안녕하세요! 예약이 확정 되었습니다. 상세 정보를 확인해 주세요.",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 500px; margin: auto; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
      <p style="margin-bottom: 10px;">안녕하세요 고객님. 예약이 확정 되었습니다. 즐거운 여행 되시길 바랍니다!</p>
      <p style="text-align: left; color: #666; font-size: 0.9em;">예약번호: <strong>${reservationId}</strong></p>
      
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px;">
        <img src="${mainGuidePhoto}/mainphoto" alt="가이드 사진" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;"/>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">가이드 이름</p>
        <p style="margin: 0;">${fullname} (${guideAge}세)</p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">예약 날짜</p>
        <p style="margin: 0;">${vietnamStartDate.toFormat("M월 dd일")}</p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">예약 시간</p>
        <p style="margin: 0;">${vietnamStartDate.toFormat(
          "HH:mm"
        )} ~ ${vietnamEndDate.toFormat("HH:mm")}</p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">픽업 위치</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          pickupPlaceMain
        )}" target="_blank" rel="noopener noreferrer" style="color: #F97316; text-decoration: underline;">
          ${pickupPlaceMain}
        </a>
        <p style="margin: 0;">${pickupPlaceDetail}<p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">요금</p>
        <p style="color: #333; font-size: 1.1em; margin: 0;"><strong>${formattedServiceFee}</strong></p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://fgfgglobal.com" style="background-color: #F97316; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">FGFG로 이동하기</a>
      </div>

      <p style="font-size: 0.8em; color: #888; text-align: center; margin-top: 20px;">
        이 메일은 FGFG에서 자동 발송된 메일입니다.<br>© FGFG 2024. All rights reserved.
      </p>
    </div>
  `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendRejectionEmail = async (
  email,
  mainGuidePhoto,
  fullname,
  startTime,
  endTime,
  serviceFee,
  reservationId,
  pickupPlaceMain,
  pickupPlaceDetail,
  guideAge
) => {
  // `Date` 객체를 ISO 문자열로 변환
  const startISO = startTime.toISOString();
  const endISO = endTime.toISOString();

  const vietnamStartDate = DateTime.fromISO(startISO, {
    zone: "Asia/Ho_Chi_Minh",
  });
  const vietnamEndDate = DateTime.fromISO(endISO, { zone: "Asia/Ho_Chi_Minh" });

  const formattedServiceFee = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(serviceFee);

  const mailOptions = {
    from: process.env.NODE_MAIL_USER,
    to: email,
    subject: "FGFG - 예약이 취소 되었습니다.",
    text: "안녕하세요. 예약이 취소 되었습니다.",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
      <p style="margin-bottom: 10px;">안타깝게도 요청하신 FGFG 가이드 예약이 취소 되었습니다. 가이드에게 메시지를 보내, 다른 일정으로 다시 예약해보세요!</p>
      <p style="text-align: left; color: #666; font-size: 0.9em;">예약번호: <strong>${reservationId}</strong></p>
      <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px;">
        <img src="${mainGuidePhoto}/mainphoto" alt="가이드 사진" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;"/>
      </div>

       <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">가이드 이름</p>
        <p style="margin: 0;">${fullname} (${guideAge}세)</p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">예약 날짜</p>
        <p style="margin: 0;">${vietnamStartDate.toFormat("M월 dd일")}</p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">예약 시간</p>
        <p style="margin: 0;">${vietnamStartDate.toFormat(
          "HH:mm"
        )} ~ ${vietnamEndDate.toFormat("HH:mm")}</p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">픽업 위치</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          pickupPlaceMain
        )}" target="_blank" rel="noopener noreferrer" style="color: #F97316; text-decoration: underline;">
          ${pickupPlaceMain}
        </a>
        <p style="margin: 0;">${pickupPlaceDetail}<p>
      </div>

      <div style="margin-bottom: 15px;">
        <p style="font-weight: bold; margin: 0;">요금</p>
        <p style="color: #333; font-size: 1.1em; margin: 0;"><strong>${formattedServiceFee}</strong></p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://fgfgglobal.com" style="background-color: #F97316; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">FGFG로 이동하기</a>
      </div>

      <p style="font-size: 0.8em; color: #888; text-align: center; margin-top: 20px;">
        이 메일은 FGFG에서 자동 발송된 메일입니다.<br>© FGFG 2024. All rights reserved.
      </p>
    </div>
  `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Rejection email sent: " + info.response);
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};

export const sendChatRoomNotificationEmail = async (
  email,
  fullname,
  username
) => {
  const mailOptions = {
    from: process.env.NODE_MAIL_USER,
    to: email,
    subject: `FGFG - ${username} khách hàng đã gửi tin nhắn đầu tiên cho bạn.`,
    text: "Xin chào! Hãy kiểm tra tin nhắn và bắt đầu trao đổi với khách hàng của bạn.",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
        <h1 style="color: #4CAF50; text-align: center;">Phòng chat mới đã được tạo!</h1>
        <p style="font-size: 1.2em;">Xin chào, ${fullname}!</p>
        <p>FGFG đã tạo một phòng chat mới để bạn trao đổi với khách hàng ${username}. Xin hãy kiểm tra tin nhắn!</p>
        <p>Nếu có bất kỳ thắc mắc nào về đặt chỗ, vui lòng liên hệ với chúng tôi qua ID Kakao: rlawpgud.</p>
        <p>Email này chỉ được gửi khi khách hàng gửi tin nhắn đầu tiên.</p>
        <div style="margin-top: 30px; text-align: center;">
          <a href="https://fgfgglobal.com" style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Truy cập FGFG</a>
        </div>
  
        <p style="font-size: 0.9em; color: #888; text-align: center; margin-top: 20px;">
          Đây là email tự động được gửi từ FGFG.<br>
          © FGFG 2025. Bản quyền thuộc về FGFG.
        </p>
      </div>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Chat room notification email sent: " + info.response);
  } catch (error) {
    console.error("Error sending chat room notification email:", error);
  }
};
