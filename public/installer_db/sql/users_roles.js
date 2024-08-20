"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_role = exports.users_roles_table = void 0;
var DateStr_1 = require("../../config/xcore/dbase/DateStr");
exports.users_roles_table = {
    sql: "\n    DROP TABLE IF EXISTS users_roles;\n    CREATE TABLE users_roles (\n        id              BIGSERIAL NOT NULL PRIMARY KEY,\n        name            VARCHAR(250) DEFAULT(''),\n        created_at      TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),\n        info            TEXT DEFAULT('')\n    );\n\n    COMMENT ON TABLE users_roles IS '\u0420\u043E\u043B\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435';\n    COMMENT ON COLUMN users_roles.name IS '\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u043E\u043B\u0438';\n    COMMENT ON COLUMN users_roles.created_at IS '\u0412\u0440\u0435\u043C\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438';\n    COMMENT ON COLUMN users_roles.info IS '\u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435';\n    ",
    args: new Array()
};
exports.insert_role = {
    sql: "INSERT INTO users_roles(id, name, created_at, info) VALUES ($1, $2, $3, $4), ($5, $6 ,$7, $8)",
    args: [1, 'users_r', (0, DateStr_1.dateTimeToSQL)(new Date(Date.now())), '', 2, 'users_w', (0, DateStr_1.dateTimeToSQL)(new Date(Date.now())), '']
};
//# sourceMappingURL=users_roles.js.map