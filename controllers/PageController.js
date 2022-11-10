import nodemailer from 'nodemailer'
import Photo from '../models/Photo.js'
import User from '../models/User.js'

const getIndexPage = async (req, res) => {
  const photos = await Photo.find().sort({ uploadedAt: -1 }).limit(3);
  const numOfUser = await User.countDocuments({});
  const numOfPhotos = await Photo.countDocuments({});

  res.render('home', { title: 'home', photos, numOfUser, numOfPhotos, });
};
const getAboutPage = (req, res) => {
  res.render('about', { title: 'about' });
}
const getRegisterPage = (req, res) => {
  res.render('register', { title: 'register' });
}
const getLoginPage = (req, res) => {
  res.render('login', { title: 'login' });
}

const getContactPage = (req, res) => {
  res.render('contact', { title: 'contact' });
}

const sendEmail = async (req, res) => {
  const htmlTemplate = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Name: ${req.body.name}</p>
                            <p>Email: ${req.body.email}</p>
                            <p>Message: ${req.body.message}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`;


  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASSWORD,
        tls: { rejectUnauthorized: false }
      },
    });
    await transporter.sendMail({
      to: 'sametsahinca@gmail.com', // list of receivers
      subject: `MAIL FROM ${req.body.email}`, // Subject line
      html: htmlTemplate, // html body
    });

    res.status(200).json({ succeeded: true });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
};

export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getContactPage, sendEmail }