import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';
import { dateTimeToSQL } from '../../xcore/dbase/DateStr'


export const users_table = {
    sql: `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        id               BIGSERIAL NOT NULL PRIMARY KEY,
        login            VARCHAR(250) DEFAULT(''),
        password         VARCHAR(250) DEFAULT(''),
        family           VARCHAR(150) DEFAULT(''),
        name             VARCHAR(150) DEFAULT(''),
        father           VARCHAR(150) DEFAULT(''),
        telephone        VARCHAR(50) DEFAULT(''),
        email            VARCHAR(150) DEFAULT(''),
        org_id           BIGINT DEFAULT(0),
        job_title_id     BIGINT DEFAULT(0),
        roles_ids        JSON DEFAULT('{"roles":[]}'),
        user_data        JSON DEFAULT('{"user_data":[]}'),
        mail_code        VARCHAR(250) DEFAULT(''),
        act_mail         BOOLEAN DEFAULT(false),
        re_password_code VARCHAR(250) DEFAULT(''),
        deleted          BOOLEAN DEFAULT(false),
        deleted_date     TIMESTAMP DEFAULT(null),
        created_at       TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
        info             TEXT DEFAULT('')
    );
    
    COMMENT ON TABLE users IS 'Пользователи системы';
    COMMENT ON COLUMN users.id IS 'Идентификатор пользователя';
    COMMENT ON COLUMN users.login IS 'Логин пользователя';
    COMMENT ON COLUMN users.password IS 'Пароль пользователя';
    COMMENT ON COLUMN users.family IS 'Фамилия';
    COMMENT ON COLUMN users.name IS 'Имя';
    COMMENT ON COLUMN users.father IS 'Отчество';
    COMMENT ON COLUMN users.telephone IS 'Телефон';
    COMMENT ON COLUMN users.email IS 'Почта';
    COMMENT ON COLUMN users.org_id IS 'Идентификатор привязки организации';
    COMMENT ON COLUMN users.job_title_id IS 'Идентификатор привязки должности организации';
    COMMENT ON COLUMN users.roles_ids IS 'json объект с массивом идентификаторов ролей доступа';
    COMMENT ON COLUMN users.user_data IS 'json объукт дополнительных данных пользователя';
    COMMENT ON COLUMN users.mail_code IS 'код подтверждения емаил';
    COMMENT ON COLUMN users.act_mail IS 'фиксация подтвержденного кода';
    COMMENT ON COLUMN users.re_password_code IS 'код смены пароля по ссылке';
    COMMENT ON COLUMN users.deleted IS 'блокировка пользователя';
    COMMENT ON COLUMN users.deleted_date IS 'дата блокировки пользователя';
    COMMENT ON COLUMN users.created_at IS 'дата создания записи';
    COMMENT ON COLUMN users.info IS 'дополнительное описание';
    `,
    args: new Array()
};



export const insert_admin = {
    sql: `INSERT INTO users(login, password, family, name, father, telephone, email, org_id, job_title_id, roles_ids, user_data, mail_code, act_mail, re_password_code, deleted, deleted_date, created_at, info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
    args:['admin', crypto.createHmac('sha256', CONFIG.key_code).update('admin').digest('hex'), 'admin', 'admin', 'admin', '0(000)000-00-00', '',1, 1, '{"roles":[1,2]}', '{"user_data":[]}', '', false, crypto.createHmac('sha256', CONFIG.key_code).update('admin'+'_'+crypto.createHmac('sha256', CONFIG.key_code).update('admin').digest('hex')).digest('hex'), false, null, dateTimeToSQL(new Date(Date.now())), '']
};