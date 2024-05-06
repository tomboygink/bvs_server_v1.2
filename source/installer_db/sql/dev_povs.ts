export const dev_povs_table = {
    sql: 
    `
    DROP TABLE IF EXISTS dev_povs;
    CREATE TABLE dev_povs 
    (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        dev_id BIGSERIAL NOT NULL,
        dev_number VARCHAR(80) NOT NULL DEFAULT(''),
        start_povs TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
        end_povs TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
        old_dev_povs BIGSERIAL NOT NULL
    );
    COMMENT ON TABLE dev_povs IS 'Поверка кос';
    COMMENT ON COLUMN dev_povs.id IS 'Идентификатор поверки';
    COMMENT ON COLUMN dev_povs.dev_id IS 'Идентификатор устройства';
    COMMENT ON COLUMN dev_povs.dev_number IS 'Номер устройства';
    COMMENT ON COLUMN dev_povs.start_povs IS 'Начало поверки';
    COMMENT ON COLUMN dev_povs.end_povs IS 'Окончание поверки';
    COMMENT ON COLUMN dev_povs.old_dev_povs IS 'Идентификатор старой поверки'; --берется id из этой базы 
    `,
    args: new Array()
};