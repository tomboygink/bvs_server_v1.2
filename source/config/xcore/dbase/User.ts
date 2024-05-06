import { DBase, getDB } from "./DBase";
import crypto from 'crypto';
import CONFIG from '../../config.json';
import { dateTimeToSQL, dateTimeToStr } from './DateStr'



export class UsersEntity {
    id: number = 0;
    login: string = '';
    family: string = '';
    name: string = '';
    father: string = '';
    email: string = '';
    id_org: number = 0;
    id_job: number = 0;
    roles_ids: Object = {};
    act_mail: boolean = false;
    deleted: boolean = false;
    info: string = '';

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

        var pass = crypto.createHmac('sha256', CONFIG.crypto_code)
            .update(this.args.password).digest('hex');
        var db_response = await this.db.query("SELECT id FROM users WHERE login = \'" + this.args.login
            + "\' and password = \'" + pass + "\'"
        );

        if (db_response.rows.length !== 0) {
            const date = new Date;
            date.setDate(date.getDate() + 15);
            // получаем id для записи 
            var id_q = await this.db.query("SELECT max(id) FROM sessions");
            var id: number = 0;
            //если записей в Sessions не было то присваеваем 1
            if (id_q.rows[0].max === null) { id++; }
            //иначе к последней записи добавляем 1 
            else { id = parseInt(id_q.rows[0].max) + 1 }

            var sess = crypto.createHmac('sha256', CONFIG.crypto_code)
                .update(id + "_" + dateTimeToSQL(date) + "_" +
                    db_response.rows[0].selectiduser).digest('hex');


            //записываем в Sessions
            await this.db.query("INSERT INTO sessions (id, uid, expires, created_at, sess_code, sess_data) " +
                "VALUES (" + id + ", " + db_response.rows[0].id + ", \'" + dateTimeToSQL(date) + "\', \'"
                + dateTimeToSQL(new Date(Date.now())) + "\', \'" + sess + "\', \'{\"data\":[]}\')");
            return sess;
        }
    }

    //Удаление кода сессии пользователя
    async deleteSessionCode() {
        await this.db.query("DELETE FROM sessions WHERE sess_code = \'" + this.args.code + "\'")
    }

    // Получение данных при авторизации
    async selectUser(): Promise<UsersEntity[]> {
        var db_response: any = {};
        //Авторизация по логину паролю 
        if (this.args.code === undefined) {
            //Шифрование пароля для сверки с базой данных
            var pass = crypto.createHmac('sha256', CONFIG.crypto_code)
                .update(this.args.password).digest('hex');

            db_response = await this.db.query("SELECT " +
                "id, login, family, name, father, email, org_id as id_org," +
                "job_title_id as id_job, roles_ids, act_mail, deleted, info FROM users WHERE login =\'" +
                this.args.login + "\' and password = \'" + pass + "\'");
        }

        //Авторизация по коду сессии
        else {
            var time_for_exit = await this.db.query("SELECT expires FROM sessions WHERE sess_code = \'" + this.args.code + "\'");

            if (time_for_exit.rows[0] !== undefined && time_for_exit.rows[0].expires >= new Date(Date.now())) {
                db_response = await this.db.query("SELECT " +
                    "users.id, users.login, users.family, users.name, " +
                    "users.father, users.email, users.org_id as id_org," +
                    "users.job_title_id as id_job, users.roles_ids, " +
                    "users.act_mail, users.deleted, users.info FROM users INNER JOIN sessions ON " +
                    "users.id=sessions.uid WHERE sessions.sess_code = \'" + this.args.code + "\'");
            }
            else {
                console.log("Время авторизации вышло")
            }

        }

        var result: UsersEntity[] = new Array();
        for (var u in db_response.rows) {
            result.push(db_response.rows[u]);
        }
        return result;
    }

    async insertUser() {

        var checkUser = await this.selectUser();
        if (checkUser.length === 0) {
            // Генерация зашифрованного пароля 
            var pass = crypto.createHmac('sha256', CONFIG.crypto_code).update(this.args.password).digest('hex');
            // Генерация зашифрованного кода подтверждение почты 
            var mail_code = crypto.createHmac('sha256', CONFIG.crypto_code).update(this.args.login + "_" + this.args.email).digest('hex');;
            // Генерация зашифрованного кода для смены пароля когда пользователь забыл пароль
            var re_pass_code = crypto.createHmac('sha256', CONFIG.crypto_code).update(this.args.login + "_" + pass).digest('hex');;

            // Запрос на добавление пользователя 
            var db_response = await this.db.query("INSERT INTO users (login, password, family, name, father, telephone, " +
                "email, org_id, job_title_id, roles_ids, user_data, mail_code, act_mail, re_password_code, " +
                "deleted, deleted_date, created_at, info) VALUES (\'" + this.args.login + "\', \'" + pass + "\', \'" +
                this.args.family + "\', \'" + this.args.name + "\', \'" + this.args.father + "\', \'---\', \'" + this.args.email + "\', " +
                this.args.id_org + ", " + this.args.id_jobs + ", \'" + this.args.roles_ids + "\', \'{\"user_data\":[]}\', \'" +
                mail_code + "\', " + this.args.act_mail + ", \'" + re_pass_code + "\', false, null, \'" +
                dateTimeToSQL(new Date(Date.now())) + "\',\'" + this.args.info + "\') RETURNING id");

            return db_response.rows;
        }
    }

}