import { DBase, getDB } from "./DBase";
import crypto from "crypto";
import CONFIG from "../../config.json";
import { dateTimeToSQL, dateTimeToStr } from "./DateStr";
import nodemailer from "nodemailer";

export class UsersEntity {
  id: number = 0;
  login: string = "";
  family: string = "";
  name: string = "";
  father: string = "";
  email: string = "";
  id_org: number = 0;
  id_job: number = 0;
  roles_ids: Object = {};
  act_mail: boolean = false;
  deleted: boolean = false;
  info: string = "";

  constructor() { }
}

export class User {
  db: DBase;
  args: any;
  sess_code: string;
  constructor(_args: any, _sess_code: string) {
    this.db = getDB();
    this.args = _args;
    this.sess_code = _sess_code;
  }

  // Добавление кода сессии пользователя при авторизации
  async insertSessionCode() {
    var pass = crypto
      .createHmac("sha256", CONFIG.crypto_code)
      .update(this.args.password)
      .digest("hex");
    var db_response = await this.db.query(
      "SELECT id FROM users WHERE login = '" +
      this.args.login +
      "' and password = '" +
      pass +
      "'"
    );

    if (db_response.rows.length !== 0) {
      const date = new Date();
      date.setDate(date.getDate() + 15);
      // получаем id для записи
      var id_q = await this.db.query("SELECT max(id) FROM sessions");
      var id: number = 0;
      //если записей в Sessions не было то присваеваем 1
      if (id_q.rows[0].max === null) {
        id++;
      }
      //иначе к последней записи добавляем 1
      else {
        id = parseInt(id_q.rows[0].max) + 1;
      }

      var sess = crypto
        .createHmac("sha256", CONFIG.crypto_code)
        .update(
          id +
          "_" +
          dateTimeToSQL(date) +
          "_" +
          db_response.rows[0].selectiduser
        )
        .digest("hex");

      //записываем в Sessions
      await this.db.query(
        "INSERT INTO sessions (id, uid, expires, created_at, sess_code, sess_data) " +
        "VALUES (" +
        id +
        ", " +
        db_response.rows[0].id +
        ", '" +
        dateTimeToSQL(date) +
        "', '" +
        dateTimeToSQL(new Date(Date.now())) +
        "', '" +
        sess +
        "', '{\"data\":[]}')"
      );
      return sess;
    }
  }

  //Удаление кода сессии пользователя
  async deleteSessionCode() {
    await this.db.query(
      "DELETE FROM sessions WHERE sess_code = '" + this.sess_code + "'"
    );
  }

  // Получение данных при авторизации
  async selectUser(): Promise<UsersEntity[]> {
    var db_response: any = {};
    //Авторизация по логину паролю
    if (this.args.code === undefined) {
      //Шифрование пароля для сверки с базой данных
      var pass = crypto
        .createHmac("sha256", CONFIG.crypto_code)
        .update(this.args.password)
        .digest("hex");

      db_response = await this.db.query(
        "SELECT " +
        "id, login, family, name, father, email, org_id as id_org," +
        "job_title_id as id_job, roles_ids, act_mail, deleted, info FROM users WHERE login ='" +
        this.args.login +
        "' and password = '" +
        pass +
        "'"
      );
    }

    //Авторизация по коду сессии
    else {
      var time_for_exit = await this.db.query(
        "SELECT expires FROM sessions WHERE sess_code = '" +
        this.args.code +
        "'"
      );

      if (
        time_for_exit.rows[0] !== undefined &&
        time_for_exit.rows[0].expires >= new Date(Date.now())
      ) {
        db_response = await this.db.query(
          "SELECT " +
          "users.id, users.login, users.family, users.name, " +
          "users.father, users.email, users.org_id as id_org," +
          "users.job_title_id as id_job, users.roles_ids, " +
          "users.act_mail, users.deleted, users.info FROM users INNER JOIN sessions ON " +
          "users.id=sessions.uid WHERE sessions.sess_code = '" +
          this.args.code +
          "'"
        );
      } else {
        console.log("Время авторизации вышло");
      }
    }

    var result: UsersEntity[] = new Array();
    for (var u in db_response.rows) {
      result.push(db_response.rows[u]);
    }
    return result;
  }

