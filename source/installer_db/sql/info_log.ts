export const info_log_table = {
    sql:
    `
    DROP TABLE IF EXISTS info_log;
    CREATE TABLE info_log 
    (
        "id" BIGSERIAL NOT NULL PRIMARY KEY,
        "msg_type" VARCHAR(70) NOT NULL DEFAULT (''),
        "log" TEXT NOT NULL DEFAULT (''),
        "info" TEXT NOT NULL DEFAULT ('')
    );
    COMMENT ON TABLE info_log IS 'Логи по ошибкам';
    COMMENT ON COLUMN info_log.id IS 'Идентификатор лога';
    COMMENT ON COLUMN info_log.msg_type IS 'Тип ошибки';
    COMMENT ON COLUMN info_log.log IS 'Преданная строка';
    COMMENT ON COLUMN info_log.info IS 'Сообщение от сервера';
    `,
    args: new Array()
}