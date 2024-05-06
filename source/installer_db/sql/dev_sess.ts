export const dev_sess_table = {
    sql: 
    `
    DROP TABLE IF EXISTS dev_sess;
    CREATE TABLE dev_sess 
    (
        "id" BIGSERIAL NOT NULL PRIMARY KEY,
        "time_dev" TIMESTAMP NOT NULL,
        "time_srv" TIMESTAMP NOT NULL,
        "dev_number" VARCHAR(80) NOT NULL DEFAULT(''),
        "dev_id" BIGSERIAL NOT NULL,
        "level_akb" FLOAT NOT NULL,
        "sess_data" TEXT NOT NULL
    );
    
    COMMENT ON TABLE dev_sess IS 'Сессии по устройствам';
    COMMENT ON COLUMN dev_sess.id IS 'Идентификатор сессии';
    COMMENT ON COLUMN dev_sess.time_dev IS 'Время устройства';
    COMMENT ON COLUMN dev_sess.time_srv IS 'Время сервера';
    COMMENT ON COLUMN dev_sess.dev_number IS 'Номер устройства';
    COMMENT ON COLUMN dev_sess.dev_id IS 'Идентификатор устройства';
    COMMENT ON COLUMN dev_sess.level_akb IS 'Уровень заряда устройства';
    COMMENT ON COLUMN dev_sess.sess_data IS 'Данные с устройства';
    `,
    args: new Array()
};