  // Добавление нового пользователя
  async insertUser() {
    var checkUser = await this.selectUser();
    if (checkUser.length === 0) {
      // Генерация зашифрованного пароля
      var pass = crypto
        .createHmac("sha256", CONFIG.crypto_code)
        .update(this.args.password)
        .digest("hex");
      // Генерация зашифрованного кода подтверждение почты
      var mail_code = crypto
        .createHmac("sha256", CONFIG.crypto_code)
        .update(this.args.login + "_" + this.args.email)
        .digest("hex");
      // Генерация зашифрованного кода для смены пароля когда пользователь забыл пароль
      var re_pass_code = crypto
        .createHmac("sha256", CONFIG.crypto_code)
        .update(this.args.login + "_" + pass)
        .digest("hex");

      var access = "";

      //users_r = 1
      //users_w = 2
      if (this.args.user_r === false && this.args.user_w === false) {
        access = '{"roles":[1]}';
      }
      if (this.args.user_r === true && this.args.user_w === false) {
        access = '{"roles":[1]}';
      }
      if (this.args.user_r === false && this.args.user_w === true) {
        access = '{"roles":[1,2]}';
      }
      if (this.args.user_r === true && this.args.user_w === true) {
        access = '{"roles":[1,2]}';
      }

      // Запрос на добавление пользователя
      var db_response = await this.db.query(
        "INSERT INTO users (login, password, family, name, father, telephone, " +
        "email, org_id, job_title_id, roles_ids, user_data, mail_code, act_mail, re_password_code, " +
        "deleted, deleted_date, created_at, info) VALUES ('" +
        this.args.login +
        "', '" +
        pass +
        "', '" +
        this.args.family +
        "', '" +
        this.args.name +
        "', '" +
        this.args.father +
        "', '---', '" +
        this.args.email +
        "', " +
        this.args.id_org +
        ", " +
        this.args.id_jobs +
        ", '" +
        access +
        "', '{\"user_data\":[]}', '" +
        mail_code +
        "', false , '" +
        re_pass_code +
        "', false, null, '" +
        dateTimeToSQL(new Date(Date.now())) +
        "','" +
        this.args.info +
        "') RETURNING id"
      );

      return db_response.rows;
    }
  }

  // Получение всех пользователей системы
  async selectAllUser(): Promise<UsersEntity[]> {
    var db_response = await this.db.query("SELECT * FROM users");
    var result: UsersEntity[] = new Array();
    for (var u in db_response.rows) {
      result.push(db_response.rows[u]);
    }
    return result;
  }

  // Обновление данных пользователя
  async updateUser() {
    // Проверка по isAdmin
    // Если isAdmin true то пользователь редачит сам себя
    var db_response: any = {};
    if (this.args.isAdmin === true) {
      var checkMail = await this.db.query(
        "SELECT email FROM users WHERE id =" + this.args.id
      );
      db_response = await this.db.query(
        "UPDATE users SET family = '" +
        this.args.family +
        "', name ='" +
        this.args.name +
        "', father = '" +
        this.args.father +
        "'," +
        " info = '" +
        this.args.info +
        "' WHERE id = " +
        this.args.id +
        "RETURNING id"
      );
      //Редактирование данных почты
      if (checkMail.rows[0].email !== this.args.email) {
        var mail_code = crypto
          .createHmac("sha256", CONFIG.crypto_code)
          .update(this.args.login + "_" + this.args.email)
          .digest("hex");
        await this.db.query(
          "UPDATE users SET email = '" +
          this.args.email +
          "', mail_code = '" +
          mail_code +
          "' , act_mail = false WHERE id = " +
          this.args.id
        );
      }
    }
    //Иначе если isAdmin=false то пользователь редачит другого
    else {
      var checkMailandPass = await this.db.query(
        "SELECT email, password FROM users WHERE id =" + this.args.id
      );

      db_response = await this.db.query(
        "UPDATE users SET family = '" +
        this.args.family +
        "', name ='" +
        this.args.name +
        "', father = '" +
        this.args.father +
        "'," +
        " info = '" +
        this.args.info +
        "', deleted = " +
        this.args.deleted +
        " WHERE id = " +
        this.args.id +
        "RETURNING id"
      );

      //Редактирование данных с паролем
      if (
        checkMailandPass.rows[0].pass !== this.args.password &&
        this.args.password !== ""
      ) {
        // Генерация зашифрованного пароля
        var pass = crypto
          .createHmac("sha256", CONFIG.crypto_code)
          .update(this.args.password)
          .digest("hex");
        // Генерация зашифрованного кода для смены пароля когда пользователь забыл пароль
        var re_pass_code = crypto
          .createHmac("sha256", CONFIG.crypto_code)
          .update(this.args.login + "_" + pass)
          .digest("hex");

        await this.db.query(
          "UPDATE users SET password = '" +
          pass +
          "', re_password_code = '" +
          re_pass_code +
          "' WHERE id = " +
          this.args.id
        );
      }

      //Редактирование данных почты
      if (checkMailandPass.rows[0].email !== this.args.email) {
        var mail_code = crypto
          .createHmac("sha256", CONFIG.crypto_code)
          .update(this.args.login + "_" + this.args.email)
          .digest("hex");
        await this.db.query(
          "UPDATE users SET email = '" +
          this.args.email +
          "', mail_code = '" +
          mail_code +
          "' , act_mail = false WHERE id = " +
          this.args.id
        );
      }
    }

    return db_response.rows;
  }



