import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';
import { dateTimeToSQL } from '../../xcore/dbase/DateStr'
import { DBase, endDB, getDB } from '../../xcore/dbase/DBase';



export const users_roles_table = {
    sql: `
    DROP TABLE IF EXISTS users_roles;
    CREATE TABLE users_roles (
        id              BIGSERIAL NOT NULL PRIMARY KEY,
        name            VARCHAR(250) DEFAULT(''),
        created_at      TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
        info            TEXT DEFAULT('')
    );

    COMMENT ON TABLE users_roles IS 'Ролт пользователей в системе';
    COMMENT ON COLUMN users_roles.name IS 'Наименование роли';
    COMMENT ON COLUMN users_roles.created_at IS 'Время создания записи';
    COMMENT ON COLUMN users_roles.info IS 'дополнительное описание';
    `,
    args: new Array()
};


export const insert_role = {
    sql:`INSERT INTO users_roles(id, name, created_at, info) VALUES ($1, $2, $3, $4), ($5, $6 ,$7, $8)`, 
    args:[1, 'users_r', dateTimeToSQL(new Date(Date.now())) , '', 2, 'users_w', dateTimeToSQL(new Date(Date.now())), '']
};
