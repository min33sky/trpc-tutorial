import nodemailer from 'nodemailer';

/**
 * ## 로그인 할 수 있는 Email 보내기 함수
 * @param email
 * @param token
 * @param url
 */
export async function sendLoginEmail({
  email,
  token,
  url,
}: {
  email: string;
  url: string;
  token: string;
}) {
  //? mail을 보낼 테스트 계정 생성
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"leo" <leo@example.com>',
    to: email,
    subject: 'Login to your account',
    //? querystring 대신 hash를 사용한 이유: qs는 browser의 history에 저장되기 때문에
    html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
