export const devs_table = {
    sql:
    `
    DROP TABLE IF EXISTS devs;
    CREATE TABLE devs
    (
        "id" BIGSERIAL NOT NULL PRIMARY KEY,
        "group_dev_id" BIGINT NOT NULL DEFAULT(0),
        "number" CHARACTER VARYING(80) NOT NULL DEFAULT(''),
        "name" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
        "latitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
        "longitude" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),
        "sensors" JSON NOT NULL DEFAULT('{"s":[]}'),
        "deleted" BOOLEAN DEFAULT (false),
        "info" TEXT NOT NULL DEFAULT(''),
        "period_sess" BIGINT DEFAULT(0)
    );
    COMMENT ON TABLE devs IS 'Устройства по группам';
    COMMENT ON COLUMN devs.group_dev_id IS 'Идентификатор группы';
    COMMENT ON COLUMN devs.number IS 'Номер устройства';
    COMMENT ON COLUMN devs.name IS 'Наименование устройства';
    COMMENT ON COLUMN devs.latitude IS 'Географическая широта';
    COMMENT ON COLUMN devs.longitude IS 'Географическая долгота';
    COMMENT ON COLUMN devs.sensors IS 'Сенсоры на устройстве';
    COMMENT ON COLUMN devs.deleted IS 'Удаление утройства';
    COMMENT ON COLUMN devs.info IS 'Информация об устройстве';
    COMMENT ON COLUMN devs.period_sess IS 'Установленный период передачи';
    `,
    args: new Array()
}