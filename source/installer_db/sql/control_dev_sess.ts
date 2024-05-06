export const control_dev_sess_table = {
    sql: 
    `
    DROP TABLE IF EXISTS control_dev_sess;
    CREATE TABLE control_dev_sess 
    (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        dev_sess_id BIGSERIAL NOT NULL,
        dev_id BIGSERIAL NOT NULL,
        dev_number VARCHAR(80) NOT NULL DEFAULT('')
    );
    COMMENT ON TABLE control_dev_sess IS 'Контрольная сессия после установки термокосы';
    COMMENT ON COLUMN control_dev_sess.id IS 'Идентификатор контрольной сессии';
    COMMENT ON COLUMN control_dev_sess.dev_sess_id IS 'Идентификатор сессии устройства';
    COMMENT ON COLUMN control_dev_sess.dev_id IS 'Идентификатор устройства';
    COMMENT ON COLUMN control_dev_sess.dev_number IS 'Номер устройства';
    `,
    args: new Array()
};