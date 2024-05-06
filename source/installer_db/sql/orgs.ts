import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';
import { dateTimeToSQL } from '../../xcore/dbase/DateStr';



export const orgs_table = {
    sql: `
    DROP TABLE IF EXISTS orgs;
    CREATE TABLE orgs (
        id          BIGSERIAL NOT NULL PRIMARY KEY,
        name        VARCHAR(250) DEFAULT(''),
        full_name   VARCHAR(400) DEFAULT(''),
        inn         VARCHAR(50) DEFAULT(''),
        address     VARCHAR(400) DEFAULT(''),
        latitude    VARCHAR(60) DEFAULT(''),
        longitude   VARCHAR(60) DEFAULT(''),
        created_at  TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
        info        TEXT DEFAULT('')
    );

    COMMENT ON TABLE orgs IS 'Организации';
    COMMENT ON COLUMN orgs.name IS 'Сокращенное название организации';
    COMMENT ON COLUMN orgs.full_name IS 'Полное название организации';
    COMMENT ON COLUMN orgs.inn IS 'ИНН организации для поиска по ИНН';
    COMMENT ON COLUMN orgs.address IS 'Адрес организации';
    COMMENT ON COLUMN orgs.latitude IS 'Широта';
    COMMENT ON COLUMN orgs.longitude IS 'Долгота';
    COMMENT ON COLUMN orgs.created_at IS 'Время создания записи';
    COMMENT ON COLUMN orgs.info IS 'дополнительное описание';
    `,
    args: new Array()
};

export const org_insert_admin = {
    sql:`INSERT INTO orgs(name, full_name, inn, address, latitude, longitude, created_at, info) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    args: ['ООО СБИ', 'ООО СЕВЕРБУРИНСТРУМЕНТ','4501225901','К.Мяготина 39, стр.10','55.42936450314359','65.28275430661108',dateTimeToSQL(new Date(Date.now())),'' ]

};
