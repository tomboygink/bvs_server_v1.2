export const skvazhiny_table = {
    sql: `
    DROP TABLE IF EXISTS skvazhiny;
    CREATE TABLE skvazhiny (
        id          BIGINT NOT NULL PRIMARY KEY,
        number      VARCHAR(60) DEFAULT(''),
        org_id      BIGINT DEFAULT(0),
        group_id    BIGINT DEFAULT(0),
        dev_id      BIGINT DEFAULT(0),
        create_at   TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) 
    );

    COMMENT ON TABLE skvazhiny IS 'Ролт пользователей в системе';
    COMMENT ON COLUMN skvazhiny.id IS 'Идентификатор скважины';
    COMMENT ON COLUMN skvazhiny.number IS 'Ноиер скважины';
    COMMENT ON COLUMN skvazhiny.org_id IS 'Идентификатор организации';
    COMMENT ON COLUMN skvazhiny.group_id IS 'Идентификатор группы';
    COMMENT ON COLUMN skvazhiny.dev_id IS 'Идентификатор устройства';
    COMMENT ON COLUMN skvazhiny.create_at IS 'Время создания записи';
    `,
    args: new Array()
};
