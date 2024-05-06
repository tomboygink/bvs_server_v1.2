import nodemailer from "nodemailer";
import crypto from "crypto";
import { CONFIG } from "../../xcore/config";
import { UserTable } from "../dbase/Users";

export class SendMail {
  args: any;
  sess_code: string;
  constructor(_args: any, _sess_code: string) {
    this.args = _args;
    this.sess_code = _sess_code;
  }

  transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreplay@burvodstroy45.ru", // generated ethereal user
      pass: "RPWH8qhtD0YpY21sWWjY", // generated ethereal password
    },
  });

  async sendConfirmMail() {
    let a = "";
    a = crypto
      .createHmac("sha256", CONFIG.key_code)
      .update(this.args.login + "_" + this.args.email)
      .digest("hex");

    await this.transporter.sendMail({
      from: "noreplay@bvs45.ru",
      //Получение email от пользователя
      to: this.args.email,
      subject: "Activate mail",
      //Отправка ссылки с кодом для подтверждения
      html:
        'This message was sent from bvs_server to activate mail. <h1><a href="http://' +
        CONFIG.host +
        ":" +
        CONFIG.port +
        "/confirm_mail?code= " +
        a +
        '">Click this link</a></h1>',
    });
  }

  async sendRePassword() {
    var ut = new UserTable(this.args, this.sess_code);
    var data = await ut.selectUserLoginEmail();

    await this.transporter.sendMail({
      from: "noreplay@bvs45.ru",
      //Получение email от пользователя
      to: this.args.email,
      subject: "Forgot password",
      //Отправка ссылки с кодом для подтверждения
      html:
        'This message was sent from bvs_server to reset your password. <h1><a href="http://' +
        CONFIG.host +
        ":" +
        CONFIG.port +
        "/forgot_pass?code= " +
        data[0].re_password_code +
        '">Click this link</a></h1>',
    });
  }
}
