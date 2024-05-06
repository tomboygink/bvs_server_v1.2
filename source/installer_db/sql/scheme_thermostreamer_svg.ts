import { CONFIG } from '../../xcore/config';


export const scheme_thermostreamer_svg_table = {
    sql: `
    DROP TABLE IF EXISTS scheme_thermostreamer_svg;
    CREATE TABLE scheme_thermostreamer_svg (
        id                      BIGSERIAL NOT NULL PRIMARY KEY,
        id_devs                 BIGINT DEFAULT(0),
        svg                     TEXT DEFAULT(''),
        created_at              TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
    );

    COMMENT ON TABLE scheme_svg IS 'Схема термокосы в скважине';
    COMMENT ON COLUMN scheme_svg.id_devs_groups IS 'Идентификатор устройства';
    COMMENT ON COLUMN scheme_svg.svg IS 'Описание схемы термокосы';
    COMMENT ON COLUMN scheme_svg.created_at IS 'Время создания записи';
    `,
    args: new Array()
};