  // async sendConfirmMail() {
  //   //запрос на данные из бд на логин/почту/код подтверждения почты и активацию через код сессии 
  //   var db_response = await this.db.query(
  //     "SELECT login, email, mail_code, act_mail FROM users INNER JOIN sessions ON users.id = sessions.uid WHERE sess_code = '" +
  //     this.sess_code +
  //     "'"
  //   );
  //   console.log(db_response.rows[0])

  //   //Генерируем код почты
  //   let code_generate = crypto
  //     .createHmac("sha256", CONFIG.crypto_code)
  //     .update(this.args.login + "_" + this.args.email)
  //     .digest("hex");

  //   //проверка на соответстие логина
  //   //если соответствую идем дальше
  //   if (db_response.rows[0].login === this.args.login) {
  //     console.log("Логин совпадает");
  //     //Проверка email
  //     if (db_response.rows[0].email === this.args.email) {
  //       console.log("Мыло совпадает");
  //       //Проверка mail_code и code_generated
  //       if (db_response.rows[0].mail_code === code_generate) {
  //         console.log("Данные mail_code совпадают");
  //         //Проверка на активацию почты 
  //         if (db_response.rows[0].act_mail === true) {
  //           //Активация true
  //           console.log("Email подтвержден");
  //         }
  //         else {
  //           //Отправляем письмо
  //           await this.transporter.sendMail({
  //             from: "noreplay@bvs45.ru",
  //             //Получение email от пользователя
  //             to: this.args.email,
  //             subject: "Activate mail",
  //             //Отправка ссылки с кодом для подтверждения
  //             html:
  //               'This message was sent from bvs_server to activate mail. <h1><a href="http://' +
  //               CONFIG.front_config.host +
  //               ":" +
  //               CONFIG.front_config.port +
  //               "/confirm_mail?code= " +
  //               code_generate +
  //               '">Click this link</a></h1>',
  //           });
  //         }
  //       }
  //       //иначе обновляем БД mail_code = code_generate act_mail = false
  //       else {
  //         await this.db.query("UPDATE users SET mail_code = \'" + code_generate + "\', act_mail = false WHERE login = \'" + this.args.login + "\'");
  //         //Отправляем письмо
  //         await this.transporter.sendMail({
  //           from: "noreplay@bvs45.ru",
  //           //Получение email от пользователя
  //           to: this.args.email,
  //           subject: "Activate mail",
  //           //Отправка ссылки с кодом для подтверждения
  //           html:
  //             'This message was sent from bvs_server to activate mail. <h1><a href="http://' +
  //             CONFIG.front_config.host +
  //             ":" +
  //             CONFIG.front_config.port +
  //             "/confirm_mail?code= " +
  //             code_generate +
  //             '">Click this link</a></h1>',
  //         });
  //       }
  //     }
  //     else {
  //       await this.db.query("UPDATE users SET email = \'" + this.args.email + "\' , mail_code = \'" + code_generate + "\', act_mail = false WHERE login = \'" + this.args.login + "\'")
  //       //Отправляем письмо
  //       await this.transporter.sendMail({
  //         from: "noreplay@bvs45.ru",
  //         //Получение email от пользователя
  //         to: this.args.email,
  //         subject: "Activate mail",
  //         //Отправка ссылки с кодом для подтверждения
  //         html:
  //           'This message was sent from bvs_server to activate mail. <h1><a href="http://' +
  //           CONFIG.front_config.host +
  //           ":" +
  //           CONFIG.front_config.port +
  //           "/confirm_mail?code= " +
  //           code_generate +
  //           '">Click this link</a></h1>',
  //       });
  //     }


