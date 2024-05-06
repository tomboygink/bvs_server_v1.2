import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';



export const jobs_titles_table = {
    sql: `
    DROP TABLE IF EXISTS jobs_titles;
    CREATE TABLE jobs_titles (
        id              BIGSERIAL NOT NULL PRIMARY KEY,
        org_id          BIGINT DEFAULT(0),
        name            VARCHAR(250) DEFAULT(''),
        created_at      TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
        info            TEXT DEFAULT('')
    );

    COMMENT ON TABLE jobs_titles IS 'Должности';
    COMMENT ON COLUMN jobs_titles.org_id IS 'Привязка по полю организации из таблицы ORGS';
    COMMENT ON COLUMN jobs_titles.name IS 'Наименование должности';
    COMMENT ON COLUMN jobs_titles.created_at IS 'Время создания записи';
    COMMENT ON COLUMN jobs_titles.info IS 'дополнительное описание';
    `,
    args: new Array()
};

export const insert_jt_admin = {
    sql:`INSERT INTO jobs_titles (org_id, name, created_at, info) VALUES ($1,$2,$3,$4)`,
    args:[1, "Администратор", new Date(Date.now()), '']
};
