"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info_log_table = void 0;
exports.info_log_table = {
    sql: "\n    DROP TABLE IF EXISTS info_log;\n    CREATE TABLE info_log \n    (\n        \"id\" BIGSERIAL NOT NULL PRIMARY KEY,\n        \"msg_type\" VARCHAR(70) NOT NULL DEFAULT (''),\n        \"log\" TEXT NOT NULL DEFAULT (''),\n        \"info\" TEXT NOT NULL DEFAULT ('')\n    );\n    COMMENT ON TABLE info_log IS '\u041B\u043E\u0433\u0438 \u043F\u043E \u043E\u0448\u0438\u0431\u043A\u0430\u043C';\n    COMMENT ON COLUMN info_log.id IS '\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043B\u043E\u0433\u0430';\n    COMMENT ON COLUMN info_log.msg_type IS '\u0422\u0438\u043F \u043E\u0448\u0438\u0431\u043A\u0438';\n    COMMENT ON COLUMN info_log.log IS '\u041F\u0440\u0435\u0434\u0430\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430';\n    COMMENT ON COLUMN info_log.info IS '\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430';\n    ",
    args: new Array()
};
//# sourceMappingURL=info_log.js.map