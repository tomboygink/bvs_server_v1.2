import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';



export const sessions_table = {
    sql: `
    DROP TABLE IF EXISTS sessions;
    CREATE TABLE sessions (
        id          BIGSERIAL NOT NULL PRIMARY KEY,
        uid         BIGINT DEFAULT(0),
        expires     TIMESTAMP NULL,
        created_at  TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
        sess_code   VARCHAR(250) DEFAULT(''),
        sess_data   JSON DEFAULT('{"data":[]}')
    );

    COMMENT ON TABLE sessions IS 'Сессии пользователей';
    COMMENT ON COLUMN sessions.uid IS 'Идентификатор пользователя';
    COMMENT ON COLUMN sessions.expires IS 'Конечное время жизни сессии ';
    COMMENT ON COLUMN sessions.created_at IS 'Время создания записи';
    COMMENT ON COLUMN sessions.sess_code IS 'Код сессии';
    COMMENT ON COLUMN sessions.sess_data IS 'Данные сессии в формате json типа ключ значение';
    `,
    args: new Array()
};