  //   }
  //   //иначе
  //   else {
  //     console.log("Логин и мыло не верны ");
  //   }
  // }


  // //Отправка письма для подтверждения email
  // async sendConfirmMail() {

  //   let a = "";
  //   a = crypto
  //     .createHmac("sha256", CONFIG.crypto_code)
  //     .update(this.args.login + "_" + this.args.email)
  //     .digest("hex");

  //   await this.transporter.sendMail({
  //     from: "noreplay@bvs45.ru",
  //     //Получение email от пользователя
  //     to: this.args.email,
  //     subject: "Activate mail",
  //     //Отправка ссылки с кодом для подтверждения
  //     html:
  //       'This message was sent from bvs_server to activate mail. <h1><a href="http://' +
  //       CONFIG.front_config.host +
  //       ":" +
  //       CONFIG.front_config.port +
  //       "/confirm_mail?code= " +
  //       a +
  //       '">Click this link</a></h1>',
  //   });
  // }

  // //Обновление данных по email после перехода по письму
  // async updateMail() {
  //   //Получаем актуальные данные
  //   var db_response = await this.db.query(
  //     "SELECT login, email FROM users INNER JOIN sessions ON users.id = sessions.uid WHERE sess_code = '" +
  //     this.sess_code +
  //     "'"
  //   );
  //   //генерируем код из бд
  //   var code = crypto
  //     .createHmac("sha256", CONFIG.crypto_code)
  //     .update(db_response.rows[0].login + "_" + db_response.rows[0].email)
  //     .digest("hex");
  //   //обновление email

  //   db_response = await this.db.query(
  //     "UPDATE users SET mail_code = '" +
  //     code +
  //     "', act_mail = true WHERE " +
  //     "login = (SELECT login from USERS inner join sessions on sessions.uid = users.id WHERE sess_code = '" +
  //     this.sess_code +
  //     "') RETURNING id"
  //   );

  //   return db_response.rows;
  // }




  //Отправка письма для смены пароля


  async sendForgPassMail() {
    //Проверка на подтверждение почты
    var db_response = await this.db.query(
      "SELECT re_password_code, act_mail FROM users WHERE email= '" +
      this.args.email +
      "'"
    );
    if (db_response.rows[0].act_mail === true) {
      await this.transporter.sendMail({
        from: "noreplay@bvs45.ru",
        //Получение email от пользователя
        to: this.args.email,
        subject: "Forgot password",
        //Отправка ссылки с кодом для подтверждения
        html:
          'This message was sent from bvs_server to reset your password. <h1><a href="http://' +
          CONFIG.front_config.host +
          ":" +
          CONFIG.front_config.port +
          "/reset_pass?code= " +
          db_response.rows[0].re_password_code +
          '">Click this link</a></h1>',
      });
      return true;
    } else {
      return false;
    }
  }

  //Обновление данных пароля после перхода по письму
  updatePassRePass() {
    //Генерация пароля
    var pass = crypto
      .createHmac("sha256", CONFIG.crypto_code)
      .update(this.args.new_password)
      .digest("hex");
    //генерация нового кода re_pass_code
    var re_pass_code = crypto
      .createHmac("sha256", CONFIG.crypto_code)
      .update(this.args.login + "_" + pass)
      .digest("hex");
    var db_response = this.args.query(
      "SELECT re_password_code FROM users WHERE login ='" +
      this.args.login +
      "'"
    );
    if (db_response.rows[0].re_password_code === this.args.code) {
      db_response = this.db.query(
        "UPDATE users SET re_password_code = '" +
        re_pass_code +
        "', password = '" +
        pass +
        "' WHERE login = '" +
        this.args.login +
        "'"
      );
      return true;
    } else {
      return false;
    }
  }

  //Смена пароля из под авторизованного пользователя себе 
  changePass(){}

  transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreplay@burvodstroy45.ru", // generated ethereal user
      pass: "RPWH8qhtD0YpY21sWWjY", // generated ethereal password
    },
  });
}
