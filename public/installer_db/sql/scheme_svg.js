"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheme_svg_table = void 0;
exports.scheme_svg_table = {
    sql: "\n    DROP TABLE IF EXISTS scheme_svg;\n    CREATE TABLE scheme_svg (\n        id                      BIGSERIAL NOT NULL PRIMARY KEY,\n        id_devs_groups          BIGINT DEFAULT(0),\n        svg                     TEXT DEFAULT(''),\n        created_at              TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)\n    );\n\n    COMMENT ON TABLE scheme_svg IS '\u0421\u0445\u0435\u043C\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432';\n    COMMENT ON COLUMN scheme_svg.id_devs_groups IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430';\n    COMMENT ON COLUMN scheme_svg.svg IS '\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0445\u0435\u043C\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432';\n    COMMENT ON COLUMN scheme_svg.created_at IS '\u0412\u0440\u0435\u043C\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438';\n    ",
    args: new Array()
};
//# sourceMappingURL=scheme_svg.js.map